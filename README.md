# FarmRPG Toolkit

A userscript for [Farm RPG](https://farmrpg.com/) that adds helpful information and shortcuts to the game's own
pages. It never plays the game for you: every button is at most one game action, done through the game's own controls.

Works in **Tampermonkey** and **Violentmonkey** (desktop and mobile browsers that support them).

## Install

1. Install [Tampermonkey](https://www.tampermonkey.net/) or [Violentmonkey](https://violentmonkey.github.io/).
2. Open [`farmrpg-toolkit.user.js`](farmrpg-toolkit.user.js) (the "Raw" view) and your script manager offers to install it.
3. Reload Farm RPG.

Settings: **My Settings > FarmRPG Toolkit**, or the **Toolkit** bar (the compass) at the bottom of the left menu.
Every feature, and each part of it, can be switched on or off there.

## Features

- **Friendship Gifts**: Friendship Levels shows each townsfolk's super gifts, loves, likes and hates, fades loves and
  likes you've already given, and hides a row once you've given everything in it. A townsfolk's mailbox marks every item with the XP it gives (Townsfolk of the Day, Over The Moon,
  event bonuses and your perks included), previews the level it would take you to, and sorts the best gifts first.
- **Food Enhancement**: shows what each meal really does and how long it lasts, in the Quick Meals panel and on meal
  item pages.
- **Meal Reminders**: a "Food" button next to the page title on pages where a meal helps (farm, fishing, exploring,
  pets, sawmill, market, kitchen, Workshop, mailboxes): green when your meals are running, orange when one isn't.
  Mushroom Stew is listed as optional where mastery counts. Owners of the Quick Meals perk can eat from its list (the
  game still asks before eating).
- **Locksmith Rewards**: what each of your containers gives (gold, juices, pies, Borgen Bucks, Time Eggs and more),
  with totals you can tap to filter the list, and on a container's item page what all of yours give.
- **Flea Market**: bundles first, with what's inside and what that would cost bought one by one; the hourly items
  say how else you can get them and how hard that is, hardest first, with drop odds per catch or explore and per AP
  or Large Net for your perks; how many of each you have.
- **Temple Helper**: each chain's progress, how many you have, the next reward and rewards ready to claim, with
  ready and finishable chains first. On a chain's page, buttons fill in the amount; you still press GO.
- **Mastery**: your mastery count against the next target ("3.1K / 10K"), coloured by the game's tier group, in the
  Workshop, under "Things found here" and on the farm, from the Mastery page and item pages you open.
- **Crop Amounts**: on the farm and the Grape Juice Vat, the seed list shows how many of each crop you have (red at
  your inventory cap), and a line under the menu gives about how many the planting gives with your perks and meals,
  your count against your cap, a warning when some would go over it, and the crop's mastery.
- **Unlock Goals**: account unlocks (the Swamp Puzzle's 15 pieces, the Cursed Effigy, House of Cards, Gary's
  Crushroom) say where each part comes from, with links, and your next step with your progress (the quest you're on
  in a questline, whether a shop has it this week, what has to be unlocked first), on their item pages, in shops and
  in Town.
- **Library Hints**: cards that only hint at a secret (like the Temple's "Something Strange") also say what it is and
  how far along you are.
- **Toolkit Menu**: the Toolkit bar (the compass) at the bottom of the left menu: the Data check, shortcuts to game
  pages you choose, Settings, and a **Debug** report you can copy when something looks wrong.

## How it treats the game

- **No automation.** Nothing runs on its own or chains actions together.
- **Gold perks stay worth buying.** Features help players without a perk but never replace it, and add to it for
  players who own it.
- **Gentle on the server.** Nothing is read on a timer. The Toolkit reads what's on pages you open yourself (Home,
  Inventory, Mastery, Help Requests, item pages, Perks, Farm Supply, Friendship Levels, the Quick Meals panel,
  Borgen's Camp and the shops), and the Toolkit menu's Data check tells you which page to open when something
  hasn't been seen. A background read happens only right after an action that
  changed the numbers (e.g. one inventory read after Harvest All), when a page that shows your item counts opens (the
  farm, the Flea Market, the Temple: counts change with almost everything you do, so they're read whenever a page
  needs them, never shown old or guessed), or the first time something is needed, one request at a time.
- **Plays well with others.** No page globals, no wrapping of the game's network calls; every id, class and saved
  setting starts with `frx`. Follows the game's dark and light mode.

## Building from source

The installable script is built from `src/`:

```
python -I tools/build-userscript.py
```

`src/data.js` (item names, townsfolk gifts, Locksmith contents, seeds, Flea Market sources, quest chains toward
unlock goals) is generated from downloaded game data with
`tools/build-data.py`; see [docs/REFERENCES.md](docs/REFERENCES.md) for how to download it. Bump `@version` in
`src/header.js` for a release. How additions should look: [STYLE-GUIDE.md](STYLE-GUIDE.md).

## Credits

- Game data: [Buddy's Almanac (buddy.farm)](https://buddy.farm/) by coderanger, and the Farm RPG Library (in-game wiki).
- Ideas from other Farm RPG userscripts, including "FarmRPG - Show Friendship XP" (Greasy Fork 521864) and
  "Locksmith Gold Indicator".
- Farm RPG is owned and operated by Magic & Wires LLC. This is a fan-made script, not affiliated with or endorsed by
  Magic & Wires.

## License

[MIT](LICENSE)
