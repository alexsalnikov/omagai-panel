// Omagai for waybar: prints {text, tooltip}; `cycle` steps the label style.
// Shares the season engine, glyphs and bar-label setting with the GNOME
// extension, so both show the same thing.
import Gio from 'gi://Gio';
import GLib from 'gi://GLib';
import System from 'system';

const EXT = `${GLib.get_home_dir()}/.local/share/gnome-shell/extensions/omagai@local`;
let Seasons, GLYPHS;
try {
    Seasons = await import(`file://${EXT}/seasons.js`);
    const glyphsMod = await import(`file://${EXT}/glyphs.js`);
    GLYPHS = glyphsMod.GLYPHS;
} catch {
    try {
        Seasons = await import('./seasons.js');
        const glyphsMod = await import('./glyphs.js');
        GLYPHS = glyphsMod.GLYPHS;
    } catch {
        Seasons = await import('../core/seasons.js');
        const glyphsMod = await import('../core/glyphs.js');
        GLYPHS = glyphsMod.GLYPHS;
    }
}

const ORDER = ['char', 'kanji', 'short', 'name'];
const source = Gio.SettingsSchemaSource.new_from_directory(
    `${EXT}/schemas`, Gio.SettingsSchemaSource.get_default(), false);
const settings = new Gio.Settings({
    settings_schema: source.lookup('org.gnome.shell.extensions.omagai', false),
});

if (ARGV[0] === 'cycle') {
    const style = settings.get_string('bar-label');
    settings.set_string('bar-label', ORDER[(ORDER.indexOf(style) + 1) % ORDER.length]);
    Gio.Settings.sync();
    System.exit(0);
}

const esc = s => GLib.markup_escape_text(s, -1);
const now = new Date();
const cur = Seasons.stateAt(now);
const s = cur.season;
const labels = {char: GLYPHS[cur.index], kanji: s.kanji, short: s.short, name: s.name};

const tooltip = [
    `<span size="xx-large">${esc(s.kanji)}</span>   ${esc(s.emoji)}`,
    `<b>${esc(s.name)}</b>`,
    `<span color="#8a8a8a">${esc(s.romaji)}</span>`,
    '',
    esc(s.note),
    '',
    esc(`${Seasons.formatRange(cur.start, cur.end)} · ${Seasons.changesInText(Seasons.daysUntil(now, cur.end))}`),
    `<span color="#8a8a8a">${esc(`${s.sekkiKanji}  ${s.sekki} · ${s.sekkiName} · ${cur.partName} of three`)}</span>`,
].join('\n');

print(JSON.stringify({text: labels[settings.get_string('bar-label')] ?? s.short, tooltip}));
