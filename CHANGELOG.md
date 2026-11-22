# Changelog

## 1.37.0 (2026-11-22)
- Crop Amounts, Feed Mill: the crop list shows how much Feed one of each crop makes ("Broccoli (1548) · 24 Feed
  each"), from the game's own numbers and formula (js/feedmill.js: Feed = amount × data-ym / 120). They match the
  Library's Crop Chart and cover the Frozen crops it doesn't list. The closed 100px menu looks the same as before.
  Its own option, on by default.
- Locksmith Rewards, opening many Void Bags: the game's "Success!" popup that shows only pictures (one per drop,
  the name only in each picture's tooltip; seen opening 25) now lists each item once, name and amount ("Grapes x1
  (1 voided)"), in columns on a wider screen, every item on one line and the popup as wide as its columns need
  (never wider than the screen), and one scrolling column on a phone, in the game's own popup width. Columns: "1"
  or "Up to 2" to "Up to 5" (Up to 2 to start); the popup uses as many as fit the window right then at our normal
  14px text (about 250px each), since a window can be square or 16:9, and changes live as the window does. Checked
  with Up to 5 and one popup left open while the window changed: 5 columns at 1920×1080, 3 at 900×900, 1 at
  384×832, 5 again at 1920×1080, centred each time. Text never gets smaller.
- Core: two separate layout helpers that follow the window live, for any feature to call as needed: fitColumns
  (columns that fit, never smaller text, one on a phone) and fitPopup (a game popup the Toolkit filled: fits the
  window, centred, scrolls inside with a scrollbar and bottom fade). The list scrolls inside the popup and is kept short
  enough that the whole popup (and its OK) fits on screen; the popup is centred again after the list changes. When it
  scrolls, a thin scrollbar stays visible on the right (phones hide theirs) and the bottom rows fade while there's
  more below.
  Checked with the previous and new build on a 99-drop, 80-item test reply (the most the game opens at once; its own
  Open only takes under 100) on desktop, at 375×667, a Galaxy S25 Ultra's 412×891 and an S25 FE's 384×832, scrolled
  to the last item; 3 columns on desktop; repeated items add up (Drum x3, Grapes x4 (2 voided)).
- Locksmith Rewards: on a phone (and on desktop for long lists) each container's "Gives ..." line ran off the right
  edge and under the Open button, because the game's item title doesn't wrap and the line took that over. The line
  now wraps, so every chip shows. Checked before and after at 412×891, 384×832 and desktop. Read from the game's own reply (jQuery, no request). Only Void Bags, which the Library says give one item
  each, so the amounts are exact; the short list the game shows for a few bags is left as it is. Checked on
  desktop and at 375px with the captured 25-bag reply.

## 1.36.1 (2026-11-22)
- Temple Helper, a chain's page: the amount buttons were the game's `button` links from before the style guide
  (they sat above the line, looked like links, and only filled in the box far away). Now they take the place of the
  game's "My Inventory / Enter how many to sacrifice" on its own line, next to the amount box and GO:
  "Toolkit Have 4,078 · [Next reward (412)] [Finish chain (1,649)] [Max (4,078)] then press GO", using core's new
  action chip (frx-act: a chip you tap to do something on the page, never styled as a link). "Have" keeps your count
  in sight once a chip changes the amount; Max is everything you have, as the game fills in. The line under it
  ("Sacrificing 412 reaches ...") is gone; the chips already say it. One line on a wide screen; on a phone the chips
  get their own full-width line under "Have" and the amount box. Checked live on desktop and at 375px, and with a
  real sacrifice: Next reward (412), GO, Yes took Have from 4,078 to 3,666 and the chips to the new amounts as soon
  as the game reloaded the page (seen live by Brad), and the Temple list read 3,666 too.
- Core reads the chain page's own count of the item it takes (the game's item menu, which GO is checked against) into
  your inventory each time the page opens; the game reloads the page after GO, so the count after a sacrifice is
  read with no extra request.
- Tooltips showed behind the Food list (both were drawn at the same height, the list on top), so "Can't tell" never
  popped up. Core's tooltip is now above the Toolkit's other floating boxes. The Food list also no longer redraws
  itself every second while a meal is running (only its countdowns change), so a tooltip or a tap isn't lost.
- Food button: a game notification sliding over the top bar ("CRAFTWORKS INVENTORY FULL") was taken for a button,
  so the Food button jumped left. It now ignores the game's notifications. Checked live with the old and new build
  (58px to 121px before, stays at 58px now).

