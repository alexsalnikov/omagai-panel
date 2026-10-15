pragma ComponentBehavior: Bound

import QtQuick
import "Seasons.js" as Seasons

// service/Main.qml: works out the current microseason and holds it for the
// glyph and the panel. Nothing here touches the disk or runs a program; the
// whole calendar is the astronomical engine in Seasons.js.
Item {
    id: svc

    property var pluginApi
    readonly property var settings: pluginApi ? pluginApi.pluginSettings : null

    // Bar label style: char (one kanji), kanji (the full name), short, name.
    readonly property string labelStyle: settings ? (settings.labelStyle ?? "char") : "char"

    property var cur: Seasons.stateAt(new Date())
    property date now: new Date()

    readonly property var season: cur.season
    readonly property string glyph: Seasons.GLYPHS[cur.index]
    readonly property string label: {
        switch (svc.labelStyle) {
        case "kanji": return season.kanji;
        case "short": return season.short;
        case "name": return season.name;
        default: return svc.glyph;
        }
    }
    readonly property string range: Seasons.formatRange(cur.start, cur.end)
    readonly property string changes: Seasons.changesInText(Seasons.daysUntil(svc.now, cur.end))

    function refresh() {
        svc.now = new Date();
        svc.cur = Seasons.stateAt(svc.now);
    }

    // A season lasts about five days and turns over at local midnight, so a
    // ten-minute check is plenty and catches the day change soon after.
    Timer {
        interval: 10 * 60 * 1000
        running: true
        repeat: true
        onTriggered: svc.refresh()
    }
}
