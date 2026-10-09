// Omagai popup for waybar under niri: the GNOME extension's panel as a
// floating window. A second launch closes the open one (pid file), so the bar
// button toggles it; Esc or clicking elsewhere closes it too. niri floats it
// top-right via the window rule on app-id dev.local.OmagaiPopup.
import Gdk from 'gi://Gdk?version=4.0';
import Gio from 'gi://Gio';
import GLib from 'gi://GLib';
import GLibUnix from 'gi://GLibUnix';
import Gtk from 'gi://Gtk?version=4.0';
import System from 'system';

const EXT = `${GLib.get_home_dir()}/.local/share/gnome-shell/extensions/omagai@local`;
let Seasons;
try {
    Seasons = await import(`file://${EXT}/seasons.js`);
} catch {
    try {
        Seasons = await import('./seasons.js');
    } catch {
        Seasons = await import('../core/seasons.js');
    }
}

const PID_FILE = `${GLib.get_user_runtime_dir()}/omagai-waybar/popup.pid`;

const CSS = `
window.omagai-popup {
    background-color: #1a1b26;
    border: 1px solid #7aa2f7;
    border-radius: 6px;
}
.panel { padding: 22px 24px; }
.panel label {
    font-family: "CaskaydiaMono Nerd Font", monospace;
    color: #c0caf5;
}
.panel label.kanji {
    font-family: "Noto Sans CJK JP", sans-serif;
    font-size: 34pt;
    font-weight: 300;
    color: #c0caf5;
}
.panel label.emoji {
    font-family: "Noto Color Emoji";
    font-size: 48pt;
}
.name { font-size: 16pt; font-weight: bold; color: #c0caf5; }
.romaji { font-size: 11pt; letter-spacing: 3px; color: #737aa2; }
.note { font-size: 11pt; letter-spacing: 1px; color: #a9b1d6; }
.when { font-size: 11pt; letter-spacing: 1px; }
.sekki { font-size: 10pt; letter-spacing: 1px; color: #737aa2; }
separator { background: #292e42; min-height: 1px; margin: 4px 0; }
`;

function runningPid() {
    try {
        const [, bytes] = GLib.file_get_contents(PID_FILE);
        const pid = parseInt(new TextDecoder().decode(bytes), 10);
        const [, cmd] = GLib.file_get_contents(`/proc/${pid}/cmdline`);
        if (new TextDecoder().decode(cmd).includes('omagai-popup'))
            return pid;
    } catch {}
    return 0;
}

const open = runningPid();
if (open) {                         // bar clicked while open: close it
    GLib.spawn_command_line_sync(`kill ${open}`);
    System.exit(0);
}
GLib.mkdir_with_parents(GLib.path_get_dirname(PID_FILE), 0o700);
GLib.file_set_contents(PID_FILE, String(new Gio.Credentials().get_unix_pid()));

function label(text, css, props = {}) {
    const l = new Gtk.Label({label: text, xalign: 0, ...props});
    for (const c of css.split(' '))
        l.add_css_class(c);
    return l;
}

const app = new Gtk.Application({
    application_id: 'dev.local.OmagaiPopup',
    flags: Gio.ApplicationFlags.NON_UNIQUE,
});

app.connect('activate', () => {
    const provider = new Gtk.CssProvider();
    provider.load_from_string(CSS);
    Gtk.StyleContext.add_provider_for_display(Gdk.Display.get_default(), provider,
        Gtk.STYLE_PROVIDER_PRIORITY_USER);

    const win = new Gtk.ApplicationWindow({
        application: app, title: 'Omagai', decorated: false, resizable: false,
    });
    win.add_css_class('omagai-popup');
    win.set_default_size(520, -1);

    const keys = new Gtk.EventControllerKey();
    keys.connect('key-pressed', (_c, key) => {
        if (key === Gdk.KEY_Escape)
            app.quit();
        return false;
    });
    win.add_controller(keys);

    // Close on focus loss like a menu, once it has actually had focus.
    let hadFocus = false;
    win.connect('notify::is-active', () => {
        if (win.is_active)  // property, not a method, in gjs
            hadFocus = true;
        else if (hadFocus)
            app.quit();
    });

    const now = new Date();
    const cur = Seasons.stateAt(now);
    const s = cur.season;

    const panel = new Gtk.Box({orientation: Gtk.Orientation.VERTICAL, spacing: 14});
    panel.add_css_class('panel');

    // Hero: kanji | name over rōmaji | picture, the picture filling the right.
    const hero = new Gtk.Box({spacing: 22});
    hero.append(label(s.kanji, 'kanji', {valign: Gtk.Align.CENTER}));
    const names = new Gtk.Box({
        orientation: Gtk.Orientation.VERTICAL, spacing: 6,
        hexpand: true, valign: Gtk.Align.CENTER,
    });
    names.append(label(s.name, 'name', {wrap: true, max_width_chars: 18}));
    names.append(label(s.romaji, 'romaji', {wrap: true, max_width_chars: 22}));
    hero.append(names);
    hero.append(label(s.emoji, 'emoji', {valign: Gtk.Align.CENTER, xalign: 1}));
    panel.append(hero);

    panel.append(new Gtk.Separator());
    panel.append(label(s.note, 'note', {wrap: true, max_width_chars: 44}));
    panel.append(label(`${Seasons.formatRange(cur.start, cur.end)} · ${
        Seasons.changesInText(Seasons.daysUntil(now, cur.end))}`, 'when', {wrap: true}));
    panel.append(label(`${s.sekkiKanji}  ${s.sekki} · ${s.sekkiName} · ${cur.partName} of three`,
        'sekki', {wrap: true}));

    win.set_child(panel);
    win.present();
});

GLibUnix.signal_add(GLib.PRIORITY_DEFAULT, 15 /* SIGTERM */, () => {
    app.quit();
    return GLib.SOURCE_REMOVE;
});

const status = app.run([]);
if (runningPid() === new Gio.Credentials().get_unix_pid())
    GLib.unlink(PID_FILE);
System.exit(status);
