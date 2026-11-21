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
  likes you've already given, and hides a row once you've given everything in it; Townsfolk of the Day stands out,
  and on wide screens it shows four townsfolk per row. A townsfolk's mailbox marks every item with the XP it gives
  (Townsfolk of the Day, Over The Moon, event bonuses and your perks included), previews the level it would take you
  to, sorts the best gifts first, and lists the loves and likes you haven't given and have none of. An item's page
  says which townsfolk love, like or hate it.
- **Food Enhancement**: shows what each meal really does and how long it lasts, in the Quick Meals panel, on meal
  item pages, and in My Kitchen for the meal you pick to cook.
- **Item Uses**: an item's page says what it's for and where to get it: what a quest item does once you have it, the
  Help Requests that ask for it (the ones you have open first, completed ones crossed out), crafts, meals, Wishing
  Well, Exchange Center, Locksmith and the townsfolk who love or like it, and where it drops, who sells or trades it
  and what gives it (or that none are listed). Each place links to its page in the game, details are in tooltips,
  and items with their own Library page link to it. Read from buddy.farm the first time you open the item, and kept
  a week.
- **Meal Reminders**: a "Food" button next to the page title on pages where a meal helps (farm, fishing, exploring,
  pets, sawmill, market, kitchen, Workshop, mailboxes): green when your meals are running, orange when one isn't.
  Mushroom Stew is listed as optional where mastery counts. Owners of the Quick Meals perk can eat from its list (the
  game still asks before eating).
- **Locksmith Rewards**: what each of your containers gives, with totals of the gold and valuable items (juices,
  pies, Protein Bars, Buddy Dolls, Borgen Bucks, Heart Containers, Time Eggs and more) you can tap to filter the list,
  and on a container's item page what all of yours give.
- **Flea Market**: bundles first, with what's inside and what that would cost bought one by one; the hourly items
  say where else they come from ("Also from: ..."), hardest to get elsewhere first (an arrow marks a row moved from
  the game's order), with drop odds per AP or Large
  Net for your perks; how many of each you have, and once you change the amount, how many you'd have after
  buying it (with a warning when some would go over your cap). Borgen's Camp and Borgen Mercantile show the same
  counts.
- **Temple Helper**: each chain's progress, how many you have, the next reward and rewards ready to claim, with
  ready and finishable chains first; the Secret Chains also say how many certificates are done and how many crops to
  go. On a chain's page, buttons fill in the amount; you still press GO.
- **Mastery**: your mastery count against the next target ("3.1K / 10K"), coloured by the game's tier group, in the
  Workshop, under "Things found here", on the farm and on an item page's Crafting Recipe, from the Mastery page and
  item pages you open.
- **Crop Amounts**: on the farm and the Grape Juice Vat, the seed list shows how many of each crop you have (red at
  your inventory cap) and each crop's grow time with your perks, and a line under the menu gives about how many the
  planting gives with your perks and meals, how long it takes to grow, your count against your cap, a warning when
  some would go over it, and the crop's mastery. At the Vat, the crop with the longest grow time that fits under your
  cap.
- **Mining**: the Mines list shows each mine's next floor rewards (and how many floors are left) and its Charms
  Active; a mine and its location page say where the next rewards are on the "Mining Floor Rewards" link.
- **Unlock Goals**: account unlocks (the Swamp Puzzle's 15 pieces, the Cursed Effigy, House of Cards, Gary's
  Crushroom) say where each part comes from, with links, and your next step with your progress (the quest you're on
  in a questline, whether a shop has it this week, what has to be unlocked first), on their item pages, in shops and
  in Town.
- **Library Hints**: cards that only hint at a secret also say what it is and how far along you are: the Temple's
  "Something Strange", the Farmhouse's locked PIES, and the Post Office's Secret Passwords (the answers you haven't
  entered, from buddy.farm; each hint can be turned off).
- **Toolkit Menu**: the Toolkit bar (the compass) at the bottom of the left menu: the Data check, shortcuts to game
  pages you choose, Settings, and a **Debug** report you can copy when something looks wrong.

## How it treats the game

- **No automation.** Nothing runs on its own or chains actions together.
- **Gold perks stay worth buying.** Features help players without a perk but never replace it, and add to it for
  players who own it.
- **Gentle on the server.** Nothing is read on a timer. The Toolkit reads what's on pages you open yourself (Home,
  Inventory, Mastery, Help Requests, item pages, Perks, Farm Supply, Friendship Levels, the Quick Meals panel,
  Borgen's Camp, the Password Log and the shops), and the Toolkit menu's Data check tells you which page to open when something
  hasn't been seen. A background read happens only right after an action that
  changed the numbers (e.g. one inventory read after Harvest All), when a page that shows your item counts opens (the
  farm, the Flea Market, the Temple, the Mines list, also when you go Back to one: counts change with almost everything you do, so
  they're read whenever a page needs them, never shown old or guessed), or the first time something is needed, one request at a time. Item pages read buddy.farm, not the game's server.
- **Plays well with others.** Needs no other script (FRPG HUD and the like). No page globals, no wrapping of the game's network calls; every id, class and saved
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
