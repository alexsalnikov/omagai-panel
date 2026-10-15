import QtQuick
import Ryoku.PluginKit.Singletons

// content/Panel.qml: the season card, the same layout as the GTK popup
// (kanji | name over rōmaji | picture, then the gloss, the dates and the sekki)
// drawn in the shell's own palette.
Item {
    id: root

    property var pluginApi
    property string density: "full"
    property real s: 1
    property real widthBudget: 440
    property bool active: false

    readonly property var service: pluginApi ? pluginApi.mainInstance : null
    readonly property var season: service ? service.season : null

    // Re-read the date each time the card opens, so it is never stale.
    onActiveChanged: if (active && service) service.refresh()

    implicitWidth: root.widthBudget
    implicitHeight: col.implicitHeight + 40 * root.s

    Column {
        id: col
        visible: root.season !== null
        x: 20 * root.s
        y: 20 * root.s
        width: root.width - 40 * root.s
        spacing: 12 * root.s

        Row {
            width: parent.width
            spacing: 18 * root.s

            Text {
                id: kanji
                anchors.verticalCenter: parent.verticalCenter
                text: root.season ? root.season.kanji : ""
                color: Theme.bright
                font.family: "Noto Sans CJK JP"
                font.weight: Font.Light
                font.pixelSize: 40 * root.s
            }

            Column {
                anchors.verticalCenter: parent.verticalCenter
                width: parent.width - kanji.width - emoji.width - 2 * parent.spacing
                spacing: 4 * root.s

                Text {
                    width: parent.width
                    text: root.season ? root.season.name : ""
                    color: Theme.bright
                    font.family: Theme.font
                    font.bold: true
                    font.pixelSize: 17 * root.s
                    wrapMode: Text.Wrap
                }

                Text {
                    width: parent.width
                    text: root.season ? root.season.romaji : ""
                    color: Theme.dim
                    font.family: Theme.font
                    font.letterSpacing: 2 * root.s
                    font.pixelSize: 12 * root.s
                    wrapMode: Text.Wrap
                }
            }

            Text {
                id: emoji
                anchors.verticalCenter: parent.verticalCenter
                text: root.season ? root.season.emoji : ""
                font.family: "Noto Color Emoji"
                font.pixelSize: 44 * root.s
            }
        }

        Rectangle {
            width: parent.width
            height: 1
            color: Theme.dim
            opacity: 0.35
        }

        Text {
            width: parent.width
            text: root.season ? root.season.note : ""
            color: Theme.bright
            font.family: Theme.font
            font.pixelSize: 13 * root.s
            wrapMode: Text.Wrap
        }

        Text {
            width: parent.width
            text: root.service ? root.service.range + " · " + root.service.changes : ""
            color: Theme.accent
            font.family: Theme.font
            font.pixelSize: 13 * root.s
            wrapMode: Text.Wrap
        }

        Text {
            width: parent.width
            text: root.season
                ? root.season.sekkiKanji + "  " + root.season.sekki + " · " + root.season.sekkiName
                  + " · " + root.service.cur.partName + " of three"
                : ""
            color: Theme.dim
            font.family: Theme.font
            font.pixelSize: 12 * root.s
            wrapMode: Text.Wrap
        }
    }
}
