# Pill Bar

Segmented pill bar — transparent window, pills only behind widget clusters. Includes always-expanded static tray (no chevron) for the segmented layout. Center anchored on calendar.

> **Omarchy Quattro** segmented pill bar — the window is transparent and pills are drawn only behind actual widget clusters. Includes an **always-expanded static tray** (no chevron) designed for the segmented layout. Anchored on the calendar widget by default; all widgets live in the center section in order.

## Installation

```bash
# Add the plugin (clones to ~/.config/omarchy/plugins/ishanp.pill-bar/)
omarchy plugin add https://github.com/ishan-parihar/pill-bar.git

# Enable the bar (replaces the default omarchy bar)
omarchy plugin enable ishanp.pill-bar

# The static tray widget is part of the same plugin
# Add it to the bar if not already present (center section):
# omarchy bar put ishanp.pill-bar --section center
```

Restart the shell if needed:

```bash
omarchy restart shell
```

### Manual install

```bash
git clone https://github.com/ishan-parihar/pill-bar.git ~/.config/omarchy/plugins/ishanp.pill-bar
omarchy-shell shell rescanPlugins
omarchy plugin enable ishanp.pill-bar
```

## Removal

```bash
omarchy plugin disable ishanp.pill-bar  # or remove
omarchy plugin remove ishanp.pill-bar
# Switch back to the default bar
omarchy bar use omarchy.bar
omarchy restart shell
```

## Layout

`shell.json` example (center-anchored):

```json
{
  "bar": {
    "id": "ishanp.pill-bar",
    "centerAnchor": "tmn73.calendar",
    "layout": {
      "left": [{ "id": "omarchy.menu" }, { "id": "decent-workspaces" }],
      "center": [{ "id": "tmn73.calendar" }, { "id": "omarchy.weather" }, { "id": "ishanp.pill-bar" }],
      "right": []
    }
  }
}
```

Sizing tokens in `~/.config/omarchy/shell.toml` control the 1.5× bar scaling used in the screenshots:

```toml
[bar]
scale-with-font = false
size-horizontal = 34
icon-slot = 40
icon-canvas = 24
icon-font = 20
status-slot = 31
```

## Features

- **Segmented pills**: `Bar.qml` window is `transparent`; pills are drawn per-cluster (left/center/right), with `beforeList`/`afterList`/`centerAnchor` handling.
- **Static tray**: `StaticTray.qml` — always expanded, `expandIcon` hidden, `drawerBlockWidth = drawerExtent`, no chevron/mirror hack, `containmentMask` bounds to drawer only.
- **Cloned from** `omarchy.bar` + `omarchy.tray` and merged into a single suite (`kinds: ["bar","bar-widget"]`) so one `plugin add` ships both.

## Requirements

- Omarchy Quattro + Quickshell (`omarchy-shell`)
- No extra runtime dependencies.

## License

MIT — see [LICENSE](./LICENSE).

## Development

```bash
omarchy plugin validate ~/.config/omarchy/plugins/ishanp.pill-bar
omarchy plugin clone ishanp.pill-bar  # to fork locally
```
