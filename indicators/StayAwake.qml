import QtQuick
import qs.Ui

BarIndicator {
  id: root

  // pill-bar: revealed indicators always render at full brightness
  dimmed: false
  concealed: false
  function syncIndicatorOpacity() { opacity = 1 }

  readonly property var idleService: bar?.shell?.firstPartyServiceFor("omarchy.idle")

  active: idleService ? idleService.stayAwake : false
  activeText: "󰅶"
  inactiveText: "󰅶"
  activeTooltipText: "Allow Idle Lock & Screensaver"
  inactiveTooltipText: "Stay Awake"

  function toggle() {
    if (root.idleService) root.idleService.setIdleEnabled(root.active)
  }

  onPressed: function() { root.toggle() }
}