## 1.36.0 (2026-11-21)
- New feature, Pet Items (for owners of the Inventory Monitor gold perk, which is what shows an item would go over
  your cap; the page's own "Since you have the Inventory Monitor perk" or your Farm Supply page tells): on the All Pet
  Items page (Home's "View" on the pet line), a "Sort: Over max first" toggle on the game's "Show:" line (it moves
  under it only when there's no room). A modifier, so it works with either of the game's filters: on, it keeps every
  item shown and moves the ones that would go over your cap to the top; off, the game's order (your count plus what was found, against your cap; the game's red marking until your
  counts are read). Counts are read when the page opens and when you come Back, so an item you stored, sold or
  crafted below the cap goes back to its place. Checked live: the 23 rows the game marks red all went to the top.
- One look for every Toolkit toggle (core's frx-toggle): on is the Toolkit's violet border and icon, the words stay
  in the text colour. Pet Items' toggle (on in the cap's red, since it's about going over the cap) and the
  Locksmith's tap-to-filter totals use it (the totals were green, which
  means "good" in the style guide, and tinted the words).

Core (nothing you see changes: the same 11 pages compared live, every line and tooltip, before and after). What
features worked out or read on their own is now in core, so every feature shares one copy:
- Drop odds (perks that change them, per AP and per Large Net), from the Flea Market.
- Friendship: finding a townsfolk, gift tiers and XP, Townsfolk of the Day, friendship perks and your override,
  levels and the level preview, gifts already given, from Friendship Gifts.
- Farming: crops per planting, grow times with perks and meals, "21h 36m", from Crop Amounts.
- Inventory counts the game shows: the farm's "N in inventory" message, Borgen's Camp and Borgen Mercantile rows (now
  any shop that shows them), an item page's "N on hand" (Locksmith Rewards read its own).
- The Quick Meals list: one reader, the same panel core reads meal timers from; its "on hand" counts are kept too.
- Mine floors and Temple chain steps: read and saved by core whenever their pages are open, even with Mining or
  Temple Helper off.
- No item ids typed into features: meals.js names the meals features use (MEAL: Breakfast Boost, Over The Moon,
  the AP and Large Net meals, Mushroom Stew, the sawmill meal).

## 1.35.5 (2026-11-21)
- Worth tooltips list every known price for each thing, not only the Gold one: "5 Lemon Seltzer: 100 Gold (20
  each); 2 Borgen Bucks each at Borgen Mercantile". Before, a thing with a Gold price never showed its other prices.
- An Ancient Coins price also says what it is in Gold (the Flea Market sells Ancient Coins). One name per currency
  ("Borgen Bucks", "Ancient Coins") whatever the shop's button says.
- Borgen Bucks and Ancient Coin prices exist only on Borgen Mercantile and Borgen's Camp (Wednesdays): no source
  lists them, so they show once you've opened that shop.

## 1.35.4 (2026-11-21)
- Item Uses: the House of Cards tooltip says "Trade:" again (1.35.3 changed it to "Trades:" without being asked).
  Every other 1.35.3 change re-checked live: shop rows' ids match their item links in every shop, "Inv Full" rows
  get their shop's currency (Country Store prices match buddy.farm), the Locksmith filter, the farm line's tooltips
  and its fit at phone width.

## 1.35.3 (2026-11-21)
- Text with a tooltip has its own colour, a periwinkle blue next to the indigo links (`--frx-tip`).
- Every tooltip that lists things is a bullet list: Item Uses' "and N more", completed Help Requests, Gift townsfolk,
  House of Cards trades and skill rewards; Crop Amounts' perks and meals. Text with a tooltip uses tipHtml everywhere
  (Crop Amounts, Friendship's "Already given", Meal Reminders' "Can't tell" and "Optional").
- Containers' worth tooltips show Silver only when the amount would cost 250M Silver or more; Borgen Bucks, Ancient
  Coins and other currencies always (from the shops you've opened: no source lists them otherwise).
- The Flea Market's odds note links buddy.farm (it said "Buddy's Almanac").
- One shared way for each thing: the Flea Market reads its prices through core's shop reader (its own saved copy,
  flea.prices, is removed), and a shop row with no price shown ("Inv Full") takes its shop's currency; Locksmith
  Rewards and Friendship use core's chips, item links and "A, B and C" (Locksmith now writes "Gold" as the game does).

## 1.35.2 (2026-11-21)
- Item Uses: the containers an item comes from are named once, without a date, with the open shop that sells them
  once at the end ("Locksmith: Cornucopia 02, Cornucopia 03 · on sale at Cecil's Curios"; a shop that sells only
  some names them). Containers on sale are listed first. They come from the data, so they show before buddy.farm is
  read. Opening Town drops a saved shop that Town no longer links to (Cecil's Curios is only open part of the month).
- "buddy.farm" is a link wherever the Toolkit names it (the item's own buddy.farm page on item cards, the Passwords
  page in Library Hints, the site on the settings page), opened in a new tab.
- Containers in shops are worth what everything inside costs at the Flea Market, including the items that rotate in
  and out and aren't up right now: the Flea Market page's own prices when you've opened it, else buddy.farm's
  (new FLEA_GOLD in data.js). Cornucopia 01 went from 45 to 100 Gold (Grapes and Apple), Cornucopia 02 from 675 to
  775 (Apple); totals checked by hand. Before the Flea Market is opened, buddy.farm's prices are used instead of
  asking you to open it. (The Flea Market's own bundle card still counts only what's on sale there now.)
- The worth's tooltips list each thing on its own line: "• 25 Gold Leaf: 375 Gold (15 each)" for what it sells, and
  for the rest any other shop's price ("• 100 Worms: 3 Silver each at Country Store", Borgen Mercantile in Borgen
  Bucks), never turned into Gold. A container with nothing sold for Gold now says so ("doesn't sell any of the 9
  things inside", with the list) instead of showing nothing. Same in every shop, the Flea Market included.
- Shops' own prices are read from the pages you open (each row's price for one and its currency, also rows you can't
  buy right now); the Country Store's Silver prices also come from buddy.farm (new BUY_SILVER in data.js).
- Tooltips on anything the Toolkit added are drawn in the page, so they grow and shrink with the page's zoom (the
  browser's own tooltips stay one size).

## 1.35.1 (2026-11-21)
- Item Uses: "Where to get it" names each container the item comes from, linked to its page ("Locksmith: Cornucopia
  02, Cornucopia 03"), instead of only "Locksmith" with a count in the tooltip, and adds the shop you last saw
  selling it and when ("sold at Cecil's Curios on Nov 21"). Shops are read from the pages you open, never fetched;
  opening a shop again replaces its list, so a container it stopped selling drops off.
- Core: shopRows (a shop's buy rows) is shared by Locksmith Rewards and the new shop stock.

## 1.35.0 (2026-11-21)
- Containers in every shop: a container on sale says what's inside and what that's worth at Flea Market prices, in
  any shop the game draws with a buy button (Cecil's Curios at spshop.php, Borgen Mercantile, the Country Store, event
  shops), not only the Flea Market (Locksmith Rewards, new option "In shops"). What's on sale and its price are the
  page's own; only what a container holds comes from the data (checked against the game's own item pages for
  Cornucopia 01-03 and Picnic Basket 01).
- One shared card for it in core, so it reads the same everywhere: "Inside:" (a grab bag: "One of:"), then "about
  400 Gold for the 2 things it sells (it doesn't sell the other 8), plus the 25 Gold inside", with the ones it
  doesn't sell named in the tooltip. Totals checked by hand against the pages' own prices.
- Flea Market: the same card; the Flea Market's gold items (5 Gold ...) no longer count as bundles, and only bundles
  are moved to the top. Its prices are kept, with when they were read, to value containers in other shops.
- The build no longer writes BUNDLES (CONTAINERS holds the same contents).

## 1.34.0 (2026-11-21)
- Seeds: no crop is matched by name any more. Gold and Mega seeds come from the game's own descriptions ("Grows into
  rare Gold Peas", "yields 10x Beet per seed planted") and the Library, checked against each other and the Library's
  Cookies page; grow times must match the game's "Harvest every N hours". On the farm, the game's own grow time on
  the page (data-ym) is used.
- Townsfolk: loves, likes and hates are checked against the Library's Gifts table (they agree; a gift only one
  source lists is kept, a gift the Library adds is added). Gifts any townsfolk takes and Super Loves come from the
  Library's lists; friendship rewards are checked against the Library's Friendship Rewards.
- The build also checks buddy.farm against the Library for Locksmith contents, passwords, Wishing Well trades, pet
  items and drops per place (a drop only buddy.farm has must be a seasonal item).
- Item Uses: drops only the Library lists are added: every mine's single-tile drops (Bone Pickaxe: Mining: Spring
  Cave) and Gary's Crushroom after "Distant Illusions" (Painite, Mushroom Paste, Gary's Diary Pages 12 and 86).

