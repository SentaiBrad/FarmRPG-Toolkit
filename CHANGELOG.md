# Changelog

## 1.13.1 (2026-11-17)
- Data check: perks are only asked for if the Toolkit has never seen them. Levelling up (new perk points) or time
  passing no longer flags them; changes are made on the Perks and Farm Supply pages, which it reads as you use them.

## 1.13.0 (2026-11-17)
- Nothing is read on a timer any more; only on specific actions:
  - Crop counts: the game's own reply to a harvest lists the exact crops you got; when the Toolkit sees it (through
    jQuery's "request finished" event: no request, nothing wrapped), it adds them and reads nothing. Otherwise
    once right after Harvest All or a Vat use, once if never seen, and free when you open Inventory.
    Leaving the farm open costs nothing. The seed line says how old the counts are, with a link to Inventory.
  - Meals running: free when you open Home or Quick Meals; after eating, from the Quick Meals panel the game reloads.
    After an hour without a look, meals not known to be running say "Not checked" (the Food button shows "?"), with
    links to Home and Quick Meals.
  - Food list Eat buttons: taken from the game's Quick Meals panel when it's loaded.
  - Mailboxes: read only for townsfolk never seen, or when their exact level or progress changed (no weekly re-read).

## 1.12.0 (2026-11-17)
- Fewer server requests: perks and Townsfolk of the Day are no longer fetched in the background. They're read when
  you open the Perks, Farm Supply and Friendship Levels pages, including right after you unlock, remove or reset
  perks, buy a gold perk, or switch to a saved Perk Set.
- Data check in Fast Travel: a warning (and a badge on the bar) when the Toolkit hasn't seen one of those pages yet,
  or it has changed since, with links to each. It turns to "All clear" once everything is seen.
- Opening a townsfolk's mailbox no longer reads Friendship Levels in the background.
- Friendship Levels: mailboxes are re-read only when a townsfolk's exact level or progress changed (or once a week),
  instead of daily, and 2 seconds apart. The mailbox's multiplier card shows one factor per line.
- Meals running: Home is read in the background at most once an hour (and never if you open Home yourself). After
  you eat through Quick Meals or the Food list, the timers come from the Quick Meals panel the game refreshes.
- Crop Amounts: your inventory is read in the background at most every 30 minutes, or for free when you open it.
  After a harvest or a Vat use, the crops it gave are added as an estimate ("about") instead of re-reading.
- Debug: the Toolkit always keeps a small log of its own requests and errors, so the Debug report (off by default in
  Fast Travel) has history when you need it.

## 1.11.0 (2026-11-17)
- Crop Amounts: on the farm and the Grape Juice Vat, the seed menu shows how many of each crop you have (red at your
  inventory cap), an estimated harvest with your Double Prizes perks and cookie meals, and a warning when a planting
  would go over your cap.

## 1.10.0 (2026-11-17)
- Meal Reminders: owners of the Quick Meals perk can eat from the Food list. Each button is the game's own Quick Meals
  button, so the game still asks before eating.

## 1.9.0 (2026-11-17)
- Settings moved to a FarmRPG Toolkit page of their own (My Settings > FarmRPG Toolkit, or Fast Travel).
- Fast Travel: choose which places are in its list. New Debug place: a copyable report for troubleshooting.
- Renamed to FarmRPG Toolkit. If your script manager now shows two copies, remove the old "Farm RPG Toolkit".

## 1.8.0 (2026-11-17)
- Fast Travel bar at the bottom of the left menu.
- Options to switch each part of a feature on or off.
- Your perks are read from the Perks page and Farm Supply (gently: daily, plus a light check when your perk points or
  gold change), and Friendship XP uses them. You can still set them by hand.
- Friendship Levels reads mailboxes in the background to fade gifts already given.

## 1.7.0 (2026-11-16)
- Follows the game's light mode, easier-to-read colours and text sizes, Loves/Likes/Hates rows can be folded.

## 1.6.0 (2026-11-16)
- Foundation fixes: shared top-bar handling, event bonuses (e.g. +10% Friendship XP), more reliable townsfolk names.

## 1.5.0 (2026-11-16)
- Locksmith Rewards: gold and valuable items per container, with totals you can tap to filter.

## 1.4.0 and earlier (2026-11-16)
- Meal Reminders, Food Enhancement and Friendship Gifts combined into one toolkit with per-feature switches.
