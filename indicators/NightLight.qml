import QtQuick
import qs.Ui

BarIndicator {
  id: root

  // pill-bar: revealed indicators always render at full brightness
  dimmed: false
  concealed: false
  function syncIndicatorOpacity() { opacity = 1 }

  readonly property var nightlightService: bar?.shell?.firstPartyServiceFor("omarchy.nightlight")

  active: nightlightService ? nightlightService.enabled : false
  activeText: "󰔎"
  inactiveText: "󰔎"
  activeTooltipText: "Day Light"
  inactiveTooltipText: "Night Light"

  function toggle() {
    if (root.nightlightService) root.nightlightService.setNightlight(!root.active)
  }

  onPressed: function() { root.toggle() }
}
