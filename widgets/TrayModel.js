function text(value) {
  return String(value || "").toLowerCase()
}

function itemNamed(item, name) {
  if (!item) return false
  return text(item.id).indexOf(name) !== -1
    || text(item.title).indexOf(name) !== -1
    || text(item.tooltipTitle).indexOf(name) !== -1
}

function entryId(entry) {
  if (typeof entry === "string") return entry
  if (entry && typeof entry === "object") {
    var id = entry.id
    if (id !== undefined && id !== null && String(id) !== "") return String(id)
  }
  return ""
}

function layoutHasWidget(layout, id) {
  var sections = ["left", "center", "right"]
  for (var s = 0; s < sections.length; s++) {
    var entries = layout && layout[sections[s]]
    if (!Array.isArray(entries)) continue
    for (var i = 0; i < entries.length; i++) {
      if (entryId(entries[i]) === id) return true
    }
  }
  return false
}

// LocalSend's item shows no state, offers only Open and Quit, and its primary
// click is a no-op, so Share > Receive is the whole surface. Hiding it by hand
// doesn't stick either: LocalSend picks a fresh tray id every launch.
function ownedByOmarchy(item, layout) {
  return itemNamed(item, "localsend")
    || (layoutHasWidget(layout, "omarchy.dropbox") && itemNamed(item, "dropbox"))
}

// Bounds for untrusted StatusNotifierItem strings (marketplace review #2066).
// A hostile local tray client must not grow the bar's object graph or blow up
// layout with unbounded menu/title/tooltip/icon strings. Renderers pair these
// with `textFormat: Text.PlainText`; these helpers strip control chars and
// truncate at the receiving boundary, before any delegate is created.
function sanitizeSniText(value, maxLen) {
  var s = String(value === undefined || value === null ? "" : value)
  s = s.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
  s = s.trim()
  var max = typeof maxLen === "number" && maxLen > 0 ? maxLen : 120
  if (s.length > max) s = s.slice(0, max) + "\u2026"
  return s
}

// Icon strings feed Image.source; fail closed on oversize input (no truncate:
// a cut URL would just 404 anyway) and strip ASCII whitespace/controls.
// Display size stays fixed at the call site (12px tray, 16px menu rows).
function sanitizeIconUrl(value, maxLen) {
  var s = String(value === undefined || value === null ? "" : value)
  s = s.replace(/[\x00-\x20\x7F]/g, "")
  var max = typeof maxLen === "number" && maxLen > 0 ? maxLen : 256
  if (s.length > max) return ""
  return s
}

if (typeof module !== "undefined") {
  module.exports = {
    itemNamed: itemNamed,
    entryId: entryId,
    layoutHasWidget: layoutHasWidget,
    ownedByOmarchy: ownedByOmarchy,
    sanitizeSniText: sanitizeSniText,
    sanitizeIconUrl: sanitizeIconUrl
  }
}
