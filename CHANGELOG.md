# Changelog

## 1.16.2 (2026-11-18)
- Pages no longer jump: when the Toolkit adds its lines, whatever is at the top of your screen stays where it is.
  After an action that redraws the page (Craft, and the like), the game's own "back to where you were" now lands
  exactly: before, the Toolkit's note at the top was missing when the game scrolled back, so the page ended up 29px
  too far down the list. Debug report shows when the Toolkit held a page still.
- Mastery in the Workshop sits on the craft's name line ("Glass Bottle (285) · Mastery 454K / 1M"; the tier is in the
  colour and the tooltip) instead of a line of its own, so the list is no longer than the game's.
- Mastery: at fishing and exploring spots, the note says items with no mastery (many exploring finds) show nothing,
  and there's no note where nothing has mastery.

## 1.16.1 (2026-11-18)
- Crop Amounts: counts are never guessed any more. When the game's harvest reply isn't seen, your inventory is read;
  if one was read under a minute ago, the read waits for the minute instead of adding an estimate (which could drift
  from your real count).
- Crop Amounts: the line under the seed menu is one short line that keeps its place: what the planting gives, room
  left (or how much would be wasted) and the crop's mastery. Your count stays in the menu itself; the cookie tip and
  the "counts from" line are gone.

## 1.16.0 (2026-11-18)
- Flea Market (new): bundles go to the top of their section, with what's inside and what that would cost bought one
  by one here. The hourly items say how else you can get them (Workshop, pets, fishing or exploring with the odds,
  containers, the Wishing Well...) and how hard that is, hardest first. Odds are per catch or explore (with your
  Eagle Eye and Iron Depot) and per AP or Large Net (with your Lemon Squeezer, Reinforced Netting and Fishing Trawl). Each row shows how many you have. It never
  buys anything.
- Temple Helper (new): each chain says how many to finish, how many you have, and (once you've opened it) its next
  reward and rewards ready to claim. Ready and finishable chains first, with a summary on top. A chain's page gets
  buttons that fill in the amount (next reward, finish, all you have); you still press GO.
- Mastery (new): your mastery count, next tier and tier reached in the Workshop, under "Things found here" at fishing
  and exploring spots, and for the crop in the seed picker. Read for free when you open the Mastery page or an item's
  page; it says how old the counts are. Data check lists the Mastery page until it's been seen once.
- Locksmith Rewards: a container's item page says what all of yours give.
- Meal Reminders: Mushroom Stew (+10% mastery) is listed on the farm, fishing and the Workshop as optional; it never
  turns the Food button orange.
- Your inventory copy now keeps item names too (for pages that only name an item, like the Temple).
- Item counts change with almost everything you do, so pages that show them (the farm and the Vat, the Flea Market,
  the Temple) read your inventory when they open, at most once a minute, instead of only the first time. An item's
  page updates that item's count for free ("N on hand").
- Settings: an option that works with another feature says so and greys out while that feature is off (Mastery's
  seed picker needs Crop Amounts). New Flea Market option for the per-AP and per-Large-Net odds.
- One look for the Toolkit's tag and notes everywhere; Mastery's tier colours follow the Toolkit's meanings
  (Mastered green, Grand and Mega gold); Debug report lists Temple chains seen.

## 1.15.0 (2026-11-17)
- Your inventory is now counted for every item, not just crops, and shared by every feature (same rules: free from
  your Inventory page and the game's harvest replies, otherwise one read after Harvest All or the Vat, or the first
  time). Crop Amounts uses it. Your counts are read once more after this update.
- Library Hints (new): the Temple's "Something Strange" card says what it is (the Cursed Effigy and the Secret
  Chains) and which of the 4 effigy pieces you have.
- Checked the Art Gallery themes the game lets you preview (Green, Purple, Blue, Corn): the Toolkit stays readable.

## 1.14.0 (2026-11-17)
- Works alongside FRPG HUD (or anything else that goes through the game's jQuery), with no extra requests:
  - An inventory refresh (e.g. HUD's Refresh button) updates Crop Amounts' counts.
  - A meal eaten outside Quick Meals (e.g. HUD's quick eat) updates Meal Reminders with one read of Home.
- Debug report says whether FRPG HUD is running.

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
