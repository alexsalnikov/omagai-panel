-- Bar label for the Omagai microseason. The GJS script is the same one Waybar
-- ran, so the glyph and the right-click cycle stay shared with that panel.
local GJS = "/usr/bin/gjs"
local HOME = os.getenv("HOME") or ""
local SCRIPT = HOME .. "/.config/waybar/scripts/omagai.js"
local POPUP = HOME .. "/.config/waybar/scripts/omagai-popup.js"

local generation = 0

local function refresh()
  generation = generation + 1
  local ticket = generation
  local accepted = noctalia.runAsync({ GJS, "-m", SCRIPT }, function(result)
    if ticket ~= generation then
      return
    end
    if result.timedOut or result.exitCode ~= 0 then
      noctalia.log("omagai: exit " .. tostring(result.exitCode) .. " " .. tostring(result.stderr))
      return
    end
    local data, err = noctalia.json.decode(result.stdout)
    if type(data) ~= "table" or type(data.text) ~= "string" then
      noctalia.log("omagai json: " .. tostring(err))
      return
    end
    barWidget.setText(data.text)
  end, 10000)
  if not accepted then
    noctalia.log("omagai: could not start gjs")
  end
end

local family, fontErr = noctalia.loadFont("/usr/share/fonts/noto-cjk/NotoSansCJK-Regular.ttc")
if family ~= nil then
  barWidget.setFont(family)
else
  noctalia.log("omagai font: " .. tostring(fontErr))
end

barWidget.setText("…")
noctalia.setUpdateInterval(600000)
refresh()

function update()
  refresh()
end

function onClick()
  -- Detached: the popup stays open, and a second launch closes it.
  noctalia.runAsync({ GJS, "-m", POPUP })
end

function onRightClick()
  noctalia.runAsync({ GJS, "-m", SCRIPT, "cycle" }, function(result)
    if result.timedOut or result.exitCode ~= 0 then
      noctalia.log("omagai cycle: " .. tostring(result.stderr))
      return
    end
    refresh()
  end, 10000)
end
