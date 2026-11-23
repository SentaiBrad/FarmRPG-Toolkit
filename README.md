# FarmRPG Toolkit

A userscript for [Farm RPG](https://farmrpg.com/) that adds helpful information and shortcuts to the game's own
pages. It never plays the game for you: every button is at most one game action, done through the game's own controls.

Works in **Tampermonkey** and **Violentmonkey**, on desktop and on mobile browsers that support them (for example
Firefox for Android).

## Install

**[➜ Install FarmRPG Toolkit](https://raw.githubusercontent.com/SentaiBrad/FarmRPG-Toolkit/main/farmrpg-toolkit.user.js)**

1. Install [Tampermonkey](https://www.tampermonkey.net/) or [Violentmonkey](https://violentmonkey.github.io/) in your
   browser.
2. Tap or click **Install FarmRPG Toolkit** above. Your script manager opens the script and offers to install it.
   (This link works on phones too, where GitHub hides its "Raw" button.)
3. Reload Farm RPG.

Updates arrive on their own through your script manager. Settings: **My Settings > FarmRPG Toolkit**, or the
**Toolkit** bar (the compass) at the bottom of the left menu. Every feature, and each part of it, can be switched on
or off there.

## Features

Every feature in detail (where it shows, what you see, its settings, where its data comes from):
**[FEATURES.md](FEATURES.md)**.

- **Friendship Gifts**: loves, likes and hates on Friendship Levels; the XP each gift gives in mailboxes.
- **Item Uses**: what an item is for and where to get it, on its page.
- **Food Enhancement**: what each meal really does and how long it lasts.
- **Meal Reminders**: a "Food" button on pages where a meal helps, with what's running.
- **Locksmith Rewards**: what your containers give, and what containers in shops hold.
- **Flea Market**: bundles first, where else the hourly items come from, and your counts.
- **Pet Items**: the items that would go over your cap first.
- **Temple Helper**: each chain's progress, and buttons that fill in the amount.
- **Mastery**: your mastery against the next target, where you craft, grow and explore.
- **Crop Amounts**: what a planting gives, grow times and your counts, on the farm.
- **Mining**: each mine's next reward floor and its charms.
- **Unlock Goals**: where each part of an account unlock comes from, and your next step.
- **Library Hints**: what a hinted secret is, and how far along you are.
- **Toolkit Menu**: the Data check, shortcuts, Settings and Debug, at the bottom of the left menu.

On phones, tap the Toolkit's dotted text (or hold a link) to see its tooltip.

## How it treats the game

- **No automation.** Nothing runs on its own or chains actions together.
- **Gold perks stay worth buying.** Features help players without a perk but never replace it, and add to it for
  players who own it.
- **Gentle on the server.** Nothing is read on a timer. The Toolkit reads what's on pages you open yourself, and the
  Data check tells you which page to open when something hasn't been seen. A background read happens only right
  after an action that changed your counts (one inventory read after Harvest All), when a page that shows your counts
  opens, or the first time something is needed (your Museum, once), one request at a time. Item pages read buddy.farm,
  not the game's server.
- **Plays well with others.** Needs no other script (FRPG HUD and the like). No page globals, no wrapping of the
  game's network calls; every id, class and saved setting starts with `frx`. Follows the game's dark and light mode.

## Credits

- Game data: [Buddy's Almanac (buddy.farm)](https://buddy.farm/) by coderanger, and the Farm RPG Library (in-game wiki).
- Ideas from other Farm RPG userscripts, including "FarmRPG - Show Friendship XP" (Greasy Fork 521864) and
  "Locksmith Gold Indicator".
- Farm RPG is owned and operated by Magic & Wires LLC. This is a fan-made script, not affiliated with or endorsed by
  Magic & Wires.

## License

[MIT](LICENSE)
