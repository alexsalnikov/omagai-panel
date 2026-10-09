import GLib from 'gi://GLib';
import GObject from 'gi://GObject';
import Pango from 'gi://Pango';
import St from 'gi://St';
import Clutter from 'gi://Clutter';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
import * as PopupMenu from 'resource:///org/gnome/shell/ui/popupMenu.js';
import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';

import * as Seasons from './seasons.js';
import {GLYPHS} from './glyphs.js';

// Omagai: the current one of the 72 microseasons, in the top bar. Left-click
// opens the panel, right-click cycles the label. There is nothing to browse:
// the panel shows the season you are in and no other.

const LABEL_ORDER = ['char', 'kanji', 'short', 'name'];

const TICK_SECONDS = 60;

const OmagaiIndicator = GObject.registerClass(
class OmagaiIndicator extends PanelMenu.Button {
    _init(settings) {
        super._init(0.5, 'Omagai');
        this._settings = settings;

        this._label = new St.Label({
            style_class: 'omagai-bar-label',
            y_align: Clutter.ActorAlign.CENTER,
        });
        this.add_child(this._label);

        this._buildPanel();

        this._settingsId = this._settings.connect('changed::bar-label', () => this.refresh());
        this.menu.connect('open-state-changed', (_menu, open) => {
            if (open)
                this.refresh();
        });

        this.refresh();
    }

    _buildPanel() {
        const item = new PopupMenu.PopupBaseMenuItem({reactive: false, can_focus: false});
        const box = new St.BoxLayout({
            style_class: 'omagai-panel',
            orientation: Clutter.Orientation.VERTICAL,
            x_expand: true,
        });
        item.add_child(box);

        const hero = new St.BoxLayout({style_class: 'omagai-hero'});
        this._kanji = new St.Label({style_class: 'omagai-kanji', y_align: Clutter.ActorAlign.CENTER});
        const names = new St.BoxLayout({
            orientation: Clutter.Orientation.VERTICAL,
            x_expand: true,
            y_align: Clutter.ActorAlign.CENTER,
            style_class: 'omagai-names',
        });
        this._name = new St.Label({style_class: 'omagai-name'});
        this._romaji = new St.Label({style_class: 'omagai-romaji'});
        names.add_child(this._name);
        names.add_child(this._romaji);
        this._emoji = new St.Label({style_class: 'omagai-emoji', y_align: Clutter.ActorAlign.CENTER});
        hero.add_child(this._kanji);
        hero.add_child(names);
        hero.add_child(this._emoji);

        this._note = new St.Label({style_class: 'omagai-note'});
        this._when = new St.Label({style_class: 'omagai-when'});
        this._sekki = new St.Label({style_class: 'omagai-sekki'});

        // Wrap rather than ellipsize: some names and rōmaji run long.
        for (const label of [this._name, this._romaji, this._note, this._when, this._sekki]) {
            label.clutter_text.line_wrap = true;
            label.clutter_text.ellipsize = Pango.EllipsizeMode.NONE;
        }

        box.add_child(hero);
        box.add_child(new St.Widget({style_class: 'omagai-separator', x_expand: true}));
        box.add_child(this._note);
        box.add_child(this._when);
        box.add_child(this._sekki);

        this.menu.addMenuItem(item);
        this.menu.box.add_style_class_name('omagai-menu');
    }

    refresh() {
        const now = new Date();
        const current = Seasons.stateAt(now);
        const s = current.season;
        const style = this._settings.get_string('bar-label');

        const labels = {char: GLYPHS[current.index], kanji: s.kanji, short: s.short, name: s.name};
        this._label.text = labels[style] ?? s.short;

        this._kanji.text = s.kanji;
        this._emoji.text = s.emoji;
        this._name.text = s.name;
        this._romaji.text = s.romaji;
        this._note.text = s.note;
        this._when.text = `${Seasons.formatRange(current.start, current.end)} · ${
            Seasons.changesInText(Seasons.daysUntil(now, current.end))}`;
        this._sekki.text = `${s.sekkiKanji}  ${s.sekki} · ${s.sekkiName} · ${current.partName} of three`;
    }

    cycleLabel() {
        const style = this._settings.get_string('bar-label');
        const next = LABEL_ORDER[(LABEL_ORDER.indexOf(style) + 1) % LABEL_ORDER.length];
        this._settings.set_string('bar-label', next);
    }

    vfunc_event(event) {
        if (event.type() === Clutter.EventType.BUTTON_PRESS &&
            event.get_button() === Clutter.BUTTON_SECONDARY) {
            this.cycleLabel();
            return Clutter.EVENT_STOP;
        }
        return super.vfunc_event(event);
    }

    destroy() {
        this._settings.disconnect(this._settingsId);
        super.destroy();
    }
});

export default class OmagaiExtension extends Extension {
    enable() {
        this._indicator = new OmagaiIndicator(this.getSettings());
        Main.panel.addToStatusArea(this.uuid, this._indicator, 0, 'right');

        this._tickId = GLib.timeout_add_seconds(GLib.PRIORITY_DEFAULT, TICK_SECONDS, () => {
            this._indicator.refresh();
            return GLib.SOURCE_CONTINUE;
        });
    }

    disable() {
        if (this._tickId) {
            GLib.source_remove(this._tickId);
            this._tickId = 0;
        }
        this._indicator?.destroy();
        this._indicator = null;
    }
}
