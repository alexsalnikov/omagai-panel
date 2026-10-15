# Omagai

The **72 microseasons** (七十二候, *kō*) of the traditional Japanese calendar on
the Ryoku bar. The bar shows the current season (by default the single kanji
that carries its picture); a click opens a card with the full kanji, its
English name and rōmaji, the gloss, the dates it covers, how long until it
changes, and its solar term (*sekki*).

The Ryoku port of [omagai-panel](https://github.com/alexsalnikov/omagai-panel),
which carries the same engine for Waybar, Noctalia and GNOME Shell. The season
engine is ported from [zamak/omagai](https://github.com/zamak/omagai) (MIT,
tiho).

## Settings

QS Bar Settings > Community > Omagai > **Bar label**: one kanji, the full
kanji, the short English name, or the full English name.

## What it runs, reads and writes

- **Runs:** nothing. The season comes from an astronomical calculation of the
  sun's longitude in `service/Seasons.js` (QML JavaScript); no programs, no
  scripts.
- **Reads:** the system clock.
- **Writes:** nothing. The label setting is stored by the host through
  `pluginApi.saveSetting`.
- **Network:** none.
- **Privileged:** none.

Fonts: the card uses Noto Sans CJK JP and Noto Color Emoji
(`noto-fonts-cjk`, `noto-fonts-emoji`).
