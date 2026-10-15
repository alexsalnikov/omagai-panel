import QtQuick
import Ryoku.PluginKit.Singletons

// content/Widget.qml: the microseason label on the bar. A click opens the
// season card; the label style is a setting under QS Bar Settings > Community.
Item {
    id: root

    property var pluginApi
    property var screen
    property bool active: false
    property string density: "glyph"
    property real s: 1
    property real widthBudget: 0

    readonly property var service: pluginApi ? pluginApi.mainInstance : null

    implicitWidth: label.width
    implicitHeight: Math.max(label.implicitHeight, 18 * root.s)

    Text {
        id: label
        anchors.verticalCenter: parent.verticalCenter
        text: root.service ? root.service.label : ""
        color: root.active ? Theme.accent : Theme.bright
        font.family: Theme.font
        font.pixelSize: 14 * root.s
        elide: Text.ElideRight
        width: root.widthBudget > 0 ? Math.min(implicitWidth, root.widthBudget) : implicitWidth
    }

    MouseArea {
        anchors.fill: parent
        onClicked: if (root.pluginApi) root.pluginApi.togglePanel()
    }
}
