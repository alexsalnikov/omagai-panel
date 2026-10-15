# Omagai Panel 🌸

The **72 microseasons** of the traditional Japanese calendar (*Kō* / 候 and *Sekki* / 節気), quietly kept in your desktop status bar.

Inspired by and ported from tiho's Omarchy plugin, with support for **Noctalia**, **Waybar**, **GNOME Shell**, **Ryoku**, and **Niri** (Wayland).

---

## ✨ Features

- **Microseason Indicator in Status Bar**:
  - Displays the current seasonal glyph (🌸, 🌾, ❄️, etc.), kanji, or short name.
  - **Left-click**: Toggles the interactive TokyoNight floating card popup.
  - **Right-click**: Cycles through label display styles (`char` ➔ `kanji` ➔ `short` ➔ `name`).
- **Seasonal Card Popup**:
  - Displays the current microseason kanji, emoji, English name, and poetic description.
  - Shows current solar term (*Sekki*), date range, and days remaining until the next microseason.
  - Styled with TokyoNight colors and CJK font support.
- **Universal Desktop Integration**:
  - **Noctalia**: Native Luau plugin widget (`local/omagai:omagai`).
  - **Waybar**: Lightweight GJS module.
  - **GNOME Shell**: Native top-bar extension (`omagai@local`).
  - **Ryoku**: Native Quickshell bar plugin with a themed QML season card.
  - **Niri**: Floating window rules for popup placement.

---

## 📂 Repository Structure

```
omagai-panel/
├── core/
│   ├── seasons.js            # 72 microseasons astronomical calendar calculation
│   └── glyphs.js             # 72 microseason glyphs & symbols
├── gtk-popup/
│   └── omagai-popup.js       # GTK4 / GJS floating seasonal popup window
├── integrations/
│   ├── noctalia/             # Noctalia Luau widget plugin (plugin.toml + omagai.luau)
│   ├── waybar/               # Waybar script (omagai.js) and config snippet
│   ├── gnome-shell/          # GNOME Shell extension (extension.js, metadata, CSS, schemas)
│   ├── ryoku/                # Ryoku (Quickshell) bar plugin: manifest, QML service/widget/panel
│   └── niri/                 # Niri window-rules snippet for top-right floating
├── install.sh                # One-step installation script
├── .gitignore
├── LICENSE                   # MIT License
└── README.md
```

---

## 🛠️ Prerequisites

- `gjs` (GNOME JavaScript runtime)
- `gtk4`
- Fonts for CJK glyphs: `noto-fonts-cjk` (e.g. `sudo pacman -S noto-fonts-cjk`)

---

## 🚀 Quick Install

```bash
git clone https://github.com/<your-username>/omagai-panel.git
cd omagai-panel
chmod +x install.sh
./install.sh
```

---

## ⚙️ Configuration

### 1. Noctalia
Add the widget to `~/.config/noctalia/bar.toml`:

```toml
[widget.omagai]
type = "local/omagai:omagai"

[bar.default]
end = [
    # ... other widgets
    "omagai",
]
```

### 2. Waybar
Add to `~/.config/waybar/config.jsonc`:

```jsonc
"custom/omagai": {
    "exec": "gjs -m ~/.config/waybar/scripts/omagai.js",
    "on-click": "gjs -m ~/.config/waybar/scripts/omagai-popup.js",
    "on-click-right": "gjs -m ~/.config/waybar/scripts/omagai.js cycle",
    "return-type": "json",
    "interval": 600,
    "tooltip": false
}
```

### 3. Niri Window Rules
Add to `~/.config/niri/config.kdl`:

```kdl
window-rule {
    match app-id="^dev\\.local\\.OmagaiPopup$"
    open-floating true
    open-focused true
    default-floating-position x=12 y=8 relative-to="top-right"
    focus-ring { off; }
    border { off; }
    geometry-corner-radius 6
    clip-to-geometry true
}
```

### 4. GNOME Shell
```bash
gnome-extensions enable omagai@local
```

### 5. Ryoku
The Ryoku plugin is self-contained (pure QML, no GJS needed) and installs with
Ryoku's own plugin manager (`install.sh` is not needed):
```bash
ryoku plugin add integrations/ryoku --bar --yes
```
It appears on the QS Bar; the label style is under QS Bar Settings >
Community > Omagai. See [integrations/ryoku/README.md](integrations/ryoku/README.md).

---

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.
