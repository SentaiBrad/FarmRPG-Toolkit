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

- **Friendship Gifts**: Friendship Levels shows each townsfolk's Super Loves, Loves, Likes and Hates, fades loves and
  likes you've already given, and hides a row once you've given everything in it; tap Loves, Likes or Hates to fold
  that row on every card. Townsfolk of the Day stands out, and wide screens show four townsfolk per row. A
  townsfolk's mailbox marks every item with the XP it gives (Townsfolk of the Day, Over The Moon, event bonuses and
  your perks included), previews the level it would take you to, sorts the best gifts first, and lists the loves and
  likes you haven't given and have none of. An item's page says which townsfolk love, like or hate it.
- **Item Uses**: an item's page says what it's for and where to get it: what a quest or Tower artifact does, the
  Help Requests that ask for it (yours first, completed ones crossed out), crafts, meals, the farm buildings it goes
  into, Wishing Well, Exchange Center, Locksmith and the townsfolk who love or like it; where it drops, who sells or
  trades it and what gives it, including each container it comes from and the open shop that sells it. An item with
  no use yet is called what the Library calls it, a Collectible, and one you haven't added to your Museum says so.
  Nothing the game's own page already shows is repeated. Each place links to its page in the game, and a last line
  links to the item's Library page and its buddy.farm page. Tap "Uses" or "Where to get it" to fold a section (it
  stays folded). On phones it's one line per use or source, with the details written out.
- **Food Enhancement**: what each meal really does and how long it lasts, in the Quick Meals panel, on meal item
  pages, and in My Kitchen for the meal you pick to cook.
- **Meal Reminders**: a "Food" button next to the page title where a meal helps (farm, fishing, exploring, pets,
  sawmill, market, kitchen, Workshop, mailboxes), with how many of the page's meals are running ("Food 2/6"). Tap it
  for each meal's effect and time left (or uses left, for Lemon Seltzer). Owners of the Quick Meals perk can eat from
  the list; the game still asks before eating.
- **Locksmith Rewards**: what each of your containers gives, with totals of the gold and valuable items you can tap
  to filter the list, and on a container's item page what all of yours give. In every other shop, a container on sale
  says what's inside and what that's worth at Flea Market prices. After opening many Void Bags, the game's popup of
  pictures lists each item once with its name and amount.
- **Flea Market**: bundles first, with what's inside and what that would cost bought one by one; the hourly items say
  where else they come from, hardest to get elsewhere first, with drop odds per AP or Large Net for your perks; how
  many of each you have, and after changing the amount, how many you'd have after buying it (with a warning before
  your cap). Borgen's Camp and Borgen Mercantile show the same counts.
- **Pet Items**: with the Inventory Monitor perk, the All Pet Items page gets a "Sort: Over max first" toggle: the
  items that would go over your cap first.
- **Temple Helper**: each chain's progress, how many you have, the next reward and rewards ready to claim, ready and
  finishable chains first. On a chain's page, buttons that fill in the amount (Next reward, Finish chain, Max); you
  still press GO.
- **Mastery**: your mastery count against the next target ("3.1K / 10K"), coloured by the game's tier group, in the
  Workshop, under "Things found here", on the farm and on recipes.
- **Crop Amounts**: on the farm and the Grape Juice Vat, the seed list shows how many of each crop you have and each
  crop's grow time with your perks, and a line under the menu gives about how many a planting gives, how long it
  takes, your count against your cap and the crop's mastery. At the Feed Mill, how much Feed one of each crop makes.
- **Mining**: the Mines list shows each mine's next floor rewards and its Charms Active; a mine says where its next
  rewards are.
- **Unlock Goals**: account unlocks (the Swamp Puzzle, the Cursed Effigy, House of Cards, Gary's Crushroom) say where
  each part comes from and your next step, on their item pages, in shops and in Town.
- **Library Hints**: cards that only hint at a secret also say what it is and how far along you are (the Temple's
  "Something Strange", the Farmhouse's locked PIES, the Post Office's Secret Passwords).
- **Toolkit Menu**: the Toolkit bar (the compass) at the bottom of the left menu: the Data check (pages to open so
  the Toolkit's numbers are current), shortcuts to game pages you choose (a shop that's closed right now is greyed),
  Settings, and a Debug report to copy when something looks wrong. Its row height can be set, for wide screens and
  phones apart.

On phones, tap the Toolkit's dotted text to see its tooltip, or hold a link or button that has one. Nothing the
Toolkit adds runs off the screen, and the game's own "go to this item" links land on the right item.

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
