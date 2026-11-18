# FarmRPG Toolkit

A userscript for [Farm RPG](https://farmrpg.com/) that adds helpful information and shortcuts to the game's own
pages. It never plays the game for you: every button is at most one game action, done through the game's own controls.

Works in **Tampermonkey** and **Violentmonkey** (desktop and mobile browsers that support them).

## Install

1. Install [Tampermonkey](https://www.tampermonkey.net/) or [Violentmonkey](https://violentmonkey.github.io/).
2. Open [`farmrpg-toolkit.user.js`](farmrpg-toolkit.user.js) (the "Raw" view) and your script manager offers to install it.
3. Reload Farm RPG.

Settings: **My Settings > FarmRPG Toolkit**, or the **Fast Travel** bar at the bottom of the left menu.
Every feature, and each part of it, can be switched on or off there.

## Features

- **Friendship Gifts**: Friendship Levels shows each townsfolk's loves, likes and hates, and fades gifts you've
  already given. A townsfolk's mailbox marks every item with the XP it gives (Townsfolk of the Day, Over The Moon,
  event bonuses and your perks included), previews the level it would take you to, and sorts the best gifts first.
- **Food Enhancement**: shows what each meal really does and how long it lasts, in the Quick Meals panel and on meal
  item pages.
- **Meal Reminders**: a "Food" button next to the page title on pages where a meal helps (farm, fishing, exploring,
  pets, sawmill, market, kitchen, mailboxes): green when your meals are running, orange when one isn't. Owners of the
  Quick Meals perk can eat from its list (the game still asks before eating).
- **Locksmith Rewards**: what each of your containers gives (gold, juices, pies, Borgen Bucks, Time Eggs and more),
  with totals you can tap to filter the list.
- **Crop Amounts**: on the farm and the Grape Juice Vat, the seed menu shows how many of each crop you have (red at
  your inventory cap), an estimated harvest with your perks and meals, and a warning before a planting would mostly
  go over your cap.
- **Fast Travel**: a bar at the bottom of the left menu with shortcuts you choose, including a **Debug** report you
  can copy when something looks wrong.

## How it treats the game

- **No automation.** Nothing runs on its own or chains actions together.
- **Gold perks stay worth buying.** Features help players without a perk but never replace it, and add to it for
  players who own it.
- **Gentle on the server.** Things that rarely change (your perks, today's Townsfolk of the Day) are read only from
  pages you open yourself; Fast Travel's Data check tells you which page to open when something hasn't been seen.
  When a feature does read a page in the background (inventory, mailboxes), it only reads what's missing or out of
  date, one request at a time and spaced out, and stops when you leave the page.
- **Plays well with others.** No page globals, no wrapping of the game's network calls; every id, class and saved
  setting starts with `frx`. Follows the game's dark and light mode.

## Building from source

The installable script is built from `src/`:

```
python -I tools/build-userscript.py
```

`src/data.js` (item names, townsfolk gifts, Locksmith contents, seeds) is generated from downloaded game data with
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
