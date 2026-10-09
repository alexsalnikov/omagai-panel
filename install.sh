#!/usr/bin/env bash
set -e

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "=== Omagai Microseasons Panel Installer ==="
echo "Source: $REPO_DIR"

# 1. Install core scripts and popup to ~/.config/waybar/scripts/
echo "==> Installing Waybar/Noctalia scripts & popup..."
mkdir -p ~/.config/waybar/scripts
cp "$REPO_DIR/core/seasons.js" ~/.config/waybar/scripts/
cp "$REPO_DIR/core/glyphs.js" ~/.config/waybar/scripts/
cp "$REPO_DIR/integrations/waybar/omagai.js" ~/.config/waybar/scripts/
cp "$REPO_DIR/gtk-popup/omagai-popup.js" ~/.config/waybar/scripts/
chmod +x ~/.config/waybar/scripts/omagai.js ~/.config/waybar/scripts/omagai-popup.js

# 2. Install Noctalia plugin
echo "==> Installing Noctalia plugin..."
mkdir -p ~/.local/share/noctalia/plugins/omagai
cp "$REPO_DIR/integrations/noctalia/plugin.toml" ~/.local/share/noctalia/plugins/omagai/
cp "$REPO_DIR/integrations/noctalia/omagai.luau" ~/.local/share/noctalia/plugins/omagai/

# 3. Install GNOME Shell extension
echo "==> Installing GNOME Shell extension (omagai@local)..."
GNOME_EXT_DIR="$HOME/.local/share/gnome-shell/extensions/omagai@local"
mkdir -p "$GNOME_EXT_DIR/schemas"
cp "$REPO_DIR/core/seasons.js" "$GNOME_EXT_DIR/"
cp "$REPO_DIR/core/glyphs.js" "$GNOME_EXT_DIR/"
cp "$REPO_DIR/integrations/gnome-shell/extension.js" "$GNOME_EXT_DIR/"
cp "$REPO_DIR/integrations/gnome-shell/metadata.json" "$GNOME_EXT_DIR/"
cp "$REPO_DIR/integrations/gnome-shell/stylesheet.css" "$GNOME_EXT_DIR/"
cp "$REPO_DIR/integrations/gnome-shell/schemas/"* "$GNOME_EXT_DIR/schemas/"

# Compile gsettings schemas
if command -v glib-compile-schemas &>/dev/null; then
    echo "==> Compiling GSettings schemas..."
    glib-compile-schemas "$GNOME_EXT_DIR/schemas"
fi

echo ""
echo "Installation complete!"
echo "- Scripts installed to: ~/.config/waybar/scripts/"
echo "- Noctalia plugin installed to: ~/.local/share/noctalia/plugins/omagai/"
echo "- GNOME extension installed to: ~/.local/share/gnome-shell/extensions/omagai@local/"
echo ""
echo "Next steps:"
echo "1. If using Noctalia, add to ~/.config/noctalia/bar.toml:"
echo '   [widget.omagai]'
echo '   type = "local/omagai:omagai"'
echo "2. If using Waybar, see integrations/waybar/config.jsonc.snippet"
echo "3. If using Niri, add window rule from integrations/niri/window-rules.kdl to ~/.config/niri/config.kdl"
echo "4. If using GNOME Shell, enable with: gnome-extensions enable omagai@local"