## 1.33.0 (2026-11-21)
- Every exploring, fishing and mining place links to its own page (mining.php?id=2 for Highland Hollow), for every
  player, whether or not the list was opened first; how to unlock it is in the tooltip. A place link never goes to
  the Library (a mine you have no pickaxe for: the game sends you to craft one).
- The last facts typed into features now come from the Library through the build: Unlock Goals (each part's line is
  the Library's, from Puzzle Pieces, Temple Secret, Unlocks and Rare Items; counts from those lines; quests from
  buddy.farm's rewards), Super Loves (Library: Gifts), Townsfolk of the Day, Friendship Primer, Over The Moon and
  O.M.G odds, Breakfast Boost's 5 minutes, cookies' 3x, the Secret Chains' 100,000 and 20, the Pie Machine card (the
  Library's Quest Artifacts entry and where you are in its quests), mastery tiers (Item Mastery), and the Locksmith's
  list of valuable items.
- The build reads every fact from every Library page and stops when the pages disagree; perk names and card suits
  the features name are checked against the Library and the items.
- Unlock Goals: a part found only at a place another goal opens needs that goal first (Piece 11, also sold at
  Borgen's Camp, no longer says it needs House of Cards). A single quest reads "isn't open: it's from Buddy (...)".

## 1.32.0 (2026-11-20)
- Data the features used to have typed in now comes from the game's Library through the build (tools/build-data.py):
  what Quest Artifacts do, mining tools and charms and reward floors, what each meal does and how long it lasts,
  gift XP, items per Arnold Palmer and fish per Large Net, and the grow-time perks. The build stops with a message if
  a Library page changes so a number can't be found.
- Every item is now known to the Toolkit (1,588, name and picture), so no card shows "Item 539".
- One list of game pages in core: every Toolkit link goes through it (Unlock Goals and the "open it" links too).
- Item Uses: a townsfolk who gives an item at several friendship levels is named once, with the levels in its
  tooltip (Bomb said "Cid, Cid, Cid"). A pickaxe's mine is named once.
- Crop Amounts: Enriched Soil takes 10% of the base grow time, as the Library says (it used to halve the time left,
  which only matched with every other speed perk).
- Meals: a short label where space is tight ("+10% Exploring XP (lasts 5 min)"), and an ⓘ that opens everything the
  Library says about the meal, gathered from every Library page (e.g. Quandary Chowder's "550 items with the perk"
  from the Arnold Palmer page). The build stops if a short label has a number the Library doesn't state. Quick Meals
  tiles show the short label, with the Library text in their tooltip. How long a meal lasts reads "(lasts 2 min)"
  everywhere.
- docs/RELEASE-TODO.md: the release to-do (data kept current, and updates reaching players).

## 1.31.0 (2026-11-20)
- Item Uses: a place you haven't opened yet links to the Library page that says how to unlock it, with the
  requirement in its tooltip (e.g. Highland Hollow: "Mining level 10; needs a Bone Pickaxe"). Places you have opened
  still link to the spot. Buildings that need unlocking (My Kitchen, Temple of Reward ...) say what unlocks them in
  their tooltip. All of it comes from the Library's Unlocks and Mining pages, for every player.
- Item Uses: mines are listed under "Mining" (they were filed under Exploring); opening the Mines page links them.
- Item Uses: items that unlock a place say so ("Unlocks: Ember Lagoon"); a Help Request in a questline that unlocks
  a place links to how to unlock it.
- Item Uses: when every Help Request that asks for an item is completed (or has ended), it says "Currently None
  Remaining" instead of the crossed-out list (the list is in its tooltip).
- New Help Requests reach every item's card: when Help Requests shows a request you hadn't seen, items read from
  buddy.farm before then are read again when their page opens.

## 1.30.1 (2026-11-20)
- Crop Amounts: on the farm, "Dig Up" (shovels) is never sorted and always sits at the bottom of the seed list, in
  every order.

## 1.30.0 (2026-11-20)
- Crop Amounts: the seed list on the farm and the Grape Juice Vat can be sorted by grow time (shortest or longest
  first, with your perks) or by seeds left (most or fewest first). The game's A-Z stays the default. Choose it from the
  small sort icon by "Selected Seeds" or in the Toolkit settings; both lists share the choice.
- Settings: options can now be a pick-one menu as well as a switch.

## 1.29.0 (2026-11-20)
- The Toolkit has its own colours, blues and purples the game barely uses: every Toolkit link is indigo and
  underlined (Item Uses, Unlock Goals, Mastery, Friendship, the Flea Market and the rest), and the Toolkit tag is
  soft violet.
- Flea Market: the places in "Also from:" link to the exploring or fishing spot (once you've opened Explore or Go
  Fishing).

## 1.28.1 (2026-11-20)
- Item Uses no longer names the townsfolk a second time on an item's page while Friendship Gifts' note (under Item
  Details) does: it shows "Gift", with the names in its tooltip.
- Debug report: lists Item Uses and Mining pieces on the page, and the Completed Requests, places, buddy.farm items
  and mine floors the Toolkit has saved.

## 1.28.0 (2026-11-20)
- Item Uses: each use and source is the game's name for it (Workshop, Locksmith, House of Cards, The Tower ...),
  linked to its page, with counts and details in a tooltip, so the card stays a short list. Exploring and fishing
  spots link to the spot (learned when you open Explore or Go Fishing). Items with their own Library page end with a
  Library link. Townsfolk who love or like the item are named. "N more" names the rest in its tooltip.
- Item Uses: House of Cards trades are listed as a source (e.g. Honeycomb, Buddy Doll). A place no longer shows once
  per drop rate ("Jundland Desert" four times). Items saved by an older version are read from buddy.farm again.
- Completing a Help Request is seen from the game's reply to the button: it's crossed out in Item Uses and leaves
  the open list (Unlock Goals, hints) right away, without opening Completed Requests again.
- Shared pieces in core for every feature: links to the game's pages with tooltips (gameLink, tipHtml), places
  (placeLink) and Library pages (libraryLink).
- Everything that shows a value now redraws when it changes: the farm's seed line when mastery changes, mailboxes
  when event bonuses or Townsfolk of the Day change (one shared reader for Townsfolk of the Day).

## 1.27.0 (2026-11-20)
- Mastery: after a craft (the Workshop, or Quick Craft), the crafted item's mastery count updates right away. The
  game only replies "success" and the amount isn't fixed (Mushroom Stew, event bonuses), so the item's page is read
  once, a moment after your last craft of it (several quick crafts share one read).
- Item Uses: Help Requests you've completed are crossed out and listed last. Completed requests are read for free
  when you open Completed Requests, or a quest's page that says "You completed this request!"; the Data check links
  to Completed Requests when it hasn't been seen or Help Requests counts more completed than it knows.

## 1.26.2 (2026-11-19)
- Friendship Gifts: the mailbox card says what gives extra XP in short plain lines ("Double XP: Townsfolk of the
  Day", "+10%: Friendship Primer", "Lucky gifts: O.M.G, 1 in 10 gifts get 7 to 10 times the XP") instead of a
  multiplier. Perks read from your pages no longer say "set by you".

## 1.26.1 (2026-11-19)
- Friendship Gifts: the XP and level preview in mailboxes no longer count the O.M.G perks as an average x1.75. O.M.G
  rolls once per gift (5% or 10% chance of x7 to x10, liked and loved items only), so one big gift usually gets
  none and the preview showed too much. The multiplier card now says what the chance is.
- Friendship Gifts: Townsfolk of the Day is also read from Home (its Friendship Levels row), so the x2 is counted
  without opening Friendship Levels first.
- Friendship Gifts: after a gift, every row's level preview follows the townsfolk's new level and bar.
- Tested 2026-11-19 with 10, 100, 1,000 and 2,000 Horseshoes to Charles (Townsfolk of the Day): 330 XP each
  (150 x 1.1 Primer x 2), and the 1,000 got one O.M.G x7, as the Library says.

## 1.26.0 (2026-11-19)
- Item Uses (new): an item's page says what it's for and where to get it, in a card under its picture: what a quest
  item does once you have it (the Library's Quest Artifacts, e.g. the Pig Collar), what mining tools are for, the
  Help Requests that ask for it by name (the ones you have open first, linked, including the one you came from),
  crafts and meals, Wishing Well, Exchange Center, Locksmith and townsfolk gifts, and where it comes from (drops,
  crafting, shops, Flea Market, Locksmith containers, Help Request and townsfolk rewards, pets, level rewards, the
  Temple and more). Read from buddy.farm the first time you open an item (one at a time, kept a week; nothing goes
  to the game's server). When the sources list none, it says so.
- The built script leaves out the source's comments (360 KB to 301 KB).
- Food Enhancement: My Kitchen says what the meal picked in "Cook All / Select a Meal" does and how long it lasts
  (its own option).
- Shorter script description and header; the full detail is in the README.

## 1.25.0 (2026-11-19)
- Mining (new): on the Mines list, each mine's next floor rewards ("Next rewards at 300 Floors (24 left)") and its
  Charms Active (read from your inventory with the page). On a mine and its location page, the "Mining Floor
  Rewards" link says where the next rewards are. Reward floors from the Library's Mining Floor Rewards.

## 1.24.0 (2026-11-18)
- Farm and Vat: each crop's grow time with your perks in the seed list ("Rice (4382) · 4,192 / 5,092 · 1d"), and
  "Grows in 1d" on the farm's line. Counts Quicker Farming I-IV, Irrigation System I/II, Enriched Soil and Quicker
  Corn (Library: Farming, Crop Drops), and Breakfast Boost for crops of 5 minutes or less.
- Grape Juice Vat: "Longest grow time that fits under your cap: Rice (1d)" for the juices in the box.
- Item pages: each Crafting Recipe ingredient's mastery on its name line, as in the Workshop (on a phone it drops
  to a second line when it wouldn't fit beside the count).
- Meal item pages: the "Real effect" note is a centred Toolkit card, like the Toolkit's other cards.
- Library Hints: the Farmhouse's locked PIES card says where the Pie Machine comes from (Rosalie's Pie Inversion
  Experimentation quests) and what PIES gives.
- Library Hints: the Post Office's Secret Passwords card lists the passwords you haven't entered (from buddy.farm),
  read from your Password Log when you open it; the Data check points to the log when it's unseen or out of date.
  Each hint has its own setting.
- Temple: the Secret Chains (behind the Cursed Effigy) are sorted like the other chains, with their own summary:
  certificates done and crops to go.
- Temple: finished chains are faded again, as intended (they weren't when they had no line under them).

## 1.23.0 (2026-11-18)
- Flea Market: a row the hardest-first sort moved from the game's order gets ↑ or ↓ (only rows that really moved),
  and the note above the hourly items says what the arrows mean.
- Going Back to a page that shows your counts (Flea Market, Temple, the farm and others) reads your inventory once,
  like opening it fresh; before, it showed the counts from before you left.

## 1.22.1 (2026-11-18)
- Toolkit menu: a Data check row whose page name is too long for its note ("Friendship Levels" · "Not seen today")
  puts the note on a second line instead of running the two together.

## 1.22.0 (2026-11-18)
- Friendship Levels: Townsfolk of the Day stands out: a gold outline round the card and a gold "Townsfolk of the Day ·
  x2 XP" line.
- Item pages: a note says which townsfolk love, like or hate the item ("Likes: Beatrix, George · Hates: ROOMBA"),
  with the ones you've already given it to faded. Option in Friendship Gifts.
- Locksmith: every container gets a line with what it gives (valuable items first, up to 8, then "and N more"
  linking to its item page), not only the ones with gold or valuable items. The totals still count gold and valuable
  items, and the settings and the page now describe those the same way.
- Temple: a chain whose reward is part of an unlock goal says so ("Swamp Puzzle"). On a chain's page, when the game's
  amount box holds more than the chain needs, the preview says so and counts only what's needed.
- Mailbox: the Big XP gifts card writes your count the same way as everywhere else (red at the cap).
- Farm: the planting estimate counts empty and ready plots only, not ones still growing. When the game says "530
  Mushroom in inventory", that exact count is used.
- Workshop: the Food list says "No meal needed here" and whether Mushroom Stew is running.
- Wording: fishing spots' note no longer mentions exploring finds; Mastery's note says "Mastery page seen ..." like
  the Data check; Breakfast Boost uses the game's crop names; the Locksmith's item-page line has the Toolkit tag.

## 1.21.2 (2026-11-18)
- Mailbox: a "Not given yet, none on hand" card lists the loves and likes you haven't given and have none of (the
  game only lists items you own, so these were missing), each linked to its item page.
- Mailbox: the Big XP gifts card shows the XP you'd get, with your multiplier, like the rows ("+1,925 XP each"); it
  showed the base XP before.
- Farm and Vat seed list: your crop count reads "3,591 / 5,078" (have / cap), like the line under the menu.
- Unlock Goals: each place is named once, as a link in the text ("Borgen's Camp, some Wednesdays, for 5,000 Ancient
  Coins · 1,509 / 5,000 Ancient Coins · not there this week"), instead of again at the end.

## 1.21.1 (2026-11-18)
- Sanity check fixes: the "Real effect" note on meal item pages has the Toolkit tag like every other note; the Debug
  report counts Unlock Goals' pieces on a page and shows the shop stock and Borgen Buck rate it's using; the Mastery
  description mentions "Mega Mastered 1.55M".

## 1.21.0 (2026-11-18)
- Friendship Levels: four townsfolk per row on wide screens (1,400px and up), so more fit on a screen with the gift
  rows under each. Phones and narrower windows keep the game's three. Option in Friendship Gifts' settings.

## 1.20.2 (2026-11-18)
- Mastery: a Mega Mastered item has no next target, so it reads "Mega Mastered 1.55M" instead of "Mastery 1.55M / ∞"
  (farm line, Workshop, "Things found here"). The exact count is in the tooltip.

## 1.20.1 (2026-11-18)
- Flea Market: the hourly items' line is shorter. The "Takes some work to get elsewhere" grade is gone; the line says
  "Also from:" and the places ("Not found anywhere else" when there are none), with one odds figure per place:
  "Mount Banon (1 per 8 APs)" instead of "Mount Banon 1 in 11,753 (1 per 8 APs)". With the per-AP option off it's
  "(1 in 11,753 explores)". The rows stay sorted hardest to get elsewhere first.

## 1.20.0 (2026-11-18)
- Flea Market: once you change a row's amount (−, +, +MAX or typing), its count shows what you'd have after buying
  it: "2,599 → 2,609 / 5,078", red at or over your cap, with "521 would go over your cap" when some would. Back at 1,
  it's your count as before.
- Borgen's Camp and Borgen Mercantile: every row shows how many you have ("318 / 5,078") and, once you change the
  amount, what you'd have after buying it, the same way. The count is the one the game puts on the page, so nothing
  is read for it (option in the Flea Market's settings).

## 1.19.3 (2026-11-18)
- Unlock Goals: Borgen's Camp stock counts as this week's only from this Wednesday's restock on (game time). Before,
  stock seen in the last 7 days counted, so on a Wednesday last week's stock could show as current.
- Data check: lists Borgen's Camp while a Swamp Puzzle piece you still need depends on it: its stock is from before
  this week's restock ("New stock"), or your Borgen Buck rate was read before a new Mega Mastery ("Out of date"), or
  it hasn't been seen yet.

## 1.19.2 (2026-11-18)
- Data check: lists the Mastery page when Mega Mastered counts saved before 1.18.2 are still there (they read
  "1M / ∞"). Open it once to update them.

## 1.19.1 (2026-11-18)
- Toolkit Menu: no shortcuts the game's left menu already has (Inventory and Workshop are gone). Mastery is off by
  default; switch it on in settings if you want it.
- Wording that didn't make sense: the Flea Market's "Some work elsewhere" is "Takes some work to get elsewhere" again
  (and "Easy to get elsewhere", "Hard to get elsewhere", "Hard to get anywhere else"); the farm warning says "about
  20 would go over your cap"; Piece 11's sources and a Flea option and the Mastery description read clearly.

## 1.19.0 (2026-11-18)
- Fast Travel is now the Toolkit Menu: the bar says "Toolkit" with the compass, and the menu has sections:
  - Data check: one row per page to open, with its state (why it's needed is in the tooltip), or "All seen".
  - Shortcuts: game pages you pick in settings (Inventory, Mastery and Help Requests to start; also Friendship
    Levels, Workshop, Temple, Locksmith, Flea Market, Borgen's Camp, Borgen Mercantile).
  - Settings and Debug.
  Your settings carry over.
- Clean-up after a full sanity check: removed code that was no longer used (an old after-eat timer that did nothing,
  two unused helpers, a leftover style). Checked on 18 pages: no problems or errors, no page jumps, page checks about
  13 ms on average.

## 1.18.2 (2026-11-18)
- Mastery: Mega Mastered counts are read for real ("1,553,631 / ∞ Progress" on the Mastery page and item pages).
  They were saved as exactly 1,000,000, so e.g. Mushroom read "1M / ∞" instead of "1.55M / ∞". Open the Mastery page
  once to update them.
- Easier to read: lines that carry a count, next step, effect or stat are normal text, not grey (Unlock Goals' next
  steps, Flea Market sources and odds, meal effects, how long a meal lasts, the Temple amount preview, your perks on
  the multiplier card). Their numbers are bold, and your counts ("1 / 5,078") are bold everywhere. The grey used for
  labels and hints is brighter in dark mode and darker in light mode.

## 1.18.1 (2026-11-18)
- Friendship Levels: a Loves or Likes row where everything is already given (faded) is hidden, so more townsfolk fit
  on a screen. Super and Hates never fade (in the game they can always be given again); they faded before.
- Unlock Goals: Piece 04 shows your own Borgen Buck rate and progress (read from Borgen's Camp: "5,839 / 9,435
  Ancient Coins spent toward the next Buck"); the rate drops with Mega Masteries, so it's no longer written in.
- Consistency: the Toolkit tag on the Friendship cards like every other card; numbers formatted one way everywhere;
  the Eat button's tooltip says "N on hand" (the game's words).
- Farm: the closed seed menu's label is placed again when the window size or zoom changes.

## 1.18.0 (2026-11-18)
- Unlock Goals: every next step is something you can act on, linked to where you do it:
  - Questlines: the quest you have open (linked to it) and how many quests are left, even across questlines
    ("Secretly A Society Summons You II is open: 14 more quests to Spirit of the Cards IV"). When none are open, where
    the chain starts, from whom, and what it needs ("Fitness Friends Fit Forever I from Gary Bearson V, needs Gary
    Bearson V at friendship 80").
  - Shops: whether Borgen's Camp or the Mercantile has the part this week (from when you last opened them), with a link.
  - Parts that need another unlock first say so, with that unlock's own next step.
  - New unlocks: House of Cards (Rune Dice) and Gary's Crushroom (its key). In Town, House of Cards says "Locked" and
    what opens it, while it's still locked.
  - New option "Full next steps": off shows only where each part comes from, with links (the Library's info).
- Mastery looks like the Workshop's everywhere (farm line, "Things found here"): grey "Mastery", then "have / target"
  in bold (e.g. "Mastery 10.5K / 100K"; Mega Mastered "Mastery 1.06M / ∞", as the game's item page writes it, where it
  showed only "1M"). Coloured on an MMO-style rarity scale by the game's own Mastery page groups: No Tier grey, Tier I,
  Tier II green, Tier III (M) blue, Tier IV (GM) purple, Tier V (MM) orange, Mega Mastered red. The tooltip uses the
  game's words: the group, the inventory chip ("Mastered", "Grand Mastered") and how many to go.
- Quest chains toward goals come from buddy.farm's quest data (60 quests, each with its giver and what it needs).

## 1.17.0 (2026-11-18)
- Unlock Goals (new): big unlocks made of many parts say where each part comes from and your next step, with your
  progress, where you are instead of in the Library:
  - Swamp Puzzle (opens the Sinking Swamp): on its item page, under each of the 15 pieces you don't have, e.g.
    "Borgen Mercantile: 100 Borgen Bucks · 35 / 100 Borgen Bucks", "456 / 1,000 personal requests",
    "Corn of Interest Part 05 is open: 10 more parts to go".
  - Each piece's item page says which goal it's for, how many pieces you have, and its next step.
  - Shops: a piece on sale (Borgen Mercantile, Borgen's Camp, Flea Market) says it's a Swamp Puzzle piece.
  - Cursed Effigy (the Temple's Secret Chains): the same, on its item pages; the Temple's "Something Strange" card
    uses it too, so it now shows your next step for each part.
- Help Requests is read for free when you open it (your open quests and request totals), for these next steps and
  for quest matching later. Data check lists it when it's never been seen or is a day old.

## 1.16.6 (2026-11-18)
- Counts are written the game's way everywhere: "1,228 / 5,078" (have / your cap, red at the cap) on the farm line,
  Flea Market rows and townsfolk Big XP gifts; "4,079 / 1,650 to finish" (have / needed, as in the Workshop) on
  Temple chains. No more "you have" and "room for" sentences; parts of a line are separated by " · ".
- Farm: every crop in the seed list shows its count, including the chosen one. The closed menu shows the game's own
  label (a label laid over the game's fixed 170px box, in its own font and alignment), so nothing is cut off. The
  perks and meals counted in "about 56" are in its tooltip. The warning only appears when some would go over your cap.
- Flea Market: shorter lines with the game's own place names ("Small Cave 1 in 43 (29 per AP)", "Wishing Well",
  "Workshop", "Grab Bag 02 and more").

## 1.16.5 (2026-11-18)
- Crop Amounts: the seed list shows how many of each crop you have again (red at your cap); the closed menu keeps
  the game's own label (it's a fixed 170px), and nothing changes or moves when you open it. The line under it says
  how many you have of the chosen crop; each option now controls its own part of that line.
- Mastery looks the same everywhere (Workshop, "Things found here", the farm line): one shared badge. Its note
  gives each page's own reason for items without a count.
- Locksmith Rewards: when none of your containers give gold or the tracked items, a card says so (the page looked
  broken before). Its summary card now has the Toolkit tag like the others.
- One shared look for summary cards, small grey lines, item chips and lead-in words (they had drifted apart).

## 1.16.4 (2026-11-18)
- Crop Amounts: counts update right after Harvest, Harvest All and the Vat again. The game now sends these with
  fetch, so their replies can't be seen; the Toolkit reads your inventory straight after instead of waiting up to a
  minute (which left the count behind).
- Crop Amounts: fixed the check after Harvest All. It skipped the read when a growing plot's picture wasn't the
  crop's own, and when the harvested plots disappeared (the game reloads the crop area). Tested live: the count went
  up about 3 seconds after Harvest All.
- Crop Amounts: the seed menu is a fixed 170px in the game, so counts in its label were cut off. They now show only
  while the menu is open; the line under it says "you have N". The line also works with empty plots (it counted
  only growing ones before).
- Item counts are read whenever a page that shows them needs them. Reads are only kept a few seconds apart to avoid
  duplicates, never held back for a minute.

## 1.16.3 (2026-11-18)
- Debug report, more to go on:
  - Game: its script version, jQuery, the active page, the scroll the game is about to restore.
  - Page: scroll position, and the Toolkit's pieces on it by feature.
  - Features: which parts are switched off. Feature data: what each feature uses (inventory, including any read
    waiting; mastery with Mega count; meals; Townsfolk of the Day; mailboxes) and the perks each one counts.
  - Activity since the page loaded: page checks and how long they take, redrawn pages settled, and a log of each
    time the page was held still or settled.
  - Saved data: total, the largest keys and all keys.
  - Errors nothing caught are kept with the problems. Farm and player ids (long numbers) show as "#", also in older
    log entries.

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
