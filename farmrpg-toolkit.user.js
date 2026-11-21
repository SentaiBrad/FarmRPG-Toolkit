// ==UserScript==
// @name         FarmRPG Toolkit
// @namespace    farmrpg-userscript
// @version      1.31.0
// @description  Adds helpful info and shortcuts to Farm RPG's own pages: gifts and XP, meal effects, item uses, crops, Flea Market, Temple, mastery, mining and more. It never plays for you. Settings: My Settings > FarmRPG Toolkit.
// @author       SentaiBrad
// @license      MIT
// @match        https://farmrpg.com/*
// @match        https://www.farmrpg.com/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

// Built file: edit src/ and run  python -I tools/build-userscript.py
// Features and how the Toolkit treats the game: README.md on GitHub (SentaiBrad/FarmRPG-Toolkit).

(() => {
  'use strict';
  const VERSION = '1.31.0';
const ITEMS = {"11":["Peppers","/img/items/8301.png","A spicy treat"],"12":["Pepper Seeds","/img/items/seeds_peppers.png","Harvest every minute"],"13":["Eggplant","/img/items/eggplant.png","Looks nothing like an egg"],"15":["Tomato","/img/items/8290.png","Tow-MAY-to, tow-MAH-to"],"17":["Drum","/img/items/7718.PNG","Not an instrument"],"18":["Worms","/img/items/7758.png","Use this to catch fish"],"19":["Carrot","/img/items/8391.PNG","Rabbit food"],"20":["Carrot Seeds","/img/items/seeds_carrots.png","Harvest every 2 minutes"],"22":["Iron","/img/items/5779.PNG","A pressing need"],"23":["Bucket","/img/items/8263.PNG?1","Doesn't leak much"],"24":["Yellow Perch","/img/items/yellowperch.png","Cowardly and fishy"],"25":["Largemouth Bass","/img/items/7736.PNG","Counterintuitively not very talkative"],"26":["Eggs","/img/items/5720.PNG","Spam sold separately"],"27":["Peas","/img/items/8259.PNG","Pod racers"],"29":["Cucumber","/img/items/5805.png","Kind of a big dill"],"31":["Radish","/img/items/radish.png?1","Daikonic"],"33":["Onion","/img/items/8317.png","Layers so deep you might cry"],"35":["Wood","/img/items/6143.PNG","It's better than bad, it's good"],"36":["Wooden Plank","/img/items/5733.PNG","Like wood, but in plank form"],"37":["Wooden Box","/img/items/5736.PNG","It is a box made of wood"],"38":["Nails","/img/items/5860.png","Thankfully, no chalkboards here"],"39":["Crappie","/img/items/7735.PNG","The joke sort of makes itself, doesn't it?"],"40":["Stone","/img/items/6174.PNG","Don't leave it unturned"],"41":["Aquamarine","/img/items/6146.PNG","Water... water?"],"42":["Feathers","/img/items/feathers.png","Hope is a thing with these"],"43":["Mushroom","/img/items/mushroom.png","A fungus among us"],"44":["Apple","/img/items/8297.png","Adds 15 stamina"],"45":["Fish Bones","/img/items/7747.PNG","Look what the cat dragged in"],"46":["Hops","/img/items/8248n.png","Discovered by Charlie Mops"],"48":["Potato","/img/items/potato.png","Boil 'em, mash 'em, stick 'em in a stew"],"50":["Leek","/img/items/8291.png","Hopefully not as draining as they sound"],"53":["Purple Flower","/img/items/flower.png","Violet, you're turning violet, Violet!"],"54":["Amethyst","/img/items/amethyst.png","Am-e-thyst, am-e-that"],"56":["Green Chromis","/img/items/7828.PNG","Time flies when you're fishing"],"57":["Blue Crab","/img/items/7825.PNG","Not actually a sad crustacean"],"58":["Small Prawn","/img/items/7826.PNG","Cocktail sauce not included"],"59":["Watermelon","/img/items/8293.png","Implies the existence of airmelons, earthmelons, and firemelons"],"61":["Orange","/img/items/orange.png","From an orange tree"],"62":["Lemon","/img/items/8251.PNG","From a lemon tree"],"63":["Trout","/img/items/trout.png","Gotta catch 'em all!"],"65":["Corn","/img/items/8288.png","Make it into bread or meal; you can never have enough"],"67":["Cabbage","/img/items/8319-3.png?1","A favored snack of the platypus bear"],"69":["Pumpkin","/img/items/8294.png","Good for more than just pie"],"71":["Wheat","/img/items/8249.png","Wheat-ease: Breakfast of champions"],"73":["Purple Parchment","/img/items/5755.PNG","Purple paper promotes proper penmanship"],"74":["Green Parchment","/img/items/greenparchment.png","Escribe an exciting essay on emerald"],"75":["Mushroom Paste","/img/items/5691.png","Useful to bind things together"],"76":["Unpolished Shimmer Stone","/img/items/5782.PNG","Has a strange glow to it"],"77":["Shimmer Stone","/img/items/5711.PNG","Polished, can reflect or bend light"],"78":["Glass Orb","/img/items/5708.PNG","Refined from Shimmer Stone"],"80":["Lemon Quartz","/img/items/5798.png","A citric rock"],"84":["Orange Juice","/img/items/orangejuice.png","Adds 100 Stamina"],"85":["Milk","/img/items/8382.PNG","Produced by most mammals"],"86":["Lemonade","/img/items/lemonade.png","Finds items while exploring"],"90":["Blue Shell","/img/items/7875.PNG","Throw it at the racer in first place"],"91":["Acorn","/img/items/5759.PNG","A tasty snack for squirrels"],"94":["Ruby","/img/items/6071.PNG","Sometimes confused with pink sapphire"],"95":["Iron Ring","/img/items/ironring.png","The base for other rings"],"96":["Ruby Ring","/img/items/rubyring.png","Bright and sparkly"],"98":["Starfish","/img/items/7821.png","Can we name it Oscar?"],"99":["Clownfish","/img/items/7832.PNG","More entertaining than the mimefish"],"100":["Pearl","/img/items/7876.PNG","What is irritating can become good"],"101":["Conch Shell","/img/items/7904.png","A reminder of the ocean"],"103":["Coal","/img/items/coal.png","The foundation of the Industrial Revolution"],"104":["Black Powder","/img/items/powder.png","Not for skiing on"],"105":["Bottle Rocket","/img/items/6123.png","Blast off!"],"106":["Explosive","/img/items/6124.png","Keep away from Jill"],"107":["Catfish","/img/items/redcatfish.png","A bottom-feeder you'll want to keep for later"],"108":["Arrowhead","/img/items/5910.png","Carved stone from long ago"],"109":["Hide","/img/items/5986.PNG","Recommended for crafting leather"],"110":["Leather","/img/items/5987.PNG","Strong and durable, important for crafting"],"111":["Bird Egg","/img/items/6067.PNG","I'd hate to meet the bird that laid this"],"112":["Grape Juice","/img/items/grapejuice.png","Instant crops, consumable, one-time use"],"113":["Bone","/img/items/6033.PNG","A former animal"],"114":["Marlin","/img/items/7816.png","The big one"],"116":["Old Boot","/img/items/7848.PNG","Anybody need a boot?"],"117":["Glass Bottle","/img/items/7727.PNG?1","Should be recycled"],"118":["Leather Diary","/img/items/5754.PNG","Buttery soft and full of secrets"],"119":["Jellyfish","/img/items/7808.png","The mixed fruit of the ocean"],"120":["Grapes","/img/items/8272.PNG","From the vine"],"121":["Wine","/img/items/wine.png","Fermented grape juice"],"123":["Ancient Coin","/img/items/6019.PNG","From another age"],"125":["Aquamarine Ring","/img/items/aquaring.png","The bluest of bling"],"126":["Amethyst Necklace","/img/items/8016.png","A purple pendant"],"130":["Iron Cup","/img/items/ironcup.png","Keeps coffee cold"],"131":["Bluegill","/img/items/7722.PNG","Make sure you get your blue fill"],"132":["Carp","/img/items/7737.PNG","Prefers to be called koi"],"133":["Blue Sea Bass","/img/items/7818.png","Into the deep"],"134":["Stingray","/img/items/7831.PNG","Beware of stinger"],"135":["MIAB","/img/items/7756.png","A mysterious message"],"137":["Steak","/img/items/steak.png","Only bad if you named the cow after someone special"],"140":["Giant Squid","/img/items/7726.PNG","I have an inkling..."],"141":["Shrimp","/img/items/7844.PNG","It's big on the inside"],"143":["Emerald","/img/items/emerald.png","We're off to see the wizard"],"144":["Carbon Sphere","/img/items/carbonsphere.png","Used to harden iron"],"145":["Steel","/img/items/6150.png","Heavier than feathers"],"146":["Emerald Ring","/img/items/greenring.png","A pricey piece of lovely lime"],"147":["Runestone 01","/img/items/rs1.png","Some say it can be found near a rabbit's warren"],"148":["Runestone 02","/img/items/rs2.png","Some say it can be found in familiar waters"],"149":["Runestone 03","/img/items/rs3.png","Some say it can be found next to a shallow pool"],"150":["Runestone 04","/img/items/rs4.png","Some say it can be found inside cool stone"],"151":["Runestone 05","/img/items/rs5.png","Some say it can be found in a fog"],"152":["Runestone 06","/img/items/rs6.png","Some say it can be found when you're in a pickle"],"153":["Runestone 07","/img/items/rs7.png","Some say it can be found next to the ranch dip on the hors d'oeuvres tray"],"154":["Runestone 08","/img/items/rs8.png","Some say it can be found at a nice, quiet spot just outside of town"],"155":["Runestone 09","/img/items/rs9.png","Some say it can be found amid piles of coal and sand"],"156":["Runestone 10","/img/items/rs10.png","Some say it can be found when you're on an even keel - backwards"],"157":["Gold Peppers","/img/items/8301g.png?1","They're more of a Major Peppers than a lowly Sergeant"],"158":["Gold Pepper Seeds","/img/items/seeds_gpeppers.png","Grows into rare Gold Peppers"],"159":["Gold Carrot","/img/items/8391g.png","The classiest of bunnies might snack on this"],"160":["Gold Carrot Seeds","/img/items/seeds_gcarrots.png","Grows into rare Gold Carrots"],"161":["Gold Peas","/img/items/8259g.png","We don't recommend making them into a soup"],"162":["Gold Pea Seeds","/img/items/seeds_gpeas.png","Grows into rare Gold Peas"],"163":["Twine","/img/items/6172-1.png","Ties stuff together"],"164":["Horn","/img/items/6111.PNG","It's calling to you"],"168":["Strange Letter","/img/items/7852.png","You can't read it"],"170":["Antler","/img/items/5922.png","Shed at the end of the season, used to weave nets"],"171":["Blue Feathers","/img/items/5963.png","From a sad chicken"],"172":["Gold Feather","/img/items/5996.png","Feathers, but gold"],"173":["Flier","/img/items/7843.png","Wings in the water"],"174":["Ruby Fish","/img/items/7838.png?1","Almost too pretty to eat"],"176":["Magicite","/img/items/7963.png","A stone for special spells"],"177":["Moonstone","/img/items/8014.png","Its beauty eclipses other gems"],"185":["Iced Tea","/img/items/tea.png","Restores your best fishing streak"],"186":["Cheese","/img/items/8279.png","Savory and delicate"],"187":["3-leaf Clover","/img/items/8250.PNG","A delicious snack if you have hooves for feet"],"188":["4-leaf Clover","/img/items/fourleaf.png","Often overlooked"],"189":["Gold Cucumber","/img/items/5805g.png?1","A cuke fit for a duke"],"190":["Gold Cucumber Seeds","/img/items/seeds_gcucumber.png","Grows into rare Gold Cucumbers"],"191":["Grubs","/img/items/7745.png","Catch fish, 2x Fishing XP"],"192":["Minnows","/img/items/7749.png","Catch fish faster"],"193":["Rope","/img/items/5624.png","Can tie things together"],"194":["Fishing Net","/img/items/7748.png","Can catch stuff"],"195":["Mystic Ring","/img/items/8038.png","Radiates a calming energy"],"197":["Steak Kabob","/img/items/8898.png","Tasty and portable!"],"199":["Globber","/img/items/5766.png","Old fishermen say these can talk back during a full moon"],"203":["Green Dye","/img/items/greendye.png","Can turn some things green"],"207":["Octopus","/img/items/octopus.png","Eight legs make it the best at hugging"],"212":["Dice","/img/items/4848.png","Cubes with dots on them"],"213":["Pocket Watch","/img/items/4887.png","Tells the time"],"214":["Wooden Mask","/img/items/4880.png","Not creepy at all"],"215":["Cogwheel","/img/items/7211.png","Broken Machine"],"217":["Horseshoe","/img/items/6956.png","A stallion slipper, a hoof helper, and a tossable toy all in one!"],"221":["Runestone 11","/img/items/rs11.png?1","Some say it can be found in a field of ears"],"222":["Runestone 12","/img/items/rs12.png","Some say it can be found under lucent waters"],"223":["Runestone 13","/img/items/rs13.png","Some say it can be found near a dark fissure"],"224":["Runestone 14","/img/items/rs14.png?1","Some say it can be found in a rolling fell"],"225":["Runestone 15","/img/items/rs15.png","Some say it can be found on a wild shore"],"226":["Runestone 16","/img/items/rs16.png?1","Some say it can be found with the brewers"],"227":["Runestone 17","/img/items/rs17.png","Some say it can be found near molten glass"],"228":["Runestone 18","/img/items/rs18.png?1","Some say it can be found in a great blue"],"229":["Runestone 19","/img/items/rs19.png?1","Some say it can be found on a high peak"],"230":["Runestone 20","/img/items/rs20.png","Some say it can be found after a long purple winter"],"236":["Hammer","/img/items/hammer.png?2","Works with nails"],"237":["Axe","/img/items/5875.png?1","Why did the chicken put the egg under an axe? To hatchet"],"238":["Shovel","/img/items/5853.png?1","Good for moving dirt"],"240":["Wizard Hat","/img/items/4798.png","Magical head protection"],"241":["Shark Tooth","/img/items/sharktooth.png","Fish are friends, not food."],"242":["Bacon","/img/items/bacon.png","Mmmmm bacon"],"243":["Spectacles","/img/items/5392.png","They’re spectacular!"],"245":["Eye Patch","/img/items/4920.png","Do not look under it"],"246":["Pirate Flag","/img/items/4924.png","Jolly Roger"],"247":["Captains Log","/img/items/4868.png","Full of pirate secrets"],"248":["Shimmer Topaz","/img/items/8055.png","Could help to ward off evil"],"249":["Shimmer Ring","/img/items/shimmertopazring.png","A blinger for your finger"],"250":["Honey","/img/items/jarofhoney.png","Keep away from bears"],"251":["Small Spring","/img/items/5633.png","A helical metal coil"],"253":["Piece of Heart","/img/items/poh.png","Way better than getting a piece of someone's mind"],"254":["Cotton","/img/items/8311.png","The fabric of our lives"],"256":["Broccoli","/img/items/8757.png","Better with cheese"],"258":["Pirate Bandana","/img/items/4903.png","Keeps hair out of the rigging"],"259":["Freaky Picture","/img/items/5592.png","Who even is this"],"260":["Ladder","/img/items/5629.png","Vertically challenged folk love this"],"262":["Gold Eggplant","/img/items/geggplant.png?1","Laid by the Golden Gooseplant"],"263":["Unpolished Jade","/img/items/ujade.png","Where do you get this from again?"],"264":["Jade","/img/items/jade.png","Not as disillusioned as it sounds"],"266":["Skull Coin","/img/items/7286.png","For your skeletal spending needs"],"268":["Shinefish","/img/items/fishing_112_t.png","So shiny"],"270":["Gold Crab","/img/items/fishing_102_t.png","Gold crab meat just tastes better"],"273":["Small Flute","/img/items/5255.png?1","Practice makes perfect"],"277":["Gummy Worms","/img/items/gworm.png","Quick fish, 3x Fishing XP"],"280":["Teapot","/img/items/teapot.png","Short and stout"],"281":["Gold Leaf","/img/items/8774.png","A thing of beauty"],"282":["Shiny Beetle","/img/items/beetle.png","A colorful carapace"],"283":["Horned Beetle","/img/items/hbeetle.png","A bug with a somewhat mooselike nature"],"284":["Snail","/img/items/snail.png","Just a shelled gastropod"],"285":["Caterpillar","/img/items/caterpillar.png","It's probably very hungry"],"286":["Fire Ant","/img/items/fireant.png","Avoid stepping on these at all costs"],"287":["Giant Centipede","/img/items/giantcent.png","If it were any bigger, it'd be a dollarpede"],"289":["Pine Cone","/img/items/pinecone2.png","Smells like the forest"],"297":["Winged Amulet","/img/items/7422.png","A flight of fanciness"],"298":["Buddystone","/img/items/buddystone.png","Incredibly strange"],"300":["Sturdy Sword","/img/items/8927.png?1","Probably won't break"],"302":["Slimestone","/img/items/5655.png","A gelatinous green glob"],"303":["Oak","/img/items/6695.png","From a tiny acorn, much can be produced"],"304":["Salt Rock","/img/items/saltrock.png","Science you can lick"],"305":["Salt","/img/items/salt.png","Makes food taste better"],"307":["Barracuda","/img/items/7486.png","Not a good pet"],"316":["Garnet Ring","/img/items/garnetring.png","Like crystal honey for your finger"],"323":["Raptor Claw","/img/items/raptor.png","Rawr"],"326":["Scissors","/img/items/scissors.png","Do NOT run with these"],"330":["Grab Bag 01","/img/items/4497.png","Random selection of early resources Open it at the Locksmith in Town"],"331":["Small Key","/img/items/basickey.png","A tiny key that opens small chests"],"334":["Grab Bag 02","/img/items/4497.png","Random selection of useful items Open it at the Locksmith in Town"],"335":["Square Key","/img/items/7179.png","A geometric key that opens medium chests"],"338":["Magna Quartz","/img/items/magnaquartz.png","Has a thing for metal"],"339":["Small Screw","/img/items/9380.png","A workshop isn't complete without some"],"342":["Small Gear","/img/items/9388.png","Helps keep things running like clockwork!"],"346":["Large Chest 01","/img/items/LC-1.png?1","Large amount of shiny rocks inside"],"347":["Treasure Key","/img/items/7148.png","A fancier key to open large chests"],"348":["Fancy Box","/img/items/4238.png","Very ornate, does not open"],"349":["Herbs","/img/items/5686.png","They'll spice up your life"],"350":["Green Cloak","/img/items/ForestIcons_54_t.png","Full of convenient pockets"],"351":["Gouda","/img/items/4601.png","Sweet and creamy"],"352":["Gold Eggplant Seeds","/img/items/seeds_geggplants.png","Grows into rare Gold Eggplants"],"354":["Wax Candle","/img/items/candle.png","Provides a little bit of light"],"355":["Jack-o-lantern","/img/items/pumpkin_t_05.png","A carved pumpkin"],"356":["Chattering Teeth","/img/items/jaw_t_01.png?1","Not to be used as dentures"],"358":["Candy","/img/items/candy_t_09.png","Don't eat too much"],"359":["Lollipop","/img/items/candy_t_08.png","Don't drop it"],"360":["Treat Bag 01","/img/items/bag_t_03.png","A bag of sweet and savory treats"],"361":["Candy Corn","/img/items/candycorn.png","Who really likes this stuff?"],"362":["Spider","/img/items/spiderbutcutererr.png","It just wants a hug!"],"363":["Large Chest 02","/img/items/LC-2.png?1","Large amount of useful materials inside"],"364":["Treat Bag 02","/img/items/bag_t_03.png","A bag of Halloween treats to share with friends"],"366":["Skeleton Key","/img/items/skelkey.png","A spooky key to open mystical chests"],"368":["Lantern","/img/items/lantern.png?1","Portable light source"],"370":["Taffy","/img/items/candy_t_11.png","Sticks to your teeth"],"371":["Egyptian Necklace","/img/items/egyptian1.png","Show off your wealth"],"372":["Treat Bag 03","/img/items/bag_t_03.png","A bag of useful Halloween goodies"],"373":["Sunflower","/img/items/sunflower.png","Praise the sun Jolly cooperation"],"375":["Popcorn","/img/items/popcorn.png","I'm just here for the popcorn"],"376":["Ruby Scorpion","/img/items/4514.png","It'll make you see red"],"377":["Cornucopia 01","/img/items/cornucopia.png","The horn of plenty"],"378":["Water Lily","/img/items/3258.png","You probably can't stand on this"],"379":["Apple Cider","/img/items/8984.png","1000+ Stamina Use Does not give Stamina Works with Wanderer Perks Need at least 1000 Stamina to use"],"380":["Rubber Duckie","/img/items/ducky.png","You're the one"],"382":["Grasshopper","/img/items/3315.png","Also known as a locust when they gather in swarms"],"383":["Cyclops Spider","/img/items/4080.png","Avoid eye contact"],"384":["Dragonfly","/img/items/fishing_64_t.png","Amazingly successful predator, ~95% good hunts"],"387":["Sand","/img/items/am_t_01.png","Coarse, and rough, and irritating, and it gets everywhere"],"389":["Orange Gecko","/img/items/3493.png","Fifteen minutes could save you..."],"390":["Seaweed","/img/items/fishing_75_t.png","A great wrapper for some of your fish"],"392":["Steel Wire","/img/items/wire.png","Useful for many things"],"397":["Grab Bag 04","/img/items/4497.png","Random selection of early runestones Open it at the Locksmith in Town"],"398":["Grab Bag 05","/img/items/4497.png","Random selection of late runestones Open it at the Locksmith in Town"],"401":["Candy Cane","/img/items/cr_t_05.png","Peppermint flavored"],"409":["Pine Tree","/img/items/cr_t_06.png","Always green"],"412":["Snowball","/img/items/cr_t_07.png","Packed tightly"],"415":["Gingerbread Man","/img/items/4_sm.png","Please don't eat me"],"425":["Hot Cocoa","/img/items/5_sm.png","A Holiday treat"],"426":["Candy Roll","/img/items/14_sm.png","Chocolate flavored"],"427":["Yarn","/img/items/pt_t_07.png","Knit one, purl two, craft three"],"428":["Snow Globe","/img/items/21_sm.png","Frozen in time"],"440":["Dasher","/img/items/dasher.png","One of Santa's Reindeer"],"441":["Dancer","/img/items/dancer.png","One of Santa's Reindeer"],"442":["Prancer","/img/items/prancer.png","One of Santa's Reindeer"],"443":["Vixen","/img/items/vixen.png","One of Santa's Reindeer"],"444":["Comet","/img/items/comet.png","One of Santa's Reindeer"],"445":["Cupid","/img/items/cupid.png","One of Santa's Reindeer"],"446":["Donner","/img/items/donner.png","One of Santa's Reindeer"],"447":["Blitzen","/img/items/blitzen.png","One of Santa's Reindeer"],"450":["Beet","/img/items/2850.png","They can't be"],"451":["Holiday Candles","/img/items/11_sm.png","Smell like sugar cookies"],"452":["Fireworks","/img/items/petard.png","Pyrotechnic device for entertainment"],"454":["100 Gold","/img/items/goldpouch2.png","Open at Locksmith for 100 Gold Givable to other players"],"457":["Gold Trout","/img/items/goldtrout.png?1","What makes it gold? The jury is still trout"],"458":["Gold Catfish","/img/items/goldcatfish.png","Not usually a contest you want to win"],"459":["Gold Coral","/img/items/goldcoral.png","Even better than the O.K. Coral"],"460":["Gold Drum","/img/items/golddrum.png","Cogito ergo Drum"],"461":["Goldfin","/img/items/goldfin.png","Blinding bright"],"462":["Gold Flier","/img/items/goldflier.png","A change from the standard red wagon"],"463":["Goldgill","/img/items/goldgill.png","1 gill is equal to 40 drams or 8 tablespoons"],"464":["Goldray","/img/items/goldray.png","Can sting you with gold"],"465":["Gold Sea Bass","/img/items/goldseabass.png","Now you just need to find a Gold Sea Guitar"],"466":["Goldjack","/img/items/goldjack.png?1","Nice big gold fish"],"467":["Gold Boot","/img/items/gboot.png?1","Anybody need a gold boot?"],"471":["Bell","/img/items/bell.png","Creates a terribly annoying sound"],"473":["Spiked Shell","/img/items/spikey.png","Covered in sharp spikes"],"475":["Crab Claw","/img/items/crabclaw.png","Delicious with butter"],"478":["Sea Dragon","/img/items/seadragon.png","Rare saltwater fish"],"479":["Frog","/img/items/frog.png","Ribbit."],"481":["Chum","/img/items/chumbucket.png","Absolutely disgusting"],"483":["Box of Chocolate 01","/img/items/l_06_t.png?1","A lot like life"],"488":["Valentines Card","/img/items/card_valentines.png","Be my Valentine"],"491":["Grab Bag 07","/img/items/4497.png","Random selection of gold fish Open it at the Locksmith in Town"],"492":["Essence of Slime","/img/items/essense.png","Smells repulsive"],"494":["Spring Basket 01","/img/items/springbasket.png","Spring is in the air"],"498":["Mealworms","/img/items/mw.png","Single tap manual fishing Doesn't increase streak Fish love these!"],"500":["Large Net","/img/items/lnet.png?3","Can catch lots of stuff"],"501":["Pot of Gold (Large)","/img/items/potogold.png","Open at Locksmith for 50 Gold"],"502":["Pot of Gold (Medium)","/img/items/pog2.png","Open at Locksmith for 25 Gold"],"503":["Pot of Gold (Small)","/img/items/pog3.png","Open at Locksmith for 10 Gold"],"504":["Gold Shamrock","/img/items/goldclover.png","The rarest of all clover"],"505":["Mug of Beer","/img/items/7264.png?1","Crisp and dark with a balance of bitter and sweet notes with a dry finish."],"508":["Arnold Palmer","/img/items/ap.png","Quicker than regular Lemonade"],"509":["50 Gold","/img/items/goldpouch1.png","Open at Locksmith for 50 Gold Givable to other players"],"510":["25 Gold","/img/items/25gold.png","Open at Locksmith for 25 Gold Givable to other players"],"511":["10 Gold","/img/items/10gold.png","Open at Locksmith for 10 Gold Givable to other players"],"512":["5 Gold","/img/items/5gold.png","Open at Locksmith for 5 Gold Givable to other players"],"518":["Egg 06","/img/items/egg06.png","A hand painted Egg"],"519":["frank's Basket","/img/items/fbasket.png","Smells bad, but has some nice things in it"],"520":["Bunny Ears","/img/items/ears.png","Turns you into a Bunny"],"521":["Egg 01","/img/items/egg01.png","A hand painted Egg"],"522":["Egg 02","/img/items/egg02.png","A hand painted Egg"],"523":["Egg 03","/img/items/egg03.png","A hand painted Egg"],"524":["Egg 04","/img/items/egg04.png","A hand painted Egg"],"525":["Egg 05","/img/items/egg05.png","A hand painted Egg"],"526":["Egg 07","/img/items/egg07.png","A hand painted Egg"],"527":["Egg 08","/img/items/egg08.png","A hand painted Egg"],"528":["Egg 09","/img/items/egg09.png","A hand painted Egg"],"529":["Egg 10","/img/items/egg10.png","A hand painted Egg"],"530":["Egg 11","/img/items/egg11.png","A hand painted Egg"],"531":["Egg 12","/img/items/egg12.png","A hand painted Egg"],"535":["Blue Dye","/img/items/bluedye.png","Can turn some things blue"],"536":["Red Dye","/img/items/reddye.png","Can turn some things red"],"537":["Purple Dye","/img/items/purpledye.png","Can turn some things purple"],"538":["Red Shield","/img/items/redshield.png","Red is scarier than green"],"548":["Drink Bundle","/img/items/juices.png","Full of helpful drinks Includes OJs, Lemonades, Ciders, Grape Juices, Arnold Palmers, and Ice Teas"],"569":["Anglerfish","/img/items/pirates_76_t.png","I'm feeling happy... which is a big deal."],"573":["Large Chest 03","/img/items/LC-3.png?1","Some useful items for crafting"],"580":["Gold Jelly","/img/items/goldjelly.png","I don't think you're ready for this"],"581":["Cutlass","/img/items/pirates_47_t.png","Commonly used by pirates"],"583":["Grab Bag 08","/img/items/4497.png","Random selection of keys Open it at the Locksmith in Town"],"584":["Tackle Box","/img/items/7847.png","Full of helpful items Includes bait, fishing nets, large nets and Ice Teas"],"586":["Peach","/img/items/peach.png","Fuzzy and sweet"],"587":["Peach Juice","/img/items/peachjuice.png","Causes invisibility"],"591":["Copper Wire","/img/items/9327.PNG","Prized for its conductivity"],"599":["Onyx Scorpion","/img/items/4514b.png","Black as night and twice as dangerous"],"600":["Scrap Wire","/img/items/9398.PNG","Do you know how wires are made? It's shocking"],"601":["Scrap Metal","/img/items/9383.PNG","Make sure your tetanus shot is up to date"],"603":["Summer Basket","/img/items/basket.png","Stay cool with these items"],"604":["Sand Dollar","/img/items/sanddollar.png?1","Actually worthless"],"605":["Clubs","/img/items/card_clubs.png","A card that may be best suited for dancing and beatings?"],"606":["Diamonds","/img/items/card_diamonds.png","A card that may be best suited for gems and baseball?"],"607":["Hearts","/img/items/card_hearts.png","A card that may be best suited for cardiologists and love?"],"608":["Spades","/img/items/card_spades.png","A card that may be best suited for plenty of dirt?"],"610":["Backpack","/img/items/BagsAndBoxes_64_t.png","Full of useful items"],"614":["Soap","/img/items/soap_r.png","Keep it clean"],"616":["Toilet Paper","/img/items/bandages_t_01.png","Where does toilet paper come from? Toiletries"],"618":["Notebook","/img/items/pad_t_01.PNG","Note-taking is an important skill"],"619":["Pencil","/img/items/pencil_t_01.png","A writing utensil"],"621":["Water Bottle","/img/items/water_t_01.png","Please recycle"],"630":["Rice","/img/items/rice.png","No matter if steamed, boiled, or fried, it always hits the spot"],"634":["Mushroom Stew","/img/items/mushroomstew.png","+10% Mastery for 5 minutes"],"635":["Onion Soup","/img/items/onionsoup.png","+10% Exploring XP for 5 minutes"],"636":["Fall Basket","/img/items/fallbasket.png","Pumpkin Kisses and Harvest Wishes"],"641":["Bone Broth","/img/items/bonebroth.png","Useful to cook other things"],"643":["Cat's Meow","/img/items/fishessensestew.png","Multiple bites (manual fishing) for 5 minutes"],"644":["Quandary Chowder","/img/items/corngreens.png","Lemonade/APs more effective for 5 minutes"],"645":["Sea Pincher Special","/img/items/crabclawsoup.png","Fishing Nets/LNs more effective for 5 minutes"],"646":["Shrimp-a-Plenty","/img/items/shrimpgreensmix.png","10% more Silver at Market for 5 minutes"],"647":["Over The Moon","/img/items/leekmeatcorn.png","10% more Friendship XP for 5 minutes"],"653":["Fruit Punch","/img/items/fruitpunch.png","Instant cooking, consumable, one-time use"],"654":["Neigh","/img/items/vegsoup4.png","Cider uses 20% less stamina for 5 minutes"],"656":["Treat Bag 04","/img/items/bag_t_03.png","Full of yummy treats"],"657":["Spooky Cookies","/img/items/854.png","Harvesting while effect is active yields 3x more than normal Effect lasts 5 minutes"],"661":["Breakfast Boost","/img/items/eggsandwich.png","Crops with base growth of 5 mins or less are ready instantly. Effect lasts 2 mins"],"663":["Witch's Broom","/img/items/broom_t_01.png","Slightly cursed"],"671":["Heart Container","/img/items/heartcontainer.png?1","It's dangerous to go alone"],"673":["Lovely Present","/img/items/lpres.png","It is just lovely"],"674":["Christmas Card","/img/items/card_christmas.png","Seasons greetings!"],"679":["Spool of Copper","/img/items/9324.png","A spool of copper wire"],"695":["Gold Sea Crest","/img/items/goldseacrest.png","Super glittery"],"699":["Happy Cookies","/img/items/ccookies.png","Harvesting while effect is active yields 3x more than normal Effect lasts 5 minutes"],"705":["Winter Basket","/img/items/winterbasket.png?2","Everything is cool to the touch"],"706":["Frozen Peas","/img/items/frozenpeas.png","Nasty jaw-breakers"],"707":["Frozen Cabbage","/img/items/frozencabbage.png","Not to be used for ice bowling"],"708":["Frozen Pine","/img/items/frozenpine.png","Always blue"],"710":["Glacierstone","/img/items/icestone.png","Cold as ice"],"715":["Box of Chocolate 02","/img/items/l_06_t.png?1","A lot like life"],"716":["Lovely Cookies","/img/items/lcookies.png","Harvesting while effect is active yields 3x more than normal Effect lasts 5 minutes"],"729":["Spring Seeds","/img/items/seeds_spring.png?1","Harvest every 120 minutes Grows 10x Mixed Flowers"],"738":["Wooden Table","/img/items/3826.png","It is a table made of wood"],"739":["Buddy Doll","/img/items/buddydoll2.png","Gives you comfort"],"742":["Bouquet of Flowers","/img/items/bouquet.png?1","Oh my they smell wonderful"],"745":["Thank You Card","/img/items/card_thankyou.png","Just a small token of appreciation"],"746":["Congratulations Card","/img/items/card_congrats.png","You did something awesome!"],"750":["Capy Birthday Card","/img/items/card_capybirthday.png","Capy Birthday to you!"],"752":["Time Egg","/img/items/timeegg.png","Space and Time bro... Space and Time..."],"753":["Egg Basket","/img/items/eggbasket.png","Contains random eggs in random amounts"],"755":["Hickory Omelette","/img/items/omelet1.png","When active, Sawmill also produces 20% every 10 mins. Effect lasts for 1 hour."],"756":["Crunchy Omelette","/img/items/omelet2.png","When active, collecting from Pets results in 50% more items collected. Effect lasts for 2 minutes."],"761":["Borgen Buck","/img/items/borgenbuck.png","No cash value nor is it legal tender"],"762":["Joker","/img/items/joker.png","A card that may be best suited for jokes and riddles?"],"763":["Piece 23","/img/items/piece23.png?1","A piece to a puzzle..."],"764":["Piece 04","/img/items/piece04.png?1","A piece to a puzzle..."],"765":["Piece 09","/img/items/piece09.png?1","A piece to a puzzle..."],"766":["Stack of Cards","/img/items/stack_cards.png?2","Contains 5 Playing Cards and 25 Gold"],"769":["Piece 26","/img/items/piece26.png?1","A piece to a puzzle..."],"770":["Piece 11","/img/items/piece11.png?1","A piece to a puzzle..."],"771":["Piece 15","/img/items/piece15.png?1","A piece to a puzzle..."],"772":["Bag of Spring Seeds","/img/items/4497.png","Contains 25x Spring Seeds Open at Locksmith"],"777":["Rune Dice","/img/items/1931.png","Magically infused dice"],"778":["Lemon Cream Pie","/img/items/lemoncreampie.png","Allows for 5x AP use per click Effect lasts for 2 minutes."],"779":["Holger's Lunch Box","/img/items/lunchbox2.png?1","Contains an assortment of food for those with big appetites"],"781":["Cabbage Stew","/img/items/greensoup.png","Allows for 5x Cider use per click Effect lasts for 2 minutes."],"784":["Piece 18","/img/items/piece18.png?1","A piece to a puzzle..."],"785":["Ramjoram's Mask","/img/items/ramjorammask.png","You've met with a terrible fate, haven't you?"],"789":["Bomb","/img/items/bomb.png","ACME"],"790":["Beatrix's Big Box of Boom","/img/items/beatrixbox.png?1","Contains an assortment of things that go boom"],"791":["Blue Star Stomper","/img/items/bluefireworks.png","Pyrotechnic device for entertainment"],"792":["Moonbreaker","/img/items/moonbreaker.png","Pyrotechnic device for entertainment"],"796":["Prism Shell","/img/items/prismshell.png?1","Prismatic home of a marine mollusk"],"802":["You Rock Card","/img/items/card_yourock.png","Gneiss job!"],"805":["Apple Core","/img/items/8267.PNG","ewwwwwwwwwww"],"807":["Buddy's School Bag","/img/items/buddybag.png?2","Contains an assortment of school related items"],"809":["Toothbrush","/img/items/brush_t_01.png","Regular dental hygiene is important"],"810":["Protein Bar","/img/items/chocolate_t_01.png","Chocolate Peanut Butter with 8g of complete protein. Increases exploring effectiveness"],"820":["Pickaxe","/img/items/6687.png?2","Rock hates this"],"827":["Raffle Ticket","/img/items/raffleticket.png","A chance to win"],"829":["Apple Basket","/img/items/applebasket.png?2","Contains apples and more"],"830":["Apple Pie","/img/items/applepie2.png","Will greatly increase your Stamina Cap amount"],"831":["Get Well Soon Card","/img/items/card_gws.png","Aw feel better!"],"837":["Linked Lantern","/img/items/mlantern.png?1","Luminously linked lanterns light long lanes!"],"845":["Wooden Button","/img/items/707.png","A fastener"],"846":["Corn Husk Doll","/img/items/856.png","A children's toy"],"862":["Spooky Pie","/img/items/923.png","Scares your crops into dropping everything!"],"863":["Treat Bag 05","/img/items/bag_t_03.png","Full of useful treats"],"865":["Spooky Doll","/img/items/3827.png","Not creepy at all... no sir."],"879":["Bone Pickaxe","/img/items/boneaxe.png?2","The bone handle is more grippy"],"880":["Cornucopia 02","/img/items/cornucopia.png","The horn of plenty"],"881":["Thankful Notes","/img/items/2379.png","A few of my favorite things"],"882":["Bread","/img/items/7200.png","The best thing since sliced... well, itself!"],"883":["Cranberry Juice","/img/items/cranjuice2.png","Extremely refreshing Adds a lot of stamina"],"884":["Void Bag 01","/img/items/voidbag.png","Who put that in the void?"],"887":["Mini Time Egg","/img/items/minitimeegg.png","Less Space and Time bro... Space and Time..."],"888":["Welcome Card","/img/items/card_welcome.png","Welcome to Redbrook! Open this card at the Locksmith for some goodies! (Must be Farming 10 or less to open)"],"921":["Crystal Pickaxe","/img/items/crystalpickaxe.png","Sturdy but slippery"],"922":["Sturdy Pickaxe","/img/items/sturdypickaxe.png","Infused with Stone Shell"],"933":["Re'taw","/img/items/4696.png","The finest water in all of T'rah (According to Borgen)"],"934":["Reindeer Headband","/img/items/horns.png","Does not allow you to fly or pull Santa's sleigh. Looks great though."],"935":["Snowflakes","/img/items/snowflakes.png","Can you spot the differences?"],"936":["Fancy Present","/img/items/gift_2.png","Wrapped so nice and neat"],"962":["Refined Corn Quartz","/img/items/cornquartz2.png","Ether entangled pure corn essence"],"963":["Frozen Chest 01","/img/items/frozen_chest.png","Also known as an Ice Box"],"964":["Frozen Bouquet","/img/items/frozen_flowers.png?1","Frosty elegance"],"965":["Frozen Tomato","/img/items/frozen_tomato.png","Fried Blue Tomatoes"],"966":["Frozen Corn","/img/items/frozen_corn.png","Frosty the Kernel"],"971":["Heart-shaped Gem","/img/items/3495.png","Adds +50 Inventory Cap"],"972":["Heart-shaped Box 01","/img/items/heartshapedbox1.png","She eyes me like a Pisces when I am weak"],"973":["Boltonic Love Potion 4","/img/items/lovepotion.png","This is more than love I feel inside."],"975":["Five Point Mace","/img/items/5046.png","All great plans start with five points."],"979":["Piece 01","/img/items/piece01.png?1","A piece to a puzzle..."],"980":["Piece 03","/img/items/piece03.png?1","A piece to a puzzle..."],"981":["Piece 22","/img/items/piece22.png?1","A piece to a puzzle..."],"982":["Piece 24","/img/items/piece24.png?1","A piece to a puzzle..."],"983":["Piece 30","/img/items/piece30.png?1","A piece to a puzzle..."],"988":["Shillelagh","/img/items/irishstick.png","Made of the finest blackthorn wood"],"989":["Perfect Paint Palette","/img/items/palette.png","There are no mistakes, just happy accidents"],"1014":["Cursed Effigy Head","/img/items/Buddyidolhead.png","What even is this?"],"1015":["Cursed Effigy Body","/img/items/Buddyidolbody.png","What even is this?"],"1016":["Cursed Effigy Hair","/img/items/Buddyidolhair.png","What even is this?"],"1017":["Cursed Effigy Gem","/img/items/Buddyidolgem.png","What even is this?"],"1018":["Cursed Effigy","/img/items/Buddyidol.png","What even is this?"],"1021":["Egg of Air","/img/items/airegg.png","A strange, magical Egg"],"1022":["Egg of Chaos","/img/items/chaosegg.png","A strange, magical Egg"],"1023":["Egg of Earth","/img/items/earthegg.png","A strange, magical Egg"],"1024":["Egg of Fire","/img/items/fireegg.png","A strange, magical Egg"],"1025":["Egg of Life","/img/items/lifeegg.png","A strange, magical Egg"],"1026":["Egg of Light","/img/items/lightegg.png","A strange, magical Egg"],"1027":["Egg of Shadow","/img/items/shadowegg.png","A strange, magical Egg"],"1028":["Egg of Space","/img/items/spaceegg.png","A strange, magical Egg"],"1029":["Egg of Ages","/img/items/timeegg2.png","A strange, magical Egg"],"1030":["Egg of Water","/img/items/wateregg.png","A strange, magical Egg"],"1031":["Magical Egg Basket","/img/items/mageggbasket.png","Contains random magical eggs in random amounts"],"1032":["Magical Chest 01","/img/items/magicchest01.png","Full of magical goodness"],"1033":["Kite Kite","/img/items/birdkite.png","Requires wind beneath its wings"],"1039":["Birthday Surprise Box 03","/img/items/bsb01.png","Open to receive a random Starter Pack from the past"],"1042":["Cricket","/img/items/cricket.png","Chirp."],"1081":["Supply Voucher","/img/items/voucher.png","50% off next Farm Supply purchase (Maximum 200 Gold Discount)"],"1082":["Rosalie's Beach Tote","/img/items/tote1.png","Full of sand toys and joy"],"1083":["Sand Shovel","/img/items/sand_shovel.png","Required to build the most epic sand castles"],"1084":["Sand Castle Bucket","/img/items/sand_castle_bucket.png","Turns sand into mini-kingdoms"],"1090":["Safety Goggles","/img/items/2129.png","Eye protection"],"1091":["Beatrix's Booming Brawl Box 01","/img/items/bfw.png","Keep out of reach of children"],"1092":["Prune Juice","/img/items/prunejuice.png","A warrior's drink. Resets grape juice used count"],"1093":["Green Torpedo","/img/items/greenfw.png","Pyrotechnic device for entertainment"],"1097":["Event Token","/img/items/token.png","Earned during special events"],"1101":["Supply Crate 01","/img/items/BagsAndBoxes_17_t.png","A large amount of exploration items"],"1102":["Supply Crate 02","/img/items/BagsAndBoxes_17_t.png","A large amount of fishing items"],"1103":["Baba Cola","/img/items/babacola.png","Carbonated Cabbage Cola for Cool Kids. Sets Townsfolk of the Day"],"1104":["Baba's Snack Pack","/img/items/babasnack.png","Condensed Cabbage and Protein in a box"],"1105":["YoYo","/img/items/yoyo.png","Buzz, I was a YoYo!"],"1106":["Mixed Nuts","/img/items/nuts.png","From mixed trees"],"1107":["Apple Turnover","/img/items/appleturnover.png","Flaky, golden goodness. Accept Exchange Center offers again"],"1109":["Apple Crate 01","/img/items/applecrate.png","Full of apple related items"],"1110":["Apple Slicer","/img/items/applecutter.png","by Simply Borgen"],"1111":["Steel Pickaxe","/img/items/5296b.png","Tough as steel"],"1123":["Pumpkin Juice","/img/items/8874.png","Hauntingly good Increases Mastery"],"1124":["Treat Bag 06","/img/items/bag_t_03.png","Full of useful treats"],"1125":["Gummy Globber","/img/items/candyfish.png","Röd fisk"],"1126":["Thomas's Cup of PB","/img/items/pbcup.png","There's only one right way to eat a Thomas's"],"1143":["Zombie Buddy Doll","/img/items/zbuddy.png","In search of grrrrraaaaains"],"1145":["Vampire Buddy Doll","/img/items/vbuddy.png","Keep away from pointy sticks"],"1146":["Ghost Buddy Doll","/img/items/gbuddy.png","Boo-dy"],"1147":["Werewolf Buddy Doll","/img/items/wbuddy.png","Team Jacob"],"1149":["Turkey Buddy Doll","/img/items/tbuddy.png","Gobble gobble"],"1150":["Movember Buddy Doll","/img/items/mbuddy.png","Blue ox doll sold separately"],"1156":["Shiny Present","/img/items/shinypresent.png","So shiny and nice!"],"1157":["Festive Eggnog","/img/items/eggnog.png","The nogs are finally in season. Mariya's delicious take on a classic beverage."],"1158":["Nut Cracker Buddy","/img/items/nutcrackerbuddy.png","Odd thrift store find"],"1159":["Nut Cracker Buddy Doll","/img/items/cbuddy.png","Not to be confused with Nut Cracker Buddy"],"1160":["Krampus Buddy Doll","/img/items/kbuddy.png","You better be nice"],"1161":["Santa Buddy Doll","/img/items/sbuddy.png","Hur Hur Hur"],"1162":["Rudolph Buddy Doll","/img/items/rbuddy.png","Will get you through any storm"],"1164":["Holiday Garland","/img/items/garland.png","Bright and Festive"],"1170":["Maverick Chip","/img/items/Maverick_coin.png","Resets cheat count in Buddy Jack"],"1171":["Frozen Radish","/img/items/frozen_radish.png","Blue Meat"],"1172":["Lucky Cat Buddy Doll","/img/items/Manekinekobuddydoll.png","Brings good luck"],"1173":["Snowman Buddy Doll","/img/items/Snowman_Buddy_doll.png","Might melt in the spring"],"1174":["Frozen Buddy Doll","/img/items/Buddy_doll_frozen.png","Keeps your drinks cold"],"1175":["Frozen Chest 02","/img/items/frozen_chest.png","Also known as an Ice Box"],"1176":["Fish Biscuit","/img/items/fish_biscuit.png","Polar Bears love these"],"1179":["Gary's Crushroom Key","/img/items/mushroomkey.png","For gains"],"1187":["Heart-shaped Box 02","/img/items/heartshapedbox1.png","I've been locked inside your heart-shaped box for weeks"],"1188":["Gare Bear","/img/items/buffteddy2.png","When in doubt, work out!"],"1189":["Heart Candies","/img/items/heartcandies.png","Heart-shaped sweets"],"1190":["Cupid Buddy Doll","/img/items/buddydoll_cupid.png","Find that special someone"],"1191":["Groundhog Buddy Doll","/img/items/buddydoll_groundhog.png","Bellwether Buddy"],"1194":["Spring Basket 02","/img/items/springbasket.png","Spring is in the air"],"1195":["Hummingbird Feeder","/img/items/hummingbird_feeder.png","Full of sweet nectar that hummingbirds love"],"1197":["Leprechaun Buddy Doll","/img/items/leafymcluckybuddydoll.png","Lucky Charm"],"1198":["Tanooki Buddy Doll","/img/items/tanooki_buddy_doll.png","Raccoon Dog"],"1202":["Magical Chest 02","/img/items/magicchest01.png","Full of magical goodness"],"1203":["Lemon Seltzer","/img/items/lemonseltzer.png","Refreshing and crisp with a hint of lemon Increases effectiveness of Lemonade and Arnold Palmers"],"1204":["Nirumdivar","/img/items/stave1.png","Stave of the Black Depths"],"1206":["frank's Bunny Mask","/img/items/afk_8744.png","Why are you wearing that silly human suit?"],"1208":["Green Butterfly","/img/items/afk_8578g.png","I'm a beautiful butterfly!"],"1212":["Fuzzy Chick 01","/img/items/fuzzychick1pink.png","Fuzzy and adorable"],"1214":["Fuzzy Chick 02","/img/items/Fuzzychick2.png","Fuzzy and adorable"],"1215":["Fuzzy Chick 03","/img/items/Fuzzychick3green.png","Fuzzy and adorable"],"1216":["Fuzzy Chick 04","/img/items/Fuzzychick3yellow.png","Fuzzy and adorable"],"1217":["Fuzzy Chick 05","/img/items/Fuzzychick1blue.png","Fuzzy and adorable"],"1218":["Fuzzy Chick 06","/img/items/Fuzzychick3.png","Fuzzy and adorable"],"1219":["Fuzzy Chick 07","/img/items/Fuzzychick2green.png","Fuzzy and adorable"],"1220":["Fuzzy Chick 08","/img/items/Fuzzychick1.png","Fuzzy and adorable"],"1221":["Fuzzy Chick 09","/img/items/Fuzzychick2pink.png","Fuzzy and adorable"],"1222":["Fuzzy Chick 10","/img/items/Fuzzychick1green.png","Fuzzy and adorable"],"1223":["Fuzzy Chick 11","/img/items/Fuzzychick2yellow.png","Fuzzy and adorable"],"1224":["Fuzzy Chick 12","/img/items/Fuzzychick3blue.png","Fuzzy and adorable"],"1228":["Fuzzy Egg","/img/items/fuzzychickegg.png","Contains random fuzzy chicks in random amounts"],"1233":["Birthday Surprise Box 04","/img/items/bsb01.png","Open to receive a random Starter Pack from the past"],"1238":["Pet Treat","/img/items/pettreat.png","Pets love these! Pet will bring you items immediately"],"1239":["Shark Jaws","/img/items/370.png","Duuuun... dun... Duun... dun... Dun-dun-dun-dun-dun-dun-dun-dun... DUUUUUUUUNNNNNNNNN!!!"],"1244":["Buddy's Beach Bag","/img/items/buddybag2.png","Full of stuff Buddy needs for the beach"],"1245":["Sunscreen","/img/items/sunscreen.png","50 SPF"],"1246":["Sun Shades","/img/items/4221.png","Cruise approved"],"1261":["Beatrix's Booming Brawl Box 02","/img/items/fireworks_box_2.png","Keep out of reach of children"],"1262":["Safety Mask","/img/items/2755.png","Face protection"],"1263":["The Big One","/img/items/redrocket.png","Extremely dangerous. Keep out of reach from children."],"1264":["Event Token Purse","/img/items/BagsAndBoxes_46_t.png","Contains 200 Event Tokens"],"1269":["Fish and Chips","/img/items/fishnchips.png","Greatly increases XP earned from each cooking action"],"1270":["Thomas's Tavern Tote","/img/items/7307.png","Good food and good times"],"1275":["Happy Farmiversary Card","/img/items/card_farmiversary.png","What a long strange trip it's been, but we're glad you're here!"],"1276":["Sugar Cane","/img/items/scane.png","Looks like bamboo, tastes like candy"],"1279":["Apple Ant","/img/items/apple_ant.png","A giant, but tasty ant that hatches in September"],"1280":["Apple Crate 02","/img/items/applecrate.png","Full of apple related items"],"1281":["Apple Picker","/img/items/applepicker.png","by Simply Borgen"],"1285":["Bar of Silver","/img/items/silverbar.png","Expensive paperweight"],"1293":["Tower Prep Pack 01","/img/items/1570.png","Full of items to assist in Tower climbing"],"1304":["Acorn Pie","/img/items/acorn_pie.png","Trackers discovered to their dismay how much certain wildlife loved this treat from southern T'rah"],"1309":["Ghost Candy","/img/items/ghost_candy.png","Ghastly delicious"],"1313":["Pumpkin Spiced Milk","/img/items/Psm2.png","A warm autumn fire in a glass. Shaken, not stirred."],"1314":["Bag of Ghost Candy","/img/items/ghost_candy_bag.png","Hauntingly good Used to unlock Halloween pet art variants and emblems in the Emblem Shop"],"1321":["Travel Voucher","/img/items/4876.png","Creates a 48 hour charter or expedition"],"1323":["Cornucopia 03","/img/items/cornucopia.png","The horn of plenty"],"1324":["Gravy Boat","/img/items/gravyboat.png","Toot toot! Here comes the gravy boat!"],"1326":["Giving Box 01","/img/items/nicebox1.png","Your purchase helps make the world a little brighter! (Details in November)"],"1337":["Holiday Cheer Bundle 01","/img/items/holidaycheerbundle.png","Brings a smile to your face"],"1338":["Holiday Cake","/img/items/treecake.png","A festive little cake shaped like a tree"],"1339":["Box of Holiday Cakes","/img/items/treecakebox.png","Lil' Buddy Holiday Cakes So yummy!"],"1341":["Buddy Elf on a Shelf","/img/items/belfonashelf.png","Odd thrift store find"],"1347":["Frozen Hops","/img/items/frozen_hops.png","Blue Moon"],"1348":["Ice Scraper","/img/items/ice_scraper.png","Winter debuff"],"1349":["Frozen Chest 03","/img/items/frozenchest.png","Also known as an Ice Box"],"1352":["Swamp Puzzle","/img/items/puzzle3.png","A completed puzzle of a swamp"],"1353":["Swamp Algae","/img/items/swampalgae.png","It slowly pulses in your hand"],"1359":["Glowshroom","/img/items/glowshroom.png","A small mushroom that gives off a faint glow"],"1361":["Sporefly","/img/items/1916.png","Known for a painful sting and itchy bite"],"1370":["Slobster","/img/items/goobster.png","A slime emitting crustacean"],"1371":["Slime Egg Shell","/img/items/afk_8847.png","Remains of a slimey egg ...but what hatched?"],"1378":["Mini Slime Squid","/img/items/3992.png","The smaller version"],"1383":["Gold Slimeback","/img/items/goldslimeback.png","Still slimey"],"1384":["Swamp Gourd","/img/items/finp_382.png","Some people use these as wind chimes"],"1428":["Gold Aquamarine Ring","/img/items/goldaqring.png","The bluest of bling on a gold ring"],"1437":["Veggie Juice","/img/items/8879.png","Should've drank a veggie juice"],"1443":["PHR Voucher","/img/items/viri_3437.png","Adds 5 more PHRs instantly"],"1444":["Heart-shaped Box 03","/img/items/heartshapedbox1.png","I've been drawn into your magnet tar pit trap"],"1445":["Lovely Rose","/img/items/afk_9604.png","It's just so lovely dear"],"1448":["Picnic Basket 01","/img/items/picnicbasket.png","Full of helpful items Includes Meals, Orange Juices Large Nets, Arnold Palmers Grape Juice and a Mini Time Egg"],"1449":["Piece 12","/img/items/piece12.png?1","A piece to a puzzle..."],"1450":["Piece 07","/img/items/piece07.png?1","A piece to a puzzle..."],"1451":["Piece 31","/img/items/piece31.png?1","A piece to a puzzle..."],"1452":["Sugar Cube","/img/items/sugar_cube.png","A certain equus caballus loves these"],"1455":["Egg of Tree","/img/items/egg_of_tree.png","Just a hatchling"],"1456":["Spring Basket 03","/img/items/springbasket.png","Spring is in the air"],"1457":["Shamrock Milk","/img/items/shamrock_milk.png","Luck +10"],"1458":["Leprechaun Hat","/img/items/Leprechaun_hatnew.png","Boosts confidence and nullifies cold"],"1466":["Harvest Bundle 01","/img/items/harvest_bundle.png","Full of helpful items Includes Meals, Grape Juices etc"],"1467":["Sun Egg","/img/items/egg_sun.png","Don't stare too long"],"1468":["Moon Egg","/img/items/egg_moon.png","Made of cheese"],"1469":["Planet Egg","/img/items/egg_planet.png","Do not drop. Seriously."],"1470":["Black Hole Egg","/img/items/egg_black_hold.png","Aka Void Egg"],"1471":["Asteroid Egg","/img/items/egg_asteroid.png","+100 Dexterity (DEX)"],"1472":["Comet Egg","/img/items/egg_comet.png","Blink and you'll miss it"],"1473":["Nebula Egg","/img/items/egg_nebula.png","Hides the Nexus"],"1474":["Garden Claw","/img/items/garden_claw.png","by Simply Borgen"],"1475":["Garden Trowel","/img/items/trowel.png","by Simply Borgen"],"1476":["Garden Crate 01","/img/items/garden_crate.png","Full of useful items"],"1490":["Birthday Surprise Box 05","/img/items/bsb01.png","Open to receive a random Starter Pack from the past"],"1496":["Red Velvet Cake","/img/items/Red_velvet.png","Smells a little fishy..."],"1503":["Fish Flakes","/img/items/fish_flakes.png","Makes fish go crazy"],"1505":["Coconut Water","/img/items/1922.png","Simply refreshing"],"1514":["Safety Headgear","/img/items/safety_helmet.png","Head protection"],"1515":["Hornworm","/img/items/hornworm.png","Pesky little thing. Loves tomatoes."],"1522":["Temple Voucher","/img/items/7901.png","Resets a Sacrificial Chain in the Temple of Reward"],"1532":["Glyph Sphere","/img/items/glyphsphere.png","Stay away from the summoner!"],"1537":["Heavy Pickaxe","/img/items/heavypickaxe.png","Requires great strength"],"1554":["Mining Bag 01","/img/items/miningbag01.png","Open for random mining equipment"],"1555":["Mining Bag 02","/img/items/miningbag02.png","Open for random mining equipment"],"1556":["Mining Bag 03","/img/items/miningbag03.png","Open for random mining equipment"],"1594":["Detonator","/img/items/viri_4128.png","Explosive's best friend"],"1605":["Ancient Pickaxe","/img/items/ancient_pickaxe.png?2","Made of ancient components"],"1615":["Cookie Jar 01","/img/items/cookie_jar.png","Give in to temptation for a random cookie Open it at the Locksmith in Town"],"1616":["Takeout Bag 01","/img/items/Takeout_bag.png","Contains a random meal to feed your hunger Open it at the Locksmith in Town"],"1617":["Takeout Bag 02","/img/items/Takeout_bag.png","Contains a random meal to feed your hunger Open it at the Locksmith in Town"],"1619":["Egg of Oddvocado","/img/items/Egg_of_oddvocado.png","Freeesh avacadoooo"],"1629":["Wyvern Priestess Mask","/img/items/883_ghe.png","Possibly dangerous and resistant to magic"],"1639":["Mashed Potatoes","/img/items/mashed_potatoes.png","Po-tay-toes!"]};
const NPCS = {"merchant.png":{"name":"Baba Gec","best":[],"loves":[67,781,707,587,845],"likes":[50,33,193,284],"hates":[283,40,18],"xp":{"671":10000000,"742":1000}},"a_011.png":{"name":"Beatrix","best":[],"loves":[104,105,106,452,185],"likes":[111,144,103,236,46,303],"hates":[286,191,283,18],"xp":{"671":10000000,"742":1000}},"borgen.png":{"name":"Borgen","best":[],"loves":[123,186,458,266,37],"likes":[78,159,189,161,85,302],"hates":[203,191,116,53,488,18],"xp":{"671":10000000,"742":1000}},"buddy.png":{"name":"Buddy","best":[],"loves":[739,298,258,246,53,488],"likes":[113,23,287,157,277,43,284,362],"hates":[39,17,191,62,86,11,412,18],"xp":{"671":10000000,"742":1000}},"captainlogan.png":{"name":"Captain Logan","best":[],"loves":[],"likes":[],"hates":[],"xp":{"671":10000000,"742":1000}},"Captthomas.png":{"name":"Captain Thomas","best":[],"loves":[194,458,460,457,500,1370],"likes":[57,192],"hates":[31,362,18],"xp":{"671":10000000,"742":1000}},"a_027.png":{"name":"Cecil","best":[],"loves":[1428,382,283,110,135,116,282,427],"likes":[41,287,120,260,302,284],"hates":[42,85,43,18],"xp":{"671":10000000,"742":1000}},"npc_horse.png":{"name":"Charles Horsington III","best":[],"loves":[188,44,379,483,159,217,586,1452,488],"likes":[187,19,382,163],"hates":[57,113,186,56,191,62,86,284,362,40,18],"xp":{"671":10000000,"742":1000}},"cid.png":{"name":"Cid","best":[],"loves":[789,606,106,634,1090,362],"likes":[104,171,77,40],"hates":[186,18],"xp":{"671":10000000,"742":1000}},"robot_05.png":{"name":"FR4NK","best":[],"loves":[],"likes":[],"hates":[18],"xp":{"671":10000000,"742":1000}},"npc_bunny1.png":{"name":"frank","best":[],"loves":[67,19,159],"likes":[535,171,23,285,42,382],"hates":[26,286,43,27,63,18],"xp":{"671":10000000,"742":1000}},"bear_01.png":{"name":"Gary Bearson V","best":[1188],"loves":[379,457,427,802],"likes":[42,303,63],"hates":[104,23,109,31,15,18],"xp":{"1188":100000000,"671":10000000,"742":1000}},"npc_beast.png":{"name":"Geist","best":[796],"loves":[458,463,645,646],"likes":[57,56,134,24],"hates":[237,104,106,277,18],"xp":{"796":100000000,"671":10000000,"742":1000}},"a_034.png":{"name":"George","best":[989],"loves":[379,144,109,505,362],"likes":[108,111,78,46,634,84],"hates":[113,186,45,18],"xp":{"989":100000000,"671":10000000,"742":1000}},"ghorgen.png":{"name":"Ghorgen","best":[],"loves":[],"likes":[],"hates":[],"xp":{"671":10000000,"742":1000}},"slime.png":{"name":"Goostav","best":[],"loves":[1359,1383,1378,1371,1384],"likes":[492,479,1208,302,284,1361,1353],"hates":[305,304,387,888,18],"xp":{"671":10000000,"742":1000}},"a_028.png":{"name":"Holger","best":[],"loves":[457,114,505,48,738],"likes":[379,108,131,132,186,164,25,634,586,27,63],"hates":[41,85,488,18],"xp":{"671":10000000,"742":1000}},"a_024.png":{"name":"Jill","best":[962],"loves":[65,846,110,135,75,586,24],"likes":[186,120,85,116,601,15],"hates":[191,46,412,362,134,18],"xp":{"962":100000000,"671":10000000,"742":1000}},"buddyl.png":{"name":"Leafy McLucky","best":[],"loves":[188,512],"likes":[187,203,74],"hates":[44,18],"xp":{"742":1000,"671":10000000}},"a_088.png":{"name":"Lorn","best":[],"loves":[78,161,85,141,58],"likes":[187,379,23,74,185,130,27,73],"hates":[39,116,284,362,18],"xp":{"671":10000000,"742":1000}},"mariya.png":{"name":"Mariya","best":[],"loves":[643,118,634,635,647,644,645,646,15],"likes":[29,13,26,185,85,586,31],"hates":[104,106,362,18],"xp":{"671":10000000,"742":1000}},"mummy_t_01.png":{"name":"Mummy","best":[],"loves":[113,1313,362,616,372,488],"likes":[45,236,360,364,427],"hates":[483,186,103,17,412,18],"xp":{"671":10000000,"742":1000}},"ragvin.png":{"name":"Ragvin","best":[],"loves":[123,114],"likes":[61,258],"hates":[43,18],"xp":{"671":10000000,"742":1000}},"npc_figure2.png":{"name":"Ric Ryph","best":[975],"loves":[512,236,75,238],"likes":[108,104,23,144,103,74,116,76],"hates":[41,285,186,260,85,488,18],"xp":{"975":99999999,"671":10000000,"742":1000}},"robot_02.png":{"name":"ROOMBA","best":[962],"loves":[144,215,601],"likes":[78,236,600],"hates":[187,91,108,111,85,412,18],"xp":{"962":100000000,"671":10000000,"742":1000}},"a_098.png":{"name":"Rosalie","best":[],"loves":[535,483,316,159,203,537,536,96,488],"likes":[44,379,41,19,285,452,185,53],"hates":[132,103,286,45,191,283,130,116,362,18],"xp":{"671":10000000,"742":1000}},"lornsanta.png":{"name":"Santa","best":[],"loves":[447,444,445,441,440,446,442,443],"likes":[85,412],"hates":[103,362,18],"xp":{"671":10000000,"742":1000}},"npc_figure.png":{"name":"Star Meerif","best":[785],"loves":[171,172,837],"likes":[26,42],"hates":[113,186,191,130,62,80,86,18],"xp":{"785":100000000,"671":10000000,"742":1000}},"a_048.png":{"name":"Thomas","best":[],"loves":[481,194,173,458,457,463],"likes":[132,17,277,185,25,498,192],"hates":[26,203,50,18],"xp":{"671":10000000,"742":1000}},"a_047.png":{"name":"Vincent","best":[],"loves":[512,379,237,86,75,635,84,300],"likes":[91,44,186,46,164,118,238,37],"hates":[41,53,73,141,488,18],"xp":{"671":10000000,"742":1000}}};
const LEVEL_XP = [0,1250,3750,7250,11750,17750,25250,34250,45250,58250,71399,98983,115359,133634,154028,176787,202186,230531,262164,297466,336863,380830,429897,484655,545764,613961,690068,775003,869790,975572,1093624,1225370,1372398,1536481,1700564,1883680,2088037,2316099,2570616,2854656,3171644,3525402,3920195,4360783,4852479,5401211,6013595,6697015,7459711,8310879,9260782,10320873,11503934,12824230,14297680,15942050,17777166,19825155,22110710,24661389,27507946,30684703,34229963,38186473,42601938,47529596,53666776,60515868,68159454,76689695,86209443,96833481,108689907,121921678,136688334,153167922,171559142,192083743,214989197,240551683,269079417,300916368,336446405,376097926,420349023,469733247,524846040,586351916,654992473,731595334,817084126,914489617,1018962144,1137785484,1270392331,1418381572,1583537564,1767851651,2000000000];
const CONTAINERS = {"511":[10,0,0,[]],"454":[100,0,0,[]],"510":[25,0,0,[]],"512":[5,0,0,[]],"509":[50,0,0,[]],"829":[25,0,5,[[44,200,200],[830,1,1],[827,10,10],[379,10,10],[805,2,2]]],"1109":[25,0,7,[[830,1,1],[1110,1,1],[827,10,10],[805,3,3],[379,25,25],[44,200,200],[1107,3,3]]],"1280":[25,0,11,[[1110,1,1],[379,50,50],[44,200,200],[739,1,1],[805,5,5],[830,1,1],[1107,3,3],[1281,1,1],[1285,1,1],[827,10,10],[1279,5,5]]],"1104":[25,0,9,[[884,3,3],[1106,1,1],[186,3,3],[781,1,1],[716,1,1],[67,30,30],[1103,3,3],[1105,1,1],[810,2,2]]],"610":[25,0,12,[[427,10,10],[145,10,10],[44,25,25],[95,50,50],[75,100,100],[117,50,50],[392,10,10],[606,1,1],[605,1,1],[608,1,1],[607,1,1],[508,10,10]]],"1314":[0,0,2,[[370,1,1],[1309,100,100]]],"422":[0,0,5,[[338,5,5],[172,5,5],[150,1,1],[228,1,1],[270,1,1]]],"698":[0,0,5,[[397,3,3],[500,10,10],[508,10,10],[699,2,2],[398,3,3]]],"1610":[0,1,1,[[933,10,3000]]],"940":[0,0,1,[[412,400,400]]],"772":[0,0,1,[[729,25,25]]],"1230":[0,1,5,[[277,10,250],[191,10,250],[18,10,250],[498,10,250],[192,10,250]]],"790":[25,0,7,[[792,10,10],[791,25,25],[105,200,200],[104,200,200],[789,10,10],[452,100,100],[106,200,200]]],"1091":[25,0,9,[[1093,5,5],[112,10,10],[1092,4,4],[105,250,250],[452,150,150],[1090,2,2],[106,250,250],[791,30,30],[792,15,15]]],"1261":[25,0,11,[[584,5,5],[452,150,150],[548,5,5],[789,5,5],[791,40,40],[792,20,20],[1093,10,10],[1263,2,2],[1262,1,1],[1264,3,3],[1092,5,5]]],"1513":[25,0,13,[[584,5,5],[452,150,150],[548,5,5],[789,5,5],[791,50,50],[792,30,30],[1093,20,20],[1263,3,3],[1264,3,3],[1515,7,7],[1514,1,1],[1081,1,1],[1092,2,2]]],"547":[0,0,8,[[61,200,200],[62,200,200],[120,200,200],[117,200,200],[194,100,100],[379,25,25],[508,10,10],[44,200,200]]],"1039":[0,1,23,[[1032,1,2],[610,1,2],[656,1,2],[519,1,2],[603,1,2],[636,1,2],[673,1,2],[705,1,2],[766,1,2],[790,1,2],[829,1,2],[880,1,2],[863,1,2],[936,1,2],[963,1,2],[972,1,2],[494,1,2],[377,1,2],[779,1,2],[1039,1,1],[807,1,2],[715,1,2],[483,1,2]]],"1233":[0,1,33,[[1032,1,2],[610,1,2],[656,1,2],[519,1,2],[603,1,2],[636,1,2],[673,1,2],[705,1,2],[766,1,2],[790,1,2],[829,1,2],[880,1,2],[863,1,2],[936,1,2],[963,1,2],[972,1,2],[1091,1,2],[1082,1,2],[1104,1,2],[1156,1,2],[1194,1,2],[1124,1,2],[1175,1,2],[1233,1,1],[1202,1,2],[494,1,2],[377,1,2],[779,1,2],[807,1,2],[1187,1,2],[1109,1,2],[715,1,2],[483,1,2]]],"1490":[0,1,43,[[1032,1,2],[1490,1,1],[610,1,2],[656,1,2],[519,1,2],[636,1,2],[603,1,2],[673,1,2],[705,1,2],[766,1,2],[790,1,2],[829,1,2],[863,1,2],[880,1,2],[936,1,2],[972,1,2],[963,1,2],[1091,1,2],[1082,1,2],[1104,1,2],[1124,1,2],[1156,1,2],[1194,1,2],[1175,1,2],[1202,1,2],[1261,1,2],[1270,1,2],[1244,1,2],[1280,1,2],[1337,1,2],[1349,1,2],[1323,1,2],[1444,1,2],[1476,1,2],[1456,1,2],[494,1,2],[377,1,2],[779,1,2],[807,1,2],[1187,1,2],[1109,1,2],[715,1,2],[483,1,2]]],"861":[0,1,12,[[253,1,3],[657,1,1],[323,10,100],[347,10,400],[716,1,1],[761,1,10],[762,1,1],[699,1,1],[573,10,100],[346,10,100],[363,10,100],[508,10,600]]],"483":[25,0,5,[[44,5,5],[121,1,1],[316,1,1],[354,1,1],[112,1,1]]],"715":[25,0,7,[[716,1,1],[536,5,5],[379,5,5],[488,5,5],[500,5,5],[538,3,3],[44,50,50]]],"1339":[0,0,2,[[1157,1,1],[1338,10,10]]],"1297":[0,1,10,[[1145,1,1],[1159,1,1],[1160,1,1],[1162,1,1],[1161,1,1],[1143,1,1],[1150,1,1],[1149,1,1],[1147,1,1],[1146,1,1]]],"1318":[0,1,7,[[1190,1,1],[1198,1,1],[1197,1,1],[1173,1,1],[1172,1,1],[1191,1,1],[1174,1,1]]],"1244":[25,0,10,[[379,25,25],[500,25,25],[1083,1,1],[1084,1,1],[1081,1,1],[1245,1,1],[1246,1,1],[1239,1,1],[1238,12,12],[84,100,100]]],"807":[25,0,6,[[621,1,1],[810,3,3],[809,2,2],[44,50,50],[618,1,1],[619,1,1]]],"1043":[0,1,15,[[287,1,10],[498,1,10],[277,1,10],[282,1,10],[283,1,10],[284,1,10],[285,1,10],[286,1,10],[376,1,10],[382,1,10],[383,1,10],[362,1,10],[1042,1,10],[384,1,10],[599,1,10]]],"399":[50,0,0,[]],"429":[0,0,2,[[84,20,20],[86,20,20]]],"430":[0,0,3,[[194,30,30],[242,30,30],[44,30,30]]],"431":[0,0,4,[[170,40,40],[46,40,40],[65,40,40],[187,40,40]]],"432":[0,0,5,[[84,50,50],[194,50,50],[86,50,50],[123,50,50],[426,50,50]]],"433":[0,0,6,[[11,60,60],[19,60,60],[27,60,60],[13,60,60],[31,60,60],[29,60,60]]],"434":[100,0,0,[]],"435":[0,0,8,[[119,80,80],[133,80,80],[100,80,80],[173,80,80],[99,80,80],[141,80,80],[98,80,80],[101,80,80]]],"436":[0,0,9,[[412,90,90],[123,90,90],[170,90,90],[75,90,90],[53,90,90],[326,90,90],[63,90,90],[85,90,90],[15,90,90]]],"437":[0,0,10,[[44,100,100],[120,100,100],[61,100,100],[62,100,100],[285,100,100],[110,100,100],[41,100,100],[94,100,100],[43,100,100],[282,100,100]]],"438":[0,0,4,[[112,11,11],[197,11,11],[121,11,11],[137,11,11]]],"439":[150,0,0,[]],"419":[0,0,4,[[446,1,1],[401,3,3],[44,3,3],[426,3,3]]],"1592":[25,0,12,[[379,125,125],[106,100,100],[368,200,200],[789,25,25],[830,1,1],[1107,3,3],[1285,1,1],[1554,5,5],[1555,5,5],[1556,5,5],[1594,1,1],[827,10,10]]],"1615":[0,1,3,[[699,1,1],[716,1,1],[657,1,1]]],"602":[0,0,8,[[221,1,1],[177,25,25],[375,1,1],[305,25,25],[186,5,5],[123,100,100],[475,10,10],[112,2,2]]],"377":[25,0,9,[[281,3,3],[71,3,3],[120,10,10],[69,1,1],[65,25,25],[44,25,25],[373,1,1],[91,50,50],[61,10,10]]],"880":[25,0,9,[[745,5,5],[281,25,25],[69,75,75],[71,50,50],[881,2,2],[373,3,3],[883,1,1],[44,100,100],[65,100,100]]],"1323":[25,0,9,[[1324,2,2],[881,2,2],[65,100,100],[1081,1,1],[883,1,1],[500,50,50],[508,50,50],[1321,3,3],[373,10,10]]],"1637":[25,0,12,[[883,1,1],[379,125,125],[69,25,25],[112,3,3],[1324,3,3],[1437,25,25],[1522,1,1],[1639,2,2],[1615,1,1],[1616,10,10],[1092,1,1],[1617,10,10]]],"548":[0,0,6,[[379,10,10],[508,5,5],[84,100,100],[112,5,5],[86,50,50],[185,10,10]]],"753":[0,1,12,[[523,1,5],[524,1,5],[518,1,5],[522,1,5],[526,1,5],[528,1,5],[529,1,5],[530,1,5],[531,1,5],[521,1,5],[525,1,5],[527,1,5]]],"1264":[0,0,1,[[1097,200,200]]],"636":[25,0,8,[[634,2,2],[373,2,2],[69,2,2],[44,50,50],[71,5,5],[254,2,2],[281,5,5],[635,3,3]]],"936":[25,0,8,[[674,3,3],[761,1,1],[84,100,100],[508,10,10],[935,100,100],[934,2,2],[500,10,10],[379,10,10]]],"519":[25,0,6,[[44,25,25],[518,1,1],[20,12,12],[171,5,5],[53,3,3],[520,1,1]]],"1148":[0,1,6,[[962,1,3],[796,1,3],[671,1,3],[989,1,3],[785,1,3],[975,1,3]]],"963":[25,0,10,[[966,3,3],[500,5,5],[508,5,5],[965,30,30],[964,2,2],[933,10,10],[708,5,5],[706,50,50],[707,10,10],[412,100,100]]],"1175":[25,0,10,[[810,1,1],[707,10,10],[1170,5,5],[1171,50,50],[379,5,5],[84,25,25],[412,100,100],[1176,1,1],[965,30,30],[739,1,1]]],"1349":[25,0,11,[[379,125,125],[84,125,125],[412,100,100],[500,125,125],[739,1,1],[887,1,1],[1176,1,1],[1238,12,12],[1348,2,2],[1347,50,50],[508,125,125]]],"1228":[0,1,12,[[1212,1,3],[1215,1,3],[1218,1,3],[1221,1,3],[1222,1,3],[1216,1,3],[1219,1,3],[1214,1,3],[1217,1,3],[1220,1,3],[1223,1,3],[1224,1,3]]],"1489":[0,1,7,[[1471,1,3],[1467,1,3],[1473,1,3],[1472,1,3],[1470,1,3],[1469,1,3],[1468,1,3]]],"1476":[25,0,10,[[1475,1,1],[1448,1,1],[1031,10,10],[753,10,10],[1228,10,10],[1466,1,1],[1203,10,10],[884,25,25],[1470,1,1],[1474,1,1]]],"329":[0,0,6,[[62,25,25],[61,25,25],[120,25,25],[194,25,25],[123,50,50],[44,25,25]]],"490":[0,0,6,[[61,100,100],[44,100,100],[62,100,100],[120,100,100],[123,100,100],[194,100,100]]],"1326":[0,0,6,[[379,250,250],[112,25,25],[84,250,250],[508,250,250],[500,250,250],[1092,2,2]]],"1296":[0,0,5,[[190,50,50],[162,80,80],[160,100,100],[158,200,200],[352,40,40]]],"330":[0,1,7,[[41,10,50],[189,10,50],[187,10,50],[113,10,50],[107,10,25],[43,10,50],[48,10,50]]],"334":[0,1,9,[[277,10,25],[199,1,10],[164,10,25],[282,10,25],[123,10,25],[170,10,25],[286,10,25],[287,10,25],[284,10,25]]],"396":[0,1,8,[[262,10,25],[161,10,25],[157,10,50],[172,10,25],[281,10,25],[347,1,7],[159,10,25],[189,10,25]]],"397":[0,1,10,[[147,1,2],[148,1,2],[149,1,2],[150,1,2],[152,1,2],[153,1,2],[154,1,2],[155,1,2],[156,1,2],[151,1,2]]],"398":[0,1,10,[[227,1,2],[221,1,2],[222,1,2],[224,1,2],[225,1,2],[226,1,2],[228,1,2],[229,1,2],[230,1,2],[223,1,2]]],"453":[0,1,8,[[137,1,3],[194,10,20],[86,10,20],[84,10,20],[112,1,10],[123,10,150],[266,1,1],[121,1,4]]],"491":[0,1,12,[[457,1,5],[458,1,5],[459,1,5],[460,1,5],[461,1,5],[462,1,5],[463,1,5],[464,1,5],[465,1,5],[466,1,5],[695,1,5],[580,1,5]]],"583":[0,1,4,[[335,1,5],[331,1,5],[347,1,3],[366,1,1]]],"987":[0,0,7,[[501,1,1],[988,2,2],[188,10,10],[187,100,100],[504,1,1],[503,1,1],[502,1,1]]],"1466":[0,0,8,[[1092,3,3],[112,100,100],[1437,100,100],[661,10,10],[862,3,3],[657,3,3],[699,3,3],[716,3,3]]],"972":[25,0,7,[[884,10,10],[973,2,2],[44,50,50],[716,1,1],[488,5,5],[607,1,1],[971,1,1]]],"1187":[25,0,7,[[716,1,1],[1189,3,3],[1188,1,1],[44,100,100],[488,5,5],[253,1,1],[971,1,1]]],"1444":[25,0,11,[[253,1,1],[488,5,5],[500,125,125],[716,3,3],[971,1,1],[1188,1,1],[1189,3,3],[1443,3,3],[1445,1,1],[1321,2,2],[508,125,125]]],"779":[25,0,7,[[587,3,3],[646,5,5],[778,5,5],[647,5,5],[644,5,5],[653,3,3],[643,5,5]]],"1337":[25,0,12,[[425,1,1],[451,2,2],[699,5,5],[830,1,1],[884,10,10],[935,100,100],[1101,1,1],[1102,1,1],[1339,2,2],[1341,1,1],[1338,3,3],[1164,2,2]]],"346":[0,0,6,[[123,100,100],[143,50,50],[100,50,50],[94,50,50],[264,50,50],[248,50,50]]],"363":[0,0,6,[[342,3,3],[339,8,8],[215,2,2],[251,2,2],[145,5,5],[236,1,1]]],"573":[0,0,5,[[65,10,10],[305,10,10],[117,5,5],[250,1,1],[268,1,1]]],"1531":[25,0,11,[[883,1,1],[379,250,250],[584,3,3],[172,250,250],[505,100,100],[810,1,1],[1522,3,3],[1321,3,3],[599,20,20],[1532,2,2],[755,5,5]]],"673":[25,0,7,[[428,1,1],[500,10,10],[254,2,2],[674,3,3],[508,10,10],[379,10,10],[84,100,100]]],"1032":[25,0,7,[[756,1,1],[1033,2,2],[176,10,10],[884,5,5],[753,3,3],[1031,1,1],[1022,1,1]]],"1202":[25,0,9,[[1031,3,3],[1224,3,3],[1206,1,1],[1204,1,1],[1203,2,2],[753,5,5],[756,3,3],[884,5,5],[176,10,10]]],"1031":[0,1,10,[[1022,1,3],[1021,1,3],[1029,1,3],[1030,1,3],[1028,1,3],[1027,1,3],[1026,1,3],[1024,1,3],[1025,1,3],[1023,1,3]]],"336":[0,0,3,[[123,50,50],[44,100,100],[112,1,1]]],"337":[0,0,5,[[146,5,5],[126,5,5],[125,5,5],[96,5,5],[249,5,5]]],"1257":[0,0,4,[[163,25,25],[583,1,1],[121,1,1],[194,2,2]]],"1554":[0,1,2,[[820,1,10],[879,1,10]]],"1555":[0,1,3,[[106,10,15],[921,10,15],[879,10,15]]],"1556":[0,1,3,[[106,10,15],[921,10,15],[922,10,15]]],"1557":[0,1,3,[[1111,10,20],[789,1,1],[922,10,20]]],"1558":[0,1,3,[[789,1,5],[1111,10,25],[1537,10,25]]],"1606":[0,1,3,[[789,1,5],[1537,10,25],[1605,10,25]]],"482":[0,0,9,[[249,10,10],[459,3,3],[195,10,10],[335,3,3],[463,5,5],[240,1,1],[371,1,1],[176,4,4],[297,1,1]]],"572":[0,0,5,[[538,3,3],[350,3,3],[373,2,2],[500,3,3],[266,1,1]]],"1448":[0,0,10,[[661,7,7],[643,7,7],[644,3,3],[645,3,3],[84,250,250],[500,100,100],[508,100,100],[887,1,1],[635,7,7],[112,15,15]]],"1310":[0,0,7,[[1124,1,1],[656,1,1],[364,1,1],[360,1,1],[1309,250,250],[863,1,1],[372,1,1]]],"1628":[0,0,9,[[360,1,1],[364,1,1],[372,1,1],[656,1,1],[863,1,1],[1629,1,1],[1124,1,1],[1309,250,250],[1619,10,10]]],"501":[50,0,0,[]],"502":[25,0,0,[]],"503":[10,0,0,[]],"344":[0,0,3,[[123,20,20],[197,3,3],[242,1,1]]],"534":[50,0,4,[[123,500,500],[379,50,50],[508,50,50],[500,50,50]]],"974":[0,0,1,[[123,10,10]]],"1082":[25,0,11,[[379,3,3],[90,1,1],[84,30,30],[101,1,1],[112,3,3],[241,2,2],[387,1,1],[604,1,1],[1083,2,2],[1084,2,2],[1081,1,1]]],"1156":[25,0,8,[[1158,2,2],[1164,2,2],[935,100,100],[500,10,10],[508,10,10],[84,100,100],[674,3,3],[379,10,10]]],"332":[0,0,6,[[143,10,10],[94,10,10],[80,10,10],[54,10,10],[264,10,10],[41,10,10]]],"333":[0,0,5,[[110,10,10],[78,10,10],[36,10,10],[193,10,10],[170,10,10]]],"494":[25,0,6,[[187,10,10],[44,20,20],[188,3,3],[46,15,15],[349,2,2],[84,10,10]]],"1194":[25,0,9,[[883,1,1],[1195,2,2],[729,200,200],[504,1,1],[188,10,10],[379,15,15],[84,150,150],[44,50,50],[187,100,100]]],"1456":[25,0,11,[[44,200,200],[84,200,200],[187,200,200],[504,1,1],[772,10,10],[884,25,25],[1195,1,1],[1455,50,50],[1457,4,4],[1458,1,1],[188,50,50]]],"766":[25,0,5,[[607,1,1],[605,1,1],[606,1,1],[608,1,1],[762,1,1]]],"603":[25,0,10,[[604,3,3],[112,2,2],[84,25,25],[452,2,2],[587,2,2],[86,10,10],[500,5,5],[536,5,5],[535,5,5],[508,5,5]]],"1099":[0,0,3,[[634,1,1],[644,1,1],[508,30,30]]],"1100":[0,0,3,[[645,1,1],[634,1,1],[500,30,30]]],"1101":[0,0,4,[[646,1,1],[634,2,2],[644,2,2],[508,100,100]]],"1102":[0,0,4,[[645,2,2],[646,1,1],[634,2,2],[500,100,100]]],"584":[0,0,8,[[277,100,100],[191,100,100],[192,100,100],[18,100,100],[194,25,25],[500,5,5],[185,3,3],[498,100,100]]],"1616":[0,1,6,[[641,1,5],[635,1,1],[647,1,1],[643,1,1],[634,1,1],[644,1,1]]],"1617":[0,1,6,[[654,1,1],[645,1,1],[646,1,1],[755,1,1],[661,1,1],[781,1,1]]],"1270":[25,0,9,[[755,5,5],[1103,3,3],[1106,1,1],[379,25,25],[883,1,1],[810,1,1],[505,5,5],[882,3,3],[1269,5,5]]],"1293":[0,0,12,[[653,6,6],[883,1,1],[379,250,250],[1203,5,5],[500,250,250],[752,1,1],[699,3,3],[830,1,1],[810,2,2],[1123,1,1],[508,250,250],[1092,1,1]]],"1504":[25,0,12,[[883,1,1],[1239,1,1],[500,100,100],[810,2,2],[1123,2,2],[1238,12,12],[1443,3,3],[1505,1,1],[1503,10,10],[1321,2,2],[508,100,100],[1092,3,3]]],"360":[0,0,4,[[44,3,3],[358,5,5],[242,1,1],[359,5,5]]],"364":[0,0,4,[[362,1,1],[358,5,5],[359,5,5],[277,24,24]]],"372":[0,0,4,[[370,3,3],[335,1,1],[356,1,1],[123,10,10]]],"656":[25,0,6,[[657,2,2],[355,1,1],[358,5,5],[361,2,2],[44,25,25],[359,5,5]]],"863":[25,0,9,[[362,1,1],[355,3,3],[865,2,2],[44,25,25],[370,25,25],[359,25,25],[358,25,25],[862,1,1],[657,1,1]]],"1124":[25,0,8,[[1126,10,10],[663,1,1],[1123,2,2],[862,1,1],[657,1,1],[355,3,3],[44,50,50],[1125,10,10]]],"888":[0,0,8,[[18,8,8],[40,8,8],[12,8,8],[35,8,8],[38,8,8],[20,8,8],[277,8,8],[22,8,8]]],"705":[25,0,9,[[84,25,25],[86,25,25],[379,5,5],[508,5,5],[194,25,25],[708,3,3],[707,4,4],[706,10,10],[500,5,5]]]};
const VALUABLE = [1092,1123,883,830,862,810,739,761,671,971,884,887,752];
const SEEDS = {"449":[450,1,12960],"257":[256,1,2880],"66":[67,1,480],"20":[19,1,2],"64":[65,1,240],"255":[254,1,5760],"30":[29,1,4],"14":[13,1,5],"160":[159,1,2],"190":[189,1,4],"352":[262,1,5],"162":[161,1,3],"158":[157,1,1],"47":[46,1,20],"51":[50,1,60],"588":[450,10,12960],"741":[254,10,5760],"1570":[409,10,480],"589":[373,10,8640],"395":[43,10,90],"34":[33,1,15],"28":[27,1,3],"12":[11,1,1],"410":[409,1,480],"49":[48,1,25],"68":[69,1,720],"32":[31,1,10],"631":[630,1,14400],"1307":[1276,1,90],"374":[373,1,8640],"16":[15,1,30],"60":[59,1,120],"70":[71,1,1440]};
const FLEA = {"511":[3,[]],"454":[3,[]],"510":[3,[]],"188":[1,["Squirrel pets (level 6)","Wishing Well","Spring Basket 01 and more"]],"512":[3,[]],"509":[3,[]],"123":[1,["Squirrel pets (level 3)","Wishing Well","Corn Prize Bag and more"]],"569":[1,["Bird pets (level 6)"]],"170":[0,["Raptor Pen (daily)",["found exploring","Forest",49,49,41,41,0.3333],"Dog pets (level 3)"]],"379":[0,["Workshop","Capybara pets (level 3)","Lorn's Expedition Kit and more"]],"1107":[1,["Apple Crate 01 and more"]],"44":[0,[["caught at","Apple Bobbing",1,1,1,1],"Orchard (daily)",["found exploring","Haunted House",45,45,40,40,0.375]]],"108":[0,[["found exploring","Forest",60,60,52,52,0.3333],"Squirrel pets (level 3)","Wishing Well"]],"1103":[1,["Baba's Snack Pack and more"]],"242":[1,["Wishing Well","Treat Bag 01 and more",["found exploring","Mount Banon",16872,13591,14079,11753,0.3333]]],"1314":[3,[]],"307":[0,[["caught at","Large Island",6,6,6,6],"Penguin pets (level 3)"]],"471":[1,["Wishing Well","Exchange Center (when offered)"]],"111":[1,[["found exploring","Forest",81,81,63,63,0.3333],"Owl pets (level 3)","Wishing Well"]],"113":[1,[["found exploring","Small Cave",67,52,56,43,0.4],"Dog pets (level 1)","Grab Bag 01"]],"1339":[1,["Holiday Cheer Bundle 01"]],"247":[1,["Wishing Well"]],"750":[3,[]],"285":[1,["Lemur pets (level 1)","Wishing Well","Christmas Present 10 and more"]],"107":[0,[["caught at","Farm Pond",42,42,32,32],"Grab Bag 01"]],"186":[1,["Hedgehog pets (level 1)","Corn Prize Bag and more"]],"215":[1,["Dog pets (level 6)","Wishing Well","Large Chest 02"]],"746":[3,[]],"591":[1,[["found exploring","Jundland Desert",298,298,259,260,0.2667]]],"475":[1,["Bird pets (level 6)","Wishing Well","Corn Prize Bag"]],"883":[1,["Cornucopia 02 and more"]],"581":[2,["Exchange Center (when offered)"]],"212":[1,["Squirrel pets (level 6)","Wishing Well",["found exploring","Small Spring",1090,1087,891,892,0.3333]]],"548":[1,["Beatrix's Booming Brawl Box 02 and more"]],"26":[0,["Chicken Coop (daily)","Owl pets (level 3)"]],"245":[1,["Bird pets (level 1)","Wishing Well"]],"348":[1,["Wishing Well"]],"286":[1,["Lemur pets (level 1)","Wishing Well","Grab Bag 02 and more"]],"1269":[1,["Thomas's Tavern Tote"]],"194":[0,["Workshop","Bird pets (level 1)","Grab Bag 06 and more"]],"259":[1,["Wishing Well"]],"479":[1,["Wishing Well",["found exploring","Forest",8303,8326,7013,7001,0.3333],["found exploring","Misty Forest",17883,17548,14437,14431,0.3333]]],"708":[1,["Polar Bear pets (level 6)","Winter Basket and more","Exchange Center (when offered)"]],"831":[3,[]],"287":[1,["Spider pets (level 1)","Wishing Well","Grab Bag 02 and more"]],"140":[1,["Penguin pets (level 3)",["caught at","Vast Ocean",136,136,121,121]]],"415":[3,[]],"1326":[3,[]],"710":[1,["Seal pets (level 6)"]],"467":[2,[["caught at","Large Island",3298,3298,3353,3353]]],"159":[1,["Snake pets (level 6)","Wishing Well","Grab Bag 03"]],"189":[1,["Owl pets (level 6)","Wishing Well","Grab Bag 01 and more"]],"262":[1,["Baboon pets (level 3)","Wishing Well","Grab Bag 03"]],"172":[1,["Cat pets (level 6)","Wishing Well","Bag of Presents 01 and more"]],"462":[1,[["caught at","Lake Tempest",99,99,83,83],"Wishing Well","Grab Bag 07"]],"281":[1,["Frog pets (level 6)","Wishing Well","Cornucopia 01 and more"]],"161":[1,["Hedgehog pets (level 6)","Wishing Well","Grab Bag 03"]],"157":[1,["Baboon pets (level 6)","Wishing Well","Grab Bag 03"]],"695":[0,[["caught at","Glacier Lake",40,40,40,40],"Seal pets (level 6)","Grab Bag 07"]],"464":[1,[["caught at","Emerald Beach",76,76,67,67],"Wishing Well","Grab Bag 07"]],"351":[1,["Wishing Well","Exchange Center (when offered)"]],"330":[1,[["caught at","Forest Pond",337,337,282,282]]],"334":[1,["Wishing Well",["found exploring","Small Cave",860,670,696,542,0.4]]],"491":[1,["Capybara pets (level 6)","Wishing Well","Exchange Center (when offered)"]],"112":[0,["Workshop","Baboon pets (level 6)","Corn Prize Bag and more"]],"120":[0,["Vineyard (daily)","Owl pets (level 3)","Gift Basket 01 and more"]],"203":[0,["Workshop","Swine pets (level 1)"]],"277":[0,["Worm Habitat (hourly)","Grab Bag 02 and more"]],"1275":[3,[]],"1466":[1,["Garden Crate 01"]],"349":[1,["Red Dragon pets (level 6)","Spring Basket 01",["found exploring","Whispering Creek",3342,3329,2982,2990,0.2667]]],"250":[1,["Owl pets (level 3)","Wishing Well","Large Chest 03"]],"283":[1,["Lemur pets (level 3)","Wishing Well","Bug Bag 01"]],"185":[0,["Workshop","Seal pets (level 3)","Wishing Well"]],"778":[1,["Holger's Lunch Box"]],"1203":[1,["Tower Prep Pack 01 and more","Exchange Center (when offered)"]],"86":[0,["Workshop","Baboon pets (level 3)","Wishing Well"]],"338":[0,["Quarry (rarely)","Armadillo pets (level 3)","Wishing Well"]],"135":[1,["Wishing Well",["caught at","Vast Ocean",137,137,121,121],["caught at","Small Island",153,153,128,128]]],"177":[1,["Swine pets (level 6)","Wishing Well","Corn Prize Bag"]],"505":[1,["Wishing Well","Thomas's Tavern Tote and more","Exchange Center (when offered)"]],"634":[0,["Kitchen","Fall Basket and more"]],"207":[1,["Penguin pets (level 1)","Wishing Well",["caught at","Vast Ocean",102,102,91,91]]],"599":[1,["Wishing Well","Bug Bag 01 and more",["found exploring","Jundland Desert",899,899,785,785,0.2667]]],"389":[1,["Wishing Well",["found exploring","Black Rock Canyon",8744,8620,7464,7341,0.3333]]],"84":[0,["Workshop","Hedgehog pets (level 3)","Wishing Well"]],"587":[0,["Workshop","Holger's Lunch Box and more"]],"1238":[1,["Buddy's Beach Bag and more","Exchange Center (when offered)"]],"289":[1,["Wishing Well",["found exploring","Misty Forest",174,173,132,132,0.3333]]],"409":[1,["Fox pets (level 3)"]],"258":[1,["Bird pets (level 3)","Wishing Well"]],"246":[1,["Bird pets (level 3)","Wishing Well"]],"213":[1,["Wishing Well",["found exploring","Cane Pole Ridge",1532,1270,1253,1037,0.2857]]],"810":[1,["Buddy's School Bag and more"]],"1092":[1,["Harvest Bundle 01 and more"]],"380":[1,["Wishing Well","Exchange Center (when offered)"]],"174":[1,[["caught at","Vast Ocean",68,68,60,60],["caught at","Emerald Beach",89,89,77,77]]],"147":[1,["Green Dragon pets (level 1)","Wishing Well","Grab Bag 04"]],"149":[1,["Baboon pets (level 6)","Wishing Well","Grab Bag 04"]],"151":[1,["Spider pets (level 6)","Wishing Well","Grab Bag 04"]],"153":[1,["Hedgehog pets (level 6)","Wishing Well","Grab Bag 04"]],"155":[1,["Green Dragon pets (level 6)","Wishing Well","Grab Bag 04"]],"305":[0,["Workshop","Red Dragon pets (level 6)","Large Chest 03 and more"]],"600":[0,[["found exploring","Jundland Desert",33,33,23,23,0.2667]]],"478":[1,["Wishing Well",["caught at","Vast Ocean",2768,2768,2431,2431]]],"390":[1,["Seal pets (level 3)",["caught at","Small Island",287,287,241,241]]],"241":[1,["Wishing Well","Rosalie's Beach Tote","Exchange Center (when offered)"]],"268":[1,["Cat pets (level 6)","Large Chest 03","Exchange Center (when offered)"]],"282":[1,["Lemur pets (level 3)","Wishing Well","Bug Bag 01 and more"]],"273":[1,["Wishing Well"]],"331":[1,["Bear pets (level 1)","Wishing Well","Grab Bag 08"]],"339":[0,["Ironworks (rarely)","Armadillo pets (level 6)","Wishing Well"]],"251":[0,["Ironworks (rarely)","Dog pets (level 6)","Wishing Well"]],"284":[1,["Lemur pets (level 1)","Wishing Well","Grab Bag 02 and more"]],"243":[1,["Wishing Well",["found exploring","Small Spring",1092,1088,897,893,0.3333]]],"362":[1,["Lemur pets (level 3)","Wishing Well","Treat Bag 05 and more"]],"473":[1,["Wishing Well","Exchange Center (when offered)",["caught at","Emerald Beach",3604,3604,3103,3103]]],"679":[0,["Workshop","Wishing Well"]],"335":[1,["Bear pets (level 3)","Wishing Well","Grab Bag 08 and more"]],"168":[1,["Wishing Well",["found exploring","Highland Hills",1872,1869,1520,1520,0.25]]],"584":[1,["Beatrix's Booming Brawl Box 02 and more"]],"280":[1,["Wishing Well"]],"745":[1,["Cornucopia 02"]],"1293":[3,[]],"347":[1,["Bear pets (level 6)","Wishing Well","Grab Bag 03 and more"]],"360":[1,["Wishing Well","Pillow Case 01 and more",["found exploring","Haunted House",1961,1955,1683,1686,0.375]]],"364":[1,["Pillow Case 01 and more",["found exploring","Haunted House",1967,1961,1679,1679,0.375]]],"263":[0,["Quarry (rarely)","Pet Rock pets (level 1)"]],"378":[1,["Capybara pets (level 3)",["caught at","Forest Pond",338,338,283,283],["found exploring","Sinking Swamp Exploring",507,508,446,445,0.4]]],"214":[1,["Wishing Well",["found exploring","Small Cave",865,671,695,542,0.4]]],"802":[3,[]]};
const BUNDLES = {"1314":[[370,1,1],[1309,100,100]],"1339":[[1157,1,1],[1338,10,10]],"548":[[379,10,10],[508,5,5],[84,100,100],[112,5,5],[86,50,50],[185,10,10]],"1326":[[379,250,250],[112,25,25],[84,250,250],[508,250,250],[500,250,250],[1092,2,2]],"1466":[[1092,3,3],[112,100,100],[1437,100,100],[661,10,10],[862,3,3],[657,3,3],[699,3,3],[716,3,3]],"584":[[277,100,100],[191,100,100],[192,100,100],[18,100,100],[194,25,25],[500,5,5],[185,3,3],[498,100,100]],"1293":[[653,6,6],[883,1,1],[379,250,250],[1203,5,5],[500,250,250],[752,1,1],[699,3,3],[830,1,1],[810,2,2],[1123,1,1],[508,250,250],[1092,1,1]],"360":[[44,3,3],[358,5,5],[242,1,1],[359,5,5]],"364":[[362,1,1],[358,5,5],[359,5,5],[277,24,24]]};
const QUESTS = {"Corn of Interest Part 15":[3318637,"????","Corn of Interest Part 14","Farming, Fishing, Crafting, Exploring 99; Tower level 1"],"Corn of Interest Part 14":[3318636,"????","Corn of Interest Part 13","Farming, Fishing, Crafting, Exploring 99; Tower level 1"],"Corn of Interest Part 13":[3308090,"????","Corn of Interest Part 12","Farming, Fishing, Crafting, Exploring 99; Tower level 1"],"Corn of Interest Part 12":[3308089,"????","Corn of Interest Part 11","Farming, Fishing, Crafting, Exploring 99; Tower level 1"],"Corn of Interest Part 11":[3308088,"????","Corn of Interest Part 10","Farming, Fishing, Crafting, Exploring 99; Tower level 1"],"Corn of Interest Part 10":[3308087,"????","Corn of Interest Part 09","Farming, Fishing, Crafting, Exploring 99; Tower level 1"],"Corn of Interest Part 09":[3308086,"????","Corn of Interest Part 08","Farming, Fishing, Crafting, Exploring 99; Tower level 1"],"Corn of Interest Part 08":[3308085,"????","Corn of Interest Part 07","Farming, Fishing, Crafting, Exploring 99; Tower level 1"],"Corn of Interest Part 07":[3308084,"????","Corn of Interest Part 06","Farming, Fishing, Crafting, Exploring 99; Tower level 1"],"Corn of Interest Part 06":[3308083,"????","Corn of Interest Part 05","Farming, Fishing, Crafting, Exploring 99; Tower level 1"],"Corn of Interest Part 05":[3308082,"????","Corn of Interest Part 04","Farming, Fishing, Crafting, Exploring 99; Tower level 1"],"Corn of Interest Part 04":[3308081,"????","Corn of Interest Part 03","Farming, Fishing, Crafting, Exploring 99; Tower level 1"],"Corn of Interest Part 03":[3308080,"????","Corn of Interest Part 02","Farming, Fishing, Crafting, Exploring 99; Tower level 1"],"Corn of Interest Part 02":[3308079,"????","Corn of Interest Part 01","Farming, Fishing, Crafting, Exploring 99; Tower level 1"],"Corn of Interest Part 01":[3306207,"????","","Farming, Fishing, Crafting, Exploring 99; Tower level 1"],"Spirit of the Cards IV":[7703453,"George","Spirit of the Cards III","Farming, Fishing, Crafting, Exploring 99"],"Spirit of the Cards III":[7703452,"George","Spirit of the Cards II","Farming, Fishing, Crafting, Exploring 99"],"Spirit of the Cards II":[7703451,"George","Spirit of the Cards I","Farming, Fishing, Crafting, Exploring 99"],"Spirit of the Cards I":[7703450,"George","Secretly A Society Summons You XII","Farming, Fishing, Crafting, Exploring 99"],"Secretly A Society Summons You XII":[3778766,"Buddy","Secretly A Society Summons You XI","Buddy at friendship 50"],"Secretly A Society Summons You XI":[3769948,"Buddy","Secretly A Society Summons You X","Buddy at friendship 50"],"Secretly A Society Summons You X":[3767981,"Buddy","Secretly A Society Summons You IX","Buddy at friendship 50"],"Secretly A Society Summons You IX":[3768372,"Buddy","Secretly A Society Summons You VIII","Buddy at friendship 50"],"Secretly A Society Summons You VIII":[3767953,"Buddy","Secretly A Society Summons You VII","Buddy at friendship 50"],"Secretly A Society Summons You VII":[3766101,"Buddy","Secretly A Society Summons You VI","Buddy at friendship 50"],"Secretly A Society Summons You VI":[3765653,"Buddy","Secretly A Society Summons You V","Buddy at friendship 50"],"Secretly A Society Summons You V":[3756310,"Buddy","Secretly A Society Summons You IV","Buddy at friendship 50"],"Secretly A Society Summons You IV":[3756195,"Buddy","Secretly A Society Summons You III","Buddy at friendship 50"],"Secretly A Society Summons You III":[3755462,"Buddy","Secretly A Society Summons You II","Buddy at friendship 50"],"Secretly A Society Summons You II":[3755407,"Buddy","Secretly A Society Summons You I","Buddy at friendship 50"],"Secretly A Society Summons You I":[3755097,"Buddy","","Buddy at friendship 50"],"Belt out of Shape VI":[7462462,"Holger","Belt out of Shape V","Farming, Fishing, Crafting, Exploring 99; Tower level 1"],"Belt out of Shape V":[7462461,"Holger","Belt out of Shape IV","Farming, Fishing, Crafting, Exploring 99; Tower level 1"],"Belt out of Shape IV":[7462460,"Holger","Belt out of Shape III","Farming, Fishing, Crafting, Exploring 99; Tower level 1"],"Belt out of Shape III":[7462459,"Holger","Belt out of Shape II","Farming, Fishing, Crafting, Exploring 99; Tower level 1"],"Belt out of Shape II":[7462458,"Holger","Belt out of Shape I","Farming, Fishing, Crafting, Exploring 99; Tower level 1"],"Belt out of Shape I":[7462457,"Holger","","Farming, Fishing, Crafting, Exploring 99; Tower level 1"],"A Slime Covered Wish II":[7556969,"Goostav","A Slime Covered Wish I","Goostav at friendship 80; Farming 99"],"A Slime Covered Wish I":[7556965,"Goostav","","Goostav at friendship 80; Farming 99"],"Effigy of Friendship":[7514015,"Buddy","","Buddy at friendship 90"],"Archeology Requires Knowhow XVII":[7520175,"Lorn","Archeology Requires Knowhow XVI","Lorn at friendship 60"],"Archeology Requires Knowhow XVI":[7518542,"Lorn","Archeology Requires Knowhow XV","Lorn at friendship 60"],"Archeology Requires Knowhow XV":[7517701,"Lorn","Archeology Requires Knowhow XIV","Lorn at friendship 60"],"Archeology Requires Knowhow XIV":[7517700,"Lorn","Archeology Requires Knowhow XIII","Lorn at friendship 60"],"Archeology Requires Knowhow XIII":[7517699,"Lorn","Archeology Requires Knowhow XII","Lorn at friendship 60"],"Archeology Requires Knowhow XII":[7517698,"Lorn","Archeology Requires Knowhow XI","Lorn at friendship 60"],"Archeology Requires Knowhow XI":[7517697,"Lorn","Archeology Requires Knowhow X","Lorn at friendship 60"],"Archeology Requires Knowhow X":[7517693,"Lorn","Archeology Requires Knowhow IX","Lorn at friendship 60"],"Archeology Requires Knowhow IX":[7515003,"Lorn","Archeology Requires Knowhow VIII","Lorn at friendship 60"],"Archeology Requires Knowhow VIII":[7515002,"Lorn","Archeology Requires Knowhow VII","Lorn at friendship 60"],"Archeology Requires Knowhow VII":[7514986,"Lorn","Archeology Requires Knowhow VI","Lorn at friendship 60"],"Archeology Requires Knowhow VI":[7514835,"Lorn","Archeology Requires Knowhow V","Lorn at friendship 60"],"Archeology Requires Knowhow V":[7514238,"Lorn","Archeology Requires Knowhow IV","Lorn at friendship 60"],"Archeology Requires Knowhow IV":[7514237,"Lorn","Archeology Requires Knowhow III","Lorn at friendship 60"],"Archeology Requires Knowhow III":[7514221,"Lorn","Archeology Requires Knowhow II","Lorn at friendship 60"],"Archeology Requires Knowhow II":[7463234,"Lorn","Archeology Requires Knowhow I","Lorn at friendship 60"],"Archeology Requires Knowhow I":[7462786,"Lorn","","Lorn at friendship 60"],"Fitness Friends Fit Forever III":[7517233,"Gary Bearson V","Fitness Friends Fit Forever II","Gary Bearson V at friendship 80"],"Fitness Friends Fit Forever II":[7517232,"Gary Bearson V","Fitness Friends Fit Forever I","Gary Bearson V at friendship 80"],"Fitness Friends Fit Forever I":[7514214,"Gary Bearson V","","Gary Bearson V at friendship 80"]};
const PASSWORDS = ["halo","yddub","firestream","10000","20000","magicandwires","titan conquest","password","patrick star","halosphere2","nin","farm rpg","farming","fishing","crafting","exploring","treasure","bones","words or phrases","thirsty","chicken","cow","glass","bank","runestone","snow white","gold","silver","drum","bass","help me","open sesame","money","fireworks","boom","deer","squirrel","witch","lucky","catch","horse","halloween","broken machine","bow","lime","defense","bluebird","carpe diem","halocharts","broke","ff6","i like cheese","minecraft","hot","eieio","hang in there","red rising","blind","snake in my boot","a penny for your thoughts","golden","nemo","steak","wine","buddy","fish","farm","bait","secret","breakfast","apples","this is a test","punch tree","carpe dime","gross","a bird in the hand is worth two in the bush","emma spool","all that glitters is not gold","massive attack","radiohead","tool","smashing pumpkins","50000","a perfect circle","lord huron","telescope","watchmen","butter","mass hysteria","surprised","0x5432671","0x8173074","pumpkin","candle","all star","rose","thoma","afraid of hard work","joke","haunted house","lorn has holger","rosalie has george","beatrix has thomas","george has lorn","jill has beatrix","holger has captain thomas","cecil has roomba","roomba has geist","geist has vincent","ric ryph has cecil","neztilb","frank got charles horsington iii","buddy likes borgen","charles horsington iii neigh frank","thomas caught jill","borgen dislikes ric ryph","star meerif <3 rosalie","vincent is warming up to buddy","captain thomas is looking to help star meerif","green initiative","green fix","gunter","huggable","55555","star wars","baby yoda","yoda","bantha","this is the way","r2d2","millennium falcon","vader","chewy","anakin","palpatine","kylo ren","lightsaber","theres always a bigger fish","its a trap","jar jar","c-3po","death star","lando","hoth","mara jade","greedo","ob1","i love you","i know","carbonite","never tell me the odds","jabba","thermal detonator","let the wookie win","yub nub","the schwartz","grand admiral thrawn","millions","signers","175000","find buddy","rosalie rosalie rosalie","thomas is scared of worms","doot","dread","dread dreads","dread dreads lemons","buddys shoe","elsa","anna","olaf","sven","kristoff","never","gonna","give","you","up","mellon","spring has sprung","seasonal allergies","alliteration","que sera","spring 2 it","gracias","red diamond run","496","spider-punk","ghost-spider","chai tea","miles","2099","talent pipes","summer solstice","cabbages","cowabunga dude","ranch","ba sing se","jet","gandalf","thunderhead","volunteer","too hot to hoot","mayonaise","pollen","spontaneous","wild moves","giraffe","celebrate","vinny","wakey wakey","interuniversal","joja","ilistenedtothepodcast","owl guard","cie","eci","ice","jolliness","gobble gobble","quicksand","lady liberty","naive","cornmeal","gullible","thomashateseggsalot","stitchpunk","gains","pirates of dark water","remember","and my axe","mystery triangle","vlad","transylvania","togepi","starmeerifwisheseverydaywashalloween","sheblindedmewithscience","send this to someone you care about","rubberchickenwithapulleyinthemiddle","moonsandfoxes","meowmeow","maple syrup","its a secret to everybody","hobbit","great logs","general woundwort","eucalyptus","ethereal discharge","elffar","chris p","astermeretaw","ask in 3 days","4,8,15,16,23,42","disconnected","welcome to the library","hop hop hop","double double","makehimcoal","bolognanoodles","helpchatbestcats","lagoon","ilovethepodcastitismyfavoritethingtolistento","donatello","rem","spookyscaryskeletonssendshiversdownstarsspine"];
const LIBRARY = {"33":"onion","38":"nails","65":"Corn","84":"Orange Juice","86":"Lemonade","112":"Grape Juice","120":"grapes","121":"Wine","123":"Ancient Coin","130":"Iron Cup","137":"Steak","185":"Iced Tea","241":"Shark Tooth","242":"Bacon","250":"Honey","253":"Piece of Heart","263":"Unpolished Jade","264":"Jade","281":"Gold Leaf","315":"Compass","317":"Garnet","354":"Wax Candle","355":"Jack-O-Lantern","362":"Spider","379":"Apple Cider","386":"Trident of Poseidon","391":"Cooked Turkey","400":"Cid's Stone Ale","448":"Rudolph","479":"Frog","498":"Mealworms","500":"Large Net","508":"Arnold Palmer","565":"Hot Potato","569":"Anglerfish","581":"Cutlass","586":"peach","587":"Peach Juice","661":"Breakfast Boost","729":"Spring Seeds","739":"Buddy Doll","752":"Time Egg","756":"Crunchy Omelette","783":"Honeycomb","786":"Scythe Of Dewstar","810":"Protein Bar","819":"Event Key","827":"Raffle Ticket","830":"Apple Pie","862":"Spooky Pie","883":"Cranberry Juice","1081":"Supply Voucher","1092":"Prune Juice","1123":"Pumpkin Juice","1437":"Veggie Juice","1503":"Fish Flakes","1624":"pear"};
const UNLOCKS = {"Art Gallery":["Farming level 35","Unlocks"],"Black Rock Canyon":["Exploring level 40","Unlocks"],"Cane Pole Ridge":["Exploring level 20","Unlocks"],"Community Center":["Farming level 10","Unlocks"],"Crystal River":["Fishing level 30","Unlocks"],"Daily Chores":["Farming level 20","Unlocks"],"Ember Caverns":["Mining level 30; needs a Sturdy Pickaxe","Mining"],"Ember Lagoon":["Exploring level 60; Requires Runestones 1-10 to get Inferno Sphere, complete the \"A Way Forward\" questline","Unlocks"],"Emerald Beach":["Fishing level 40","Unlocks"],"Farm Pond":["Fishing level 5; Purchase at \"My Farm\"","Unlocks"],"Fenrir's Den":["Mining level 40; needs a Steel Pickaxe","Mining"],"Forest":["Exploring level 20; 150,000 silver","Unlocks"],"Forest Pond":["Fishing level 5","Unlocks"],"Gary's Crushroom":["Exploring level 90 and Gary level 80","Rare Items and Locked Locations"],"Glacier Lake":["Fishing level 90; Requires Water Orb, complete \"A Wall in the Way\" and \"The Fall of Water\" questlines","Unlocks"],"Highland Hills":["Exploring level 10","Unlocks"],"Highland Hollow":["Mining level 10; needs a Bone Pickaxe","Mining"],"Jundland Desert":["Exploring level 80","Rare Items and Locked Locations"],"Kitchen":["Farming level 75; Also needs 75 crafting and 500 million silver","Unlocks"],"Lake Minerva":["Fishing level 60; Requires Runestones 11-20 to get Lava Sphere, complete the \"Strange Stones\" questline","Unlocks"],"Lake Tempest":["Fishing level 10","Unlocks"],"Large Island":["Fishing level 70; Requires Tribal Mask, complete the \"Islands are Hard to Catch\" questline","Unlocks"],"Mailbox Passwords":["Farming level 20","Unlocks"],"Misty Forest":["Exploring level 30","Unlocks"],"Mossrock Mine":["Mining level 50; needs a Heavy Pickaxe","Mining"],"Mount Banon":["Exploring level 50","Unlocks"],"Pirate's Cove":["Fishing level 80; Requires Mapping Compass, complete \"Intruders Beware\" questline","Unlocks"],"Redbrook Adventures":["Farming level 20","Unlocks"],"Roombas Nest":["Farming level 90; Roomba friendship level 40 and \"Chickens Come Home To Roost\" questline","Unlocks"],"Sawmill":["1,000,000 silver. Forest must be already purchased","Unlocks"],"Small Cave":["Exploring level 1","Unlocks"],"Small Island":["Fishing level 20","Unlocks"],"Small Pond":["Fishing level 1","Unlocks"],"Small Springs":["Exploring level 5","Unlocks"],"Sol Grotto":["Mining level 20; needs a Crystal Pickaxe","Mining"],"Spring Cave":["Mining level 1; needs a Pickaxe","Mining"],"Sugar Cane Mill":["Farming level 85","Unlocks"],"Temple Of Reward":["Farming level 40","Unlocks"],"The Vault":["Farming level 30","Unlocks"],"Vast Ocean":["Fishing level 50","Unlocks"],"Wheel of Borgen":["Farming level 50","Unlocks"],"Whispering Creek":["Exploring level 70; Requires Compass, complete the \"Parts Unknown\" questline","Unlocks"]};
const UNLOCK_ITEMS = {"169":["Ember Lagoon"],"220":["Lake Minerva"],"313":["Large Island"],"315":["Whispering Creek"],"476":["Pirate's Cove"],"701":["Glacier Lake"],"820":["Spring Cave"],"879":["Highland Hollow"],"921":["Sol Grotto"],"922":["Ember Caverns"],"1111":["Fenrir's Den"],"1537":["Mossrock Mine"]};
const UNLOCK_QUESTS = {"A Wall In The Way I":["A Wall In The Way","Glacier Lake"],"A Wall In The Way II":["A Wall In The Way","Glacier Lake"],"A Wall In The Way III":["A Wall In The Way","Glacier Lake"],"A Wall In The Way IV":["A Wall In The Way","Glacier Lake"],"A Wall In The Way IX":["A Wall In The Way","Glacier Lake"],"A Wall In The Way V":["A Wall In The Way","Glacier Lake"],"A Wall In The Way VI":["A Wall In The Way","Glacier Lake"],"A Wall In The Way VII":["A Wall In The Way","Glacier Lake"],"A Wall In The Way VIII":["A Wall In The Way","Glacier Lake"],"A Wall In The Way X":["A Wall In The Way","Glacier Lake"],"A Wall In The Way XI":["A Wall In The Way","Glacier Lake"],"A Wall In The Way XII":["A Wall In The Way","Glacier Lake"],"A Wall In The Way XIII":["A Wall In The Way","Glacier Lake"],"A Wall In The Way XIV":["A Wall In The Way","Glacier Lake"],"A Wall In The Way XV":["A Wall In The Way","Glacier Lake"],"A Way Forward I":["A Way Forward","Ember Lagoon"],"A Way Forward II":["A Way Forward","Ember Lagoon"],"A Way Forward III":["A Way Forward","Ember Lagoon"],"A Way Forward IV":["A Way Forward","Ember Lagoon"],"A Way Forward IX":["A Way Forward","Ember Lagoon"],"A Way Forward V":["A Way Forward","Ember Lagoon"],"A Way Forward VI":["A Way Forward","Ember Lagoon"],"A Way Forward VII":["A Way Forward","Ember Lagoon"],"A Way Forward VIII":["A Way Forward","Ember Lagoon"],"A Way Forward X":["A Way Forward","Ember Lagoon"],"A Way Forward XI":["A Way Forward","Ember Lagoon"],"Chickens Come Home To Roost I":["Chickens Come Home To Roost","Roombas Nest"],"Chickens Come Home To Roost II":["Chickens Come Home To Roost","Roombas Nest"],"Chickens Come Home To Roost III":["Chickens Come Home To Roost","Roombas Nest"],"Chickens Come Home To Roost IV":["Chickens Come Home To Roost","Roombas Nest"],"Chickens Come Home To Roost V":["Chickens Come Home To Roost","Roombas Nest"],"Intruders Beware I":["Intruders Beware","Pirate's Cove"],"Intruders Beware II":["Intruders Beware","Pirate's Cove"],"Intruders Beware III":["Intruders Beware","Pirate's Cove"],"Intruders Beware IV":["Intruders Beware","Pirate's Cove"],"Intruders Beware IX":["Intruders Beware","Pirate's Cove"],"Intruders Beware V":["Intruders Beware","Pirate's Cove"],"Intruders Beware VI":["Intruders Beware","Pirate's Cove"],"Intruders Beware VII":["Intruders Beware","Pirate's Cove"],"Intruders Beware VIII":["Intruders Beware","Pirate's Cove"],"Intruders Beware X":["Intruders Beware","Pirate's Cove"],"Intruders Beware XI":["Intruders Beware","Pirate's Cove"],"Islands Are Hard To Catch I":["Islands Are Hard To Catch","Large Island"],"Islands Are Hard To Catch II":["Islands Are Hard To Catch","Large Island"],"Islands Are Hard To Catch III":["Islands Are Hard To Catch","Large Island"],"Islands Are Hard To Catch IV":["Islands Are Hard To Catch","Large Island"],"Islands Are Hard To Catch IX":["Islands Are Hard To Catch","Large Island"],"Islands Are Hard To Catch V":["Islands Are Hard To Catch","Large Island"],"Islands Are Hard To Catch VI":["Islands Are Hard To Catch","Large Island"],"Islands Are Hard To Catch VII":["Islands Are Hard To Catch","Large Island"],"Islands Are Hard To Catch VIII":["Islands Are Hard To Catch","Large Island"],"Islands Are Hard To Catch X":["Islands Are Hard To Catch","Large Island"],"Islands Are Hard To Catch XI":["Islands Are Hard To Catch","Large Island"],"Parts Unknown I":["Parts Unknown","Whispering Creek"],"Parts Unknown II":["Parts Unknown","Whispering Creek"],"Parts Unknown III":["Parts Unknown","Whispering Creek"],"Parts Unknown IV":["Parts Unknown","Whispering Creek"],"Parts Unknown IX":["Parts Unknown","Whispering Creek"],"Parts Unknown V":["Parts Unknown","Whispering Creek"],"Parts Unknown VI":["Parts Unknown","Whispering Creek"],"Parts Unknown VII":["Parts Unknown","Whispering Creek"],"Parts Unknown VIII":["Parts Unknown","Whispering Creek"],"Parts Unknown X":["Parts Unknown","Whispering Creek"],"Parts Unknown XI":["Parts Unknown","Whispering Creek"],"Parts Unknown XII":["Parts Unknown","Whispering Creek"],"Parts Unknown XIII":["Parts Unknown","Whispering Creek"],"Parts Unknown XIV":["Parts Unknown","Whispering Creek"],"Parts Unknown XIX":["Parts Unknown","Whispering Creek"],"Parts Unknown XV":["Parts Unknown","Whispering Creek"],"Parts Unknown XVI":["Parts Unknown","Whispering Creek"],"Parts Unknown XVII":["Parts Unknown","Whispering Creek"],"Parts Unknown XVIII":["Parts Unknown","Whispering Creek"],"Parts Unknown XX":["Parts Unknown","Whispering Creek"],"Parts Unknown XXI":["Parts Unknown","Whispering Creek"],"Parts Unknown XXII":["Parts Unknown","Whispering Creek"],"Parts Unknown XXIII":["Parts Unknown","Whispering Creek"],"Parts Unknown XXIV":["Parts Unknown","Whispering Creek"],"Strange Stones I":["Strange Stones","Lake Minerva"],"Strange Stones II":["Strange Stones","Lake Minerva"],"Strange Stones III":["Strange Stones","Lake Minerva"],"Strange Stones IV":["Strange Stones","Lake Minerva"],"Strange Stones IX":["Strange Stones","Lake Minerva"],"Strange Stones V":["Strange Stones","Lake Minerva"],"Strange Stones VI":["Strange Stones","Lake Minerva"],"Strange Stones VII":["Strange Stones","Lake Minerva"],"Strange Stones VIII":["Strange Stones","Lake Minerva"],"Strange Stones X":["Strange Stones","Lake Minerva"],"The Fall of Water I":["The Fall of Water","Glacier Lake"],"The Fall of Water II":["The Fall of Water","Glacier Lake"],"The Fall of Water III":["The Fall of Water","Glacier Lake"],"The Fall of Water IV":["The Fall of Water","Glacier Lake"],"The Fall of Water V":["The Fall of Water","Glacier Lake"],"The Fall of Water VI":["The Fall of Water","Glacier Lake"]};
  const TOOLKIT = 'FarmRPG Toolkit';
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const num = (n) => Math.round(Number(n)).toLocaleString();
  const store = {
    get(key, fallback) {
      try { return JSON.parse(localStorage.getItem(`frx.${key}`)) ?? fallback; } catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(`frx.${key}`, JSON.stringify(value)); } catch { /* storage blocked */ }
    },
  };
  const logPush = (key, entry, max) => {
    const list = store.get(key, []);
    list.push(entry);
    store.set(key, list.slice(-max));
  };
  const PROBLEMS = { list: () => store.get('debug.problems', []) };
  function problem(e, note = '') {
    console.warn(`[${TOOLKIT}] ${note}`, e);
    logPush('debug.problems', { at: Date.now(), note, error: String((e && (e.stack || e.message)) || e).split('\n').slice(0, 4).join('\n') }, 20);
  }
  window.addEventListener('error', (e) => {
    const where = `${e.filename || ''}\n${(e.error && e.error.stack) || ''}`;
    if (/frx|FarmRPG[ %20-]*Toolkit/i.test(where)) problem(e.error || e.message, 'Uncaught error');
  });
  const safeAddress = (s) => String(s).replace(/\d{6,}/g, '#');
  const ACTIVITY = { since: Date.now(), scans: 0, scanMs: 0, slowest: 0, slowestPage: '', settled: 0 };
  const gameDay = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Chicago' }).format(new Date());
  function addCss(css) {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }
  const pages = (name) => document.querySelectorAll(`.page[data-page="${name}"]`);
  const titleBlock = (page, re) => [...page.querySelectorAll('.content-block-title')].find((t) => re.test(t.textContent));
  const navbarOf = (page) => page.f7RelatedNavbar || (page.f7PageData && page.f7PageData.navbarInnerContainer);
  function pageTitle(page) {
    const center = navbarOf(page) && navbarOf(page).querySelector('.center');
    return center ? center.textContent.replace(/ /g, ' ').trim() : '';
  }
  const ITEM_BY_NAME = {};
  for (const [id, it] of Object.entries(ITEMS)) ITEM_BY_NAME[it[0]] = Number(id);
  const item = (id) => (ITEMS[id] ? { id: Number(id), name: ITEMS[id][0], img: ITEMS[id][1], desc: ITEMS[id][2] } : null);
  function itemIcon(id, cls = 'frx-icon') {
    const it = item(id);
    if (!it) return `<span class="frx-text">Item ${esc(id)}</span>`;
    if (!it.img) return `<a href="item.php?id=${it.id}" class="frx-text" title="${esc(it.name)}">${esc(it.name)}</a>`;
    return `<a href="item.php?id=${it.id}" title="${esc(it.name)}"><img class="${cls}" src="${esc(it.img)}" alt="${esc(it.name)}"></a>`;
  }
  async function fetchPage(url, why = '') {
    const start = Date.now();
    const u = new URL(url, location.origin);
    ['cachebuster', 'pagewidth'].forEach((k) => u.searchParams.delete(k));
    const page = safeAddress(u.pathname.replace(/^\//, '') + u.search);
    try {
      const res = await fetch(url, { credentials: 'same-origin' });
      if (!res.ok) throw new Error(`${url}: ${res.status}`);
      const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
      logPush('debug.requests', { at: start, page, why, ms: Date.now() - start, ok: true }, 50);
      return doc;
    } catch (e) {
      logPush('debug.requests', { at: start, page, why, ms: Date.now() - start, ok: false }, 50);
      throw e;
    }
  }
  const BUDDY_FRESH = 7 * 864e5;
  const BUDDY_RETRY = 36e5;
  const BUDDY_MAX = 300;
  const buddyListeners = [];
  const onBuddyItem = (fn) => buddyListeners.push(fn);
  const buddySlug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+/, '');
  let buddyBusy = false;
  let buddyNext = null;
  let buddyCache = null; // the saved items, read from storage once
  const BUDDY_V = 3;
  const buddyFresh = (saved) => saved && (saved.fail || (saved.v === BUDDY_V && saved.at >= (quests.newAt || 0)))
    && Date.now() - saved.at < (saved.fail ? BUDDY_RETRY : BUDDY_FRESH);
  function buddyItem(id, name, stillWanted = () => true) {
    if (!buddyCache) buddyCache = store.get('buddy.items', {});
    const saved = buddyCache[id];
    if (!buddyFresh(saved) && name) {
      buddyNext = { id, name, stillWanted };
      buddyPump();
    }
    return saved || null;
  }
  async function buddyPump() {
    if (buddyBusy || !buddyNext) return;
    const { id, name, stillWanted } = buddyNext;
    buddyNext = null;
    if (!stillWanted() || buddyFresh(buddyCache[id])) return;
    buddyBusy = true;
    const slug = buddySlug(name);
    const start = Date.now();
    let entry;
    try {
      const res = await fetch(`https://buddy.farm/page-data/i/${slug}/page-data.json`);
      if (!res.ok) throw new Error(`buddy.farm ${slug}: ${res.status}`);
      const it = (await res.json()).result.data.farmrpg.items[0];
      if (!it || Number(it.id) !== Number(id)) throw new Error(`buddy.farm ${slug}: not item ${id}`);
      entry = { at: Date.now(), v: BUDDY_V, ...buddySummary(it) };
      logPush('debug.requests', { at: start, page: `buddy.farm/i/${slug}`, why: 'item uses', ms: Date.now() - start, ok: true }, 50);
    } catch (e) {
      entry = { at: Date.now(), fail: 1 };
      logPush('debug.requests', { at: start, page: `buddy.farm/i/${slug}`, why: 'item uses', ms: Date.now() - start, ok: false }, 50);
    }
    const all = store.get('buddy.items', {}); // another tab may have saved some meanwhile
    all[id] = entry;
    const ids = Object.keys(all);
    if (ids.length > BUDDY_MAX) {
      ids.sort((a, b) => all[a].at - all[b].at).slice(0, ids.length - BUDDY_MAX).forEach((k) => delete all[k]);
    }
    store.set('buddy.items', all);
    buddyCache = all;
    buddyBusy = false;
    for (const fn of buddyListeners) { try { fn(Number(id)); } catch (e) { problem(e); } }
    setTimeout(buddyPump, 1000);
  }
  function buddySummary(it) {
    const list = (k) => it[k] || [];
    const ends = (q) => (q.endDate ? Date.parse(q.endDate) || 0 : 0);
    const ing = list('recipeIngredientItems');
    return {
      req: list('requiredForQuests').filter((r) => !r.quest.isHidden).map((r) => [r.quest.id, r.quest.name, r.quantity, ends(r.quest)]),
      crafts: ing.filter((r) => r.item.canCraft).length,
      meals: ing.filter((r) => r.item.canCook).length,
      teaches: (it.cookingRecipeCookable && it.cookingRecipeCookable.name) || '',
      wellIn: list('wishingWellInputItems').length,
      tradeIn: list('exchangeCenterInputs').length,
      opens: list('locksmithItems').length ? 1 : 0,
      keyFor: list('locksmithKeyItems').length,
      drops: list('dropRatesItems').map((d) => {
        const r = d.dropRates || {};
        if (r.location) return [{ fishing: 'fish', mining: 'mine' }[r.location.type] || 'explore', r.location.name];
        return r.seed ? ['farm', r.seed.name] : null;
      }).filter(Boolean),
      craft: it.canCraft && list('recipeItems').length ? 1 : 0,
      cook: it.canCook ? 1 : 0,
      made: list('manualProductions').map((m) => m.lineOne).filter(Boolean),
      buy: it.canBuy ? it.buyPrice || 0 : null,
      flea: it.canFleaMarket ? 1 : 0,
      boxes: list('locksmithOutputItems').length,
      rewards: list('rewardForQuests').filter((r) => !r.quest.isHidden).reduce((n, r) => {
        n[ends(r.quest) && ends(r.quest) < Date.now() ? 1 : 0] += 1;
        return n;
      }, [0, 0]),
      npc: list('npcRewards').map((r) => [r.npc.name, r.level]),
      pets: list('petItems').map((r) => [r.pet.name, r.level]),
      skills: [...new Set(list('skillLevelRewards').map((r) => r.skill))],
      tower: list('towerRewards').length,
      temple: list('templeRewardItems').length,
      wellOut: list('wishingWellOutputItems').length,
      tradeOut: list('exchangeCenterOutputs').length,
      quiz: list('quizRewards').length,
      pw: list('passwordItems').length,
      cc: list('communityCenterOutputs').length,
      cards: list('cardsTrades').map((c) => [c.spadesQuantity || 0, c.heartsQuantity || 0, c.diamondsQuantity || 0,
        c.clubsQuantity || 0, c.jokerQuantity || 0, c.outputQuantity || 1]),
    };
  }
  const GAME_PAGES = {
    'Help Requests': 'quests.php', Workshop: 'workshop.php', 'My Kitchen': 'kitchen.php', 'Wishing Well': 'well.php',
    'Exchange Center': 'exchange.php', Locksmith: 'locksmith.php', 'Flea Market': 'flea.php', 'The Tower': 'tower.php',
    'Temple of Reward': 'temple.php', Schoolhouse: 'schoolhouse.php', 'Community Center': 'comm.php',
    'Secret Password Log': 'popwlog.php', 'Friendship Levels': 'npclevels.php', Pets: 'pets.php',
    'Country Store': 'store.php', Exploring: 'explore.php', Fishing: 'fish.php', Mining: 'mine.php',
    'House of Cards': 'wiki.php?page=House+Of+Cards',
  };
  const tipHtml = (html, tip) => (tip ? `<span class="frx-tip" title="${esc(tip)}">${html}</span>` : html);
  function gameLink(name, tip = '', text = esc(name)) {
    const href = GAME_PAGES[name];
    const u = unlockOf(name);
    if (u && u[0]) tip = [tip, `Unlocks at ${u[0]}`].filter(Boolean).join(' · ');
    return href ? `<a class="frx-link" href="${esc(href)}"${tip ? ` title="${esc(tip)}"` : ''}>${text}</a>` : tipHtml(text, tip);
  }
  const libraryLink = (id) => (LIBRARY[id]
    ? `<a class="frx-link" href="${esc(libraryHref(LIBRARY[id]))}" title="This item's page in the Library">Library</a>`
    : '');
  let places = store.get('places', {});
  function watchPlaces() {
    for (const name of ['explore', 'fish', 'mine']) {
      const page = newest(name);
      if (!page || page.frxPlaces) continue;
      const found = {};
      for (const a of page.querySelectorAll('a[href^="area.php?id="], a[href^="fishing.php?id="], a[href^="mining.php?id="]')) {
        const t = a.querySelector('.item-title');
        const n = t && t.firstChild && t.firstChild.textContent;
        if (n && n.trim()) found[n.trim()] = a.getAttribute('href');
      }
      if (!Object.keys(found).length) continue;
      page.frxPlaces = true;
      if (Object.entries(found).some(([n, h]) => places[n] !== h)) { places = { ...places, ...found }; store.set('places', places); }
    }
  }
  const unlockOf = (name) => {
    const n = name.replace(/^My /, '').toLowerCase();
    const key = Object.keys(UNLOCKS).find((k) => k.toLowerCase() === n);
    return key ? UNLOCKS[key] : null;
  };
  const libraryHref = (page) => `wiki.php?page=${encodeURIComponent(page).replace(/%20/g, '+')}`;
  function unlockLink(name, text = esc(name)) {
    const u = unlockOf(name);
    if (!u) return text;
    return `<a class="frx-link" href="${esc(libraryHref(u[1]))}" title="${esc(`How to unlock: ${u[0] || 'see the Library'} (Library: ${u[1]})`)}">${text}</a>`;
  }
  const placeLink = (name) => (places[name] ? `<a class="frx-link" href="${esc(places[name])}">${esc(name)}</a>` : unlockLink(name));
  const responseListeners = [];
  const onGameResponse = (match, fn) => responseListeners.push({ match, fn });
  let watchingReplies = false;
  function watchGameResponses() {
    const jq = window.jQuery;
    if (watchingReplies || !jq) return;
    watchingReplies = true;
    jq(document).on('ajaxComplete.frx', (e, xhr, settings) => {
      const url = (settings && settings.url) || '';
      for (const l of responseListeners) {
        if (!l.match.test(url)) continue;
        try { l.fn((xhr && xhr.responseText) || '', url); } catch (err) { problem(err, 'Reading a game reply failed'); }
      }
    });
  }
  const noteReply = (url, note) => {
    const u = new URL(url, location.origin);
    ['cachebuster', 'pagewidth'].forEach((k) => u.searchParams.delete(k));
    logPush('debug.replies', { at: Date.now(), page: safeAddress(u.pathname.replace(/^\//, '') + u.search), note }, 20);
  };
  const hudPresent = () => typeof window.toggleHudStatus === 'function' || !!document.getElementById('frpg-hud-toggle');
  const INV_GAP = 3 * 1000;
  const ACTION_GAP = INV_GAP;
  let inv = store.get('inventory', { at: 0, cap: 0, counts: {}, estimated: false });
  if (!inv.all) inv = { at: 0, cap: inv.cap || 0, counts: {}, estimated: false, all: true }; // older copies held crops only
  const invListeners = [];
  const onInventoryChange = (fn) => invListeners.push(fn);
  const invState = () => inv;
  const invCount = (id) => (inv.at ? inv.counts[id] || 0 : undefined);
  const invCountByName = (name) => {
    if (!inv.at) return undefined;
    const id = ITEM_BY_NAME[name] || (inv.names || {})[name];
    if (id) return inv.counts[id] || 0;
    return inv.names ? 0 : undefined; // an older copy without names can't tell
  };
  function saveInventory() {
    store.set('inventory', inv);
    keepScroll(() => { for (const fn of invListeners) { try { fn(); } catch (e) { problem(e); } } });
  }
  function parseInventory(root) {
    const counts = {};
    const names = {};
    for (const a of root.querySelectorAll('.list-block li a[href*="item.php?id="]')) {
      const id = new URLSearchParams(a.getAttribute('href').split('?')[1]).get('id');
      const after = a.querySelector('.item-after');
      if (id && after) counts[id] = Number(after.textContent.replace(/[^\d]/g, '')) || 0;
      const strong = a.querySelector('.item-title strong');
      if (id && strong) names[strong.textContent.trim()] = id;
    }
    if (!Object.keys(counts).length) return false;
    const cap = Number(((root.textContent.match(/cannot have more than ([\d,]+)/i) || [])[1] || '').replace(/,/g, ''));
    inv = { at: Date.now(), cap: cap || inv.cap, counts, names, estimated: false, all: true };
    saveInventory();
    return true;
  }
  let invReading = null;
  let invLastTry = 0;
  let invQueued = null;
  function readInventory(why, gap = INV_GAP) {
    if (invReading) return true; // one is on its way
    const wait = gap - (Date.now() - invLastTry);
    if (wait > 0) {
      if (!invQueued) invQueued = setTimeout(() => { invQueued = null; readInventory(`${why} (a moment after the last read)`); }, wait);
      return true;
    }
    invLastTry = Date.now();
    invReading = fetchPage('inventory.php', `item counts, ${why}`)
      .then((doc) => parseInventory(doc.body))
      .catch((e) => problem(e, 'Reading your inventory failed'))
      .finally(() => { invReading = null; });
    return true;
  }
  function countHtml(id, add = 0) {
    return countOfHtml(invCount(id), add);
  }
  function countOfHtml(n, add = 0) {
    if (n === undefined) return '';
    const cap = inv.cap;
    const at = (x) => (cap && x >= cap ? ' is-max' : '');
    if (!(add > 0) || add === 1) return `<b class="frx-count${at(n)}">${num(n)}${cap ? ` / ${num(cap)}` : ''}</b>`;
    const after = n + add;
    const over = cap ? Math.max(0, after - Math.max(n, cap)) : 0;
    return `<b class="frx-count"><span class="${at(n).trim()}">${num(n)}</span> → <span class="${at(after).trim()}">${num(after)}</span>${cap ? ` / ${num(cap)}` : ''}</b>`
      + (over ? ` · <span class="frx-count-over"><i class="fa-solid fa-triangle-exclamation"></i> ${num(over)} would go over your cap</span>` : '');
  }
  const invBusy = () => (invReading ? 'a read is on its way' : invQueued ? 'one read waiting a moment' : 'none');
  function invForPage(page, why) {
    if (!page || page.frxInvAsked) return;
    page.frxInvAsked = true;
    if (inv.at && !inv.estimated && Date.now() - inv.at < INV_GAP) return; // just read: still current
    if (invQueued) return; // a read is already waiting
    readInventory(why);
  }
  function watchBack() {
    for (const p of document.querySelectorAll('.view-main .page')) {
      if (p.classList.contains('page-on-left')) p.frxWasLeft = true;
      else if (p.frxWasLeft && p.classList.contains('page-on-center')) { p.frxWasLeft = false; p.frxInvAsked = false; }
    }
  }
  function setCount(id, n) {
    if (!inv.at || !id || !Number.isFinite(n) || (inv.counts[id] || 0) === n) return;
    inv.counts[id] = n;
    saveInventory();
  }
  function addToInventory(amounts) {
    if (!inv.at) return;
    let changed = false;
    for (const [id, n] of Object.entries(amounts)) {
      if (!n) continue;
      inv.counts[id] = Math.max(0, Math.min(inv.cap || Infinity, (inv.counts[id] || 0) + n));
      changed = true;
    }
    if (!changed) return;
    saveInventory();
  }
  function watchInventoryPage() {
    const page = [...pages('inventory')].filter((p) => !p.classList.contains('page-on-left')).pop();
    if (page && !page.frxInvRead && page.querySelector('.list-block li a[href*="item.php?id="]')) {
      page.frxInvRead = true;
      parseInventory(page);
    }
    for (const p of pages('item')) {
      if (p.frxInvCount || p.classList.contains('page-on-left')) continue;
      const q = (p.f7PageData && p.f7PageData.query) || {};
      const first = p.querySelector('.list-block');
      const m = first && first.textContent.match(/([\d,]+)\s*on hand/i);
      if (!q.id || !m) continue;
      p.frxInvCount = true;
      setCount(String(q.id), Number(m[1].replace(/,/g, '')));
    }
  }
  onGameResponse(/(^|\/)inventory\.php(\?|$)/, (text, url) => {
    if (parseInventory(new DOMParser().parseFromString(text, 'text/html').body)) noteReply(url, 'item counts from an inventory refresh');
  });
  let harvestRepliedAt = 0;
  onGameResponse(/worker\.php\?.*\bgo=(harvestall|harvest|grapejuicevat)(&|$)/, (text, url) => {
    let data;
    try { data = JSON.parse(text); } catch { return; }
    if (!data || !data.drops || !inv.at) return;
    harvestRepliedAt = Date.now();
    const amounts = {};
    for (const [id, d] of Object.entries(data.drops)) amounts[id] = Number(d && d.qty) || 0;
    addToInventory(amounts);
    noteReply(url, `items added from the game's reply: ${Object.values(amounts).reduce((a, b) => a + b, 0)}`);
  });
  const MASTERY_TIERS = [[10, 'No Tier'], [100, 'Tier I'], [1000, 'Tier II'], [10000, 'Tier III (M)'],
    [100000, 'Tier IV (GM)'], [1000000, 'Tier V (MM)']];
  const MASTERY_CHIPS = [[1000000, 'Mega Mastered'], [100000, 'Grand Mastered'], [10000, 'Mastered']];
  let mastery = store.get('mastery', { at: 0, items: {} });
  const masteryListeners = [];
  const onMasteryChange = (fn) => masteryListeners.push(fn);
  const masteryState = () => mastery;
  const masteryOf = (id) => mastery.items[id];
  function saveMastery() {
    store.set('mastery', mastery);
    keepScroll(() => { for (const fn of masteryListeners) { try { fn(); } catch (e) { problem(e); } } });
  }
  const progressOf = (text) => {
    const m = String(text).replace(/\s+/g, ' ').match(/([\d,]+)\s*\/\s*(?:[\d,]+|∞)\s*Progress/i);
    return m ? Number(m[1].replace(/,/g, '')) : NaN;
  };
  function watchMastery() {
    const page = newest('mastery');
    if (page && !page.frxMsRead && page.querySelectorAll('li .item-title').length > 5) {
      page.frxMsRead = true;
      const items = {};
      let mega = false;
      for (const el of page.querySelectorAll('.content-block-title, li')) {
        if (el.classList.contains('content-block-title')) { mega = /Mega Mastered/i.test(el.textContent); continue; }
        const a = el.querySelector('a[href*="item.php?id="]');
        const id = a && new URLSearchParams(a.getAttribute('href').split('?')[1]).get('id');
        if (!id) continue;
        const n = progressOf(el.textContent);
        if (mega) items[id] = { n: Number.isNaN(n) ? 1000000 : n, mega: true };
        else if (!Number.isNaN(n)) items[id] = { n };
      }
      if (Object.keys(items).length) { mastery = { at: Date.now(), items }; saveMastery(); }
    }
    for (const p of pages('item')) {
      if (p.frxMsRead || p.classList.contains('page-on-left')) continue;
      const q = (p.f7PageData && p.f7PageData.query) || {};
      if (q.id && itemPageMastery(p, q.id)) p.frxMsRead = true;
    }
  }
  function itemPageMastery(root, id) {
    const row = [...root.querySelectorAll('li')].find((li) => /Mastery Progress/i.test(li.textContent) && /Progress/.test(li.textContent.replace(/Mastery Progress/i, '')));
    if (!row) return false;
    const text = row.textContent.replace(/Mastery Progress/i, '');
    const n = progressOf(text);
    const mega = /\/\s*∞/.test(text);
    const old = mastery.items[id];
    if (!Number.isNaN(n) && (!old || old.n !== n || !!old.mega !== mega)) {
      mastery.items[id] = mega ? { n, mega: true } : { n };
      saveMastery();
    }
    return true;
  }
  const masteryReads = {};
  onGameResponse(/worker\.php\?.*\bgo=craftitem\b/, (text, url) => {
    const id = new URLSearchParams(url.split('?')[1] || '').get('id');
    if (String(text).trim() !== 'success' || !id) return;
    clearTimeout(masteryReads[id]);
    masteryReads[id] = setTimeout(() => {
      delete masteryReads[id];
      const named = document.querySelector(`[data-id="${id}"][data-name]`);
      fetchPage(`item.php?id=${id}`, `mastery of ${(item(id) || {}).name || (named && named.dataset.name) || `item ${id}`}, after crafting it`)
        .then((doc) => itemPageMastery(doc.body, id))
        .catch((e) => problem(e, 'Reading mastery after a craft failed'));
    }, 2000);
  });
  const masteryShort = (n) => (n >= 1e6 ? `${+(n / 1e6).toFixed(n % 1e6 ? 2 : 0)}M` : n >= 1e3 ? `${+(n / 1e3).toFixed(n % 1e3 && n < 1e5 ? 1 : 0)}K` : String(n));
  function masteryInfo(id) {
    const m = masteryOf(id);
    if (!m) return null;
    const next = MASTERY_TIERS.find(([t]) => m.n < t);
    const tier = m.mega || !next ? 6 : MASTERY_TIERS.indexOf(next);
    const chip = (MASTERY_CHIPS.find(([t]) => m.n >= t) || [])[1] || '';
    return { n: m.n, tier, name: m.mega || !next ? 'Mega Mastered' : next[1], chip, next: m.mega || !next ? null : next[0] };
  }
  function masteryBadge(id) {
    const m = masteryInfo(id);
    if (!m) return '';
    const text = m.next ? `${masteryShort(m.n)} / ${masteryShort(m.next)}` : masteryShort(m.n);
    const tip = [m.name, m.chip && m.chip !== m.name ? m.chip : '', m.next ? `${num(m.next - m.n)} to go` : num(m.n)].filter(Boolean).join(' · ');
    return `<span class="frx-ms t${m.tier}" title="${esc(tip)}">${text}</span>`;
  }
  const masteryHtml = (id) => {
    const m = masteryInfo(id);
    return m ? `<span class="frx-ms-label">${m.next ? 'Mastery' : 'Mega Mastered'}</span> ${masteryBadge(id)}` : '';
  };
  let quests = store.get('quests', { at: 0, open: [], done: null, personal: null });
  const questListeners = [];
  const onQuestsChange = (fn) => questListeners.push(fn);
  const questsState = () => quests;
  function watchQuests() {
    const page = newest('quests');
    if (!page || page.frxQRead || !page.querySelector('a[href*="questscomp.php"]')) return;
    page.frxQRead = true;
    const open = [...page.querySelectorAll('a[href*="quest.php?id="]')].map((a) => {
      const id = Number(new URLSearchParams(a.getAttribute('href').split('?')[1]).get('id'));
      const title = (a.querySelector('.item-title strong, strong') || a).textContent.replace(/\s+/g, ' ').trim();
      return { id, title };
    }).filter((q) => q.id);
    const total = (re) => {
      const a = [...page.querySelectorAll('a[href*="questscomp.php"]')].find((x) => re.test(x.getAttribute('href')));
      const after = a && a.querySelector('.item-after');
      return after ? Number(after.textContent.replace(/[^\d]/g, '')) || 0 : null;
    };
    const before = new Set(quests.open.map((q) => q.id));
    const fresh = quests.at && open.some((q) => !before.has(q.id) && !questDone(q.id));
    quests = { at: Date.now(), open, done: total(/questscomp\.php$/), personal: total(/phr=1/), newAt: fresh ? Date.now() : quests.newAt || 0 };
    store.set('quests', quests);
    questsChanged();
  }
  const questsChanged = () => keepScroll(() => { for (const fn of questListeners) { try { fn(); } catch (e) { problem(e); } } });
  let questsDone = store.get('quests.done', { at: 0, ids: [] });
  let doneSet = new Set(questsDone.ids);
  const questDone = (id) => (doneSet.has(Number(id)) ? true : questsDone.at ? false : undefined);
  function saveQuestsDone(ids, full) {
    questsDone = { at: full ? Date.now() : questsDone.at, ids };
    doneSet = new Set(ids);
    store.set('quests.done', questsDone);
    questsChanged();
  }
  onGameResponse(/worker\.php\?.*\bgo=collectquest\b/, (text, url) => {
    const id = Number(new URLSearchParams(url.split('?')[1] || '').get('id'));
    if (!id || !/^(success|already)$/.test(String(text).trim())) return;
    noteReply(url, 'Help Request completed');
    if (quests.open.some((q) => q.id === id)) {
      quests = { ...quests, open: quests.open.filter((q) => q.id !== id) };
      store.set('quests', quests);
    }
    if (!doneSet.has(id)) saveQuestsDone([...questsDone.ids, id], false);
    else questsChanged();
  });
  function watchQuestsDone() {
    const page = newest('questscomp');
    if (page && !page.frxQDone && !/phr=1/.test((page.f7PageData && page.f7PageData.url) || '')) {
      const ids = [...page.querySelectorAll('a[href*="quest.php?id="]')]
        .map((a) => Number(new URLSearchParams(a.getAttribute('href').split('?')[1]).get('id'))).filter(Boolean);
      if (ids.length) { page.frxQDone = true; saveQuestsDone(ids, true); }
    }
    for (const p of pages('quest')) {
      if (p.frxQDone || p.classList.contains('page-on-left')) continue;
      const id = Number(((p.f7PageData && p.f7PageData.query) || {}).id);
      if (!id || !p.querySelector('.page-content')) continue;
      p.frxQDone = true;
      if (/You completed this request!/i.test(p.textContent) && !doneSet.has(id)) saveQuestsDone([...questsDone.ids, id], false);
    }
  }
  let effects = store.get('effects', {});
  const effectListeners = [];
  const onEffectsChange = (fn) => effectListeners.push(fn);
  const effectEnd = (id) => ((effects[id] || 0) > Date.now() ? effects[id] : 0);
  function readEffects(root) {
    const found = {};
    if (!window.luxon) return found;
    for (const cd of root.querySelectorAll('[data-countdown-to]')) {
      const tile = cd.closest('.quick-meal-item');
      const btn = tile && tile.querySelector('.usemealbtn[data-id]');
      const link = !btn && cd.closest('.item-link, a[href]');
      const id = btn ? btn.dataset.id : link && new URLSearchParams((link.getAttribute('href') || '').split('?')[1] || '').get('id');
      if (!id) continue;
      const end = window.luxon.DateTime.fromISO(cd.dataset.countdownTo, { zone: 'America/Chicago' }).toMillis();
      if (end) found[id] = end;
    }
    return found;
  }
  const BONUS_WORDS = { friendship: /friendship xp/i, mastery: /mastery/i, silver: /silver/i };
  function readBonuses(root) {
    const copy = root.cloneNode(true);
    copy.querySelectorAll('[data-storage-key="hide_recent_update"], #recent-update-content, a[href*="item.php"]')
      .forEach((el) => el.remove());
    const text = copy.textContent.replace(/\s+/g, ' ');
    const found = {};
    for (const m of text.matchAll(/\+\s?(\d{1,3})%\s*(?:more\s+|towards\s+)?([a-z][a-z ]{2,30})/gi)) {
      for (const [key, re] of Object.entries(BONUS_WORDS)) if (re.test(m[2]) && !found[key]) found[key] = Number(m[1]);
    }
    return found;
  }
  const bonus = (key) => {
    const b = store.get('bonuses', null);
    return b && b.day === gameDay() ? (b.found[key] || 0) : 0;
  };
  const setBonuses = (found) => store.set('bonuses', { day: gameDay(), found });
  const PERK_PAGES = { skill: 'perks.php', gold: 'supply.php' };
  const perkListeners = [];
  const onPerksChange = (fn) => perkListeners.push(fn);
  const perkData = () => store.get('perks', {});
  function hasPerk(name) {
    const d = perkData();
    const kinds = Object.values(d).filter((k) => k && k.names);
    if (!kinds.length) return null;
    return kinds.some((k) => k.names.includes(name)) || (kinds.length < 2 ? null : false);
  }
  const perksCheckedAt = () => Math.min(...Object.keys(PERK_PAGES).map((k) => (perkData()[k] || {}).at || 0));
  const readPerkNames = (root) => [...new Set([...root.querySelectorAll('.list-block li button[data-name]')]
    .filter((b) => /^\s*Unlocked\s*$/i.test(b.textContent)).map((b) => b.dataset.name))].sort();
  function savePerks(kind, names) {
    const all = perkData();
    const old = all[kind];
    const changed = !old || JSON.stringify(old.names) !== JSON.stringify(names);
    all[kind] = { names, at: Date.now() };
    store.set('perks', all);
    if (changed) keepScroll(() => { for (const fn of perkListeners) { try { fn(); } catch (e) { problem(e); } } });
  }
  let lastPerkCheck = 0;
  const PERK_BUTTONS = '.unlockbtn, .unlockbtnnc, .resetonebtn, .resetbtn, .activateperksetbtn';
  let perkWatchUntil = 0;
  document.addEventListener('click', (e) => {
    if (e.target.closest && e.target.closest(PERK_BUTTONS) && e.target.closest('.page[data-page="perks"], .page[data-page="supply"]')) {
      perkWatchUntil = Date.now() + 30 * 1000;
    }
  }, true);
  const newest = (name) => [...document.querySelectorAll(`.page[data-page="${name}"]`)].filter((p) => !p.classList.contains('page-on-left')).pop();
  function checkPerks() {
    if (Date.now() - lastPerkCheck < 3000 && Date.now() > perkWatchUntil) return;
    lastPerkCheck = Date.now();
    const all = perkData();
    const live = { skill: newest('perks'), gold: newest('supply') };
    for (const [kind, page] of Object.entries(live)) {
      if (!page || !page.querySelector('button[data-name]')) continue;
      const names = readPerkNames(page);
      const k = all[kind];
      if (!k || JSON.stringify(k.names) !== JSON.stringify(names) || Date.now() - k.at > 3600 * 1000) savePerks(kind, names);
    }
  }
  const DATA_CHECKS = [];
  const dataCheck = (def) => DATA_CHECKS.push(def);
  const dataStatus = () => DATA_CHECKS.filter((d) => !d.feature || FEATURES.some((f) => f.id === d.feature && featureOn(f)
    && (!d.option || opt(f.id, d.option)))).map((d) => {
    try { return { ...d, ...d.status() }; } catch (e) { problem(e); return { ...d, state: 'missing', note: '' }; }
  });
  const when = (t) => new Date(t).toLocaleString([], { weekday: 'short', hour: 'numeric', minute: '2-digit' });
  const perkStatus = (kind) => {
    const k = perkData()[kind];
    if (!k) return { state: 'missing', note: 'Not seen yet' };
    return { state: 'ok', note: `Seen ${when(k.at)}` };
  };
  dataCheck({ key: 'perks', page: 'perks.php', label: 'Perks', why: 'perk-point perks such as Friendship Primer, Double Prizes and Eagle Eye', status: () => perkStatus('skill') });
  dataCheck({ key: 'supply', page: 'supply.php', label: 'Farm Supply', why: 'gold perks such as O.M.G II, Quick Meals and Lemon Squeezer', status: () => perkStatus('gold') });
  dataCheck({ key: 'mastery', feature: 'mastery', page: 'mastery.php', label: 'Mastery', why: 'mastery counts in the Workshop, at fishing and exploring spots, and for your seeds',
    status: () => {
      const ms = masteryState();
      if (!ms.at) return { state: 'missing', note: 'Not seen yet' };
      if (Object.values(ms.items).some((m) => m.mega && m.n === 1000000)) return { state: 'old', note: 'Out of date' };
      return { state: 'ok', note: `Seen ${when(ms.at)}` };
    } });
  dataCheck({ key: 'quests', feature: 'goals', page: 'quests.php', label: 'Help Requests', why: 'your open quests and request totals, for the next steps toward the Swamp Puzzle and the Cursed Effigy',
    status: () => {
      const q = questsState();
      if (!q.at) return { state: 'missing', note: 'Not seen yet' };
      return Date.now() - q.at > 24 * 3600 * 1000 ? { state: 'old', note: `Seen ${when(q.at)}` } : { state: 'ok', note: `Seen ${when(q.at)}` };
    } });
  dataCheck({ key: 'questsDone', feature: 'uses', page: 'questscomp.php', label: 'Completed Requests', why: 'Help Requests you\'ve completed, crossed out in Item Uses',
    status: () => {
      if (!questsDone.at) return { state: 'missing', note: 'Not seen yet' };
      const total = questsState().done;
      return total > questsDone.ids.length ? { state: 'old', note: 'Out of date' } : { state: 'ok', note: `Seen ${when(questsDone.at)}` };
    } });
  let effectsKey = '';
  function setEffects(next) {
    effects = next;
    store.set('effects', effects);
    checkEffects();
  }
  function checkEffects() {
    const now = Date.now();
    const key = Object.keys(effects).filter((id) => effects[id] > now).sort().map((id) => `${id}:${effects[id]}`).join(',')
      + JSON.stringify([store.get('bonuses', null), store.get('totd', null)]);
    if (key === effectsKey) return;
    effectsKey = key;
    keepScroll(() => { for (const fn of effectListeners) { try { fn(); } catch (e) { problem(e); } } });
  }
  const MEALS_CHECKED_FOR = 60 * 60 * 1000;
  const mealsSeenAt = () => store.get('effects.at', 0);
  let homeRead = null;
  function refreshEffects(maxAge = Infinity, why = 'meals running, event bonuses (first time)') {
    if (!homeRead && mealsSeenAt() && Date.now() - mealsSeenAt() < maxAge) return Promise.resolve();
    if (!homeRead) {
      homeRead = fetchPage('index.php', why)
        .then((doc) => { store.set('effects.at', Date.now()); setBonuses(readBonuses(doc.body)); readTotd(doc); setEffects(readEffects(doc)); })
        .catch(() => { /* keep what we had */ })
        .finally(() => { setTimeout(() => { homeRead = null; }, 5000); });
    }
    return homeRead;
  }
  function readQuickPanel(root) {
    const ids = [...root.querySelectorAll('.quick-meal-item .usemealbtn[data-id]')].map((b) => b.dataset.id);
    if (!ids.length) return '';
    const found = readEffects(root);
    const info = root.querySelector('#meal-info');
    const active = info ? Number(info.dataset.activeMeals) : NaN;
    const timers = Object.keys(found).length;
    const trusted = !Number.isNaN(active) && timers >= active;
    const next = { ...effects };
    for (const id of ids) {
      if (found[id]) next[id] = found[id];
      else if (trusted) next[id] = 0;
    }
    if (trusted) store.set('effects.at', Date.now()); // as good as a look at Home for these meals
    setEffects(next);
    return trusted ? 'trusted' : 'partial';
  }
  let eatTap = 0;
  let panelSig = '';
  document.addEventListener('click', (e) => {
    if (e.target.closest && e.target.closest('.usemealbtn, #triplecookie-quick-meals')) eatTap = Date.now();
  }, true);
  function watchQuickPanel() {
    const panel = document.querySelector('#meal-picker-content');
    if (!panel) return;
    const sig = `${panel.innerHTML.length}:${panel.querySelectorAll('[data-countdown-to]').length}:${(panel.querySelector('#meal-info') || {}).outerHTML || ''}`;
    if (sig === panelSig) { if (eatTap && Date.now() - eatTap > 60 * 1000) eatTap = 0; return; }
    panelSig = sig;
    const result = readQuickPanel(panel);
    if (eatTap && Date.now() - eatTap < 60 * 1000) {
      eatTap = 0;
      if (result !== 'trusted') refreshEffects(0, 'meals running, after eating');
    }
  }
  onGameResponse(/worker\.php\?.*\bgo=useitem\b/, (text, url) => {
    const id = new URLSearchParams(url.split('?')[1] || '').get('id');
    if (String(text).trim() !== 'success' || !MEALS[id] || Date.now() - eatTap < 60 * 1000) return;
    noteReply(url, `meal eaten (${(item(id) || {}).name || id}), reading Home once`);
    refreshEffects(0, 'meals running, after eating outside Quick Meals');
  });
  function readTotd(root) {
    const after = root.querySelector('a[href="npclevels.php"] .item-after');
    setTotd(after && after.textContent.replace(/\s+/g, ' ').trim());
  }
  function setTotd(name) {
    const old = store.get('totd', null);
    if (!name || (old && old.name === name && old.day === gameDay())) return;
    store.set('totd', { name, day: gameDay() });
    checkEffects();
  }
  const homePages = () => document.querySelectorAll('.page[data-page="index"], .page[data-page^="index-"]');
  function watchHome() {
    homePages().forEach((home) => {
      const found = readEffects(home);
      if (!home.frxBonusRead && !home.classList.contains('page-on-left')) {
        home.frxBonusRead = true;
        readTotd(home);
        setBonuses(readBonuses(home));
        store.set('effects.at', Date.now());
        setEffects(found);
        return;
      }
      home.frxBonusRead = true;
      const merged = { ...effects };
      let changed = false;
      for (const [id, end] of Object.entries(found)) if (end > (merged[id] || 0)) { merged[id] = end; changed = true; }
      if (changed) setEffects(merged);
    });
  }
  const FEATURES = [];
  const broken = new Set(); // features that threw an error; switched off until the page reloads
  const feature = (def) => FEATURES.push(def);
  const featureOn = (f) => !broken.has(f.id) && (store.get('features', {})[f.id] ?? (f.defaultOn !== false));
  const isOn = (id) => FEATURES.some((f) => f.id === id && featureOn(f));
  function opt(featureId, key) {
    const f = FEATURES.find((x) => x.id === featureId);
    const o = f && (f.options || []).find((x) => x.key === key);
    const saved = store.get('options', {})[`${featureId}.${key}`];
    if (o && o.choices) return o.choices.some(([v]) => v === saved) ? saved : (o.default ?? o.choices[0][0]);
    return saved ?? (o ? o.default !== false : true);
  }
  function setOpt(featureId, key, value) {
    const all = store.get('options', {});
    all[`${featureId}.${key}`] = value;
    store.set('options', all);
  }
  function optionsHtml(f) {
    if (!f.options || !f.options.length) return '';
    const groups = [];
    for (const o of f.options) {
      const last = groups[groups.length - 1];
      if (last && last.name === (o.group || '')) last.items.push(o); else groups.push({ name: o.group || '', items: [o] });
    }
    return `<div class="frx-setting-extra frx-options">${groups.map((g) => `
      ${g.name ? `<div class="frx-opt-group">${esc(g.name)}</div>` : ''}
      <div class="${g.name && g.items.every((o) => o.label.length <= 24) ? 'frx-opt-grid' : ''}">${g.items.map((o) => {
        const other = o.needs && FEATURES.find((x) => x.id === o.needs);
        const off = other && !featureSaved(other);
        if (o.choices) {
          return `<label class="frx-opt-pick">${esc(o.label)}
        <select data-frx-opt="${esc(f.id)}.${esc(o.key)}">${o.choices.map(([v, l]) => `<option value="${esc(v)}"${opt(f.id, o.key) === v ? ' selected' : ''}>${esc(l)}</option>`).join('')}</select>
      </label>`;
        }
        return `<label class="${off ? 'is-off' : ''}"${other ? ` data-frx-needs="${esc(other.id)}"` : ''}>
        <input type="checkbox" data-frx-opt="${esc(f.id)}.${esc(o.key)}" ${opt(f.id, o.key) ? 'checked' : ''}${off ? ' disabled' : ''}> ${esc(o.label)}${other ? ` <span class="frx-opt-needs">(with ${esc(other.name)} on)</span>` : ''}
      </label>`;
      }).join('')}</div>`).join('')}</div>`;
  }
  function runFeature(f, step) {
    if (!f[step] || !featureOn(f)) return;
    try {
      f[step]();
    } catch (e) {
      broken.add(f.id);
      problem(e, `"${f.name}" stopped after an error; the other features keep running.`);
    }
  }
  const featureSaved = (f) => store.get('features', {})[f.id] ?? (f.defaultOn !== false);
  const onCount = () => `${FEATURES.filter(featureSaved).length} of ${FEATURES.length} on`;
  function openToolkit() {
    const view = window.mainView;
    if (!view || !view.router) return;
    if (window.myApp && window.myApp.closePanel) window.myApp.closePanel(); // phones: the left menu slides away
    view.router.loadContent(`
      <div class="navbar"><div class="navbar-inner">
        <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>
        <div class="center sliding">${esc(TOOLKIT)}</div>
        <div class="right"><a href="#" data-panel="left" class="link open-panel icon-only"><i class="icon icon-bars"></i></a></div>
      </div></div>
      <div class="pages"><div class="page" data-page="frx-toolkit"><div class="page-content">
        <div class="content-block frx-tk-intro">Turn each feature, and its parts, on or off. Changes apply the next time a
          page loads; reload the game to apply them everywhere. Version ${esc(VERSION)}.</div>
        ${FEATURES.map((f) => `
          <div class="content-block-title">${esc(f.name)}</div>
          <div class="card"><div class="card-content"><div class="card-content-inner frx-setting" data-frx-for="${esc(f.id)}">
            <div class="frx-tk-row">
              <div class="frx-tk-desc">${esc(f.description)}</div>
              <label class="label-switch"><input type="checkbox" data-frx-feature="${esc(f.id)}" ${featureSaved(f) ? 'checked' : ''}>
                <div class="checkbox"></div></label>
            </div>
            ${optionsHtml(f)}
          </div></div></div>`).join('')}
      </div></div></div>`);
  }
  function wireToolkit(page) {
    if (page.frxWired) return;
    page.frxWired = true;
    page.addEventListener('change', (e) => {
      const key = e.target.dataset.frxOpt;
      if (key) {
        const all = store.get('options', {});
        all[key] = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        store.set('options', all);
        return;
      }
      const id = e.target.dataset.frxFeature;
      if (!id) return;
      const next = store.get('features', {});
      next[id] = e.target.checked;
      store.set('features', next);
      document.querySelectorAll('.frx-tk-count').forEach((el) => { el.textContent = onCount(); });
      page.querySelectorAll(`label[data-frx-needs="${id}"]`).forEach((l) => {
        l.classList.toggle('is-off', !e.target.checked);
        l.querySelector('input').disabled = !e.target.checked;
      });
    });
    FEATURES.forEach((f) => {
      if (!f.settings) return;
      try { f.settings(page.querySelector(`[data-frx-for="${f.id}"]`)); } catch (e) { problem(e); }
    });
  }
  function settingsPanel() {
    document.querySelectorAll('.page[data-page="frx-toolkit"]').forEach(wireToolkit);
    pages('settings').forEach((page) => {
      if (page.querySelector('.frx-tk-entry')) return;
      const anchor = titleBlock(page, /Available Settings/i) || page.querySelector('.page-content > *');
      if (!anchor) return;
      anchor.insertAdjacentHTML('beforebegin', `
        <div class="content-block-title frx-tk-entry">${esc(TOOLKIT)}</div>
        <div class="list-block frx-tk-entry"><ul><li>
          <a href="javascript:;" class="item-link frx-tk-open">
            <div class="item-content"><div class="item-inner">
              <div class="item-title"><i class="fa-solid fa-fw fa-screwdriver-wrench"></i> ${esc(TOOLKIT)}
                <span class="frx-tk-tag">Toolkit</span></div>
              <div class="item-after frx-tk-count">${onCount()}</div>
            </div></div>
          </a></li></ul></div>`);
    });
  }
  const CORE_CSS = `
    body {
      --frx-text: #1f1f1f; --frx-strong: #000; --frx-muted: #474747; --frx-faint: #6b6b6b;
      --frx-surface: #f6f6f6; --frx-surface-2: #fff; --frx-border: #c8c8c8; --frx-border-soft: #e4e4e4;
      --frx-shadow: rgba(0,0,0,.18); --frx-scrim: rgba(0,0,0,.35); --frx-dot-off: #9a9a9a;
      --frx-good: #1e6b2a; --frx-good-bg: #e6f2e7; --frx-good-border: #93c49a;
      --frx-warn: #9a4600; --frx-warn-bg: #fdf1e3; --frx-warn-border: #e0b07c;
      --frx-gold: #7a5300; --frx-love: #9c1d4f; --frx-like: #1e6b2a; --frx-bad: #b3261e;
      --frx-blue: #0d4fa0; --frx-amt: #1e6b2a; --frx-mult: #7a5300;
      --frx-link: #4f46d8; --frx-tag: #55309a; --frx-tag-border: #bba5dc;
      /* Rarity scale (mastery tiers only): poor, uncommon, rare, epic, legendary, mythic. */
      --frx-r-poor: #6b6b6b; --frx-r-uncommon: #1f7a12; --frx-r-rare: #0b5bb5; --frx-r-epic: #7b2cbf;
      --frx-r-legendary: #b35400; --frx-r-mythic: #b3123c;
    }
    body.layout-dark {
      --frx-text: #e8e8e8; --frx-strong: #fff; --frx-muted: #b8b8b8; --frx-faint: #9e9e9e;
      --frx-surface: #1c1c1c; --frx-surface-2: #1f1f1f; --frx-border: #444; --frx-border-soft: #2c2c2c;
      --frx-shadow: rgba(0,0,0,.5); --frx-scrim: rgba(0,0,0,.6); --frx-dot-off: #777;
      --frx-good: #81c784; --frx-good-bg: #22331f; --frx-good-border: #3f5f3f;
      --frx-warn: #ffb74d; --frx-warn-bg: #2e2312; --frx-warn-border: #6b4a1a;
      --frx-gold: #ffd54f; --frx-love: #ef9a9a; --frx-like: #a5d6a7; --frx-bad: #ff5252;
      --frx-blue: #7cc7ff; --frx-amt: #9ef07a; --frx-mult: #ffd166;
      --frx-link: #b9b3ff; --frx-tag: #b08cff; --frx-tag-border: #4a3870;
      --frx-r-poor: #9d9d9d; --frx-r-uncommon: #4ee43a; --frx-r-rare: #4aa3ff; --frx-r-epic: #c27cff;
      --frx-r-legendary: #ff9a3c; --frx-r-mythic: #ff5f7e;
    }
    .frx-icon { width: 20px !important; height: 20px !important; vertical-align: middle; }
    .frx-text { font-size: 12px; padding: 2px 3px; border: 1px solid var(--frx-border); border-radius: 3px; }
    /* The "Toolkit" tag marks what the Toolkit adds to a game page (before a note or card; frx-tk-tag after a name).
       frx-note: a one-line note on a game page (what's counted, how old, where to update it). Every feature uses
       these two instead of its own copy. */
    .frx-tag, .frx-tk-tag { padding: 1px 6px; border: 1px solid var(--frx-tag-border); border-radius: 8px;
      font-size: 12px; font-weight: bold; text-transform: uppercase; color: var(--frx-tag); }
    .frx-tag { margin-right: 6px; }
    .frx-tk-tag { margin-left: 6px; padding: 0 6px; vertical-align: middle; }
    .frx-note { margin: 10px 15px; font-size: 13px; line-height: 1.45; color: var(--frx-muted); }
    /* frx-card: a summary card above a list (Locksmith totals, Temple summary). frx-sub: a smaller grey line inside a
       card or box (what's missing, where to update it). */
    .frx-card { margin: 10px 15px; padding: 10px 12px; border: 1px solid var(--frx-border); border-radius: 8px;
      background: var(--frx-surface); color: var(--frx-text); font-size: 14px; }
    .frx-sub { margin-top: 4px; font-size: 13px; color: var(--frx-muted); }
    /* frx-chip: an item picture and an amount, in a rounded box (what a bundle or container gives). */
    .frx-chip { display: inline-flex; align-items: center; gap: 4px; margin: 1px 4px 1px 0; padding: 0 7px 0 4px;
      border: 1px solid var(--frx-border); border-radius: 10px; background: var(--frx-surface); color: var(--frx-text);
      white-space: nowrap; line-height: 20px; }
    .frx-chip img { width: 16px !important; height: 16px !important; }
    .frx-lead { margin-right: 2px; color: var(--frx-muted); } /* grey lead-in words before chips ("Inside:") */
    .frx-count { white-space: nowrap; } /* countHtml(): "1,228 / 5,078" */
    .frx-count.is-max, .frx-count .is-max { color: var(--frx-bad); }
    .frx-count-over { color: var(--frx-warn); font-weight: bold; white-space: nowrap; }
    /* masteryBadge(): bold, coloured by the game's Mastery page group on an MMO-style rarity scale: t0 No Tier (poor),
       t1 Tier I (common), t2 Tier II (uncommon), t3 Tier III (M) (rare), t4 Tier IV (GM) (epic),
       t5 Tier V (MM) (legendary), t6 Mega Mastered (mythic). */
    .frx-ms { white-space: nowrap; font-weight: bold; color: var(--frx-text); }
    .frx-ms.t0 { color: var(--frx-r-poor); }
    .frx-ms.t1 { color: var(--frx-text); }
    .frx-ms.t2 { color: var(--frx-r-uncommon); }
    .frx-ms.t3 { color: var(--frx-r-rare); }
    .frx-ms.t4 { color: var(--frx-r-epic); }
    .frx-ms.t5 { color: var(--frx-r-legendary); }
    .frx-ms.t6 { color: var(--frx-r-mythic); }
    .frx-ms-label { font-weight: normal; color: var(--frx-muted); } /* masteryHtml(): grey "Mastery" before the badge */
    /* gameLink(): a place or source linked to the game's page: underlined like the game's links, but in the text colour
       and normal weight, so a line of them isn't one colour (bold is kept for what matters, like a quest you have
       open). tipHtml(): text with details on hover (dotted underline). */
    .frx-link { font-weight: normal; color: var(--frx-link) !important; text-decoration: underline; text-underline-offset: 3px; white-space: nowrap; }
    .frx-tip { text-decoration: underline dotted; text-underline-offset: 3px; cursor: help; white-space: nowrap; }
    .frx-tk-open .item-title i { color: var(--frx-good); }
    .frx-tk-count { font-size: 14px; }
    .content-block.frx-tk-intro { margin: 0; padding: 14px 15px 4px; font-size: 14px; color: var(--frx-muted); }
    .frx-tk-row { display: flex; align-items: flex-start; gap: 12px; }
    .frx-tk-desc { flex: 1; font-size: 14px; color: var(--frx-text); }
    .frx-tk-row .label-switch { flex: none; }
    .frx-setting-extra { margin: 8px 0 0; padding-top: 8px; border-top: 1px solid var(--frx-border-soft); font-size: 14px; }
    .frx-setting-extra label { display: block; margin: 4px 0; }
    .frx-opt-group { margin: 8px 0 2px; font-weight: bold; color: var(--frx-text); }
    .frx-opt-needs { color: var(--frx-muted); }
    .frx-options label.is-off { opacity: .55; }
    .frx-opt-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); column-gap: 10px; }
    .frx-opt-grid label { margin: 2px 0; }
    .frx-opt-pick select { margin-left: 6px; max-width: 100%; padding: 2px 4px; font-size: 14px; color: var(--frx-text);
      background: var(--frx-surface-2); border: 1px solid var(--frx-border); border-radius: 6px; }
    /* A feature that's switched off: its parts are greyed out (still changeable). */
    .frx-setting:has(.frx-tk-row input:not(:checked)) .frx-setting-extra { opacity: .5; }
    .frx-setting-extra label { cursor: pointer; }
    .frx-setting-extra input[type="checkbox"] { margin-right: 6px; }
  `;
  function keepScroll(run) {
    const page = [...document.querySelectorAll('.view-main .page')]
      .filter((p) => !p.classList.contains('page-on-left') && !p.classList.contains('page-on-right')).pop();
    const pc = page && page.querySelector('.page-content');
    if (pc && !page.frxPassed) {
      page.frxPassed = true;
      const restored = pc.scrollTop > 0 || window.currentScroll > 0; // the game is putting you back somewhere
      const height = pc.scrollHeight;
      pc.style.overflowAnchor = 'none';
      try { run(); } finally {
        void pc.offsetHeight; // lay out now, while anchoring is off
        pc.style.overflowAnchor = '';
        if (restored) {
          ACTIVITY.settled += 1;
          logPush('debug.scroll', { at: Date.now(), page: page.dataset.page, moved: Math.round(pc.scrollHeight - height),
            anchor: 'redrawn by the game; additions settled', settle: true }, 10);
        }
      }
      return;
    }
    let anchor = null;
    let before = 0;
    if (pc && pc.scrollTop > 0) {
      const r = pc.getBoundingClientRect();
      const top = r.top + 4;
      anchor = [...pc.querySelectorAll('li, .card, .content-block-title, .content-block')].find((el) => {
        if (el.closest('[class*="frx-"]')) return false;
        const b = el.getBoundingClientRect();
        return b.height > 0 && b.top >= top;
      }) || null;
      if (anchor) before = anchor.getBoundingClientRect().top;
    }
    try { run(); } finally {
      if (anchor && anchor.isConnected) {
        const moved = anchor.getBoundingClientRect().top - before;
        if (Math.abs(moved) >= 1) {
          pc.scrollTop += moved;
          logPush('debug.scroll', { at: Date.now(), page: page.dataset.page, moved: Math.round(moved),
            anchor: (anchor.textContent || '').trim().slice(0, 30) }, 10);
        }
      }
    }
  }
  function start() {
    try { ['meals.hidden', 'settings.open', 'settings.jump'].forEach((k) => localStorage.removeItem(`frx.${k}`)); } catch { /* storage blocked */ }
    try { ['fg-perks', 'fg-totd'].forEach((k) => localStorage.removeItem(k)); } catch { /* storage blocked */ }
    document.addEventListener('click', (e) => {
      if (!(e.target.closest && e.target.closest('.frx-tk-open'))) return;
      e.preventDefault();
      openToolkit();
    }, true);
    watchGameResponses();
    addCss(CORE_CSS + FEATURES.filter(featureOn).map((f) => f.css || '').join('\n'));
    FEATURES.forEach((f) => runFeature(f, 'init'));
    const scan = () => {
      const t = performance.now();
      keepScroll(() => {
        settingsPanel();
        watchHome();
        watchQuickPanel();
        checkPerks();
        watchInventoryPage();
        watchBack();
        watchMastery();
        watchQuests();
        watchQuestsDone();
        watchPlaces();
        FEATURES.forEach((f) => runFeature(f, 'scan'));
      });
      const ms = performance.now() - t;
      ACTIVITY.scans += 1;
      ACTIVITY.scanMs += ms;
      if (ms > ACTIVITY.slowest) {
        ACTIVITY.slowest = ms;
        const p = document.querySelector('.view-main .page-on-center') || document.querySelector('.view-main .page:last-child');
        ACTIVITY.slowestPage = p ? p.dataset.page : '';
      }
    };
    let queued = false;
    new MutationObserver(() => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => { queued = false; scan(); });
    }).observe(document.body, { childList: true, subtree: true });
    setInterval(checkEffects, 10 * 1000); // notice effects running out
    scan();
  }
  const MEALS = {
    634: { effect: '+10% item mastery count (crafting: 10% chance of +2)', lasts: '5 min' },
    635: { effect: '+10% exploring XP', lasts: '5 min' },
    643: { effect: '+2-6 fish per manual fishing catch; stacks with double hooks', lasts: '5 min', vague: true },
    644: { effect: 'Lemonade and APs give 10% more items', lasts: '5 min', vague: true },
    645: { effect: 'All nets catch 10% more', lasts: '5 min', vague: true },
    646: { effect: '+10% silver at the market (not truffles or wine)', lasts: '5 min' },
    647: { effect: '+10% friendship XP', lasts: '5 min' },
    654: { effect: 'Cider uses 20% less stamina', lasts: '5 min' },
    657: { effect: '3x crops when harvesting', lasts: '5 min' },
    661: { effect: 'Pepper, Carrot, Pea, Cucumber and Eggplant grow instantly (5 min or less)', lasts: '2 min' },
    699: { effect: '3x crops when harvesting', lasts: '5 min' },
    716: { effect: '3x crops when harvesting', lasts: '5 min' },
    755: { effect: 'Sawmill makes an extra 20% every 10 min, even past your inventory cap', lasts: '1 hour' },
    756: { effect: '+50% items when collecting from pets', lasts: '2 min' },
    778: { effect: '5x APs used per explore click', lasts: '2 min' },
    781: { effect: '5x cider used per explore click', lasts: '2 min' },
    830: { effect: 'Raises your max stamina for good', lasts: 'permanent', vague: true },
    862: { effect: 'Harvesting always gives crop drops; can\'t combine with cookies', lasts: '', vague: true },
    1107: { effect: 'Lets you accept the visible Exchange Center offers again (not one-time offers)', lasts: 'one use', vague: true },
    1157: { effect: 'Your next chat message is in holiday colours', lasts: 'next message', vague: true },
    1203: { effect: 'APs give 50% more items; stacks with Quandary Chowder', lasts: '50 actions', vague: true, actions: true },
    1269: { effect: '20x cooking XP (stir, taste, season and collect each use one action)', lasts: '32 actions', vague: true, actions: true },
    1304: { effect: 'Hide drops in every exploring zone except the Forest; lowers other drops', lasts: '150 actions', vague: true, actions: true },
    1496: { effect: 'Better Wheel of Borgen rewards', lasts: '10 spins', vague: true, actions: true },
  };
  const STEW = { ids: [634], optional: true };
  const PAGE_MEALS = {
    mailbox: [{ ids: [647], when: (page) => !!page.querySelector('#npc_level') }], // townsfolk mailboxes only
    xfarm: [{ ids: [699, 716, 657], label: 'Happy, Lovely or Spooky Cookies' }, { ids: [661] }, STEW],
    fishing: [{ ids: [643] }, { ids: [645] }, STEW],
    workshop: [STEW],
    area: [{ ids: [635] }, { ids: [644] }, { ids: [1203] }, { ids: [654] }, { ids: [781] }, { ids: [778] }],
    pets: [{ ids: [756] }],
    sawmill: [{ ids: [755] }],
    market: [{ ids: [646] }],
    kitchen: [{ ids: [1269] }],
  };
  const GOALS = [
    {
      key: 'swamp',
      item: 1352,
      name: 'Swamp Puzzle',
      opens: 'the Sinking Swamp (exploring and fishing)',
      finish: 'Then craft it at the Workshop: Crafting 99 and 1,000,000 Silver.',
      parts: [
        { id: 979, how: 'Score 100% on the "Piece It Together" quiz', where: [['Schoolhouse', 'schoolhouse.php']] },
        { id: 980, how: 'Borgen\'s Camp, some Wednesdays, for 5,000 Ancient Coins', where: [['Borgen\'s Camp', 'tent.php']], sold: 'tent', count: [123, 5000, 'Ancient Coins'] },
        { id: 764, how: 'Borgen Mercantile, 100 Borgen Bucks (Bucks come from spending Ancient Coins)', where: [['Borgen Mercantile', 'bmerc.php']], sold: 'bmerc', count: [761, 100, 'Borgen Bucks'], bucks: true },
        { id: 1450, how: 'Exchange Center, a one-time trade for 10 Piece 11', where: [['Exchange Center', 'exchange.php']], count: [770, 11, 'Piece 11 (10 to trade, 1 for the puzzle)'] },
        { id: 765, how: '"Corn of Interest" questline (Part 15)', quest: 'Corn of Interest Part 15' },
        { id: 770, how: 'House of Cards (4 Clubs), sometimes Borgen\'s Camp (7,777 Ancient Coins), or 2,095 days of account age', where: [['Borgen\'s Camp', 'tent.php']], sold: 'tent', count: [605, 4, 'Clubs'], needs: 'hoc' },
        { id: 1449, how: 'Temple of Reward, a chain of 1,000 Piece 30', where: [['Temple of Reward', 'temple.php']], count: [983, 1001, 'Piece 30 (1,000 for the chain, 1 for the puzzle)'], needs: 'crushroom' },
        { id: 771, how: '"Spirit of the Cards" questline (IV)', quest: 'Spirit of the Cards IV' },
        { id: 784, how: '1,000 help requests completed', where: [['Help Requests', 'quests.php']], total: ['done', 1000, 'help requests'] },
        { id: 981, how: '1,000 personal help requests completed', where: [['Help Requests', 'quests.php']], total: ['personal', 1000, 'personal requests'] },
        { id: 763, how: 'Soap Shop, 7,777 Soap (Soap: 1 per win at Raptor Fight Club)', count: [614, 7777, 'Soap'] },
        { id: 982, how: '250 Buddyjack games at House of Cards', needs: 'hoc' },
        { id: 769, how: '"Belt out of Shape" questline (VI)', quest: 'Belt out of Shape VI' },
        { id: 983, how: 'Found exploring Gary\'s Crushroom (very rare)', needs: 'crushroom' },
        { id: 1451, how: '"A Slime Covered Wish" questline (II)', quest: 'A Slime Covered Wish II' },
      ],
    },
    {
      key: 'effigy',
      item: 1018,
      name: 'Cursed Effigy',
      opens: 'the Secret Chains at the Temple of Reward',
      finish: 'Then the "Look, A Secret Temple" quest (Lorn at friendship 60) makes the Cursed Effigy.',
      parts: [
        { id: 1016, how: '"Effigy of Friendship" quest', quest: 'Effigy of Friendship' },
        { id: 1014, how: 'Found in the Temple of Fate (Tower level 10)', where: [['Tower', 'tower.php']] },
        { id: 1015, how: 'Found in the Temple of Fate (Tower level 10)', where: [['Tower', 'tower.php']] },
        { id: 1017, how: 'End of the "Archeology Requires Knowhow" questline (XVII)', quest: 'Archeology Requires Knowhow XVII' },
      ],
    },
    {
      key: 'hoc',
      place: 'House of Cards',
      name: 'House of Cards',
      opens: 'House of Cards (daily card combos and Buddyjack)',
      finish: 'The Rune Dice opens it for good.',
      parts: [
        { id: 777, how: 'Rune Dice: end of the "Secretly A Society Summons You" questline (XII); it needs Glacierstone, from a level 6 Seal pet', quest: 'Secretly A Society Summons You XII' },
      ],
    },
    {
      key: 'crushroom',
      place: 'Gary\'s Crushroom',
      name: 'Gary\'s Crushroom',
      opens: 'Gary\'s Crushroom (exploring)',
      finish: 'The key opens it for good.',
      parts: [
        { id: 1179, how: 'Gary\'s Crushroom Key: "Fitness Friends Fit Forever" questline (III)', quest: 'Fitness Friends Fit Forever III' },
      ],
    },
  ];
  const goalByKey = (k) => GOALS.find((g) => g.key === k);
  let shops = store.get('goals.shops', {});
  function noteShop(name, ids) {
    const old = shops[name];
    if (old && old.ids.join() === ids.join() && Date.now() - old.at < 3600 * 1000) return;
    shops = { ...shops, [name]: { at: Date.now(), ids } };
    store.set('goals.shops', shops);
  }
  const SHOP_NAMES = { tent: 'Borgen\'s Camp', bmerc: 'Borgen Mercantile', flea: 'the Flea Market' };
  const megaCount = () => (masteryState().at ? Object.values(masteryState().items).filter((m) => m.mega).length : null);
  let bucks = store.get('goals.bucks', null);
  function noteBucks(rate, progress) {
    const mega = megaCount();
    if (bucks && bucks.rate === rate && bucks.progress === progress && bucks.mega === mega) return;
    bucks = { at: Date.now(), rate, progress, mega };
    store.set('goals.bucks', bucks);
  }
  const sameWeek = (t) => Date.now() - t < 7 * 24 * 3600 * 1000;
  const campWeek = (t) => {
    const d = new Date(`${new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Chicago' }).format(new Date(t))}T00:00:00Z`);
    d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 4) % 7)); // back to that week's Wednesday
    return d.toISOString().slice(0, 10);
  };
  const shopFresh = (name, t) => (name === 'tent' ? campWeek(t) === campWeek(Date.now()) : sameWeek(t));
  function goalOf(id) {
    id = Number(id);
    for (const g of GOALS) {
      if (g.item === id) return { goal: g, part: null };
      const part = g.parts.find((p) => p.id === id);
      if (part) return { goal: g, part };
    }
    return null;
  }
  const partHave = (p) => invCount(p.id); // undefined: inventory not seen yet
  const stillNeeded = (test) => !!invState().at && GOALS.some((g) => g.parts.some((p) => test(p) && !((partHave(p) || 0) > 0)));
  dataCheck({
    key: 'tent', feature: 'goals', page: 'tent.php', label: 'Borgen\'s Camp', why: 'this week\'s stock and your Borgen Buck rate, for Swamp Puzzle next steps',
    status: () => {
      if (stillNeeded((p) => p.bucks)) {
        if (!bucks) return { state: 'missing', note: 'Not seen yet' };
        const mega = megaCount();
        if (bucks.mega !== undefined && bucks.mega !== null && mega !== null && mega > bucks.mega) return { state: 'old', note: 'Out of date' };
      }
      const s = shops.tent;
      if (stillNeeded((p) => p.sold === 'tent') && !(s && shopFresh('tent', s.at))) return s ? { state: 'old', note: 'New stock' } : { state: 'missing', note: 'Not seen yet' };
      const at = Math.max(s ? s.at : 0, bucks ? bucks.at : 0);
      return { state: 'ok', note: at ? `Seen ${when(at)}` : '' };
    },
  });
  const goalDone = (g) => g.parts.filter((p) => (partHave(p) || 0) > 0).length;
  const goalComplete = (g) => invState().at && goalDone(g) === g.parts.length;
  const goalCountHtml = (g) => (invState().at && g.parts.length > 1 ? `${num(goalDone(g))} / ${num(g.parts.length)} ${g.key === 'swamp' ? 'pieces' : 'parts'}` : '');
  const linkTo = ([label, page]) => `<a href="${esc(page)}" class="frx-link">${esc(label)}</a>`;
  function howHtml(p) {
    let html = esc(p.how);
    for (const w of p.where || []) {
      const at = html.indexOf(esc(w[0]));
      if (at >= 0) html = html.slice(0, at) + linkTo(w) + html.slice(at + esc(w[0]).length);
    }
    return html;
  }
  const extraLinks = (p, withHow) => (p.where || []).filter((w) => !withHow || !p.how.includes(w[0])).map(linkTo).join(', ');
  function questStep(target) {
    const qs = questsState();
    if (!qs.at) return '<a href="quests.php" class="frx-link">Open Help Requests</a> once to see where you are';
    const path = [];
    for (let t = target, guard = 0; t && QUESTS[t] && guard < 200; t = QUESTS[t][2], guard++) path.unshift(t);
    if (!path.length) return '';
    const openTitles = new Map(qs.open.map((q) => [q.title, q.id]));
    for (let i = path.length - 1; i >= 0; i--) {
      if (!openTitles.has(path[i])) continue;
      const left = path.length - 1 - i;
      const link = `<a href="quest.php?id=${openTitles.get(path[i])}" class="frx-link">${esc(path[i])}</a>`;
      return left ? `${link} is open: <b>${left}</b> more quest${left === 1 ? '' : 's'} to "${esc(target)}"` : `${link} is open: this one gives it`;
    }
    const [, giver, , needs] = QUESTS[path[0]];
    return `None of its ${path.length} quests are open. It starts with "${esc(path[0])}"${giver ? ` from ${esc(giver)}` : ''}${needs ? ` (needs ${esc(needs)})` : ''}`;
  }
  const fullSteps = () => opt('goals', 'steps');
  function partNextHtml(p, depth = 0, withHow = true) {
    if ((partHave(p) || 0) > 0) return '';
    if (!fullSteps()) return extraLinks(p, withHow);
    const bits = [];
    if (p.count) {
      const [id, need, unit] = p.count;
      const have = invCount(id);
      if (have !== undefined) bits.push(`<b class="${have >= need ? 'frx-goal-ok' : ''}">${num(have)} / ${num(need)}</b> ${esc(unit)}`);
    }
    if (p.bucks) {
      bits.push(bucks
        ? `<b>${bucks.progress !== null ? `${num(bucks.progress)} / ` : 'every '}${num(bucks.rate)}</b> Ancient Coins spent toward the next Buck`
        : '<a href="tent.php" class="frx-link">Open Borgen\'s Camp</a> once to see your Buck rate');
    }
    if (p.total) {
      const [key, need, unit] = p.total;
      const n = questsState()[key];
      bits.push(n === null || n === undefined ? '<a href="quests.php" class="frx-link">Open Help Requests</a> once to see your count'
        : `<b class="${n >= need ? 'frx-goal-ok' : ''}">${num(n)} / ${num(need)}</b> ${esc(unit)}`);
    }
    if (p.quest) bits.push(questStep(p.quest));
    if (p.sold) {
      const s = shops[p.sold];
      if (s && shopFresh(p.sold, s.at)) {
        const at = withHow && p.how.includes(SHOP_NAMES[p.sold].replace(/^the /, '')) ? 'there' : `at ${esc(SHOP_NAMES[p.sold])}`;
        bits.push(s.ids.includes(p.id) ? `<span class="frx-goal-ok">on sale ${at} now</span>` : `not ${at} this week`);
      }
    }
    bits.push(extraLinks(p, withHow));
    if (p.needs && depth < 3) {
      const g = goalByKey(p.needs);
      if (g && !goalComplete(g)) {
        const first = g.parts.find((x) => !((partHave(x) || 0) > 0));
        const next = first ? partNextHtml(first, depth + 1, false) : '';
        bits.push(`needs ${esc(g.name)} first${next ? `: ${next}` : ''}`);
      }
    }
    return bits.filter(Boolean).join(' · ');
  }
  (() => {
    const TIERS = [
      ['best', 'Super', 'var(--frx-gold)'],
      ['loves', 'Loves', 'var(--frx-love)'],
      ['likes', 'Likes', 'var(--frx-like)'],
      ['hates', 'Hates', 'var(--frx-faint)'],
    ];
    const BASE_XP = { best: 0, loves: 150, likes: 25, hates: -50, none: 1 };
    const MARK = {
      best: ['/img/items/love_sm.png', 'Super Love', 'filter:drop-shadow(0 0 3px var(--frx-gold))'],
      loves: ['/img/items/love_sm.png', 'Loves'],
      likes: ['/img/items/s_like.png', 'Likes'],
      hates: ['/img/items/s_hate.png', 'Hates'],
    };
    const XP_COLOR = { best: 'var(--frx-gold)', loves: 'var(--frx-love)', likes: 'var(--frx-like)', hates: 'var(--frx-bad)', none: 'var(--frx-faint)' };
    const TIER_ORDER = { best: 0, loves: 1, likes: 2, none: 3, hates: 4 };
    const OVER_THE_MOON = 647; // meal: +10% friendship XP
    const HEART = ITEM_BY_NAME['Heart Container'];
    const BOUQUET = ITEM_BY_NAME['Bouquet of Flowers'];
    const NPC_LIST = Object.values(NPCS);
    const norm = (s) => String(s || '').toLowerCase().replace(/\bcpt\.?\s/g, 'captain ').replace(/\s+/g, ' ').trim();
    function npcByName(name) {
      const n = norm(name);
      if (!n) return null;
      const exact = NPC_LIST.find((p) => norm(p.name) === n);
      if (exact) return exact;
      const first = NPC_LIST.filter((p) => norm(p.name).split(' ')[0] === n.split(' ')[0]);
      return first.length === 1 ? first[0] : null;
    }
    const npcFromImg = (img) => img && NPCS[img.getAttribute('src').split('?')[0].split('/').pop()];
    const npcFor = (img, name) => npcFromImg(img) || npcByName(name);
    const shortXp = (n) => (n >= 1e6 ? `${Math.round(n / 1e6)}M` : num(n)); // 100000000 -> "100M"
    function tierOf(npc, id) {
      if ((npc.xp[id] || 0) >= 1000000) return 'best';
      for (const key of ['loves', 'likes', 'hates']) if (npc[key].includes(id)) return key;
      if (npc.xp[id]) return 'loves'; // Heart Container, Bouquet of Flowers
      return 'none';
    }
    function rememberTownsfolkOfDay(root) {
      const card = [...root.querySelectorAll('.card-content-inner')].find((c) => /Townsfolk of the Day/i.test(c.textContent));
      setTotd(card && card.querySelector('strong') && card.querySelector('strong').textContent.trim());
    }
    dataCheck({
      key: 'totd', feature: 'friendship', page: 'npclevels.php', label: 'Friendship Levels', why: 'today\'s Townsfolk of the Day (x2 XP)',
      status: () => {
        const t = store.get('totd', null);
        return t && t.day === gameDay() ? { state: 'ok', note: `Today: ${t.name}` } : { state: 'missing', note: 'Not seen today' };
      },
    });
    function isTotd(npc) {
      const t = store.get('totd', null);
      return !!t && t.day === gameDay() && npcByName(t.name) === npc; // the page may say "Charles", not the full name
    }
    function detectedPerks() {
      const found = ['Friendship Primer', 'O.M.G I', 'O.M.G II'].map(hasPerk);
      if (found.every((v) => v === null)) return null;
      return { primer: !!found[0], omg: (found[1] ? 1 : 0) + (found[2] ? 1 : 0), partial: found.some((v) => v === null) };
    }
    const perkSig = (p) => (p ? `${p.primer ? 1 : 0}:${p.omg}` : '');
    function perks() {
      const found = detectedPerks();
      const mine = store.get('friendship.perks', null);
      if (mine && (!found || mine.basis === perkSig(found))
        && !(found && perkSig(found) === perkSig({ primer: !!mine.primer, omg: mine.omg || 0 }))) {
        return { primer: !!mine.primer, omg: mine.omg || 0, source: 'manual' };
      }
      if (found) return { ...found, source: found.partial ? 'partial' : 'found' };
      return { primer: false, omg: 0, source: 'none' };
    }
    const perkText = (p) => [p.primer ? 'Friendship Primer' : '', p.omg ? (p.omg === 2 ? 'O.M.G I and II' : 'O.M.G') : '']
      .filter(Boolean).join(', ') || 'none';
    const sourceText = (p) => ({
      manual: 'changed by you', found: 'read from your perks', partial: 'only partly seen, so XP may be low',
      none: 'not seen yet, so XP may be off',
    }[p.source]);
    function multiplier(npc) {
      const p = perks();
      return (isTotd(npc) ? 2 : 1) * (p.primer ? 1.1 : 1) * (effectEnd(OVER_THE_MOON) ? 1.1 : 1)
        * (1 + bonus('friendship') / 100); // an event's "+10% Friendship XP"
    }
    const levelOf = (xp) => {
      let lvl = 1;
      while (lvl < 99 && xp >= LEVEL_XP[lvl]) lvl++;
      return lvl;
    };
    function currentXp(page) {
      const lvl = parseInt(page.querySelector('#npc_level').textContent, 10) || 1;
      const bar = page.querySelector('.currentnpc.progressbar');
      const pct = bar ? parseFloat(bar.dataset.progress) || 0 : 0;
      if (lvl >= 99) return LEVEL_XP[98];
      return LEVEL_XP[lvl - 1] + (LEVEL_XP[lvl] - LEVEL_XP[lvl - 1]) * pct / 100;
    }
    function preview(page, gain) {
      const now = currentXp(page);
      const from = levelOf(now);
      const after = Math.max(0, Math.min(LEVEL_XP[98], now + gain));
      const to = levelOf(after);
      if (to >= 99) return ` → Lv 99${from < 99 ? ` (+${99 - from})` : ''}`;
      const pct = Math.floor((after - LEVEL_XP[to - 1]) / (LEVEL_XP[to] - LEVEL_XP[to - 1]) * 100);
      const diff = to - from;
      return ` → Lv ${to} ${pct}%` + (diff ? ` (${diff > 0 ? '+' : ''}${diff})` : '');
    }
    const givenRaw = () => store.get('friendship.given', {});
    const given = () => Object.fromEntries(Object.entries(givenRaw()).map(([k, v]) => [k, Array.isArray(v) ? v : v.ids]));
    const greyGiven = () => store.get('friendship.greyGiven', true);
    function rememberGiven(root, npc) {
      const title = titleBlock(root, /Discovered/i);
      let block = title && title.nextElementSibling;
      while (block && !block.matches('.list-block')) block = block.nextElementSibling;
      if (!block) return;
      const ids = [...block.querySelectorAll('.givebtnnc[data-id]')].map((b) => Number(b.dataset.id)).sort((a, b) => a - b);
      const level = root.querySelector('#npc_level');
      const bar = root.querySelector('.currentnpc.progressbar');
      const mark = level ? `${parseInt(level.textContent, 10)}:${bar ? bar.dataset.progress : ''}` : '';
      const all = givenRaw();
      const old = all[npc.name];
      if (old && !Array.isArray(old) && old.mark === mark && JSON.stringify(old.ids) === JSON.stringify(ids)
        && Date.now() - old.at < 3600 * 1000) return;
      all[npc.name] = { ids, at: Date.now(), mark };
      store.set('friendship.given', all);
    }
    function cardMark(card) {
      const lvl = (card.textContent.match(/Level\s+(\d+)/) || [])[1];
      const bar = card.querySelector('.progressbar[data-progress]');
      return lvl ? `${Number(lvl)}:${bar ? bar.dataset.progress : ''}` : '';
    }
    function markMatches(name, known, card) {
      const now = cardMark(card);
      if (known.mark === now) return true;
      const [lvl, pct] = now.split(':');
      if (known.mark && !known.mark.includes('.') && known.mark === `${lvl}:${Math.round(parseFloat(pct) || 0)}`) {
        const all = givenRaw();
        all[name] = { ...known, mark: now };
        store.set('friendship.given', all);
        return true;
      }
      return false;
    }
    const tried = new Map(); // name -> when a read last failed this session, so a failing read isn't retried right away
    let syncing = false;
    async function syncGiven(page) {
      if (syncing || !greyGiven()) return;
      const todo = [...page.querySelectorAll('.frx-fg-gifts')].map((box) => {
        const name = box.dataset.frxNpc;
        const card = box.closest('.col-33');
        const link = card && card.querySelector('a[href*="mailbox.php"]');
        const known = givenRaw()[name];
        const fresh = known && !Array.isArray(known) && (!known.mark || !card || markMatches(name, known, card));
        const recent = Date.now() - (tried.get(name) || 0) < 10 * 60 * 1000;
        return !fresh && !recent && link ? { name, url: link.getAttribute('href') } : null;
      }).filter(Boolean);
      if (!todo.length) return;
      syncing = true;
      try {
        for (const { name, url } of todo) {
          if (!page.isConnected || page.classList.contains('page-on-left')) break; // left the page
          const npc = NPC_LIST.find((p) => p.name === name);
          try { rememberGiven(await fetchPage(url, `gifts already given (${name})`), npc); } catch { tried.set(name, Date.now()); /* failed: wait before retrying */ }
          page.frxGivenKey = null;
          applyGiven(page);
          await new Promise((r) => setTimeout(r, 2000));
        }
      } finally { syncing = false; }
    }
    const folded = () => store.get('friendship.folded', []);
    function applyFolds(page) {
      for (const [key] of TIERS) page.classList.toggle(`frx-fold-${key}`, folded().includes(key));
    }
    function applyGiven(page) {
      const all = given();
      const key = JSON.stringify([greyGiven(), all]);
      if (page.frxGivenKey === key) return;
      page.frxGivenKey = key;
      page.querySelectorAll('.frx-fg-gifts').forEach((box) => {
        const ids = greyGiven() ? all[box.dataset.frxNpc] || [] : [];
        box.querySelectorAll('.frx-fg-loves a[data-frx-id], .frx-fg-likes a[data-frx-id]').forEach((a) => {
          a.classList.toggle('frx-given', ids.includes(Number(a.dataset.frxId)));
        });
        box.querySelectorAll('.frx-fg-loves, .frx-fg-likes').forEach((row) => {
          const icons = row.querySelectorAll('a[data-frx-id]');
          row.classList.toggle('frx-fg-all-given', icons.length > 0 && [...icons].every((a) => a.classList.contains('frx-given')));
        });
      });
      const note = page.querySelector('.frx-fg-synced');
      if (note) {
        const known = [...page.querySelectorAll('.frx-fg-gifts')].filter((b) => all[b.dataset.frxNpc]).length;
        const total = page.querySelectorAll('.frx-fg-gifts').length;
        note.textContent = !greyGiven() ? ''
          : known < total ? `Faded: already given; a row with everything given is hidden. Checking mailboxes: ${known} / ${total}.`
            : 'Faded: already given; a row with everything given is hidden.';
      }
    }
    function enhanceLevels(page) {
      rememberTownsfolkOfDay(page);
      page.querySelectorAll('.col-33').forEach((card) => {
        if (card.querySelector('.frx-fg-gifts') || !card.querySelector('.progressbar')) return;
        const strong = card.querySelector('strong');
        const npc = npcFor(card.querySelector('a img.itemimg'), strong && strong.textContent);
        if (!npc) return;
        const box = document.createElement('div');
        box.className = 'frx-fg-gifts';
        box.dataset.frxNpc = npc.name;
        box.innerHTML = TIERS.filter(([key]) => npc[key].length).map(([key, label, color]) => `
          <div class="frx-fg-row frx-fg-${key}">
            <a href="javascript:;" class="frx-fg-label" data-frx-fold="${key}" style="color:${color}">${label}<span class="frx-fg-count"> (${npc[key].length})</span></a>
            <span class="frx-fg-icons">${npc[key].map((id) => itemIcon(id).replace('<a ', `<a data-frx-id="${id}" `)
              + (key === 'best' && npc.xp[id] ? `<span class="frx-fg-big">${shortXp(npc.xp[id])} XP</span>` : '')).join('')}</span>
          </div>`).join('');
        card.appendChild(box);
        page.frxGivenKey = null;
      });
      page.querySelectorAll('.frx-fg-gifts').forEach((box) => {
        const card = box.closest('.col-33');
        const npc = NPC_LIST.find((p) => p.name === box.dataset.frxNpc);
        const on = !!npc && isTotd(npc);
        if (card) card.classList.toggle('frx-fg-totd', on);
        let tag = box.querySelector('.frx-fg-totd-line');
        if (on && !tag) box.insertAdjacentHTML('afterbegin', '<div class="frx-fg-totd-line">Townsfolk of the Day · x2 XP</div>');
        if (!on && tag) tag.remove();
      });
      applyFolds(page);
      applyGiven(page);
      syncGiven(page);
      if (!page.querySelector('.frx-fg-everyone')) {
        const title = titleBlock(page, /Current Levels/i);
        if (title) {
          const note = document.createElement('div');
          note.className = 'card frx-fg-everyone';
          note.innerHTML = `<div class="card-content"><div class="card-content-inner">
            <span class="frx-tag">Toolkit</span> Everyone loves ${itemIcon(HEART)} Heart Container (10M XP) and ${itemIcon(BOUQUET)} Bouquet of Flowers (1,000 XP).
            <b class="frx-fg-gold">Super</b> items give about 100M XP each, but only to that townsfolk.
            Tap Loves, Likes or Hates to fold that row.
            <div class="frx-fg-synced"></div></div></div>`;
          title.after(note);
          page.frxGivenKey = null;
          applyGiven(page);
        }
      }
    }
    function updateXp(li) {
      const span = li.querySelector('.frx-fg-xp');
      const input = li.querySelector('input.qty');
      const page = li.closest('.page');
      if (!span || !page || !page.frxNpc) return;
      const each = Math.round(Number(span.dataset.each) * multiplier(page.frxNpc));
      const qty = Math.max(0, parseInt(input && input.value, 10) || 0);
      const sign = (n) => (n > 0 ? '+' : '') + num(n);
      span.innerHTML = `<b style="color:${XP_COLOR[li.dataset.frxTier] || 'inherit'}">${sign(each)} XP</b> each`
        + (qty > 1 ? `, ${sign(each * qty)} for ${num(qty)}` : '')
        + esc(qty > 0 ? preview(page, each * qty) : '');
    }
    const redraw = (page) => {
      if (!page.frxNpc) return;
      superCard(page, page.frxNpc);
      multiplierCard(page, page.frxNpc);
      page.querySelectorAll('li').forEach(updateXp);
    };
    function multiplierCard(page, npc) {
      let card = page.querySelector('.frx-fg-settings');
      if (!card) {
        const anchor = page.querySelector('.frx-fg-super') || titleBlock(page, /Discovered|Put something in/i);
        if (!anchor) return;
        card = document.createElement('div');
        card.className = 'card frx-fg-settings';
        anchor.before(card);
      }
      const p = perks();
      const t = store.get('totd', null);
      const lines = [];
      if (isTotd(npc)) lines.push('<b class="frx-fg-gold">Double XP</b>: Townsfolk of the Day');
      else if (!(t && t.day === gameDay())) lines.push('<span class="frx-fg-muted">Townsfolk of the Day (double XP) not seen today:</span> open <a href="index.php" class="frx-link">Home</a>');
      const moonEnd = effectEnd(OVER_THE_MOON);
      if (moonEnd) {
        lines.push(`<b class="frx-fg-good">+10%</b>: Over The Moon (until ${new Date(moonEnd).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })})`);
      }
      if (bonus('friendship')) lines.push(`<b class="frx-fg-good">+${bonus('friendship')}%</b>: event`);
      if (p.primer) lines.push('<b class="frx-fg-good">+10%</b>: Friendship Primer');
      if (p.omg) {
        lines.push(`<b class="frx-fg-good">Lucky gifts</b>: O.M.G, ${p.omg === 2 ? '1 in 10' : '1 in 20'} gifts get 7 to 10 times the XP (not counted below)`);
      }
      const source = p.source === 'found' ? '' : `<span class="frx-fg-muted">Perks ${sourceText(p)}.</span> `;
      lines.push(`${source}<a href="javascript:;" class="frx-tk-open frx-link">Change perks</a>`);
      const any = isTotd(npc) || moonEnd || bonus('friendship') || p.primer || p.omg;
      const html = `<div class="card-content"><div class="card-content-inner frx-fg-mult">
        <span class="frx-tag">Toolkit</span> <strong>${any ? 'Extra XP here (in the XP below)' : 'No extra XP here right now'}</strong>
        ${lines.map((l) => `<div>${l}</div>`).join('')}
        </div></div>`;
      if (card.frxHtml !== html) { card.frxHtml = html; card.innerHTML = html; }
    }
    function superCard(page, npc) {
      const ids = Object.keys(npc.xp).sort((a, b) => npc.xp[b] - npc.xp[a]);
      if (!ids.length) return;
      const owned = (id) => {
        const btn = page.querySelector(`.givebtnnc[data-id="${id}"]`);
        const max = btn && btn.closest('li').querySelector('.max-give');
        return max ? Number(max.dataset.numLeft) || 0 : 0;
      };
      const html = `<div class="card-content"><div class="card-content-inner">
        <span class="frx-tag">Toolkit</span> <strong>Big XP gifts for ${esc(npc.name)}</strong>
        ${ids.map((id) => {
          const have = owned(id);
          // The XP you'd get, with the same multiplier as the rows below ("+1,925 XP each"), so the two never disagree.
          // Colour only on the XP amount; your count the shared way ("12 / 5,078", red at the cap), from this page.
          return `<div class="frx-fg-super-row">${itemIcon(id, 'frx-icon frx-icon-lg')} <strong>${esc(item(id) ? item(id).name : id)}</strong>:
            <b class="frx-fg-gold">+${num(Math.round(npc.xp[id] * multiplier(npc)))} XP</b> each · ${countOfHtml(have)}</div>`;
        }).join('')}
        </div></div>`;
      let card = page.querySelector('.frx-fg-super');
      if (!card) {
        const title = titleBlock(page, /Discovered|Put something in/i);
        if (!title) return;
        card = document.createElement('div');
        card.className = 'card frx-fg-super';
        title.before(card);
      }
      if (card.frxHtml !== html) { card.frxHtml = html; card.innerHTML = html; }
    }
    function notGivenCard(page, npc) {
      const done = new Set(given()[npc.name] || []);
      const owned = (id) => !!page.querySelector(`.givebtnnc[data-id="${id}"]`);
      const rows = [['loves', 'Loves'], ['likes', 'Likes']].map(([key, label]) => {
        const ids = npc[key].filter((id) => !done.has(id) && !owned(id));
        if (!ids.length) return '';
        const chips = ids.map((id) => {
          const it = item(id);
          return `<a href="item.php?id=${id}" class="frx-chip">${it && it.img ? `<img src="${esc(it.img)}" alt="">` : ''}${esc(it ? it.name : `Item ${id}`)}</a>`;
        }).join('');
        return `<div class="frx-fg-ng-row"><span class="frx-lead" style="color:${XP_COLOR[key]}">${label}:</span> ${chips}</div>`;
      }).filter(Boolean);
      let card = page.querySelector('.frx-fg-notgiven');
      if (!rows.length) { if (card) card.remove(); return; }
      const html = `<div class="card-content"><div class="card-content-inner">
        <span class="frx-tag">Toolkit</span> <strong>Not given yet, none on hand</strong>${rows.join('')}</div></div>`;
      if (!card) {
        const title = titleBlock(page, /Discovered|Put something in/i);
        if (!title) return;
        card = document.createElement('div');
        card.className = 'card frx-fg-notgiven';
        title.before(card);
      }
      if (card.frxHtml !== html) { card.frxHtml = html; card.innerHTML = html; }
    }
    function itemPageNote(page) {
      const id = Number(((page.f7PageData && page.f7PageData.query) || {}).id) || 0;
      if (!id || page.frxFgItem === id) return;
      const all = given();
      const groups = TIERS.map(([key, label]) => {
        const who = NPC_LIST.filter((p) => p[key].includes(id));
        if (!who.length) return '';
        const names = who.map((p) => {
          const done = key !== 'best' && key !== 'hates' && (all[p.name] || []).includes(id);
          return `<span class="${done ? 'frx-fg-done' : ''}"${done ? ' title="Already given"' : ''}>${esc(p.name)}</span>`;
        }).join(', ');
        return `<b>${label}:</b> ${names}`; // one line, so no colours (style guide); bold labels
      }).filter(Boolean);
      const details = titleBlock(page, /Item Details/i);
      let list = details && details.nextElementSibling;
      while (list && !list.matches('.list-block')) list = list.nextElementSibling;
      let el = page.querySelector('.frx-fg-itemnote');
      if (!list) return; // the game hasn't drawn its list yet: try again on the next check
      page.frxFgItem = id;
      if (!groups.length) { if (el) el.remove(); return; }
      if (!el) {
        el = document.createElement('div');
        el.className = 'frx-note frx-fg-itemnote';
        list.after(el);
      }
      el.innerHTML = `<span class="frx-tag">Toolkit</span> ${groups.join(' · ')}`;
    }
    function sortItemList(page) {
      const title = titleBlock(page, /Put something in/i);
      let block = title && title.nextElementSibling;
      while (block && !block.matches('.list-block')) block = block.nextElementSibling;
      const ul = block && block.querySelector('ul');
      if (!ul) return;
      const rows = [...ul.children].filter((li) => li.dataset.frxTier);
      const owned = (li) => Number((li.querySelector('.max-give') || {}).dataset?.numLeft) || 0;
      rows.sort((a, b) =>
        (TIER_ORDER[a.dataset.frxTier] - TIER_ORDER[b.dataset.frxTier])
        || (b.dataset.frxEach - a.dataset.frxEach)
        || (b.dataset.frxEach * owned(b) - a.dataset.frxEach * owned(a)));
      if (rows.every((li, i) => ul.children[i] === li)) return;
      rows.forEach((li) => ul.appendChild(li));
    }
    function enhanceMailbox(page) {
      const level = page.querySelector('#npc_level');
      if (!level || !level.closest('li')) return;
      const title = (pageTitle(page) || '').replace(/[’']s Mailbox$/i, '');
      const npc = npcFor(level.closest('li').querySelector('.item-media img'), title);
      if (!npc) return;
      page.frxNpc = npc;
      rememberGiven(page, npc);
      if (!page.frxChecked) {
        page.frxChecked = true;
        refreshEffects().then(() => redraw(page));
      }
      const bar = page.querySelector('.currentnpc.progressbar');
      const barSig = `${level.textContent}:${bar ? bar.dataset.progress : ''}`;
      if (page.frxBarSig && page.frxBarSig !== barSig) page.querySelectorAll('li').forEach(updateXp);
      page.frxBarSig = barSig;
      let added = false;
      page.querySelectorAll('.givebtnnc[data-id]').forEach((btn) => {
        const li = btn.closest('li');
        if (!li || li.querySelector('.frx-fg-xp')) return;
        added = true;
        const id = Number(btn.dataset.id);
        const tier = tierOf(npc, id);
        const each = npc.xp[id] || BASE_XP[tier];
        li.dataset.frxTier = tier;
        li.dataset.frxEach = each;
        const strong = li.querySelector('.item-title strong');
        if (strong && MARK[tier] && !strong.querySelector('img')) {
          strong.insertAdjacentHTML('beforeend',
            ` <img src="${MARK[tier][0]}" title="${MARK[tier][1]}" style="width:16px;height:16px;${MARK[tier][2] || ''}">`);
        }
        const holder = li.querySelector(`[id="${btn.dataset.randid}-${btn.dataset.id}"]`) || (strong && strong.parentElement);
        if (!holder) return;
        const span = document.createElement('div');
        span.className = 'frx-fg-xp';
        span.dataset.each = each;
        span.title = 'Friendship XP, with the extra XP above. A lucky gift (O.M.G) gets 7 to 10 times this.';
        holder.appendChild(span);
        updateXp(li);
      });
      if (added) sortItemList(page);
      superCard(page, npc);
      notGivenCard(page, npc);
      multiplierCard(page, npc);
    }
    feature({
      id: 'friendship',
      name: 'Friendship Gifts',
      description: 'Friendship Levels shows each townsfolk\'s loves, likes and hates, four townsfolk per row on wide screens. Their mailbox marks every item with the XP it gives (Townsfolk of the Day, Over The Moon, event bonuses and your perks included), shows the level it would take you to, and sorts the best gifts to the top.',
      options: [
        { key: 'levels', label: 'Loves, likes and hates on Friendship Levels' },
        { key: 'fourcol', label: 'Four townsfolk per row on Friendship Levels on wide screens (phones keep three)' },
        { key: 'mailbox', label: 'XP, level preview and best-first sorting in mailboxes' },
        { key: 'itempage', label: 'On item pages: which townsfolk love, like or hate it' },
      ],
      settings(el) {
        const p = perks();
        el.insertAdjacentHTML('beforeend', `<div class="frx-setting-extra">
          <label><input type="checkbox" name="frx-grey" ${greyGiven() ? 'checked' : ''}> On Friendship Levels, fade loves and likes
            you've already given (hates always show). Read from each townsfolk's mailbox: when you open it, and in the
            background only when something changed.</label>
          <div class="frx-fg-unfold" ${folded().length ? '' : 'hidden'}>Folded rows: ${folded().length}.
            <a href="javascript:;" class="frx-link">Unfold all</a></div>
          <div class="frx-opt-group">Perks used for XP</div>
          <label><input type="checkbox" name="frx-primer" ${p.primer ? 'checked' : ''}> Friendship Primer (+10%)</label>
          <label>O.M.G perks: <select name="frx-omg">
            ${[0, 1, 2].map((n) => `<option value="${n}" ${(p.omg || 0) === n ? 'selected' : ''}>${n ? `${n} (${n === 2 ? '1 in 10' : '1 in 20'} gifts get 7 to 10 times the XP)` : 'none'}</option>`).join('')}
          </select></label>
          <div class="frx-fg-perknote"></div></div>`);
        const box = el.querySelector('.frx-setting-extra:last-child');
        const note = box.querySelector('.frx-fg-perknote');
        const showNote = () => {
          const now = perks();
          const found = detectedPerks();
          const when = perksCheckedAt() ? new Date(perksCheckedAt()).toLocaleString([], { weekday: 'short', hour: 'numeric', minute: '2-digit' }) : '';
          note.innerHTML = now.source === 'found'
            ? `Read from your Perks and Farm Supply pages${when ? ` (${esc(when)})` : ''}. Change them here if they're wrong.`
            : now.source === 'manual' && found
              ? `Changed by you. Your perks pages show: ${esc(perkText(found))}. <a href="javascript:;" class="frx-fg-useperks frx-link">Use those</a>`
              : 'Not seen yet: open your <a href="perks.php" class="frx-link">Perks</a> and <a href="supply.php" class="frx-link">Farm Supply</a> pages once and they\'re filled in.';
          const use = note.querySelector('.frx-fg-useperks');
          if (use) use.addEventListener('click', (e) => {
            e.preventDefault();
            store.set('friendship.perks', null);
            const q = perks();
            box.querySelector('[name=frx-primer]').checked = q.primer;
            box.querySelector('[name=frx-omg]').value = String(q.omg);
            showNote();
          });
        };
        showNote();
        box.querySelector('.frx-fg-unfold a').addEventListener('click', (e) => {
          e.preventDefault();
          store.set('friendship.folded', []);
          pages('npclevels').forEach(applyFolds);
          e.target.parentElement.hidden = true;
        });
        box.addEventListener('change', (e) => {
          if (e.target.name === 'frx-grey') { store.set('friendship.greyGiven', e.target.checked); return; }
          store.set('friendship.perks', {
            primer: box.querySelector('[name=frx-primer]').checked,
            omg: Number(box.querySelector('[name=frx-omg]').value),
            basis: perkSig(detectedPerks()), // stays until your perks are found to be different
          });
          showNote();
        });
      },
      css: `
        .frx-fg-gifts { margin: 6px 4px 0; text-align: left; font-size: 13px; line-height: 1.25; }
        .frx-fg-row { display: flex; align-items: flex-start; gap: 4px; margin-bottom: 4px; }
        .frx-fg-label { flex: 0 0 48px; font-weight: 600; padding-top: 3px; cursor: pointer; }
        .frx-fg-count { display: none; font-weight: normal; }
        .frx-fg-icons { display: flex; flex-wrap: wrap; gap: 2px; }
        .frx-fg-icons .frx-icon { width: 22px !important; height: 22px !important; }
        .frx-fg-best .frx-icon { filter: drop-shadow(0 0 3px var(--frx-gold)); }
        .frx-fg-hates .frx-icon { opacity: .6; }
        .frx-fg-icons a.frx-given .frx-icon { opacity: .28; filter: grayscale(1); }
        .frx-fg-row.frx-fg-all-given { display: none; }
        .frx-fg-big { color: var(--frx-gold); font-weight: bold; padding: 3px 4px 0 1px; }
        .frx-fg-synced { margin-top: 4px; font-size: 13px; color: var(--frx-muted); }
        ${TIERS.map(([key]) => `.frx-fold-${key} .frx-fg-${key} .frx-fg-icons { display: none; }
        .frx-fold-${key} .frx-fg-${key} .frx-fg-count { display: inline; }
        .frx-fold-${key} .frx-fg-${key} .frx-fg-label { flex-basis: auto; opacity: .75; }`).join('\n')}
        @media (min-width: 1400px) {
          .frx-fg-4col { display: flex; flex-wrap: wrap; }
          .frx-fg-4col > .row.no-gutter { display: contents; }
          .frx-fg-4col .col-33 { width: 25% !important; flex: 0 0 25% !important; }
        }
        .frx-icon-lg { width: 26px !important; height: 26px !important; }
        .frx-fg-super-row { margin: 4px 0; }
        .frx-fg-ng-row { margin: 4px 0; line-height: 2; font-size: 13px; }
        .frx-fg-itemnote { color: var(--frx-text); }
        .col-33.frx-fg-totd { outline: 2px solid var(--frx-gold); outline-offset: -4px; border-radius: 10px; }
        .frx-fg-totd-line { margin: 0 0 4px; text-align: center; font-size: 13px; font-weight: bold; color: var(--frx-gold); }
        .frx-fg-done { opacity: .5; }
        .frx-fg-ng-row .frx-lead { font-weight: bold; }
        .frx-fg-xp { font-size: 13px; color: var(--frx-text); margin-top: 2px; }
        .frx-fg-gold { color: var(--frx-gold); }
        .frx-fg-good { color: var(--frx-good); }
        .frx-fg-muted { color: var(--frx-muted); }
        .frx-fg-mult { font-size: 14px; line-height: 1.5; }
        .frx-fg-mult > div { font-size: 13px; }
      `,
      init() {
        const refreshRow = (e) => {
          const li = e.target.closest && e.target.closest('.page[data-page="mailbox"] li');
          if (li && featureOn(this)) requestAnimationFrame(() => updateXp(li));
        };
        document.addEventListener('click', refreshRow, true);
        document.addEventListener('input', refreshRow, true);
        document.addEventListener('click', (e) => {
          const label = e.target.closest && e.target.closest('[data-frx-fold]');
          if (!label || !featureOn(this)) return;
          e.preventDefault();
          const key = label.dataset.frxFold;
          const now = folded();
          store.set('friendship.folded', now.includes(key) ? now.filter((k) => k !== key) : [...now, key]);
          pages('npclevels').forEach(applyFolds);
        }, true);
        onEffectsChange(() => pages('mailbox').forEach(redraw)); // Over The Moon started or ran out
        onPerksChange(() => pages('mailbox').forEach(redraw));
      },
      scan() {
        pages('npclevels').forEach(rememberTownsfolkOfDay);
        if (opt('friendship', 'levels')) pages('npclevels').forEach(enhanceLevels);
        if (opt('friendship', 'itempage')) pages('item').forEach(itemPageNote);
        pages('npclevels').forEach((page) => {
          const card = page.querySelector('.row.no-gutter > .col-33');
          const box = card && card.parentElement.parentElement;
          if (box) box.classList.toggle('frx-fg-4col', !!opt('friendship', 'fourcol'));
        });
        pages('mailbox').forEach((page) => {
          if (opt('friendship', 'mailbox')) { enhanceMailbox(page); return; }
          const level = page.querySelector('#npc_level');
          const npc = level && level.closest('li')
            && npcFor(level.closest('li').querySelector('.item-media img'), (pageTitle(page) || '').replace(/[’']s Mailbox$/i, ''));
          if (npc) rememberGiven(page, npc);
        });
      },
    });
  })();
  (() => {
    const KEYWORDS = new RegExp(
      '(?<amt>\\+?\\d+(?:-\\d+)?(?:%|\\s?(?:mins?|minutes?|hours?|actions?|spins?|uses?)\\b))'
      + '|(?<mult>\\b\\d+x\\b|\\bx\\d+\\b|\\b(?:double|triple|twice)\\b)'
      + '|(?<act>\\b(?:harvest(?:ing|s)?|crops?|farm(?:ing)?|fishing|fish|nets?|explor(?:e|ing)|cider|lemonade|arnold palmers?|APs?|cooking|crafting|mastery|friendship|sawmill|pets?|market|silver|stamina|wheel of borgen|hide|exchange center|chat)\\b)',
      'gi',
    );
    function highlight(root) {
      if (!root || root.dataset.frxHl || !opt('food', 'keywords')) return;
      root.dataset.frxHl = '1';
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      for (const node of nodes) {
        const text = node.nodeValue;
        if (!text.trim() || node.parentElement.closest('.frx-food-act, .frx-food-mult, .frx-food-amt, script, style, input')) continue;
        KEYWORDS.lastIndex = 0;
        let match;
        let last = 0;
        const frag = document.createDocumentFragment();
        while ((match = KEYWORDS.exec(text))) {
          if (match.index > last) frag.append(text.slice(last, match.index));
          const span = document.createElement('span');
          span.className = match.groups.amt ? 'frx-food-amt' : match.groups.mult ? 'frx-food-mult' : 'frx-food-act';
          span.textContent = match[0];
          frag.append(span);
          last = match.index + match[0].length;
        }
        if (!last) continue;
        frag.append(text.slice(last));
        node.replaceWith(frag);
      }
    }
    function plain(html) {
      const d = document.createElement('div');
      d.innerHTML = html.replace(/<br\s*\/?>/gi, ' ');
      return d.textContent.replace(/\s+/g, ' ').trim();
    }
    function enhancePanel(panel) {
      const buttons = panel.querySelectorAll('a.usemealbtn');
      if (!buttons.length) return;
      panel.classList.add('frx-food-panel');
      for (const btn of buttons) {
        const cell = btn.closest('.quick-meal-item, .col-auto') || btn.parentElement;
        if (cell.querySelector('.frx-food-effect')) continue;
        const meal = MEALS[btn.dataset.id];
        const desc = plain(btn.dataset.description || '');
        const box = document.createElement('div');
        box.className = 'frx-food-effect';
        box.textContent = meal ? meal.effect : desc;
        if (meal && meal.lasts) {
          const lasts = document.createElement('span');
          lasts.className = 'frx-food-lasts';
          lasts.textContent = meal.lasts;
          box.append(lasts);
        }
        const name = cell.querySelector('.quick-meal-name')
          || [...cell.querySelectorAll('span')].find((s) => s.textContent.trim() === btn.dataset.name);
        (name || btn).after(box);
        cell.title = `${btn.dataset.name}: ${desc}`;
        highlight(box);
      }
    }
    function enhanceItemPage(page) {
      if (page.dataset.frxFood) return;
      const meal = MEALS[page.dataset.itemId];
      if (!meal) return;
      page.dataset.frxFood = '1';
      const img = page.querySelector('#img');
      if (img) {
        highlight(img);
        if (meal.vague && opt('food', 'real')) {
          const note = document.createElement('div');
          note.className = 'frx-card frx-food-real';
          note.innerHTML = '<span class="frx-tag">Toolkit</span> <b class="frx-food-real-label">Real effect:</b> ';
          note.append(meal.effect + (meal.lasts ? ` (lasts ${meal.lasts})` : ''));
          img.append(note);
          highlight(note);
        }
      }
      const about = titleBlock(page, /About this Item/i);
      const card = about && about.nextElementSibling;
      if (card && card.classList.contains('card')) highlight(card);
    }
    function enhanceKitchen(page) {
      const select = page.querySelector('select.mealloadid');
      if (!select) return;
      const row = select.closest('.row') || select.parentElement;
      let box = row.parentElement.querySelector('.frx-food-cook');
      const meal = MEALS[select.value];
      if (!meal) { if (box) box.remove(); return; }
      if (!box) {
        box = document.createElement('div');
        box.className = 'frx-food-cook';
        row.after(box);
      }
      if (box.dataset.id === select.value) return;
      box.dataset.id = select.value;
      box.innerHTML = '<span class="frx-tag">Toolkit</span> ';
      const name = document.createElement('b');
      name.textContent = `${select.selectedOptions[0].dataset.name}:`;
      box.append(name, ` ${meal.effect}${meal.lasts ? ` (lasts ${meal.lasts})` : ''}`);
      delete box.dataset.frxHl;
      highlight(box);
    }
    feature({
      id: 'food',
      name: 'Food Enhancement',
      description: 'Shows what each meal really does and how long it lasts, in the Quick Meals panel, on meal item pages and in My Kitchen for the meal you pick, with key words highlighted.',
      options: [
        { key: 'panel', label: 'Effect and how long it lasts under each meal in Quick Meals' },
        { key: 'real', label: '"Real effect" note on meal item pages when the game\'s text is vague' },
        { key: 'kitchen', label: 'What the meal you pick in My Kitchen does' },
        { key: 'keywords', label: 'Key words in bold (amounts, multipliers, activities)' },
      ],
      css: `
        .frx-food-effect { font-size: 12px; line-height: 1.3; max-width: 104px; margin: 2px auto 0; white-space: normal; color: var(--frx-text); }
        .frx-food-effect .frx-food-lasts { display: block; color: var(--frx-text); } /* how long it lasts: a stat */
        .meal-picker.frx-food-panel { height: auto !important; max-height: 75vh; }
        .meal-picker.frx-food-panel .picker-modal-inner { overflow-y: auto; max-height: calc(75vh - 44px); }
        .frx-food-real { margin: 8px 8px 0; text-align: center; }
        .frx-food-real .frx-food-real-label { color: var(--frx-good); }
        .frx-food-cook { margin-top: 8px; font-size: 13px; line-height: 1.4; text-align: center; color: var(--frx-text); }
        /* Key words stand out by weight, not by colour, so a sentence stays easy to read. */
        .frx-food-act { font-weight: 600; }
        .frx-food-mult, .frx-food-amt { font-weight: 700; color: var(--frx-strong); }
      `,
      scan() {
        if (opt('food', 'panel')) document.querySelectorAll('.meal-picker').forEach(enhancePanel);
        pages('item').forEach((page) => { if (page.dataset.itemId) enhanceItemPage(page); });
        if (opt('food', 'kitchen')) pages('kitchen').forEach(enhanceKitchen);
      },
      init() {
        document.addEventListener('change', (e) => {
          if (!opt('food', 'kitchen') || !e.target.matches?.('select.mealloadid')) return;
          const page = e.target.closest('.page');
          if (page) enhanceKitchen(page);
        });
      },
    });
  })();
  (() => {
    const ARTIFACTS = {
      1037: 'your pigs find White and Black Truffles daily when you feed them',
      777: 'unlocks House of Cards',
      768: 'your Sawmill makes Oak',
      633: 'a small chance of a Time Egg every reset, and 5% of your daily chicken feathers come as Gold Feathers as well',
      864: '1 Borgen Bag 01 every daily reset',
      1018: 'opens the Secret Chains at the bottom of the Temple of Reward',
      1274: 'Cookies also work on the bonus crops from the Scythe of Dewstar',
      1182: 'changes what Gary\'s Crushroom drops',
      1229: 'doubles the bugs you find while exploring',
      1535: 'Veggie Juice takes 20% off your crops\' grow time instead of 10%',
      1536: 'your Cow Pasture makes Horns daily (3x your total cow levels)',
      1613: 'unlocks PIES at your Farmhouse: Apple Pies for 10,000 Apple Cider or 1 Cranberry Juice each',
      1559: 'buys the most seeds of the kind you plant or craft with, when you have the silver (turn it on in Settings; Country Store seeds only)',
    };
    const MINING = {
      820: 'mining in Spring Cave (one per tile)', 879: 'mining in Highland Hollow (one per tile)',
      921: 'mining in Sol Grotto (one per tile)', 922: 'mining in Ember Caverns (one per tile)',
      1111: 'mining in Fenrir\'s Den (one per tile)', 1537: 'mining in Mossrock Mine (one per tile)',
      106: 'mining: uncovers a row or column', 789: 'mining: uncovers scattered tiles (one per grid)',
      368: 'Auto-Excavation in Spring Cave, Highland Hollow and Sol Grotto (saves pickaxes)',
      837: 'Auto-Excavation in Ember Caverns and Fenrir\'s Den (saves pickaxes)',
      1424: 'Auto-Excavation in Mossrock Mine (saves pickaxes)',
    };
    const SHOWN = 3; // names listed before "and N more"
    const count = (n, one, many = `${one}s`) => `${num(n)} ${n === 1 ? one : many}`;
    const names = (list) => (list.length > SHOWN
      ? `${list.slice(0, SHOWN).map((x) => x[0]).join(', ')} and ${tipHtml(`${num(list.length - SHOWN)} more`, list.slice(SHOWN).map((x) => x[1]).join(', '))}`
      : list.map((x) => x[0]).join(', '));
    const labelled = (label, list, tip = '', text = esc(label)) => (list.length ? `${gameLink(label, tip, text)}: ${names(list)}` : '');
    function requestsHtml(req, openIds) {
      const now = Date.now();
      if (!req.length) return '';
      const live = req.filter((r) => !r[3] || r[3] > now);
      const done = live.filter((r) => questDone(r[0]));
      if (live.length === done.length) {
        return `${gameLink('Help Requests')}: ${tipHtml('Currently None Remaining', live.length
          ? `You completed ${live.map((r) => r[1]).join(', ')}` : 'The requests that asked for it have ended')}`;
      }
      const mine = live.filter((r) => openIds.has(r[0]) && !questDone(r[0]));
      const rest = live.filter((r) => !openIds.has(r[0]) && !questDone(r[0]));
      const need = (r) => `${num(r[2])} needed`;
      const line = (r) => (UNLOCK_QUESTS[r[1]] ? ` · part of the "${UNLOCK_QUESTS[r[1]][0]}" questline, which unlocks ${UNLOCK_QUESTS[r[1]][1]}` : '');
      const restHtml = (r) => (UNLOCK_QUESTS[r[1]]
        ? unlockLink(UNLOCK_QUESTS[r[1]][1], esc(r[1])).replace(/title="/, `title="${esc(need(r) + line(r))} · `)
        : tipHtml(esc(r[1]), need(r)));
      const list = [
        ...mine.map((r) => [`<a class="frx-link" href="quest.php?id=${r[0]}" title="${esc(need(r) + line(r))}, open"><b>${esc(r[1])}</b></a>`, `${r[1]} (${need(r)}, open)`]),
        ...rest.map((r) => [restHtml(r), `${r[1]} (${need(r)})`]),
        ...done.map((r) => [`<s title="${need(r)}; you completed this request">${esc(r[1])}</s>`, `${r[1]} (completed)`]),
      ];
      const shown = Math.max(mine.length, SHOWN);
      const more = list.slice(shown);
      return `${gameLink('Help Requests')}: ${list.slice(0, shown).map((x) => x[0]).join(', ')}${more.length
        ? ` and ${tipHtml(`${num(more.length)} more`, more.map((x) => x[1]).join(', '))}` : ''}`;
    }
    function giftHtml(id) {
      const list = Object.values(NPCS).map((p) => {
        const how = p.best.includes(id) ? 'Loves it (best gift)' : p.loves.includes(id) ? 'Loves it' : p.likes.includes(id) ? 'Likes it' : '';
        return how ? [tipHtml(esc(p.name), how), `${p.name} (${how.toLowerCase()})`] : null;
      }).filter(Boolean);
      if (!list.length) return '';
      if (isOn('friendship') && opt('friendship', 'itempage')) return gameLink('Friendship Levels', `A gift: ${list.map((x) => x[1]).join(', ')}`, 'Gift');
      return `${gameLink('Friendship Levels', 'A gift these townsfolk love or like', 'Gift')}: ${names(list)}`;
    }
    const SUITS = ['Spades', 'Hearts', 'Diamonds', 'Clubs', 'Jokers'];
    const cardsText = (t) => `${t.slice(0, 5).map((n, i) => (n ? `${num(n)} ${SUITS[i]}` : '')).filter(Boolean).join(', ')} for ${num(t[5])}`;
    function itemUses(id, name, page) {
      const b = buddyItem(id, name, () => !page || page.isConnected);
      const d = b && !b.fail ? b : null;
      const openIds = new Set((questsState().open || []).map((q) => q.id));
      const fromQuest = page && page.f7PageData && page.f7PageData.query && Number(page.f7PageData.query.quest_id);
      if (fromQuest) openIds.add(fromQuest);
      const uses = [];
      const from = [];
      if (MINING[id]) uses.push(esc(MINING[id]));
      if (UNLOCK_ITEMS[id]) uses.push(`Unlocks: ${UNLOCK_ITEMS[id].map(placeLink).join(', ')}`);
      if (d) {
        const req = requestsHtml(d.req, openIds);
        if (req) uses.push(req);
        if (d.crafts) uses.push(gameLink('Workshop', `Goes into ${count(d.crafts, 'craft')}`));
        if (d.meals) uses.push(gameLink('My Kitchen', `Goes into ${count(d.meals, 'meal')}`));
        if (d.teaches) uses.push(`teaches <b>${esc(d.teaches)}</b>`);
        if (d.wellIn) uses.push(gameLink('Wishing Well', `${count(d.wellIn, 'possible result')} when you toss it in`));
        if (d.tradeIn) uses.push(gameLink('Exchange Center', `${count(d.tradeIn, 'trade')}, when offered`));
        if (d.opens || d.keyFor) {
          uses.push(gameLink('Locksmith', [d.opens ? 'Opens at the Locksmith' : '', d.keyFor ? `Unlocks ${count(d.keyFor, 'container')}` : ''].filter(Boolean).join('; ')));
        }
        const spots = (kind) => [...new Set(d.drops.filter((x) => x[0] === kind).map((x) => x[1]))].map((n) => [placeLink(n), n]);
        from.push(labelled('Exploring', spots('explore')));
        from.push(labelled('Fishing', spots('fish')));
        from.push(labelled('Mining', spots('mine')));
        const seeds = spots('farm').map((x) => [esc(x[1]), x[1]]); // seeds aren't places: plain names
        if (seeds.length) from.push(`Farming: ${names(seeds)}`);
        if (d.craft) from.push(gameLink('Workshop', 'Crafted'));
        if (d.cook) from.push(gameLink('My Kitchen', 'Cooked'));
        if (d.made.length) from.push(names(d.made.map((m) => [tipHtml(esc(m), 'Made here'), m])));
        if (d.buy !== null) from.push(tipHtml('Shop', d.buy ? `Bought for ${num(d.buy)} Silver` : 'Bought in a shop'));
        if (d.flea) from.push(gameLink('Flea Market'));
        if (d.cards && d.cards.length) from.push(gameLink('House of Cards', `Trade: ${d.cards.map(cardsText).join('; ')}`));
        if (d.boxes) from.push(gameLink('Locksmith', `In ${count(d.boxes, 'container')}`));
        if (d.rewards[0]) from.push(gameLink('Help Requests', `Reward for ${count(d.rewards[0], 'request')}`));
        else if (d.rewards[1]) from.push(gameLink('Help Requests', `Reward for ${count(d.rewards[1], 'request')} that ${d.rewards[1] === 1 ? 'has' : 'have'} ended`, 'Help Requests (ended)'));
        from.push(labelled('Friendship Levels', d.npc.map((n) => [tipHtml(esc(n[0]), `Friendship level ${n[1]} reward`), `${n[0]} (level ${n[1]})`]), 'Townsfolk rewards', 'Townsfolk'));
        from.push(labelled('Pets', d.pets.map((n) => [tipHtml(esc(n[0]), `Pet level ${n[1]}`), `${n[0]} (level ${n[1]})`])));
        if (d.skills.length) from.push(tipHtml('Skill rewards', `Level rewards: ${d.skills.join(', ')}`));
        if (d.tower) from.push(gameLink('The Tower', 'Tower level rewards'));
        if (d.temple) from.push(gameLink('Temple of Reward'));
        if (d.wellOut) from.push(gameLink('Wishing Well', 'Something you toss in can give it'));
        if (d.tradeOut) from.push(gameLink('Exchange Center', 'When offered'));
        if (d.quiz) from.push(gameLink('Schoolhouse', 'Quiz rewards'));
        if (d.pw) from.push(gameLink('Secret Password Log', 'A Secret Password gives it', 'Secret Passwords'));
        if (d.cc) from.push(gameLink('Community Center'));
      }
      const gift = giftHtml(id);
      if (gift) uses.push(gift);
      for (const list of [uses, from]) for (let i = list.length - 1; i >= 0; i -= 1) if (!list[i]) list.splice(i, 1);
      const usable = !!MEALS[id] || !!SEEDS[id] || !!(page && titleBlock(page, /Use this Item/i))
        || !!(page && [...page.querySelectorAll('.item-title')].some((t) => /^\s*Use this Item/i.test(t.textContent)));
      return {
        does: ARTIFACTS[id] || '', uses, from,
        loading: !b, failed: !!(b && b.fail),
        quiet: !!d && !uses.length && !ARTIFACTS[id] && usable,
      };
    }
    function itemPage(page) {
      const id = Number(page.dataset.itemId) || 0;
      const img = page.querySelector('#img');
      if (!id || !img) return;
      const name = (img.querySelector(`img[data-id="${id}"]`) || {}).alt || (item(id) || {}).name || '';
      const u = itemUses(id, name, page);
      const key = JSON.stringify([u.does, u.uses, u.from, u.loading, u.failed, u.quiet]);
      if (page.frxUsesKey === key) return;
      page.frxUsesKey = key;
      let el = page.querySelector('.frx-uses');
      if (u.quiet || (u.loading && !u.does && !u.uses.length)) { if (el) el.remove(); return; }
      const label = (t) => `<b class="frx-uses-label">${t}</b>`;
      const lines = [];
      if (u.does) lines.push(`${label('What it does:')} ${esc(u.does)}`);
      if (u.uses.length) lines.push(`${label('Uses:')} ${u.uses.join(' · ')}`);
      if (u.from.length) lines.push(`${label('Where to get it:')} ${u.from.join(' · ')}`);
      const lib = libraryLink(id);
      if (lib && lines.length) lines[lines.length - 1] += ` · ${lib}`;
      if (u.failed) {
        lines.push('buddy.farm couldn\'t be reached; it\'s tried again when you open this item after an hour.');
      } else if (!u.loading && !u.uses.length && !u.does) {
        lines.push(`${label('Uses:')} none listed. buddy.farm and the Library list no Help Request, craft, meal, Wishing Well, Exchange Center, Locksmith or townsfolk use for it.`);
      }
      if (!el) {
        el = document.createElement('div');
        el.className = 'frx-card frx-uses';
        const real = img.querySelector('.frx-food-real');
        if (real) real.after(el); else img.append(el);
      }
      el.innerHTML = `<span class="frx-tag">Toolkit</span> ${lines.join('<br>')}`;
    }
    feature({
      id: 'uses',
      name: 'Item Uses',
      description: 'On an item\'s page, what it\'s for and where to get it: what a quest item does once you have it (Library), the Help Requests that ask for it (yours first, completed ones crossed out), crafts and meals, Wishing Well, Exchange Center, Locksmith, the townsfolk who love or like it, and where it drops, who sells, trades or gives it (buddy.farm, read the first time you open the item and kept a week). Each place links to its page, details are in tooltips, and items with their own Library page link to it.',
      css: `
        .frx-uses { margin: 8px 8px 0; text-align: center; }
        .frx-uses .frx-uses-label { color: var(--frx-good); }
      `,
      init() {
        onBuddyItem(() => pages('item').forEach(itemPage));
        onQuestsChange(() => pages('item').forEach(itemPage));
      },
      scan() {
        pages('item').forEach(itemPage);
      },
    });
  })();
  (() => {
    const NOT_ACTIVE = {
      mailbox: 'Eat one before you start giving gifts.',
      xfarm: 'Eat one before you start harvesting.',
      fishing: 'Eat one before you start fishing.',
      area: 'Eat one before you start exploring.',
      pets: 'Eat one before you start collecting.',
      sawmill: 'Eat one to boost the sawmill for the next hour.',
      market: 'Eat one before you start selling.',
      kitchen: 'Eat one before you start cooking.',
      workshop: '',
    };
    const PAGE_LABELS = {
      xfarm: 'Farm', fishing: 'Fishing', area: 'Exploring', pets: 'Pets', sawmill: 'Sawmill',
      market: 'Farmers Market', kitchen: 'Kitchen', mailbox: 'Townsfolk mailboxes', workshop: 'Workshop',
    };
    const tipName = (tip) => tip.label || (item(tip.ids[0]) ? item(tip.ids[0]).name : `Item ${tip.ids[0]}`);
    const tipEnd = (tip) => Math.max(...tip.ids.map(effectEnd));
    const untracked = (tip) => !!(MEALS[tip.ids[0]] || {}).actions;
    const left = (end) => {
      const s = Math.max(0, Math.round((end - Date.now()) / 1000));
      const h = Math.floor(s / 3600);
      const m = Math.floor((s % 3600) / 60);
      return h ? `${h}:${String(m).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}` : `${m}:${String(s % 60).padStart(2, '0')}`;
    };
    const tipsOf = (page) => (PAGE_MEALS[page.dataset.page] || []).filter((t) => !t.optional || opt('meal-reminders', 'stew'));
    const unchecked = () => Date.now() - mealsSeenAt() > MEALS_CHECKED_FOR;
    function summary(page) {
      const tracked = tipsOf(page).filter((t) => !untracked(t) && !t.optional);
      const running = tracked.filter((t) => tipEnd(t)).length;
      if (!tracked.length && tipsOf(page).some((t) => t.optional && tipEnd(t))) return { tracked: 0, running: 0, state: 'is-on' };
      const state = !tracked.length ? 'is-unknown' : running === tracked.length ? 'is-on' : unchecked() ? 'is-unchecked' : 'is-off';
      return { tracked: tracked.length, running, state };
    }
    function place(bar) {
      const nav = bar.parentElement;
      const center = nav.querySelector('.center');
      if (!nav.offsetWidth || !nav.classList.contains('navbar-on-center')) return null; // hidden or sliding; check later
      const box = nav.getBoundingClientRect();
      let textRight = box.left + box.width / 2;
      if (center) {
        const range = document.createRange();
        range.selectNodeContents(center);
        const t = range.getBoundingClientRect();
        if (t.width) textRight = t.right;
      }
      const y = box.top + box.height / 2;
      let edge = box.right;
      bar.style.pointerEvents = 'none'; // look through our own button
      for (let x = box.right - 2; x > textRight; x -= 5) {
        for (const dy of [-8, 0, 8]) {
          const el = document.elementFromPoint(x, y + dy);
          if (!el || el.contains(nav) || el.matches('.left, .right') || (center && center.contains(el))) continue;
          const r = el.getBoundingClientRect();
          if (r.width > box.width * 0.5) continue; // a background, not a button
          edge = Math.min(edge, r.left);
        }
      }
      bar.style.pointerEvents = '';
      const right = `${Math.round(box.right - edge + 6)}px`;
      if (bar.style.right !== right) bar.style.right = right;
      bar.classList.add('is-placed');
      return edge - 6 - (textRight + 6);
    }
    function render(page) {
      const nav = navbarOf(page);
      const bar = nav && nav.querySelector('.frx-meal-bar');
      if (!bar) return;
      const s = summary(page);
      const count = s.state === 'is-unchecked' ? ' ?' : s.tracked ? ` ${s.running}/${s.tracked}` : '';
      const full = `<a href="javascript:;" class="frx-meal-btn ${s.state}"><span class="frx-meal-dot"></span>Food${count}</a>`;
      const short = `<a href="javascript:;" class="frx-meal-btn ${s.state}"><span class="frx-meal-dot"></span>${count.trim() || 'Food'}</a>`;
      const dot = `<a href="javascript:;" class="frx-meal-btn is-dot ${s.state}" title="Food${count}"><span class="frx-meal-dot"></span></a>`;
      const set = (html) => { if (bar.frxHtml !== html) { bar.frxHtml = html; bar.innerHTML = html; } };
      const dotOnly = !opt('meal-reminders', 'label');
      const room = place(bar);
      if (room === null) { if (bar.frxHtml === undefined) set(dotOnly ? dot : full); return; } // hidden or sliding: measure later
      set(dotOnly ? dot : full);
      if (!dotOnly && bar.offsetWidth > room) set(short);
      if (bar.offsetWidth > room) set(dot);
      bar.classList.toggle('is-below', bar.offsetWidth > room);
      if (pop && pop.frxPage === page) fillPop(page); // keep an open list up to date
    }
    const renderAll = () => Object.keys(PAGE_MEALS).forEach((name) => pages(name).forEach(render));
    function addBar(page) {
      if (!opt('meal-reminders', `page.${page.dataset.page}`)) return;
      const tips = tipsOf(page);
      if (!tips.some((t) => !t.when || t.when(page))) return;
      const nav = navbarOf(page);
      if (!nav || !nav.querySelector('.right') || nav.querySelector('.frx-meal-bar')) return;
      const bar = document.createElement('span');
      bar.className = 'frx-meal-bar';
      bar.frxPage = page;
      nav.appendChild(bar);
      render(page);
      refreshEffects().then(() => render(page)); // reads Home only if meals have never been looked at (core)
    }
    let quick = { at: 0, meals: {} }; // item id -> { id, name, method, onhand, description }
    let quickRead = null;
    const canQuickEat = () => opt('meal-reminders', 'eat') && hasPerk('Quick Meals') === true;
    const mealsFrom = (root) => {
      const meals = {};
      for (const a of root.querySelectorAll('.quick-meal-item .usemealbtn[data-id]')) meals[a.dataset.id] = { ...a.dataset };
      return meals;
    };
    function readQuickMeals() {
      if (!canQuickEat()) return Promise.resolve();
      const panel = document.querySelector('#meal-picker-content');
      if (panel && panel.querySelector('.quick-meal-item .usemealbtn[data-id]')) {
        quick = { at: Date.now(), meals: mealsFrom(panel) }; // the game's own panel: free
        return Promise.resolve();
      }
      if (quick.at) return Promise.resolve(); // already read this session; an eat reloads the game's panel
      if (!quickRead) {
        quickRead = fetchPage(`worker.php?cachebuster=${Math.floor(Math.random() * 500000)}&go=get_quick_meal_display&pagewidth=${innerWidth}`, 'Quick Meals list for Eat buttons')
          .then((doc) => {
            quick = { at: Date.now(), meals: mealsFrom(doc) };
            readQuickPanel(doc); // the same panel also has your meal timers
          })
          .catch((e) => { quick.at = Date.now(); problem(e, 'Reading Quick Meals failed'); }) // wait before trying again
          .finally(() => { quickRead = null; });
      }
      return quickRead;
    }
    function eatButtons(tip) {
      if (!canQuickEat()) return '';
      const have = tip.ids.map((id) => quick.meals[id]).filter((m) => m && Number(m.onhand) > 0);
      return have.map((m) => `<a href="javascript:;" class="usemealbtn frx-meal-eat" data-id="${esc(m.id)}" data-name="${esc(m.name)}"
        data-description="${esc(m.description || '')}" data-onhand="${esc(m.onhand)}" data-method="${esc(m.method)}"
        title="${esc(num(m.onhand))} on hand">${esc(have.length > 1 ? `Eat ${m.name.split(' ')[0]}` : 'Eat')}</a>`).join('');
    }
    let pop = null;
    function closePop() { if (pop) { pop.remove(); pop = null; } }
    function row(tip) {
      const meal = MEALS[tip.ids[0]] || { effect: '' };
      const end = tipEnd(tip);
      const status = end
        ? `<span class="frx-meal-on"><span data-frx-end="${end}">${left(end)}</span> left</span>`
        : untracked(tip)
          ? '<span class="frx-meal-unknown" title="It lasts a number of actions, so the game doesn\'t show whether it\'s running.">Can\'t tell</span>'
          : unchecked() ? '<span class="frx-meal-unknown">Not checked</span>'
            : tip.optional ? '<span class="frx-meal-unknown" title="Only worth it when you\'re pushing an item\'s mastery.">Optional · not running</span>'
              : '<span class="frx-meal-off">Not eaten</span>';
      const eat = end ? '' : eatButtons(tip);
      return `<div class="frx-meal-row"><div><div class="frx-meal-name">${esc(tipName(tip))}</div>`
        + `<div class="frx-meal-effect">${esc(meal.effect)}${meal.lasts ? `, ${esc(meal.lasts)}` : ''}</div></div>`
        + `<div class="frx-meal-side">${status}${eat ? `<div class="frx-meal-eats">${eat}</div>` : ''}</div></div>`;
    }
    function fillPop(page) {
      const s = summary(page);
      const optionalOnly = !s.tracked && s.state !== 'is-on' && tipsOf(page).length && tipsOf(page).every((t) => t.optional);
      const head = optionalOnly ? '<div class="frx-meal-head">No meal needed here. Optional:</div>'
        : s.state === 'is-on' ? '<div class="frx-meal-head frx-meal-on">Your meals are running</div>'
        : s.state === 'is-off' ? `<div class="frx-meal-head frx-meal-off">${s.tracked - s.running} not eaten. ${esc(NOT_ACTIVE[page.dataset.page] || '')}</div>`
          : s.state === 'is-unchecked'
            ? `<div class="frx-meal-head"><span class="frx-meal-unknown">Not checked since ${esc(new Date(mealsSeenAt()).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }))}.</span>
                Open <a href="index.php" class="frx-link">Home</a> or <a href="javascript:;" class="frx-meal-quick frx-link">Quick Meals</a> to check.</div>`
            : '';
      const html = head + tipsOf(page).map(row).join('');
      if (pop.frxHtml !== html) { pop.frxHtml = html; pop.innerHTML = html; }
    }
    function openPop(btn) {
      closePop();
      const page = btn.closest('.frx-meal-bar').frxPage;
      pop = document.createElement('div');
      pop.className = 'frx-meal-pop';
      pop.frxPage = page;
      fillPop(page);
      document.body.appendChild(pop);
      readQuickMeals().then(() => { if (pop && pop.frxPage === page) fillPop(page); });
      const r = btn.getBoundingClientRect();
      pop.style.top = `${r.bottom + 6}px`;
      pop.style.left = `${Math.max(8, Math.min(window.innerWidth - pop.offsetWidth - 8, r.right - pop.offsetWidth))}px`;
    }
    feature({
      id: 'meal-reminders',
      name: 'Meal Reminders',
      description: 'On pages where a meal helps (farm, fishing, exploring, pets, sawmill, market, kitchen, Workshop, townsfolk mailboxes), adds a "Food" button next to the page title: green when your meals are running, orange when one isn\'t. Tap it for the list. With the Quick Meals perk, you can eat from the list too.',
      options: [
        ...Object.entries(PAGE_LABELS).map(([key, label]) => ({ key: `page.${key}`, label, group: 'Show it on' })),
        { key: 'stew', label: 'Mushroom Stew (+10% mastery) in the list on the farm, fishing and the Workshop; it never turns the button orange' },
        { key: 'label', label: 'Show the word "Food" and the count (off: just the coloured dot)' },
        { key: 'eat', label: 'Eat buttons in the list, if you own the Quick Meals perk (the game asks before eating)' },
      ],
      css: `
        .frx-meal-bar { position: absolute; top: 50%; transform: translateY(-50%); z-index: 2; }
        .frx-meal-bar:not(.is-placed) { visibility: hidden; }
        .navbar-inner:not(.navbar-on-center) > .frx-meal-bar { display: none; } /* a page sliding in or out, or kept in the background */
        .frx-meal-btn.is-dot { padding: 4px; }
        .frx-meal-btn.is-dot .frx-meal-dot { width: 10px; height: 10px; }
        .frx-meal-bar.is-below { top: 100%; transform: none; margin-top: 3px; }
        .frx-meal-btn { display: inline-flex; align-items: center; gap: 5px; white-space: nowrap; padding: 3px 9px; border-radius: 11px;
          font-size: 13px; font-weight: bold; line-height: 17px; background: var(--frx-surface); border: 1px solid var(--frx-border);
          color: var(--frx-muted) !important; }
        .frx-meal-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--frx-dot-off); flex: none; }
        .frx-meal-btn.is-on { color: var(--frx-good) !important; border-color: var(--frx-good-border); }
        .frx-meal-btn.is-on .frx-meal-dot { background: var(--frx-good); }
        .frx-meal-btn.is-off { color: var(--frx-warn) !important; border-color: var(--frx-warn-border); }
        .frx-meal-btn.is-off .frx-meal-dot { background: var(--frx-warn); }
        .frx-meal-pop { position: fixed; z-index: 100000; width: 300px; max-width: calc(100vw - 16px); font-size: 14px; line-height: 1.35;
          background: var(--frx-surface-2); color: var(--frx-text); border: 1px solid var(--frx-border); border-radius: 8px;
          box-shadow: 0 4px 14px var(--frx-shadow); overflow: hidden; }
        .frx-meal-head { padding: 8px 10px; font-size: 13px; border-bottom: 1px solid var(--frx-border-soft); background: var(--frx-surface); }
        .frx-meal-row { display: flex; justify-content: space-between; align-items: center; gap: 10px; padding: 7px 10px; }
        .frx-meal-row + .frx-meal-row { border-top: 1px solid var(--frx-border-soft); }
        .frx-meal-name { color: var(--frx-strong); }
        .frx-meal-effect { font-size: 13px; color: var(--frx-text); } /* what the meal does: real info */
        .frx-meal-side { flex: none; text-align: right; font-size: 13px; }
        .frx-meal-eats { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 4px; margin-top: 4px; max-width: 150px; }
        .frx-meal-eat { padding: 2px 10px; border-radius: 8px; font-size: 13px; font-weight: bold; white-space: nowrap;
          border: 1px solid var(--frx-good-border); background: var(--frx-good-bg); color: var(--frx-good) !important; }
        .frx-meal-on { color: var(--frx-good); font-weight: bold; }
        .frx-meal-off { color: var(--frx-warn); font-weight: bold; }
        .frx-meal-unknown { color: var(--frx-faint); }
      `,
      init() {
        document.addEventListener('click', (e) => {
          const btn = e.target.closest && e.target.closest('.frx-meal-btn');
          if (btn) {
            e.preventDefault();
            const same = pop && pop.frxPage === btn.closest('.frx-meal-bar').frxPage;
            if (same) closePop(); else openPop(btn);
            return;
          }
          if (e.target.closest && e.target.closest('.frx-meal-quick')) {
            e.preventDefault();
            closePop();
            const meals = document.querySelector('#mealsbtn');
            if (meals) meals.click();
            return;
          }
          if (e.target.closest && e.target.closest('.frx-meal-eat')) {
            setTimeout(closePop, 0);
            return;
          }
          if (!(e.target.closest && e.target.closest('.frx-meal-pop'))) closePop();
        }, true);
        onEffectsChange(renderAll); // a meal started or ran out
        window.addEventListener('resize', () => { closePop(); requestAnimationFrame(renderAll); });
        setInterval(() => {
          document.querySelectorAll('[data-frx-end]').forEach((el) => { el.textContent = left(Number(el.dataset.frxEnd)); });
          renderAll();
        }, 1000);
      },
      scan() {
        Object.keys(PAGE_MEALS).forEach((name) => pages(name).forEach(addBar));
        if (pop && !(navbarOf(pop.frxPage) || document.body).classList.contains('navbar-on-center')) closePop(); // left the page
      },
    });
  })();
  (() => {
    const GOLD_IMG = '/img/items/5gold.png';
    const range = (a, b) => (a === b ? num(a) : `${num(a)}–${num(b)}`);
    const chosen = new Set(); // filters: 'gold' or item ids (strings)
    function rowsOf(page) {
      return [...page.querySelectorAll('.list-block li .item-content')].map((el) => {
        const btn = el.querySelector('.openbtn[data-id], [data-id]');
        const qty = el.querySelector('.item-title strong span');
        return {
          el,
          li: el.closest('li'),
          id: btn ? Number(btn.dataset.id) : 0,
          qty: qty ? Number(qty.textContent.replace(/[^\d]/g, '')) || 1 : 1,
        };
      }).filter((r) => r.id);
    }
    const chip = (img, text, cls = '') => `<span class="frx-chip ${cls}"><img src="${esc(img)}" alt="">${text}</span>`;
    const MAX_CHIPS = 8;
    const valuableFirst = (rows) => [...rows].sort((x, y) => (VALUABLE.includes(y[0]) ? 1 : 0) - (VALUABLE.includes(x[0]) ? 1 : 0));
    const more = (id, n) => (n > 0 ? ` <a href="item.php?id=${id}" class="frx-ls-more frx-link">and ${num(n)} more</a>` : '');
    function line(id, qty) {
      const [gold, grab, picks, rows] = CONTAINERS[id];
      const parts = [];
      if (gold) parts.push(chip(GOLD_IMG, `${num(gold * qty)} gold`));
      const sure = grab ? [] : valuableFirst(rows);
      for (const [iid, a, b] of sure.slice(0, MAX_CHIPS)) parts.push(chip(item(iid).img, `${range(a * qty, b * qty)} ${esc(item(iid).name)}`));
      let html = parts.length ? `<span class="frx-lead">${qty > 1 ? `All ${num(qty)} give` : 'Gives'}</span> ${parts.join('')}${more(id, sure.length - MAX_CHIPS)}` : '';
      if (grab && rows.length && opt('locksmith', 'grab')) {
        const list = valuableFirst(rows);
        const maybe = list.slice(0, MAX_CHIPS).map(([iid, a, b]) => chip(item(iid).img, `${range(a, b)} ${esc(item(iid).name)}`, 'is-maybe')).join('');
        html += `${html ? '<br>' : ''}<span class="frx-lead">Each one is a random pick of ${picks}, which can be</span> ${maybe}${more(id, list.length - MAX_CHIPS)}`;
      }
      return html;
    }
    const TRACKED = 'juices, pies, Protein Bars, Buddy Dolls, Borgen Bucks, Heart Containers, Time Eggs and more';
    function applyFilter(page) {
      for (const r of rowsOf(page)) {
        const c = CONTAINERS[r.id];
        const match = !chosen.size || (c && [...chosen].some((k) => (k === 'gold' ? c[0] > 0 : c[3].some(([iid]) => String(iid) === k))));
        r.li.classList.toggle('frx-ls-hidden', !match);
      }
      page.querySelectorAll('.frx-ls-total').forEach((el) => el.classList.toggle('is-chosen', chosen.has(el.dataset.frxKey)));
      const clear = page.querySelector('.frx-ls-clear');
      if (clear) clear.hidden = !chosen.size;
    }
    function summary(page, rows) {
      const seen = new Set();
      let gold = 0;
      const sure = {};  // item id -> [min, max]
      const maybe = new Set();
      for (const r of rows) {
        const c = CONTAINERS[r.id];
        if (!c || seen.has(r.id)) continue; // favourites show a container twice
        seen.add(r.id);
        gold += c[0] * r.qty;
        for (const [iid, a, b] of c[3]) {
          if (c[1]) { maybe.add(iid); continue; }
          sure[iid] = sure[iid] || [0, 0];
          sure[iid][0] += a * r.qty;
          sure[iid][1] += b * r.qty;
        }
      }
      const total = (key, img, text, cls = '') => `<a href="javascript:;" class="frx-chip frx-ls-total ${cls}" data-frx-key="${key}">`
        + `<img src="${esc(img)}" alt="">${text}</a>`;
      const totals = [];
      if (gold) totals.push(total('gold', GOLD_IMG, `${num(gold)} gold`));
      for (const iid of VALUABLE) if (sure[iid]) totals.push(total(iid, item(iid).img, `${range(...sure[iid])} ${esc(item(iid).name)}`));
      const maybes = VALUABLE.filter((iid) => opt('locksmith', 'grab') && maybe.has(iid) && !sure[iid])
        .map((iid) => total(iid, item(iid).img, esc(item(iid).name), 'is-maybe'));
      if (!totals.length && !maybes.length) {
        return rows.length ? `<div class="frx-card frx-ls-summary"><span class="frx-tag">Toolkit</span> None of your containers here
          give gold or valuable items (${TRACKED}). What each one gives is under its name.</div>` : '';
      }
      return `<div class="frx-card frx-ls-summary">
        <div class="frx-ls-head"><span class="frx-tag">Toolkit</span> Opening all your containers gives</div>
        <div class="frx-ls-totals">${totals.join('') || '<span class="frx-lead">Nothing certain</span>'}</div>
        ${maybes.length ? `<div class="frx-ls-head">Grab bags can also give</div><div class="frx-ls-totals">${maybes.join('')}</div>` : ''}
        <div class="frx-sub">Tap a total to show only the containers that give it. <a href="javascript:;" class="frx-ls-clear frx-link" hidden>Show all</a></div>
      </div>`;
    }
    function enhance(page) {
      const rows = rowsOf(page);
      const sig = rows.map((r) => `${r.id}:${r.qty}`).join(',');
      if (page.frxLsSig === sig) return;
      page.frxLsSig = sig;
      for (const r of rows) {
        r.el.querySelectorAll('.frx-ls-line').forEach((el) => el.remove());
        if (!CONTAINERS[r.id] || !opt('locksmith', 'lines')) continue;
        const html = line(r.id, r.qty);
        if (!html) continue;
        const desc = r.el.querySelector('.item-title > span');
        const div = document.createElement('div');
        div.className = 'frx-ls-line';
        div.innerHTML = html;
        if (desc) desc.before(div); else r.el.querySelector('.item-title').appendChild(div);
      }
      page.querySelectorAll('.frx-ls-summary').forEach((el) => el.remove());
      const html = opt('locksmith', 'totals') ? summary(page, rows) : '';
      const firstTitle = page.querySelector('.content-block-title');
      if (html && firstTitle) {
        firstTitle.insertAdjacentHTML('beforebegin', html);
        page.querySelector('.frx-ls-summary').addEventListener('click', (e) => {
          const t = e.target.closest('.frx-ls-total');
          if (t) { const k = t.dataset.frxKey; if (chosen.has(k)) chosen.delete(k); else chosen.add(k); }
          else if (e.target.closest('.frx-ls-clear')) chosen.clear();
          else return;
          applyFilter(page);
        });
      }
      applyFilter(page);
    }
    function itemPage(page) {
      const title = titleBlock(page, /^\s*Item Contents\s*$/i);
      const card = title && title.nextElementSibling;
      const list = card && card.nextElementSibling;
      if (!card || !list || !list.classList.contains('list-block') || /gives one of/i.test(card.textContent)) return;
      const firstList = page.querySelector('.list-block');
      const onHand = firstList && (firstList.textContent.match(/([\d,]+)\s*on hand/i) || [])[1];
      const qty = Number(String(onHand || '').replace(/,/g, '')) || 0;
      const sig = `${qty}:${list.querySelectorAll('li').length}`;
      if (page.frxLsItemSig === sig) return;
      page.frxLsItemSig = sig;
      page.querySelectorAll('.frx-ls-item').forEach((el) => el.remove());
      if (qty < 2) return;
      const chips = [...list.querySelectorAll('li')].map((li) => {
        const name = (li.querySelector('.item-title strong') || {}).textContent;
        const img = li.querySelector('.item-media img');
        const m = ((li.querySelector('.item-after') || {}).textContent || '').match(/([\d,]+)(?:\s*[-–]\s*([\d,]+))?/);
        if (!name || !m) return '';
        const a = Number(m[1].replace(/,/g, ''));
        const b = m[2] ? Number(m[2].replace(/,/g, '')) : a;
        return chip(img ? img.getAttribute('src') : GOLD_IMG, `${range(a * qty, b * qty)} ${esc(name.trim())}`);
      }).filter(Boolean);
      if (!chips.length) return;
      card.insertAdjacentHTML('afterend', `<div class="frx-ls-item"><span class="frx-tag">Toolkit</span> <span class="frx-lead">All ${num(qty)} give</span> ${chips.join('')}</div>`);
    }
    feature({
      id: 'locksmith',
      name: 'Locksmith Rewards',
      description: 'On the Locksmith, shows what each of your containers gives, with totals of the gold and valuable items (juices, pies, Protein Bars, Buddy Dolls, Borgen Bucks, Heart Containers, Time Eggs and more) at the top. Tap a total to show only the containers that give it. A container\'s item page says what all of yours give.',
      options: [
        { key: 'totals', label: 'Totals at the top (tap one to filter the list)' },
        { key: 'lines', label: 'A line under each container saying what your stack gives' },
        { key: 'grab', label: 'What grab bags can give (random picks)' },
        { key: 'itempage', label: 'On a container\'s item page: what all of yours give' },
      ],
      css: `
        .frx-ls-line { margin: 3px 0 2px; font-size: 13px; font-weight: normal; line-height: 1.9; }
        .frx-chip.is-maybe { border-style: dashed; color: var(--frx-muted); }
        .frx-ls-summary { margin: 0 0 10px; } /* sits inside the game's content block, which has the side margins */
        .frx-ls-head { color: var(--frx-strong); font-weight: bold; font-size: 14px; margin: 0 0 6px; }
        .frx-ls-head + .frx-ls-totals + .frx-ls-head { margin-top: 10px; }
        .frx-ls-totals { line-height: 2; }
        .frx-ls-total { cursor: pointer; font-size: 13px; }
        .frx-ls-total.is-chosen { border-color: var(--frx-good); background: var(--frx-good-bg); color: var(--frx-good); }
        .frx-ls-clear { margin-left: 6px; }
        .frx-ls-more { white-space: nowrap; }
        li.frx-ls-hidden { display: none !important; }
        .frx-ls-item { margin: 0 15px 8px; font-size: 13px; line-height: 1.9; color: var(--frx-text); }
      `,
      scan() {
        pages('locksmith').forEach(enhance);
        if (opt('locksmith', 'itempage')) pages('item').forEach(itemPage);
      },
    });
  })();
  (() => {
    const COOKIES = [699, 716, 657]; // Happy, Lovely, Spooky Cookies: each kind running is x3 crops (up to x9)
    function noteHarvest(target) {
      const page = target.closest('.page');
      const all = !target.matches('img.cropitem');
      const plots = all ? [...page.querySelectorAll('img.cropitem.harvest')] : [target];
      const ready = plots.filter((p) => p.classList.contains('harvest')).map((p) => ({ pb: p.dataset.pb }));
      if (!ready.length) return;
      const tapAt = Date.now();
      let tries = 0;
      const check = () => {
        if (harvestRepliedAt >= tapAt) return; // the game's reply already gave the exact crops
        const farm = [...pages('xfarm')].filter((p) => !p.classList.contains('page-on-left')).pop();
        const done = farm && ready.filter((r) => {
          const plot = farm.querySelector(`img.cropitem[data-pb="${r.pb}"]`);
          return !plot || !plot.classList.contains('harvest');
        });
        if (done && done.length) readInventory(all ? 'after Harvest All' : 'after a harvest', ACTION_GAP);
        else if (++tries < 4) setTimeout(check, 2500);
      };
      setTimeout(check, 2500);
    }
    function noteVat(page) {
      const select = page.querySelector('select.seedid');
      const o = select && select.options[select.selectedIndex];
      const seed = o && seedOf(o);
      const left = Number((page.querySelector('#gj_left') || {}).textContent);
      if (!seed || Number.isNaN(left)) return;
      const tapAt = Date.now();
      let tries = 0;
      const check = () => {
        if (harvestRepliedAt >= tapAt) return; // the game's reply already gave the exact crops
        const vat = [...pages('grapejuicevat')].filter((p) => !p.classList.contains('page-on-left')).pop();
        const now = vat && Number((vat.querySelector('#gj_left') || {}).textContent);
        if (now < left) readInventory('after the Vat', ACTION_GAP);
        else if (++tries < 16) setTimeout(check, 2500); // you may still be answering the game's question (40 s)
      };
      setTimeout(check, 2500);
    }
    function boost() {
      const dp = (hasPerk('Double Prizes I') ? 0.15 : 0) + (hasPerk('Double Prizes II') ? 0.25 : 0);
      const cookies = COOKIES.filter((id) => effectEnd(id)).length;
      const unseen = hasPerk('Double Prizes I') === null; // your Perks page hasn't been seen yet
      const parts = [dp ? `Double Prizes +${Math.round(dp * 100)}%` : '', cookies ? `cookies x${cookies * 3}` : '',
        unseen ? 'perks not seen yet, so this may be low' : ''].filter(Boolean);
      return { factor: (1 + dp) * (cookies ? cookies * 3 : 1), text: parts.join(', '), cookies };
    }
    const seedOf = (o) => SEEDS[o.dataset.item_id || o.value];
    const SPEED = [['Quicker Farming I', 5], ['Quicker Farming II', 10], ['Quicker Farming III', 15], ['Quicker Farming IV', 20],
      ['Irrigation System I', 10], ['Irrigation System II', 20]];
    const BREAKFAST_BOOST = 661;
    function growTime(seed) {
      const base = seed[2] * 60;
      if (!base) return null;
      if (base <= 5 * 60 && effectEnd(BREAKFAST_BOOST)) return { secs: 0, text: 'instant' };
      const off = SPEED.reduce((n, [p, pct]) => n + (hasPerk(p) ? pct : 0), 0);
      let secs = base * (1 - off / 100) * (hasPerk('Enriched Soil') ? 0.5 : 1);
      const crop = item(seed[0]);
      if (crop && crop.name === 'Corn') secs *= 1 - (hasPerk('Quicker Corn I') ? 0.1 : 0) - (hasPerk('Quicker Corn II') ? 0.1 : 0);
      return { secs, text: duration(secs) };
    }
    function duration(secs) {
      const parts = [['d', 86400], ['h', 3600], ['m', 60], ['s', 1]];
      let left = Math.round(secs);
      const out = [];
      for (const [u, n] of parts) {
        const v = Math.floor(left / n);
        left -= v * n;
        if (v || out.length) out.push(v ? `${v}${u}` : '');
        if (out.length === 2) break;
      }
      return out.filter(Boolean).join(' ') || '0s';
    }
    function speedText() {
      if (hasPerk('Quicker Farming I') === null) return 'Perks not seen yet: open Perks and Farm Supply once';
      const own = [...SPEED.map(([p]) => p), 'Enriched Soil'].filter((p) => hasPerk(p));
      return own.length ? `With your ${own.join(', ')}` : 'No perks that speed up crops';
    }
    function markOptions(select) {
      const cap = invState().cap;
      for (const o of select.options) {
        const seed = seedOf(o);
        if (!seed) continue;
        if (o.dataset.frxText === undefined) o.dataset.frxText = o.textContent;
        const have = opt('crops', 'counts') ? invCount(seed[0]) : undefined;
        const grow = opt('crops', 'timers') ? growTime(seed) : null;
        const text = [o.dataset.frxText, have === undefined ? '' : `${num(have)}${cap ? ` / ${num(cap)}` : ''}`, grow ? grow.text : '']
          .filter(Boolean).join(' · ');
        if (o.textContent !== text) o.textContent = text;
        o.classList.toggle('frx-crop-max', have !== undefined && !!cap && have >= cap);
      }
      const chosen = select.options[select.selectedIndex];
      select.classList.toggle('frx-crop-max', !!chosen && chosen.classList.contains('frx-crop-max'));
      face(select);
    }
    const SORTS = [['game', 'The game\'s order (A-Z)'], ['quick', 'Grow time, shortest first'], ['slow', 'Grow time, longest first'],
      ['most', 'Seeds left, most first'], ['fewest', 'Seeds left, fewest first']];
    function sortOptions(select) {
      const all = [...select.options];
      all.forEach((o, i) => { if (o.dataset.frxAt === undefined) o.dataset.frxAt = i; });
      const others = all.filter((o) => !seedOf(o)).sort((a, b) => a.dataset.frxAt - b.dataset.frxAt);
      const head = others.filter((o) => Number(o.dataset.frxAt) === 0);
      const tail = others.filter((o) => Number(o.dataset.frxAt) !== 0);
      const how = opt('crops', 'sort');
      const secs = (o) => { const g = growTime(seedOf(o)); return g ? g.secs : Infinity; };
      const amt = (o) => Number(o.dataset.amt) || 0;
      const key = { quick: secs, slow: (o) => -secs(o), most: (o) => -amt(o), fewest: amt }[how];
      const rows = all.filter((o) => seedOf(o)).map((o) => [o, key ? key(o) : 0, Number(o.dataset.frxAt)]);
      rows.sort((a, b) => (a[1] - b[1]) || (a[2] - b[2]));
      const order = [...head, ...rows.map((r) => r[0]), ...tail];
      if (order.every((o, i) => all[i] === o)) return;
      const chosen = select.options[select.selectedIndex];
      select.append(...order);
      if (chosen) chosen.selected = true;
    }
    function sortControl(select) {
      const title = select.closest('.item-inner') && select.closest('.item-inner').querySelector('.item-title');
      if (!title) return;
      let el = title.querySelector('.frx-crop-sort');
      if (!el) {
        el = document.createElement('span');
        el.className = 'frx-crop-sort';
        el.innerHTML = `<i class="fa-solid fa-arrow-down-wide-short"></i><select>${SORTS.map(([v, l]) => `<option value="${v}">${esc(l)}</option>`).join('')}</select>`;
        title.append(el);
        const pick = el.querySelector('select');
        pick.addEventListener('click', (e) => e.stopPropagation());
        pick.addEventListener('change', () => { setOpt('crops', 'sort', pick.value); refreshAll(); });
      }
      const pick = el.querySelector('select');
      const how = opt('crops', 'sort');
      if (pick.value !== how) pick.value = how;
      el.title = `Seed list order (Toolkit): ${(SORTS.find(([v]) => v === how) || SORTS[0])[1]}`;
    }
    function face(select) {
      let f = select.nextElementSibling;
      if (!f || !f.classList.contains('frx-crop-face')) {
        const cs = getComputedStyle(select);
        select.style.setProperty('--frx-face', cs.color);
        f = document.createElement('span');
        f.className = 'frx-crop-face';
        Object.assign(f.style, { font: cs.font, paddingLeft: cs.paddingLeft, paddingRight: cs.paddingRight, textAlign: cs.textAlign, color: cs.color });
        if (getComputedStyle(select.parentElement).position === 'static') select.parentElement.style.position = 'relative';
        select.after(f);
        select.classList.add('frx-crop-faced');
      }
      Object.assign(f.style, { left: `${select.offsetLeft}px`, top: `${select.offsetTop}px`, width: `${select.offsetWidth}px`,
        height: `${select.offsetHeight}px`, lineHeight: `${select.offsetHeight}px` });
      const o = select.options[select.selectedIndex];
      const text = o ? (o.dataset.frxText ?? o.textContent) : '';
      if (f.textContent !== text) f.textContent = text;
      f.classList.toggle('is-max', select.classList.contains('frx-crop-max'));
    }
    function infoFor(page, select) {
      const o = select.options[select.selectedIndex];
      const seed = o && seedOf(o);
      if (!seed) return '';
      const crop = item(seed[0]);
      const name = crop ? crop.name : 'this crop';
      const have = invCount(seed[0]);
      const b = boost();
      let base;
      let where;
      if (page.dataset.page === 'grapejuicevat') {
        base = Number((page.querySelector('#estimated_crops') || {}).textContent) || 0; // the game's own estimate
        where = 'This Vat use:';
      } else {
        const plots = page.querySelectorAll('#crops [class*="col-"], #crops-condensed [class*="col-"]').length
          || page.querySelectorAll('img.cropitem').length;
        if (plots && store.get('crops.plots', 0) !== plots) store.set('crops.plots', plots); // for the Vat's pick
        const growing = page.querySelectorAll('img.cropitem:not(.harvest)').length;
        const planted = Math.min(Math.max(0, plots - growing), Number(o.dataset.amt) || 0);
        base = planted * seed[1];
        where = `${num(planted)} plot${planted === 1 ? '' : 's'}:`;
      }
      const gain = base * b.factor;
      const parts = [];
      if (opt('crops', 'estimate') && base) {
        parts.push(`${where} <span title="${esc(b.text || 'No perks or meals that add crops')}">about <b>${num(gain)} ${esc(name)}</b></span>`);
      }
      const grow = page.dataset.page === 'xfarm' && opt('crops', 'timers') ? growTime(seed) : null;
      if (grow) {
        parts.push(`<span title="${esc(speedText())}">${grow.secs ? `Grows in <b>${grow.text}</b>` : '<b>Grows instantly</b> (Breakfast Boost)'}</span>`);
      }
      if (opt('crops', 'counts') && have !== undefined) {
        parts.push(countHtml(seed[0]));
        const room = invState().cap ? Math.max(0, invState().cap - have) : Infinity;
        const waste = opt('crops', 'estimate') ? Math.max(0, gain - room) : 0;
        if (waste > 0) {
          parts.push(`<span class="frx-crop-warn ${waste >= gain / 2 ? 'is-most' : ''}"><i class="fa-solid fa-triangle-exclamation"></i> `
            + `about ${num(waste)} would go over your cap</span>`);
        }
      }
      if (isOn('mastery') && opt('mastery', 'seeds') && masteryInfo(seed[0])) parts.push(masteryHtml(seed[0]));
      const line = parts.join(' · ');
      const pick = page.dataset.page === 'grapejuicevat' && opt('crops', 'vatpick') ? vatPick(page, select) : '';
      return pick ? `${line}<div class="frx-crop-pick">${pick}</div>` : line;
    }
    function vatPick(page, select) {
      const o = select.options[select.selectedIndex];
      const chosen = o && seedOf(o);
      const left = Number((page.querySelector('#gj_left') || {}).textContent);
      const typed = Number((page.querySelector('#gjamt, .gjamt') || {}).value) || 0;
      const juices = Number.isFinite(left) ? Math.min(typed, left) : typed;
      const est = Number((page.querySelector('#estimated_crops') || {}).textContent) || 0;
      const cap = invState().cap;
      if (!chosen || !juices || !est || !cap) return '';
      const short = est / chosen[1] >= (Number(o.dataset.amt) || 0);
      const plots = short ? store.get('crops.plots', 0) : est / juices / chosen[1];
      if (!plots) return '';
      const factor = boost().factor;
      let best = null;
      for (const opt2 of select.options) {
        const seed = seedOf(opt2);
        const grow = seed && growTime(seed);
        const have = seed && invCount(seed[0]);
        if (!grow || have === undefined || (Number(opt2.dataset.amt) || 0) < plots * juices) continue;
        const gain = plots * juices * seed[1] * factor;
        if (have + gain > cap) continue;
        if (!best || seed[2] > best.seed[2]) best = { seed, grow, name: (opt2.dataset.frxText || opt2.textContent).replace(/\s*\(\d+\)$/, '') };
      }
      if (!best) return `<span class="frx-lead">Longest grow time that fits under your cap:</span> none for ${num(juices)} juice${juices === 1 ? '' : 's'}`;
      return `<span class="frx-lead">Longest grow time that fits under your cap:</span> <b>${esc(best.name)}</b> (${best.grow.text})`;
    }
    function enhance(page) {
      const select = page.querySelector('select.seedid');
      if (!select) return;
      if (!page.frxCrops) {
        page.frxCrops = true;
        select.addEventListener('change', () => refresh(page));
        const gj = page.querySelector('#gjamt, .gjamt');
        if (gj) gj.addEventListener('input', () => setTimeout(() => refresh(page), 50)); // after the game updates its estimate
      }
      invForPage(page, page.dataset.page === 'grapejuicevat' ? 'Grape Juice Vat opened' : 'farm opened');
      const said = page.textContent.match(/([\d,]+)\s+([A-Z][\w' -]*?)\s+in inventory/);
      if (said && ITEM_BY_NAME[said[2]] && page.frxSaid !== said[0]) {
        page.frxSaid = said[0];
        setCount(String(ITEM_BY_NAME[said[2]]), Number(said[1].replace(/,/g, '')));
      }
      refresh(page);
    }
    function refresh(page) {
      const select = page.querySelector('select.seedid');
      if (!select) return;
      sortOptions(select);
      sortControl(select);
      if (opt('crops', 'counts') || opt('crops', 'timers')) markOptions(select);
      let box = page.querySelector('.frx-crop-info');
      if (!box) {
        box = document.createElement('div');
        box.className = 'frx-crop-info';
        const anchor = page.dataset.page === 'grapejuicevat'
          ? (page.querySelector('#estimated_crops') || select).closest('div[style*="dashed"]') || select.closest('.list-block')
          : select.closest('.list-block');
        (anchor || select).after(box);
      }
      const html = infoFor(page, select);
      if (box.frxHtml !== html) { box.frxHtml = html; box.innerHTML = html; } // stays in place, even when empty
    }
    const refreshAll = () => ['xfarm', 'grapejuicevat'].forEach((n) => pages(n).forEach(refresh));
    feature({
      id: 'crops',
      name: 'Crop Amounts',
      description: 'On the farm and the Grape Juice Vat, a line under the seed menu: about how many the planting gives with your perks and meals, how long it takes to grow with your perks (farm), how many you have against your cap (warning when some would go over it), and the crop\'s mastery. The seed list shows how many of each crop you have, red at your cap, and each crop\'s grow time. At the Vat, the crop with the longest grow time that fits under your cap. The seed list can be sorted by grow time or by seeds left (the icon by "Selected Seeds", or here).',
      options: [
        { key: 'counts', label: 'How many you have (in the seed list and on the line, red at your cap)' },
        { key: 'estimate', label: 'What the planting gives, and the over-the-cap warning' },
        { key: 'timers', label: 'Grow times with your perks (in the seed list, and on the farm\'s line)' },
        { key: 'vatpick', label: 'Grape Juice Vat: the longest grow time that fits under your cap' },
        { key: 'sort', label: 'Seed list order (farm and Grape Juice Vat, also the icon by "Selected Seeds"):', choices: SORTS, default: 'game' },
      ],
      css: `
        select.seedid.frx-crop-faced { color: transparent !important; }
        select.seedid.frx-crop-faced option { color: var(--frx-face); }
        select.seedid option.frx-crop-max { color: var(--frx-bad); }
        .frx-crop-face { position: absolute; box-sizing: border-box; overflow: hidden; white-space: nowrap;
          text-overflow: ellipsis; pointer-events: none; }
        .frx-crop-face.is-max { color: var(--frx-bad) !important; }
        .frx-crop-info { margin: 6px 15px 10px; min-height: 1.45em; font-size: 14px; line-height: 1.45; color: var(--frx-text); text-align: left; }
        .frx-crop-warn { color: var(--frx-warn); font-weight: bold; }
        .frx-crop-pick { margin-top: 2px; }
        .frx-crop-warn.is-most { color: var(--frx-bad); }
        .frx-crop-sort { position: relative; display: inline-block; margin-left: 6px; padding: 0 2px; color: var(--frx-link); }
        .frx-crop-sort select { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer; }
      `,
      init() {
        document.addEventListener('click', (e) => {
          if (!e.target.closest) return;
          const harvest = e.target.closest('.page[data-page="xfarm"] .harvestallbtn, .page[data-page="xfarm"] img.cropitem.harvest');
          if (harvest) noteHarvest(harvest);
          const go = e.target.closest('.page[data-page="grapejuicevat"] .grapejuicevatbtn');
          if (go) noteVat(go.closest('.page'));
        }, true);
        onEffectsChange(refreshAll); // a cookie started or ran out
        let resizeTimer = 0;
        window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(refreshAll, 100); });
        onPerksChange(refreshAll);
        onInventoryChange(refreshAll);
        onMasteryChange(refreshAll); // the seed line's mastery (e.g. read again on an item's page)
      },
      scan() {
        ['xfarm', 'grapejuicevat'].forEach((n) => pages(n).forEach(enhance));
      },
    });
  })();
  (() => {
    const range = (a, b) => (a === b ? num(a) : `${num(a)}–${num(b)}`);
    const idOf = (li) => {
      const a = li.querySelector('a[href*="item.php?id="]');
      return a ? Number(new URLSearchParams(a.getAttribute('href').split('?')[1]).get('id')) : 0;
    };
    const priceOf = (li) => Number((li.querySelector('.qty[data-price]') || { dataset: {} }).dataset.price) || 0;
    function sections(page) {
      return [...page.querySelectorAll('.content-block-title')].map((title) => {
        const lists = [];
        for (let n = title.nextElementSibling; n && !n.classList.contains('content-block-title'); n = n.nextElementSibling) {
          n.querySelectorAll('ul').forEach((ul) => lists.push(ul));
        }
        return { title, lists };
      });
    }
    const rowsOf = (ul) => [...ul.children].filter((li) => li.tagName === 'LI' && idOf(li));
    function addLine(li, cls, html) {
      const at = li.querySelector('.item-title');
      if (!at) return;
      let el = li.querySelector(`.${cls}`);
      if (!el) {
        el = document.createElement('div');
        el.className = `frx-fm-line ${cls}`;
        const mine = at.querySelectorAll('.frx-fm-line');
        const br = at.querySelector('strong + br');
        if (mine.length) mine[mine.length - 1].after(el); else if (br) br.after(el); else at.appendChild(el);
      }
      if (el.innerHTML !== html) el.innerHTML = html;
    }
    const qtyOf = (li) => parseInt((li.querySelector('input.qty') || {}).value, 10) || 0;
    const ownedText = (id, li) => countHtml(id, qtyOf(li));
    function rowLine(li) {
      const id = idOf(li);
      const parts = [];
      const mode = li.dataset.frxFm;
      if (mode === 'shop' ? opt('flea', 'shops') : opt('flea', 'owned') && mode !== 'gold') parts.push(ownedText(id, li));
      if (li.dataset.frxFm === 'rotating' && opt('flea', 'rotating') && FLEA[id]) {
        const ways = FLEA[id][1];
        const dir = li.dataset.frxFmMoved;
        const up = dir ? `<i class="fa-solid fa-arrow-${dir} frx-fm-moved" title="Moved ${dir} by the Toolkit: ${dir === 'up' ? 'harder' : 'easier'} to get elsewhere"></i> ` : '';
        parts.push(up + (ways.length ? `<span class="frx-lead">Also from:</span> ${waysText(ways)}` : 'Not found anywhere else'));
      }
      const html = parts.filter(Boolean).join(' · ');
      if (html) addLine(li, 'frx-fm-info', html); else li.querySelectorAll('.frx-fm-info').forEach((el) => el.remove());
    }
    function movedRows(sorted) {
      const at = sorted.map((li) => Number(li.dataset.frxFmAt));
      const len = at.map(() => 1);
      const prev = at.map(() => -1);
      for (let i = 0; i < at.length; i++) {
        for (let j = 0; j < i; j++) if (at[j] < at[i] && len[j] + 1 > len[i]) { len[i] = len[j] + 1; prev[i] = j; }
      }
      const keep = new Set();
      for (let i = len.indexOf(Math.max(0, ...len)); i >= 0; i = prev[i]) keep.add(i);
      const out = new Map();
      sorted.forEach((li, i) => { if (!keep.has(i)) out.set(li, i < at[i] ? 'up' : 'down'); });
      return out;
    }
    function bundleBox(id, prices, cost) {
      let here = 0;
      let notHere = 0;
      const chips = BUNDLES[id].map(([iid, a, b]) => {
        const it = item(iid);
        if (prices[iid]) here += prices[iid] * (a + b) / 2; else notHere += 1;
        return `<span class="frx-chip"><img src="${esc((it && it.img) || '')}" alt="">${range(a, b)} ${esc(it ? it.name : `Item ${iid}`)}</span>`;
      });
      const extra = notHere ? `, plus ${notHere} thing${notHere > 1 ? 's' : ''} this shop doesn't sell` : '';
      const worth = here ? `Bought one by one here: about <b>${num(here)} Gold</b>${extra}${cost ? `. The bundle costs ${num(cost)}` : ''}.` : '';
      return `<span class="frx-lead">Inside:</span> ${chips.join('')}${worth ? `<div class="frx-fm-worth">${worth}</div>` : ''}`;
    }
    const PERKS = ['Eagle Eye', 'Iron Depot', 'Lemon Squeezer', 'Reinforced Netting', 'Fishing Trawl'];
    const oddsPerks = () => Object.fromEntries(PERKS.map((p) => [p, hasPerk(p)]));
    const apItems = (p) => (p['Lemon Squeezer'] ? 500 : 200);
    const netFish = (p) => 250 + (p['Reinforced Netting'] ? 150 : 0) + (p['Fishing Trawl'] ? 100 : 0);
    const perUse = (n, t, one, many) => (t >= n
      ? `${(t / n) >= 10 ? num(t / n) : (t / n).toFixed(1).replace(/\.0$/, '')} per ${one}`
      : `1 per ${num(n / t)} ${many}`);
    function waysText(ways) {
      const p = oddsPerks();
      const slot = 2 + (p['Iron Depot'] ? 1 : 0) + (p['Eagle Eye'] ? 2 : 0);
      return ways.map((w) => {
        if (typeof w === 'string') return esc(w);
        const n = w[slot];
        const fishing = w[0] === 'caught at';
        const use = !opt('flea', 'peruse') ? '' : fishing ? perUse(n, netFish(p), 'Large Net', 'Large Nets')
          : w[6] ? perUse(n, apItems(p) / w[6], 'AP', 'APs') : '';
        return `${placeLink(w[1])} (${use || `1 in ${num(n)} ${fishing ? 'catches' : 'explores'}`})`;
      }).join(', ');
    }
    function oddsNote(title, on) {
      let el = title.nextElementSibling;
      if (!el || !el.classList.contains('frx-fm-note')) el = null;
      if (!on) { if (el) el.remove(); return; }
      if (!el) {
        el = document.createElement('div');
        el.className = 'frx-note frx-fm-note';
        title.after(el);
      }
      const p = oddsPerks();
      const used = PERKS.filter((n) => p[n]);
      const and = (a) => (a.length > 1 ? `${a.slice(0, -1).join(', ')} and ${a[a.length - 1]}` : a[0]);
      const perks = PERKS.some((n) => p[n] === null)
        ? ' Open your <a href="perks.php" class="frx-link">Perks</a> and <a href="supply.php" class="frx-link">Farm Supply</a> once so your perks are counted.'
        : used.length ? ` Counting your ${and(used)}.` : '';
      const moved = ' Hardest to get elsewhere first; <i class="fa-solid fa-arrow-up frx-fm-moved"></i> or <i class="fa-solid fa-arrow-down frx-fm-moved"></i> marks a row moved from the game\'s order.';
      const html = opt('flea', 'peruse')
        ? `<span class="frx-tag">Toolkit</span>${moved} Odds from Buddy's Almanac (averages), per AP or Large Net.${perks} Quandary Chowder (+10%), Lemon Seltzer (+50%) and Sea Pincher Special (+10%) give more while they last.`
        : `<span class="frx-tag">Toolkit</span>${moved} Odds from Buddy's Almanac (averages), per catch or explore.${perks}`;
      if (el.innerHTML !== html) el.innerHTML = html;
    }
    function enhance(page) {
      const all = sections(page);
      const prices = {};
      for (const s of all) for (const ul of s.lists) for (const li of rowsOf(ul)) if (priceOf(li)) prices[idOf(li)] = priceOf(li);
      const sig = `${Object.entries(prices).join(',')}|${invState().at}|${Object.keys(invState().counts).length}|${JSON.stringify(oddsPerks())}`;
      if (page.frxFmSig === sig) return;
      page.frxFmSig = sig;
      for (const s of all) {
        const rotating = /Current Items/i.test(s.title.textContent);
        const golds = /Gold Items/i.test(s.title.textContent);
        if (rotating) oddsNote(s.title, opt('flea', 'rotating'));
        for (const ul of s.lists) {
          const rows = rowsOf(ul);
          rows.forEach((li, i) => { if (li.dataset.frxFmAt === undefined) li.dataset.frxFmAt = i; });
          const sorted = rotating && opt('flea', 'rotating')
            ? [...rows].sort((a, b) => a.dataset.frxFmAt - b.dataset.frxFmAt)
              .sort((a, b) => (FLEA[idOf(b)] ? FLEA[idOf(b)][0] : 1) - (FLEA[idOf(a)] ? FLEA[idOf(a)][0] : 1))
            : null;
          const moved = sorted ? movedRows(sorted) : new Map();
          for (const li of rows) {
            if (moved.has(li)) li.dataset.frxFmMoved = moved.get(li); else delete li.dataset.frxFmMoved;
            const id = idOf(li);
            li.dataset.frxFm = rotating ? 'rotating' : golds ? 'gold' : 'always';
            rowLine(li);
            if (BUNDLES[id] && opt('flea', 'bundles')) {
              addLine(li, 'frx-fm-bundle', bundleBox(id, prices, priceOf(li)));
              li.classList.add('frx-fm-is-bundle');
            }
          }
          let order = null;
          if (sorted) {
            order = sorted;
          } else if (opt('flea', 'bundles') && rows.some((li) => BUNDLES[idOf(li)])) {
            order = [...rows].sort((a, b) => (BUNDLES[idOf(b)] ? 1 : 0) - (BUNDLES[idOf(a)] ? 1 : 0));
          }
          if (order && order.some((li, i) => li !== rows[i])) {
            const anchor = rows[rows.length - 1].nextSibling;
            for (const li of order) ul.insertBefore(li, anchor);
          }
        }
      }
    }
    const SHOP_PAGES = ['tent', 'bmerc'];
    function enhanceShop(page) {
      for (const li of page.querySelectorAll('li')) {
        const strong = li.querySelector('.item-title strong[data-inv]');
        if (!strong || !li.querySelector('input.qty') || !idOf(li)) continue;
        setCount(String(idOf(li)), Number(strong.dataset.inv));
        li.dataset.frxFm = 'shop';
        rowLine(li);
      }
    }
    feature({
      id: 'flea',
      name: 'Flea Market',
      description: 'Bundles go to the top with what\'s inside and what that would cost bought one by one. The hourly items say where else they come from, hardest to get elsewhere first (an arrow marks a row moved from the game\'s order), with drop odds per AP or Large Net for your perks. Each row shows how many you have, and once you change the amount, how many you\'d have after buying it; Borgen\'s Camp and Borgen Mercantile show the same counts. It never buys anything.',
      options: [
        { key: 'bundles', label: 'Bundles first, with what\'s inside' },
        { key: 'rotating', label: 'Hourly items: how else to get them, hardest first' },
        { key: 'peruse', label: 'Odds per AP and per Large Net, with your perks (off: per catch or explore)' },
        { key: 'owned', label: 'How many of each you have (and after buying, once you change the amount)' },
        { key: 'shops', label: 'The same counts at Borgen\'s Camp and Borgen Mercantile' },
      ],
      css: `
        .frx-fm-line { margin: 3px 0 2px; font-size: 13px; font-weight: normal; line-height: 1.6; color: var(--frx-text); white-space: normal; }
        .frx-fm-worth { margin-top: 2px; color: var(--frx-text); }
        .frx-fm-note { margin-top: -4px; }
        .frx-fm-moved { font-size: 12px; color: var(--frx-text); }
      `,
      init() {
        const redo = () => {
          pages('flea').forEach((p) => { p.frxFmSig = ''; enhance(p); });
          if (opt('flea', 'shops')) SHOP_PAGES.forEach((n) => pages(n).forEach(enhanceShop));
        };
        onInventoryChange(redo);
        onPerksChange(redo);
        const refreshRow = (e) => {
          const li = e.target.closest && e.target.closest('.page[data-page="flea"] li[data-frx-fm], .page[data-page="tent"] li[data-frx-fm], .page[data-page="bmerc"] li[data-frx-fm]');
          if (li && featureOn(this)) requestAnimationFrame(() => keepScroll(() => rowLine(li)));
        };
        document.addEventListener('click', refreshRow, true);
        document.addEventListener('input', refreshRow, true);
      },
      scan() {
        pages('flea').forEach((p) => {
          if (opt('flea', 'owned')) invForPage(p, 'Flea Market opened');
          enhance(p);
        });
        if (opt('flea', 'shops')) SHOP_PAGES.forEach((n) => pages(n).forEach(enhanceShop));
      },
    });
  })();
  (() => {
    const toNum = (s) => Number(String(s).replace(/[^\d]/g, '')) || 0;
    const tiersSaved = () => store.get('temple.tiers', {});
    function readChain(page) {
      const big = page.querySelector('#img span[style*="26px"]');
      const done = big ? toNum(big.textContent) : NaN;
      const title = page.querySelector('.content-block-title.sacrifice-rewards');
      const card = title && title.nextElementSibling;
      const tiers = card ? [...card.querySelectorAll('.card-content-inner > .row > .col-30')]
        .map((c) => toNum((c.querySelector('span') || c).textContent)).filter((n) => n > 0) : [];
      const id = (page.f7PageData && page.f7PageData.query && page.f7PageData.query.id)
        || new URLSearchParams(((page.f7PageData && page.f7PageData.url) || '').split('?')[1] || '').get('id');
      return { id, done, tiers };
    }
    function chainPage(page) {
      const input = page.querySelector('input.itemamt');
      const { id, done, tiers } = readChain(page);
      if (id && tiers.length) {
        const all = tiersSaved();
        if (JSON.stringify(all[id]) !== JSON.stringify(tiers)) { all[id] = tiers; store.set('temple.tiers', all); }
      }
      if (!input || !opt('temple', 'fill') || Number.isNaN(done) || !tiers.length) return;
      const option = page.querySelector('select.loadid option[selected], select.loadid option[data-amt]');
      const have = option ? toNum(option.dataset.amt) : toNum(input.getAttribute('value'));
      const last = tiers[tiers.length - 1];
      const next = tiers.find((t) => t > done);
      const sig = `${done}:${have}:${tiers.join(',')}`;
      let box = page.querySelector('.frx-tp-fill');
      if (box && box.frxSig === sig) return;
      if (!box) {
        box = document.createElement('div');
        box.className = 'frx-tp-fill';
        input.closest('.list-block').after(box);
        box.addEventListener('click', (e) => {
          const b = e.target.closest('[data-frx-amt]');
          if (!b) return;
          input.value = b.dataset.frxAmt;
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.dispatchEvent(new Event('change', { bubbles: true }));
          preview();
        });
        input.addEventListener('input', () => preview());
      }
      box.frxSig = sig;
      const btn = (n, label) => (n > 0 ? `<a href="javascript:;" class="button frx-tp-btn" data-frx-amt="${n}">${label} (${num(n)})</a>` : '');
      const toNext = next - done;
      const toEnd = last - done;
      const btns = done >= last ? '' : [
        toNext <= have ? btn(toNext, 'Next reward') : '',
        toEnd <= have && toEnd !== toNext ? btn(toEnd, 'Finish') : '',
        have < toEnd && have !== toNext ? btn(have, 'All you have') : '',
      ].filter(Boolean).join('');
      box.innerHTML = `<div class="frx-tp-head"><span class="frx-tag">Toolkit</span> ${done >= last ? 'This chain is finished.'
        : `Fill in the amount: ${btns || 'you have none to sacrifice.'}`}</div><div class="frx-tp-preview"></div>`;
      function preview() {
        const el = box.querySelector('.frx-tp-preview');
        const n = toNum(input.value);
        const use = Math.min(n, last - done);
        const reached = tiers.filter((t) => t > done && t <= done + use);
        const over = n > use ? `${num(n)} is more than the ${num(use)} this chain still needs. ` : '';
        el.textContent = !n || done >= last ? ''
          : reached.length ? `${over}Sacrificing ${num(use)} reaches ${reached.length === 1 ? 'the reward' : `${reached.length} rewards`} at ${reached.map(num).join(', ')}. Press GO to sacrifice.`
            : `Sacrificing ${num(n)} doesn't reach a reward yet (next at ${num(next)}, ${num(next - done - n)} more).`;
      }
      preview();
    }
    function rowInfo(li) {
      const a = li.querySelector('a[href*="templeitem.php?id="]');
      const text = li.textContent.replace(/\s+/g, ' ');
      const items = text.match(/([\d,]+)\s*\/\s*([\d,]+)\s*Items Sacrificed/i);
      if (!a || !items) return null;
      const claimed = text.match(/([\d,]+)\s*\/\s*([\d,]+)\s*Rewards Claimed/i);
      const id = new URLSearchParams(a.getAttribute('href').split('?')[1]).get('id');
      const secretHave = text.match(/Sacrifice:\s*(.+?)\s*\(You have ([\d,]+)\)/i);
      const sac = secretHave ? secretHave[1] : (text.match(/Sacrifice:\s*(.+?)\s*[\d,]+\s*\/\s*[\d,]+\s*Rewards/i) || [])[1] || '';
      const reward = (text.match(/^\s*(.+?)\s*Sacrifice:/i) || [])[1] || '';
      const done = toNum(items[1]);
      const total = toNum(items[2]);
      const tiers = tiersSaved()[id];
      const ready = tiers && claimed ? Math.max(0, tiers.filter((t) => t <= done).length - toNum(claimed[1])) : 0;
      const have = secretHave ? toNum(secretHave[2]) : sac ? invCountByName(sac) : undefined;
      const goal = isOn('goals') ? goalOf(ITEM_BY_NAME[reward]) : null;
      const secret = /^Certificate of .+ Giving$/i.test(reward);
      return { li, id, sac, done, total, tiers, ready, have, goal, secret, finished: done >= total, canFinish: have !== undefined && have >= total - done };
    }
    function listLine(r) {
      if (r.finished) return r.ready ? `<span class="frx-tp-ready">${r.ready === 1 ? 'A reward' : `${r.ready} rewards`} ready to claim</span>` : '';
      const left = r.total - r.done;
      const parts = [];
      if (r.goal && r.goal.part) parts.push(`<span class="frx-goal-tag">${esc(r.goal.goal.name)}</span>`);
      if (r.ready) parts.push(`<span class="frx-tp-ready">${r.ready === 1 ? 'A reward' : `${r.ready} rewards`} ready to claim</span>`);
      parts.push(r.have === undefined ? `${num(left)} to finish`
        : `<span class="${r.canFinish ? 'frx-tp-can' : ''}">${num(r.have)} / ${num(left)}</span> to finish`);
      const next = r.tiers && r.tiers.find((t) => t > r.done);
      if (next && next < r.total) parts.push(`next reward in ${num(next - r.done)}`);
      return parts.join(' · ');
    }
    function templeList(page) {
      const rows = [...page.querySelectorAll('li')].map(rowInfo).filter(Boolean);
      const sig = `${rows.map((r) => `${r.id}:${r.done}:${r.have}:${r.ready}`).join(',')}|${opt('temple', 'sort')}`;
      if (page.frxTpSig === sig) return;
      page.frxTpSig = sig;
      for (const r of rows) {
        let el = r.li.querySelector('.frx-tp-line');
        const html = opt('temple', 'lines') ? listLine(r) : '';
        r.li.classList.toggle('frx-tp-finished', r.finished && !r.ready); // finished: faded (also with no line)
        if (!html) { if (el) el.remove(); continue; }
        if (!el) {
          el = document.createElement('div');
          el.className = 'frx-tp-line';
          r.li.querySelector('.item-title').appendChild(el);
        }
        el.innerHTML = html;
      }
      if (opt('temple', 'sort')) {
        const rank = (r) => (r.ready ? 0 : r.finished ? 3 : r.canFinish ? 1 : 2);
        const byList = new Map();
        for (const r of rows) {
          const ul = r.li.parentElement;
          if (!byList.has(ul)) byList.set(ul, []);
          byList.get(ul).push(r);
        }
        for (const [ul, list] of byList) {
          const order = [...list].sort((a, b) => rank(a) - rank(b) || (b.done / b.total) - (a.done / a.total));
          if (order.every((r, i) => r === list[i])) continue;
          const anchor = list[list.length - 1].li.nextSibling;
          for (const r of order) ul.insertBefore(r.li, anchor);
        }
      }
      page.querySelectorAll('.frx-tp-summary').forEach((el) => el.remove());
      const secret = rows.filter((r) => r.secret);
      const secretTitle = [...page.querySelectorAll('.content-block-title')].find((t) => /^\s*Secret Chains\s*$/i.test(t.textContent));
      if (opt('temple', 'summary') && secret.length && secretTitle) {
        const doneN = secret.filter((r) => r.finished).length;
        const togo = secret.reduce((n, r) => n + Math.max(0, r.total - r.done), 0);
        const can = secret.filter((r) => !r.finished && r.canFinish).length;
        const bits = [`<b>${doneN} / ${secret.length}</b> certificates`];
        if (togo) bits.push(`<b>${num(togo)}</b> crops to go`);
        if (can) bits.push(`<span class="frx-tp-can">${can} you can finish</span>`);
        secretTitle.insertAdjacentHTML('beforebegin', `<div class="frx-card frx-tp-summary"><span class="frx-tag">Toolkit</span> ${bits.join(' · ')}`
          + '<div class="frx-sub">Finishing 20 earns the Certified Farmer badge.</div></div>');
      }
      const live = rows.filter((r) => !r.secret && (!r.finished || r.ready));
      const first = page.querySelector('.content-block-title');
      if (opt('temple', 'summary') && live.length && first) {
        const ready = live.filter((r) => r.ready).length;
        const can = live.filter((r) => !r.finished && r.canFinish).length;
        const unseen = live.filter((r) => !r.finished && !r.tiers).length;
        const bits = [`${live.length} chain${live.length > 1 ? 's' : ''} in progress`];
        if (ready) bits.push(`<span class="frx-tp-ready">${ready} with rewards ready to claim</span>`);
        if (can) bits.push(`<span class="frx-tp-can">${can} you can finish</span>`);
        first.insertAdjacentHTML('beforebegin', `<div class="frx-card frx-tp-summary"><span class="frx-tag">Toolkit</span> ${bits.join(' · ')}`
          + `${unseen ? `<div class="frx-sub">Open a chain once and its reward steps show here (${unseen} not seen yet).</div>` : ''}`
          + `${!invState().at ? '<div class="frx-sub">Reading your inventory… (or <a href="inventory.php" class="frx-link">open it</a>)</div>' : ''}</div>`);
      }
    }
    feature({
      id: 'temple',
      name: 'Temple Helper',
      description: 'On the Temple of Reward, each chain says how many to finish, how many you have and its next reward, with ready and finishable chains first; the Secret Chains also say how many certificates are done and how many crops to go. On a chain\'s page, buttons fill in the amount (next reward, finish, all you have); you still press GO.',
      options: [
        { key: 'lines', label: 'A line under each chain' },
        { key: 'sort', label: 'Ready and finishable chains first' },
        { key: 'summary', label: 'A summary at the top' },
        { key: 'fill', label: 'Amount buttons on a chain\'s page' },
      ],
      css: `
        .frx-tp-line { margin-top: 3px; font-size: 13px; font-weight: normal; line-height: 1.5; color: var(--frx-text); white-space: normal; }
        .frx-tp-ready { color: var(--frx-warn); font-weight: bold; }
        .frx-tp-can { color: var(--frx-good); font-weight: bold; }
        li.frx-tp-finished { opacity: .6; }
        .frx-tp-fill { margin: 0 15px 10px; font-size: 14px; color: var(--frx-text); }
        .frx-tp-head { line-height: 2.4; }
        .frx-tp-btn { display: inline-block; margin: 0 6px 4px 0; padding: 0 10px; height: auto; line-height: 28px; font-size: 13px; }
        .frx-tp-preview { font-size: 13px; color: var(--frx-text); } /* which rewards an amount reaches */
      `,
      init() {
        onInventoryChange(() => pages('temple').forEach((p) => { p.frxTpSig = ''; templeList(p); }));
      },
      scan() {
        pages('temple').forEach((p) => {
          if (opt('temple', 'lines') || opt('temple', 'summary') || opt('temple', 'sort')) invForPage(p, 'Temple opened');
          templeList(p);
        });
        pages('templeitem').forEach(chainPage);
      },
    });
  })();
  (() => {
    const ago = () => new Date(masteryState().at).toLocaleString([], { weekday: 'short', hour: 'numeric', minute: '2-digit' });
    const note = (why) => (masteryState().at
      ? `Mastery page seen ${esc(ago())}${why ? `; ${why}` : ''}. <a href="mastery.php" class="frx-link">Open Mastery</a> to update the counts.`
      : '<a href="mastery.php" class="frx-link">Open Mastery</a> once to see your mastery counts here.');
    function noteBox(page, before, why = '') {
      let el = page.querySelector('.frx-ms-note');
      if (!before) { if (el) el.remove(); return; }
      if (!el) {
        el = document.createElement('div');
        el.className = 'frx-note frx-ms-note';
        before.before(el);
      }
      const html = `<span class="frx-tag">Toolkit</span> ${note(why)}`;
      if (el.innerHTML !== html) el.innerHTML = html;
    }
    function workshop(page) {
      const sig = `${masteryState().at}:${Object.keys(masteryState().items).length}:${page.querySelectorAll('li[data-id]').length}`;
      if (page.frxMsSig === sig) return;
      page.frxMsSig = sig;
      let missing = false;
      for (const li of page.querySelectorAll('li[data-id]')) {
        const strong = li.querySelector('.item-title strong');
        if (!strong) continue;
        let el = li.querySelector('.frx-ms-line');
        const m = masteryInfo(li.dataset.id);
        if (!m) { missing = true; if (el) el.remove(); continue; }
        if (!el) {
          el = document.createElement('span');
          el.className = 'frx-ms-line';
          strong.appendChild(el);
        }
        const html = ` · ${masteryHtml(li.dataset.id)}`;
        if (el.innerHTML !== html) el.innerHTML = html;
      }
      noteBox(page, page.querySelector('.content-block-title'), missing ? 'crafts you haven\'t made yet show nothing' : '');
    }
    function recipe(page) {
      const title = titleBlock(page, /Crafting Recipe/i);
      const list = title && title.nextElementSibling && title.nextElementSibling.nextElementSibling;
      if (!list) return;
      const sig = `${masteryState().at}:${Object.keys(masteryState().items).length}`;
      if (page.frxMsRecipeSig === sig) return;
      page.frxMsRecipeSig = sig;
      let shown = 0;
      let rows = 0;
      for (const li of list.querySelectorAll('li')) {
        const a = li.querySelector('a[href*="item.php?id="]');
        const strong = li.querySelector('.item-title strong');
        if (!a || !strong) continue;
        rows += 1;
        const id = new URLSearchParams(a.getAttribute('href').split('?')[1]).get('id');
        let el = li.querySelector('.frx-ms-line');
        const html = masteryInfo(id) ? ` · ${masteryHtml(id)}` : '';
        if (!html) { if (el) el.remove(); continue; }
        shown += 1;
        if (!el) {
          el = document.createElement('span');
          el.className = 'frx-ms-line';
          strong.after(el);
          strong.parentElement.classList.add('frx-ms-wrap');
        }
        if (el.innerHTML !== html) el.innerHTML = html;
      }
      if (!masteryState().at || shown) noteBox(page, title, shown < rows ? 'ingredients with no mastery or none yet show nothing' : '');
      else noteBox(page, null);
    }
    function location(page) {
      const title = titleBlock(page, /Things found here/i);
      if (!title) return;
      const sig = `${masteryState().at}:${Object.keys(masteryState().items).length}`;
      if (page.frxMsSig === sig) return;
      page.frxMsSig = sig;
      let shown = 0;
      let cells = 0;
      for (const cell of page.querySelectorAll('[class*="col-"]')) {
        const a = cell.querySelector('a[href*="item.php?id="]');
        if (!a) continue;
        cells += 1;
        const id = new URLSearchParams(a.getAttribute('href').split('?')[1]).get('id');
        let el = cell.querySelector('.frx-ms-cell');
        const html = masteryHtml(id);
        if (!html) { if (el) el.remove(); continue; }
        shown += 1;
        if (!el) {
          el = document.createElement('div');
          el.className = 'frx-ms-cell';
          cell.appendChild(el);
        }
        el.innerHTML = html;
      }
      const fishing = /type=fishing/.test((page.f7PageData && page.f7PageData.url) || location.hash);
      if (masteryState().at && !shown) noteBox(page, null);
      else noteBox(page, title, shown < cells ? (fishing ? 'items with no mastery or none yet show nothing'
        : 'items with no mastery (many exploring finds) or none yet show nothing') : '');
    }
    feature({
      id: 'mastery',
      name: 'Mastery',
      description: 'Shows your mastery count against the next target ("3.1K / 10K", or "Mega Mastered 1.55M" once there\'s none), coloured by the game\'s own tier group (its name is in the tooltip), in the Workshop, under "Things found here" at fishing and exploring spots, for the crop on the farm, and for each ingredient in an item page\'s Crafting Recipe. Taken from the Mastery page and item pages when you open them (nothing is fetched); it says how old the counts are.',
      options: [
        { key: 'workshop', label: 'Workshop' },
        { key: 'location', label: 'Things found here' },
        { key: 'seeds', label: 'On the farm (the line under the seed menu)', needs: 'crops' },
        { key: 'recipe', label: 'An item page\'s Crafting Recipe (each ingredient)' },
      ],
      css: `
        .frx-ms-line { font-size: 14px; font-weight: normal; color: var(--frx-muted); white-space: nowrap; }
        .frx-ms-cell { font-size: 12px; line-height: 1.3; }
        .list-block .item-title.frx-ms-wrap { white-space: normal; }
        .list-block .item-title.frx-ms-wrap > strong { white-space: nowrap; }
        .frx-ms-wrap > .frx-ms-line { display: inline-block; }
      `,
      init() {
        onMasteryChange(() => {
          ['workshop', 'location', 'item'].forEach((n) => pages(n).forEach((p) => { p.frxMsSig = ''; p.frxMsRecipeSig = ''; }));
          this.scan();
        });
      },
      scan() {
        if (opt('mastery', 'workshop')) pages('workshop').forEach(workshop);
        if (opt('mastery', 'location')) pages('location').forEach(location);
        if (opt('mastery', 'recipe')) pages('item').forEach(recipe);
      },
    });
  })();
  (() => {
    const REWARD_FLOORS = [10, 25, 50, 100, 150, 200, 250, 300, 400, 500, 600, 700, 800, 900, 1000];
    const CHARMS = { 'Spring Cave': 1523, 'Highland Hollow': 1524, 'Sol Grotto': 1525, 'Ember Caverns': 1526,
      "Fenrir's Den": 1527, 'Mossrock Mine': 1528 };
    const nextFloor = (floor) => REWARD_FLOORS.find((f) => f > floor);
    const floors = () => store.get('mine.floors', {});
    function saveFloor(id, floor) {
      const all = floors();
      if (id && all[id] !== floor) store.set('mine.floors', { ...all, [id]: floor });
    }
    const nextHtml = (floor, left = true) => {
      const next = nextFloor(floor);
      if (!next) return '';
      return `Next rewards at <b class="frx-nw">${num(next)} Floors</b>${left ? ` <span class="frx-nw">(<b>${num(next - floor)}</b> left)</span>` : ''}`;
    };
    function mineList(page) {
      const showCharms = opt('mining', 'charms');
      if (showCharms) invForPage(page, 'Mines opened'); // Charms Active are inventory counts
      for (const li of page.querySelectorAll('.list-block li')) {
        const title = li.querySelector('.item-title');
        const after = li.querySelector('.item-after');
        const m = after && after.textContent.match(/Floor\s+([\d,]+)/i);
        if (!title || !m) continue;
        const floor = Number(m[1].replace(/,/g, ''));
        const name = title.firstChild && title.firstChild.textContent.trim();
        const a = li.querySelector('a[href*="mining.php?id="]');
        const id = a && new URLSearchParams(a.getAttribute('href').split('?')[1]).get('id');
        saveFloor(id, floor);
        const charms = showCharms && CHARMS[name] !== undefined ? invCount(CHARMS[name]) : undefined;
        const parts = [opt('mining', 'list') ? nextHtml(floor) : '',
          charms !== undefined ? `<span class="frx-nw"><b>${num(charms)}</b> Charms Active</span>` : ''].filter(Boolean);
        let el = li.querySelector('.frx-mine-line');
        if (!parts.length) { if (el) el.remove(); continue; }
        if (!el) {
          el = document.createElement('span');
          el.className = 'frx-mine-line';
          title.appendChild(el);
          title.classList.add('frx-mine-wrap');
        }
        const html = `<br>${parts.join(' · ')}`;
        if (el.innerHTML !== html) el.innerHTML = html;
      }
    }
    function rewardsLink(page) {
      const a = page.querySelector('a[href*="rewards.php?type=Mining"]');
      const after = a && a.querySelector('.item-after');
      if (!after) return;
      const id = new URLSearchParams(a.getAttribute('href').split('?')[1]).get('id');
      let floor;
      let left = true;
      if (page.dataset.page === 'mining') {
        const label = [...page.querySelectorAll('span')].find((s) => s.textContent.trim() === 'Current Floor');
        const strong = label && label.parentElement.querySelector('strong');
        floor = strong ? Number(strong.textContent.replace(/,/g, '')) : undefined;
        if (floor !== undefined && !Number.isNaN(floor)) saveFloor(id, floor);
      } else {
        floor = floors()[id]; // the location page doesn't show the floor: the one last seen, without "left"
        left = false;
      }
      let el = after.querySelector('.frx-mine-next');
      const html = floor === undefined || Number.isNaN(floor) ? '' : nextHtml(floor, left);
      if (!html) { if (el) el.remove(); return; }
      a.classList.add('frx-mine-link');
      if (!el) {
        el = document.createElement('span');
        el.className = 'frx-mine-next';
        after.appendChild(el);
      }
      if (el.innerHTML !== html) el.innerHTML = html;
    }
    feature({
      id: 'mining',
      name: 'Mining',
      description: 'On the Mines list, each mine\'s next floor rewards (and how many floors are left) and its Charms Active; on a mine and its location page, the "Mining Floor Rewards" link says where the next rewards are. Reward floors from the Library; charms from your inventory, read with the page.',
      options: [
        { key: 'list', label: 'Mines list: each mine\'s next rewards floor' },
        { key: 'charms', label: 'Mines list: each mine\'s Charms Active' },
        { key: 'link', label: 'A mine and its location page: next rewards on the "Mining Floor Rewards" link' },
      ],
      css: `
        .frx-mine-line { font-size: 12px; color: var(--frx-text); }
        .frx-mine-line .frx-nw, .frx-mine-next .frx-nw { white-space: nowrap; }
        .list-block .item-title.frx-mine-wrap { white-space: normal; }
        .frx-mine-next { font-size: 12px; color: var(--frx-text); white-space: nowrap; }
        /* The location page's link has a bigger title: on a phone the next rewards drop below it instead of overlapping. */
        .list-block a.frx-mine-link .item-inner { flex-wrap: wrap; column-gap: 8px; }
        .list-block a.frx-mine-link .item-after { margin-left: auto; }
      `,
      init() {
        onInventoryChange(() => pages('mine').forEach(mineList));
      },
      scan() {
        if (opt('mining', 'list') || opt('mining', 'charms')) pages('mine').forEach(mineList);
        if (opt('mining', 'link')) {
          pages('mining').forEach(rewardsLink);
          [...pages('location')].filter((p) => p.querySelector('a[href*="rewards.php?type=Mining"]')).forEach(rewardsLink);
        }
      },
    });
  })();
  (() => {
    const idIn = (el) => {
      const a = el && el.querySelector('a[href*="item.php?id="]');
      return a ? Number(new URLSearchParams(a.getAttribute('href').split('?')[1]).get('id')) : 0;
    };
    const pageId = (page) => Number(((page.f7PageData && page.f7PageData.query) || {}).id) || 0;
    const partLine = (p) => {
      if ((partHave(p) || 0) > 0) return '';
      const next = partNextHtml(p);
      return `${howHtml(p)}${next ? ` · ${next}` : ''}`;
    };
    function setLine(row, html) {
      let el = row.querySelector('.frx-goal-line');
      if (!html) { if (el) el.remove(); return; }
      if (!el) {
        el = document.createElement('div');
        el.className = 'frx-goal-line';
        const at = row.querySelector('.item-title');
        if (!at) return;
        const strong = at.querySelector('strong');
        const br = strong && strong.nextElementSibling && strong.nextElementSibling.tagName === 'BR' ? strong.nextElementSibling : null;
        if (br) br.after(el); else at.appendChild(el);
      }
      if (el.innerHTML !== html) el.innerHTML = html;
    }
    function setCard(page, before, html) {
      let el = page.querySelector('.frx-goal-card');
      if (!html || !before) { if (el) el.remove(); return; }
      if (!el) {
        el = document.createElement('div');
        el.className = 'frx-card frx-goal-card';
        before.before(el);
      }
      if (el.innerHTML !== html) el.innerHTML = html;
    }
    function goalPage(page, g) {
      const title = titleBlock(page, /Crafting Recipe/i);
      const head = `<span class="frx-tag">Toolkit</span> ${goalCountHtml(g) ? `<b>${goalCountHtml(g)}</b> · ` : ''}opens ${esc(g.opens)}.`;
      if (title) {
        const list = title.nextElementSibling && title.nextElementSibling.nextElementSibling;
        for (const li of (list ? list.querySelectorAll('li') : [])) {
          const p = g.parts.find((x) => x.id === idIn(li));
          if (p) setLine(li, partLine(p));
        }
        setCard(page, title, `${head}<div class="frx-goal-next">${esc(g.finish)}</div>`
          + '<div class="frx-sub">Under each part you don\'t have yet: where it comes from and your next step.</div>');
        return;
      }
      const rows = g.parts.map((p) => {
        const it = item(p.id);
        const have = (partHave(p) || 0) > 0;
        return `<div class="frx-goal-part${have ? ' is-have' : ''}">${it && it.img ? `<img src="${esc(it.img)}" alt="">` : ''}<b>${esc(it ? it.name : `Item ${p.id}`)}</b>`
          + `${have ? ' · you have it' : ` · ${partLine(p)}`}</div>`;
      }).join('');
      const about = titleBlock(page, /Item Details/i) || page.querySelector('.content-block-title');
      setCard(page, about, `${head}${rows}<div class="frx-goal-next">${esc(g.finish)}</div>`);
    }
    function partPage(page, g, p) {
      const have = (partHave(p) || 0) > 0;
      const count = goalCountHtml(g);
      const lead = g.item
        ? `Part of the <a href="item.php?id=${g.item}" class="frx-link">${esc(g.name)}</a>${count ? ` (<b>${count}</b>)` : ''}, which opens ${esc(g.opens)}.`
        : `This opens ${esc(g.opens)}.`;
      const html = `<span class="frx-tag">Toolkit</span> ${lead}<div class="frx-goal-next">${have ? 'You have it.' : partLine(p)}</div>`;
      setCard(page, titleBlock(page, /Item Details/i) || page.querySelector('.content-block-title'), html);
    }
    function itemPages() {
      for (const page of pages('item')) {
        if (page.classList.contains('page-on-left')) continue;
        const hit = goalOf(pageId(page));
        if (!hit) continue;
        invForPage(page, `${hit.goal.name} item page opened`);
        if (!hit.part && opt('goals', 'goalpage')) goalPage(page, hit.goal);
        if (hit.part && opt('goals', 'partpage')) partPage(page, hit.goal, hit.part);
      }
    }
    const SHOPS = ['bmerc', 'tent', 'flea'];
    function shopPages() {
      for (const name of SHOPS) {
        for (const page of pages(name)) {
          const ids = [...new Set([...page.querySelectorAll('li')].map(idIn).filter(Boolean))].sort((a, b) => a - b);
          if (ids.length) noteShop(name, ids);
          if (name === 'tent') {
            const t = page.textContent.replace(/\s+/g, ' ');
            const rate = (t.match(/Every ([\d,]+) Ancient Coins you spend/i) || [])[1];
            const prog = (t.match(/Progress:\s*([\d,]+)\s*\/\s*([\d,]+)/i) || [])[1];
            if (rate) noteBucks(Number(rate.replace(/,/g, '')), prog ? Number(prog.replace(/,/g, '')) : null);
          }
          if (!opt('goals', 'shops')) continue;
          let any = false;
          for (const li of page.querySelectorAll('li')) {
            const hit = goalOf(idIn(li));
            if (!hit || !hit.part) continue;
            any = true;
            const count = goalCountHtml(hit.goal);
            setLine(li, `<span class="frx-goal-tag">${esc(hit.goal.name)}</span>${count ? ` · ${count}` : ''} · opens ${esc(hit.goal.opens)}`);
          }
          if (any) invForPage(page, `${name} opened`);
        }
      }
    }
    function town() {
      for (const page of pages('town')) {
        for (const g of GOALS.filter((x) => x.place)) {
          const a = [...page.querySelectorAll('a[href*="wiki.php?page="]')].find((x) => (x.querySelector('.item-title') || x).textContent.trim().startsWith(g.place));
          const li = a && a.closest('li');
          if (!li) continue;
          const first = g.parts.find((p) => !((partHave(p) || 0) > 0));
          setLine(li, first ? `<span class="frx-goal-tag">Locked</span> · ${partLine(first)}` : '');
        }
      }
    }
    feature({
      id: 'goals',
      name: 'Unlock Goals',
      description: 'Account unlocks (the Swamp Puzzle\'s 15 pieces for the Sinking Swamp, the Cursed Effigy for the Temple\'s Secret Chains, House of Cards, Gary\'s Crushroom): where each part comes from, links to where you get it, and your next step with your progress (which quest of a questline you\'re on, whether a shop has it this week, what has to be unlocked first), on their item pages, in shops and in Town, from the game\'s Library.',
      options: [
        { key: 'steps', label: 'Full next steps: your progress, which quest you\'re on, shop stock, what to unlock first (off: just where each part comes from, with links)' },
        { key: 'goalpage', label: 'On the goal\'s item page (e.g. Swamp Puzzle): each part\'s source and your next step' },
        { key: 'partpage', label: 'On a part\'s item page (e.g. Piece 04)' },
        { key: 'shops', label: 'In shops (Borgen Mercantile, Borgen\'s Camp, Flea Market)' },
        { key: 'town', label: 'In Town: what opens a place that\'s still locked (e.g. House of Cards)' },
      ],
      css: `
        .frx-goal-line { margin: 2px 0; font-size: 13px; font-weight: normal; line-height: 1.45; color: var(--frx-text); white-space: normal; }
        .frx-goal-next { margin-top: 6px; font-size: 14px; line-height: 1.45; color: var(--frx-text); }
        .frx-goal-tag { font-weight: bold; color: var(--frx-gold); }
        .frx-goal-ok { color: var(--frx-good); font-weight: bold; }
        .frx-goal-part { margin: 6px 0 0; font-size: 13px; line-height: 1.45; }
        .frx-goal-part img { width: 22px; height: 22px; vertical-align: middle; margin-right: 6px; }
        .frx-goal-part.is-have { opacity: .6; }
      `,
      init() {
        const redo = () => { itemPages(); shopPages(); if (opt('goals', 'town')) town(); };
        onInventoryChange(redo);
        onQuestsChange(redo);
      },
      scan() {
        itemPages();
        shopPages();
        if (opt('goals', 'town')) town();
      },
    });
  })();
  (() => {
    const pwKey = (s) => String(s).toLowerCase().replace(/[^a-z0-9]/g, '');
    const pwState = () => store.get('pw', { at: 0, solved: [], total: 0, remaining: null });
    function readPasswordLog(page) {
      const title = [...page.querySelectorAll('.content-block-title')].find((t) => /Passwords\s*\(\d+\s+Left\)/i.test(t.textContent));
      const m = title && title.textContent.match(/([\d,]+)\s+of\s+([\d,]+)/i);
      if (!m) return;
      const solved = [...page.querySelectorAll('li .item-title > span:first-child')].map((s) => pwKey(s.textContent)).filter(Boolean);
      const count = Number(m[1].replace(/,/g, ''));
      if (solved.length !== count) return; // the whole list isn't on the page (yet)
      const sig = `${count}:${solved.join(',').length}`;
      if (page.frxPwSig === sig) return;
      page.frxPwSig = sig;
      const s = pwState();
      store.set('pw', { at: Date.now(), solved, total: Number(m[2].replace(/,/g, '')), remaining: s.remaining });
    }
    const pwChanged = (s) => s.at && s.remaining !== null && s.remaining !== s.total - s.solved.length;
    dataCheck({
      key: 'passwords', feature: 'hints', option: 'passwords', page: 'popwlog.php', label: 'Password Log',
      why: 'which mailbox passwords you\'ve entered, for the answers at the Post Office',
      status: () => {
        const s = pwState();
        if (!s.at) return { state: 'missing', note: 'Not seen yet' };
        if (pwChanged(s)) return { state: 'old', note: 'Out of date' };
        return { state: 'ok', note: `Seen ${when(s.at)}` };
      },
    });
    function needLine(have, img, name, how) {
      const state = have === undefined ? '' : have > 0 ? ' is-have' : ' is-missing';
      const mark = have === undefined ? '' : have > 0 ? '<i class="fa-solid fa-circle-check"></i> ' : '<i class="fa-solid fa-circle-minus"></i> ';
      return `<div class="frx-hint-need${state}">${mark}<img src="${img}" class="itemimg" alt=""><b>${esc(name)}</b>: ${how}</div>`;
    }
    const inventoryNote = () => (!invState().at
      ? '<div class="frx-sub">Reading your inventory… (or <a href="inventory.php" class="frx-link">open it</a>)</div>' : '');
    const HINTS = [
      {
        option: 'effigy',
        inv: true,
        page: 'temple',
        title: /^\s*Something Strange\s*$/i,
        html() {
          const goal = GOALS.find((g) => g.key === 'effigy');
          const EFFIGY = goal.item;
          const parts = goal.parts.map((p) => {
            const it = item(p.id);
            const next = partNextHtml(p);
            return [p.id, it ? it.img : '', it ? it.name : `Item ${p.id}`, `${howHtml(p)}${next ? ` · ${next}` : ''}`];
          });
          const haveEffigy = invCount(EFFIGY) > 0;
          const got = parts.filter(([id]) => invCount(id) > 0).length;
          const lines = [
            'A <b>Cursed Effigy</b> fits the outline. Putting it in opens the <b>Secret Chains</b>: one chain per crop, '
              + `${num(100000)} of that crop each, for a "Certificate of (crop) Giving". They can only be done once, and `
              + 'finishing 20 earns the Certified Farmer badge.',
          ];
          if (haveEffigy) {
            lines.push('<div class="frx-hint-need is-have"><i class="fa-solid fa-circle-check"></i> <img src="/img/items/Buddyidol.png" class="itemimg" alt=""><b>You have the Cursed Effigy.</b></div>');
          } else {
            lines.push(`The effigy is made from 4 pieces${!invState().at ? '' : ` (<b>${got} / 4</b>)`}:`);
            for (const [id, img, name, how] of parts) lines.push(needLine(invCount(id), img, name, how));
            lines.push(esc(goal.finish));
            lines.push(inventoryNote());
          }
          return paras(lines);
        },
      },
      {
        option: 'pies',
        page: 'farmhouse',
        title: /Pie Induction Entropy System/i,
        show: (card) => /\bLOCKED\b/.test(card.textContent),
        html() {
          return paras([
            'The <b>Pie Machine</b> is the reward for the last of Rosalie\'s 5 quests, <b>Pie Inversion Experimentation</b> '
              + '(they need Tower level 100 and level 99 Farming, Fishing, Crafting and Exploring).',
            `With it, PIES takes Apple Pies for <b>${num(10000)} Apple Cider</b> each (you can take out ${num(2000)} a day) `
              + 'or <b>1 Cranberry Juice</b> each.',
          ]);
        },
      },
      {
        option: 'passwords',
        page: 'postoffice',
        title: /^\s*Secret Passwords\s*$/i,
        html(card) {
          const s = pwState();
          const m = card.textContent.match(/Remaining:\s*([\d,]+)/i);
          const remaining = m ? Number(m[1].replace(/,/g, '')) : null;
          if (remaining !== null && remaining !== s.remaining) store.set('pw', { ...s, remaining });
          if (!s.at) return paras(['<a href="popwlog.php" class="frx-link">Open your Password Log</a> once and the passwords you haven\'t entered show here.']);
          const done = new Set(s.solved);
          const left = PASSWORDS.filter((p) => !done.has(pwKey(p)));
          const lines = [`<b>${num(left.length)}</b> you haven't entered (from buddy.farm):`,
            `<div class="frx-hint-pw">${left.map((p) => `<span>${esc(p)}</span>`).join(' · ')}</div>`];
          if (pwChanged({ ...s, remaining })) lines.push('<div class="frx-sub">You\'ve entered some since: <a href="popwlog.php" class="frx-link">open your Password Log</a> to update the list.</div>');
          else if (remaining !== null && remaining > left.length) lines.push(`<div class="frx-sub">buddy.farm doesn't list ${num(remaining - left.length)} of them yet.</div>`);
          return paras(lines);
        },
      },
    ];
    function paras(lines) {
      return lines.filter(Boolean).map((l) => (l.startsWith('<div') ? l : `<div class="frx-hint-p">${l}</div>`)).join('');
    }
    function render(page) {
      for (const h of HINTS) {
        if (page.dataset.page !== h.page) continue;
        const title = [...page.querySelectorAll('.content-block-title')].find((t) => h.title.test(t.textContent));
        const card = title && title.nextElementSibling;
        const inner = card && card.querySelector('.card-content-inner, .card-content');
        if (!inner) continue;
        let box = inner.querySelector('.frx-hint');
        if (!opt('hints', h.option) || (h.show && !h.show(card))) { if (box) box.remove(); continue; }
        if (h.inv) invForPage(page, `${h.page} opened`); // which pieces you have: read with the page (one read, shared with the Temple)
        if (!box) {
          box = document.createElement('div');
          box.className = 'frx-hint';
          inner.appendChild(box);
        }
        const html = `<div class="frx-hint-head"><span class="frx-tag">Toolkit</span> What this is</div>${h.html(card)}`;
        if (box.frxHtml !== html) { box.frxHtml = html; box.innerHTML = html; }
      }
    }
    const renderAll = () => [...new Set(HINTS.map((h) => h.page))].forEach((name) => pages(name).forEach(render));
    feature({
      id: 'hints',
      name: 'Library Hints',
      description: 'Cards that only hint at a secret (like the Temple\'s "Something Strange") also say what it is, from the game\'s Library and buddy.farm, and how far along you are.',
      options: [
        { key: 'effigy', label: 'Temple: "Something Strange" (the Cursed Effigy)' },
        { key: 'pies', label: 'Farmhouse: where the locked PIES\'s Pie Machine comes from' },
        { key: 'passwords', label: 'Post Office: the Secret Passwords you haven\'t entered (answers, from buddy.farm; read from your Password Log)' },
      ],
      css: `
        .card-content > .frx-hint { margin-top: 0; padding: 8px 15px 10px; }
        .frx-hint-pw { margin: 4px 0; overflow-wrap: anywhere; }
        .frx-hint-pw span { display: inline-block; max-width: 100%; font-weight: bold; } /* a password stays on one line where it fits */
        .frx-hint { clear: both; margin-top: 10px; padding-top: 8px; border-top: 1px solid var(--frx-border-soft);
          font-size: 14px; line-height: 1.45; color: var(--frx-text); }
        .frx-hint-head { margin-bottom: 4px; font-weight: bold; }
        .frx-hint-p { margin: 4px 0; }
        .frx-hint-need { margin: 4px 0; }
        .frx-hint-need img { width: 22px; height: 22px; vertical-align: middle; margin-right: 6px; }
        .frx-hint-need.is-have > i { color: var(--frx-good); }
        .frx-hint-need.is-missing > i { color: var(--frx-muted); }
      `,
      init() {
        onInventoryChange(renderAll);
        onQuestsChange(renderAll); // next steps use your open quests
      },
      scan() {
        if (opt('hints', 'passwords')) pages('popwlog').forEach(readPasswordLog);
        renderAll();
      },
    });
  })();
  (() => {
    const PLACES = [
      { key: 'mastery', section: 'shortcuts', icon: 'fa-trophy', label: 'Mastery', href: 'mastery.php', default: false },
      { key: 'quests', section: 'shortcuts', icon: 'fa-clipboard-list', label: 'Help Requests', href: 'quests.php' },
      { key: 'npclevels', section: 'shortcuts', icon: 'fa-heart', label: 'Friendship Levels', href: 'npclevels.php', default: false },
      { key: 'temple', section: 'shortcuts', icon: 'fa-place-of-worship', label: 'Temple of Reward', href: 'temple.php', default: false },
      { key: 'locksmith', section: 'shortcuts', icon: 'fa-key', label: 'Locksmith', href: 'locksmith.php', default: false },
      { key: 'flea', section: 'shortcuts', icon: 'fa-tags', label: 'Flea Market', href: 'flea.php', default: false },
      { key: 'tent', section: 'shortcuts', icon: 'fa-campground', label: 'Borgen\'s Camp', href: 'tent.php', default: false },
      { key: 'bmerc', section: 'shortcuts', icon: 'fa-store', label: 'Borgen Mercantile', href: 'bmerc.php', default: false },
      {
        key: 'settings', section: 'toolkit', icon: 'fa-sliders', label: 'Settings',
        open: () => openToolkit(), // the FarmRPG Toolkit page
      },
      {
        key: 'debug', section: 'toolkit', icon: 'fa-bug', label: 'Debug', default: false,
        note: 'a report on the Toolkit and the page you\'re on, to copy and send when something looks wrong',
        open: () => openDebug(),
      },
    ];
    const shown = (section) => PLACES.filter((p) => p.section === section && opt('fast-travel', `place.${p.key}`));
    const row = (p) => `<li>
        <a href="${p.href ? esc(p.href) : 'javascript:;'}" ${p.href ? 'data-view=".view-main"' : ''}
          class="item-link ${p.href ? 'close-panel' : ''}" data-frx-place="${esc(p.key)}">
          <div class="item-content"><div class="item-inner">
            <div class="item-title"><i class="fa-solid fa-fw ${esc(p.icon)}"></i>&nbsp; ${esc(p.label)}</div>
          </div></div>
        </a></li>`;
    const todoChecks = () => (opt('fast-travel', 'check') ? dataStatus().filter((d) => d.state !== 'ok') : []);
    function checkHtml() {
      if (!opt('fast-travel', 'check')) return '';
      const all = dataStatus();
      if (!all.length) return '';
      const todo = all.filter((d) => d.state !== 'ok');
      if (!todo.length) {
        return '<div class="frx-ft-head">Data check</div>'
          + '<div class="frx-ft-check is-ok"><i class="fa-solid fa-circle-check"></i> All seen</div>';
      }
      return `<div class="frx-ft-head">Data check · <span class="frx-ft-check-n">${todo.length} to open</span></div>
        <ul class="frx-ft-check-list">${todo.map((d) => `<li>
          <a href="${esc(d.page)}" data-view=".view-main" class="item-link close-panel" title="Used for ${esc(d.why)}">
            <div class="item-content"><div class="item-inner">
              <div class="item-title"><i class="fa-solid fa-fw fa-triangle-exclamation"></i>&nbsp; ${esc(d.label)}</div>
              <div class="item-after frx-ft-check-state">${esc(d.note || '')}</div>
            </div></div>
          </a></li>`).join('')}</ul>`;
    }
    function updateBar(ft) {
      if (!opt('fast-travel', 'check') || !dataStatus().length) { ft.querySelector('.frx-ft-state').innerHTML = ''; return; }
      const n = todoChecks().length;
      const html = n
        ? `<span class="frx-ft-badge is-warn" title="Data check: ${n} page${n === 1 ? '' : 's'} to open">${n}</span>`
        : '<span class="frx-ft-badge is-ok" title="All clear"><i class="fa-solid fa-check"></i></span>';
      const box = ft.querySelector('.frx-ft-state');
      if (box.frxHtml !== html) {
        box.frxHtml = html;
        box.innerHTML = html;
        if (ft.classList.contains('is-open')) fillMenu(ft); // something just got seen: update the open list
      }
    }
    function fillMenu(ft) {
      ft.querySelector('.frx-ft-checks').innerHTML = checkHtml();
      const short = shown('shortcuts');
      ft.querySelector('.frx-ft-short').innerHTML = short.length
        ? `<div class="frx-ft-head">Shortcuts</div><ul>${short.map(row).join('')}</ul>` : '';
      ft.querySelector('.frx-ft-places').innerHTML = shown('toolkit').map(row).join('');
    }
    function addBar() {
      const panel = document.querySelector('.panel-left');
      if (!panel || panel.querySelector('.frx-ft')) return;
      const ft = document.createElement('div');
      ft.className = 'frx-ft';
      ft.innerHTML = `
        <div class="frx-ft-menu list-block">
          <div class="frx-ft-checks"></div>
          <div class="frx-ft-short"></div>
          <ul class="frx-ft-places"></ul>
        </div>
        <a href="javascript:;" class="frx-ft-bar">
          <span class="frx-ft-ico"><i class="fa-solid fa-fw fa-compass"></i><span class="frx-ft-state"></span></span>&nbsp; Toolkit
          <i class="fa-solid fa-chevron-up frx-ft-chev"></i>
        </a>`;
      panel.appendChild(ft);
      panel.classList.add('frx-has-ft');
    }
    const ago = (t) => {
      if (!t) return 'never';
      const m = Math.round((Date.now() - t) / 60000);
      return m < 60 ? `${m} min ago` : m < 48 * 60 ? `${Math.round(m / 60)} h ago` : `${Math.round(m / 1440)} days ago`;
    };
    function currentPage() {
      const list = [...document.querySelectorAll('.view-main .page')];
      return list.find((p) => p.classList.contains('page-on-center')) || list.filter((p) => !p.classList.contains('page-on-left')).pop();
    }
    function report() {
      const lines = [];
      const add = (k, v) => lines.push(`${k} = ${v}`);
      const gm = typeof GM_info !== 'undefined' ? GM_info : null; // eslint-disable-line no-undef
      lines.push(`[${TOOLKIT}]`);
      add('Version', VERSION);
      add('Script manager', gm ? `${gm.scriptHandler || '?'} ${gm.version || ''}`.trim() : 'unknown');
      add('Time', new Date().toString());
      add('Browser', navigator.userAgent);
      add('FRPG HUD', hudPresent() ? 'running' : 'not seen');
      add('Window', `${innerWidth} x ${innerHeight}, pixel ratio ${devicePixelRatio}`);
      add('Dark mode', document.body.classList.contains('layout-dark') ? 'on' : 'off');
      add('Body classes', document.body.className || '(none)');
      lines.push('', '[Game]');
      const appScript = [...document.scripts].map((s) => s.src).find((s) => /index-app\.php/.test(s)) || '';
      add('Game script version', (appScript.match(/\?(\d+)/) || [])[1] || 'unknown');
      add('jQuery', window.jQuery ? window.jQuery.fn.jquery : 'missing');
      add('Framework7 view', window.mainView ? `ok, active page ${(window.mainView.activePage || {}).name || '?'}` : 'missing');
      add('Game scroll to restore', String(window.currentScroll ?? 'n/a'));
      const page = currentPage();
      lines.push('', '[Page]');
      add('Page', page ? page.dataset.page : 'unknown');
      add('Title', page ? pageTitle(page) || '(none)' : '');
      add('Address', safeAddress(location.pathname + location.hash));
      add('Pages kept by the game', [...document.querySelectorAll('.view-main .page')].map((p) => p.dataset.page).join(', '));
      const pc = page && page.querySelector('.page-content');
      add('Scroll', pc ? `${Math.round(pc.scrollTop)} of ${pc.scrollHeight} (screen ${pc.clientHeight})` : 'n/a');
      const PREFIX = [['frx-fg', 'Friendship Gifts'], ['frx-food', 'Food Enhancement'], ['frx-meal', 'Meal Reminders'],
        ['frx-ls', 'Locksmith Rewards'], ['frx-crop', 'Crop Amounts'], ['frx-fm', 'Flea Market'], ['frx-tp', 'Temple Helper'],
        ['frx-ms', 'Mastery'], ['frx-goal', 'Unlock Goals'], ['frx-hint', 'Library Hints'], ['frx-ft', 'Toolkit Menu'],
        ['frx-uses', 'Item Uses'], ['frx-mine', 'Mining']];
      const pieces = page ? PREFIX.map(([pre, name]) => [name, page.querySelectorAll(`[class^="${pre}"], [class*=" ${pre}"]`).length]).filter(([, n]) => n) : [];
      add('Toolkit pieces on this page', pieces.length ? pieces.map(([n, c]) => `${n} ${c}`).join(', ') : 'none');
      lines.push('', '[Features]');
      for (const f of FEATURES) {
        const off = (f.options || []).filter((o) => !o.choices && !opt(f.id, o.key)).map((o) => o.key);
        const picked = (f.options || []).filter((o) => o.choices).map((o) => `${o.key}: ${opt(f.id, o.key)}`);
        const state = broken.has(f.id) ? 'STOPPED after an error' : featureOn(f) ? 'on' : 'off';
        add(f.name, `${state}${off.length ? ` (parts off: ${off.join(', ')})` : ''}${picked.length ? ` (${picked.join(', ')})` : ''}`);
      }
      lines.push('', '[Feature data]');
      const pd = store.get('perks', {});
      for (const [kind, label] of [['skill', 'Perks page'], ['gold', 'Farm Supply']]) {
        const k = pd[kind];
        add(label, k ? `${k.names.length} owned, read ${ago(k.at)}` : 'not read');
      }
      const perkList = (names) => names.map((n) => `${n} ${hasPerk(n) === null ? '?' : hasPerk(n) ? 'yes' : 'no'}`).join(', ');
      const inv = invState();
      add('Inventory', inv.at ? `${Object.keys(inv.counts).length} items, cap ${inv.cap}, read ${ago(inv.at)}${inv.estimated ? ', old estimated copy (read again on next use)' : ''}; pending: ${invBusy()}` : `not read; pending: ${invBusy()}`);
      const ms = masteryState();
      const mega = Object.values(ms.items).filter((m) => m.mega).length;
      add('Mastery', ms.at ? `${Object.keys(ms.items).length} items (${mega} Mega), read ${ago(ms.at)}` : 'not read');
      const running = Object.entries(store.get('effects', {})).filter(([, end]) => end > Date.now());
      add('Meals running', running.length ? running.map(([id, end]) => `${item(id) ? item(id).name : id} (${Math.round((end - Date.now()) / 60000)} min)`).join(', ') : 'none');
      add('Meals last checked', ago(mealsSeenAt()));
      add('Quick Meals perk (Eat buttons)', perkList(['Quick Meals']));
      const b = store.get('bonuses', null);
      add('Event bonuses', b ? `${JSON.stringify(b.found)} on ${b.day}` : 'none read');
      const t = store.get('totd', null);
      add('Townsfolk of the Day', t ? `${t.name} on ${t.day}` : 'unknown');
      const given = Object.values(store.get('friendship.given', {}));
      const oldest = Math.min(...given.map((g) => g.at || 0));
      add('Mailboxes read', given.length ? `${given.length}, oldest ${ago(oldest)}` : 'none');
      add('Friendship perks', perkList(['Friendship Primer', 'O.M.G I', 'O.M.G II']));
      add('Crop Amounts perks', perkList(['Double Prizes I', 'Double Prizes II']));
      add('Flea Market odds perks', perkList(['Eagle Eye', 'Iron Depot', 'Lemon Squeezer', 'Reinforced Netting', 'Fishing Trawl']));
      add('Temple chains seen', Object.keys(store.get('temple.tiers', {})).length);
      const qs = questsState();
      add('Help Requests', qs.at ? `${qs.open.length} open, ${qs.done ?? '?'} completed, ${qs.personal ?? '?'} personal, read ${ago(qs.at)}` : 'not read');
      const qd = store.get('quests.done', null);
      add('Completed Requests', qd && qd.ids.length ? `${qd.ids.length} known${qd.at ? `, list read ${ago(qd.at)}` : ', list not read'}` : 'not read');
      add('Places known (Explore, Go Fishing)', Object.keys(store.get('places', {})).length);
      add('buddy.farm items saved', Object.keys(store.get('buddy.items', {})).length);
      add('Mine floors seen', Object.keys(store.get('mine.floors', {})).length);
      add('Unlock goals', GOALS.map((g) => `${g.name} ${goalDone(g)} / ${g.parts.length}`).join(', '));
      const sh = store.get('goals.shops', {});
      add('Shop stock seen', Object.keys(sh).length ? Object.entries(sh).map(([k, s]) => `${k} ${ago(s.at)}`).join(', ') : 'none');
      const bk = store.get('goals.bucks', null);
      add('Borgen Buck rate', bk ? `every ${bk.rate}${bk.progress !== null ? `, progress ${bk.progress}` : ''}, ${bk.mega ?? '?'} Mega then, read ${ago(bk.at)}` : 'not read');
      for (const d of dataStatus()) add(`Data check: ${d.label}`, `${d.state} (${d.note || ''})`);
      lines.push('', '[Activity since this page load]');
      add('Started', ago(ACTIVITY.since));
      add('Page checks', ACTIVITY.scans ? `${ACTIVITY.scans}, ${(ACTIVITY.scanMs / ACTIVITY.scans).toFixed(1)} ms each on average, slowest ${ACTIVITY.slowest.toFixed(0)} ms (${ACTIVITY.slowestPage || '?'})` : 'none');
      add('Redrawn pages settled', ACTIVITY.settled);
      const held = store.get('debug.scroll', []);
      lines.push('', '[Page held still or settled (newest last)]');
      if (!held.length) lines.push('none');
      for (const h of held) lines.push(`${new Date(h.at).toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', second: '2-digit' })}  ${h.page}  ${h.moved > 0 ? '+' : ''}${h.moved}px  ${h.settle ? h.anchor : `held at "${h.anchor}"`}`);
      lines.push('', '[Saved data]');
      const sizes = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k.startsWith('frx.')) sizes.push([k.slice(4), (localStorage.getItem(k) || '').length]);
      }
      sizes.sort((a, c) => c[1] - a[1]);
      add('Total', `${sizes.length} keys, ${Math.round(sizes.reduce((s, [, n]) => s + n, 0) / 1024)} KB`);
      add('Largest', sizes.slice(0, 5).map(([k, n]) => `${k} ${(n / 1024).toFixed(1)} KB`).join(', '));
      add('All keys', sizes.map(([k]) => k).sort().join(', '));
      const reqs = store.get('debug.requests', []);
      const hour = reqs.filter((r) => Date.now() - r.at < 60 * 60 * 1000).length;
      lines.push('', `[Requests to the server: ${hour} in the last hour, newest last]`);
      if (!reqs.length) lines.push('none');
      for (const r of reqs.slice(-25)) {
        lines.push(`${new Date(r.at).toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', second: '2-digit' })}  ${safeAddress(r.page)}  ${r.why || ''}  ${r.ok ? `${r.ms} ms` : 'FAILED'}`);
      }
      const replies = store.get('debug.replies', []);
      lines.push('', '[Game replies used, no request (newest last)]');
      if (!replies.length) lines.push('none');
      for (const r of replies.slice(-10)) {
        lines.push(`${new Date(r.at).toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', second: '2-digit' })}  ${safeAddress(r.page)}  ${r.note || ''}`);
      }
      const probs = PROBLEMS.list();
      lines.push('', '[Problems, newest last]');
      if (!probs.length) lines.push('none');
      for (const p of probs) lines.push(`${new Date(p.at).toLocaleString()} ${p.note}`.trim(), `  ${safeAddress(p.error).replace(/\n/g, '\n  ')}`);
      return lines.join('\n');
    }
    let sheet = null;
    function closeDebug() { if (sheet) { sheet.remove(); sheet = null; } }
    function openDebug() {
      closeDebug();
      sheet = document.createElement('div');
      sheet.className = 'frx-dbg';
      sheet.innerHTML = `<div class="frx-dbg-box">
        <div class="frx-dbg-head"><i class="fa-solid fa-bug"></i>&nbsp; Toolkit debug
          <a href="javascript:;" class="frx-dbg-x" title="Close"><i class="fa-solid fa-xmark"></i></a></div>
        <div class="frx-dbg-note">About the Toolkit and the page you're on. No account details. Copy it and send it along.</div>
        <textarea class="frx-dbg-text" readonly spellcheck="false"></textarea>
        <div class="frx-dbg-btns">
          <a href="javascript:;" class="button btngreen frx-dbg-copy">Copy</a>
          <a href="javascript:;" class="button btngray frx-dbg-refresh">Refresh</a>
          <a href="javascript:;" class="button btngray frx-dbg-close">Close</a>
        </div></div>`;
      document.body.appendChild(sheet);
      const text = sheet.querySelector('.frx-dbg-text');
      text.value = report();
      sheet.addEventListener('click', async (e) => {
        if (e.target === sheet || e.target.closest('.frx-dbg-x, .frx-dbg-close')) { closeDebug(); return; }
        if (e.target.closest('.frx-dbg-refresh')) { text.value = report(); return; }
        const copy = e.target.closest('.frx-dbg-copy');
        if (!copy) return;
        try { await navigator.clipboard.writeText(text.value); } catch { text.select(); document.execCommand('copy'); }
        copy.textContent = 'Copied';
        setTimeout(() => { copy.textContent = 'Copy'; }, 1500);
      });
    }
    feature({
      id: 'fast-travel',
      name: 'Toolkit Menu',
      description: 'The Toolkit bar at the bottom of the game\'s left menu (the compass): the Data check, shortcuts to game pages you pick, Settings and Debug. On phones, open the left menu to see it.',
      options: [
        { key: 'check', label: 'Data check: lists pages the Toolkit hasn\'t seen yet or that are out of date (your perks, Mastery, Help Requests, Townsfolk of the Day...), with links' },
        ...PLACES.filter((p) => p.section === 'shortcuts').map((p) => ({ key: `place.${p.key}`, label: p.label, group: 'Shortcuts', default: p.default })),
        ...PLACES.filter((p) => p.section === 'toolkit').map((p) => ({ key: `place.${p.key}`, label: p.note ? `${p.label}: ${p.note}` : p.label, group: 'Toolkit', default: p.default })),
      ],
      css: `
        .frx-ft { position: absolute; left: 0; right: 0; bottom: 0; z-index: 5001; } /* the menu's own view sits at 5000 */
        .panel-left.frx-has-ft .page-content { padding-bottom: 56px; } /* nothing in the menu hides behind the bar */
        .frx-ft-bar { display: flex; align-items: center; height: 55px; padding: 0 15px; box-sizing: border-box;
          font-size: 17px; color: inherit; border-top: 2px solid var(--frx-good);
          background: color-mix(in srgb, var(--frx-surface) 88%, transparent); }
        .frx-ft-bar > .fa-compass { color: var(--frx-good); }
        .frx-ft-chev { margin-left: auto; font-size: 13px; opacity: .7; transition: transform .2s; }
        .frx-ft.is-open .frx-ft-chev { transform: rotate(180deg); }
        .frx-ft-menu.list-block { display: none; margin: 0; border-top: 2px solid var(--frx-good);
          background: var(--frx-surface-2); box-shadow: 0 -4px 14px var(--frx-shadow); }
        .frx-ft.is-open .frx-ft-menu { display: block; }
        .frx-ft-menu ul { background: transparent; }
        .frx-ft-menu .item-title { font-size: 17px; color: var(--frx-text); }
        .frx-ft-menu .item-title i { color: var(--frx-good); }
        .frx-ft-head { padding: 8px 15px 4px; font-size: 13px; text-transform: uppercase; color: var(--frx-muted); }
        .frx-ft-bar { white-space: nowrap; }
        .frx-ft-ico { position: relative; display: inline-block; }
        .frx-ft-ico > .fa-compass { color: var(--frx-good); }
        .frx-ft-badge { position: absolute; top: -7px; right: -9px; min-width: 16px; height: 16px; padding: 0 3px; box-sizing: border-box;
          border-radius: 8px; font-size: 12px; font-weight: bold; line-height: 16px; text-align: center; }
        .frx-ft-badge.is-warn { background: var(--frx-warn); color: var(--frx-surface-2); }
        .frx-ft-badge.is-ok { background: var(--frx-good); color: var(--frx-surface-2); font-size: 9px; } /* a tick icon, not text */
        .frx-ft-check { padding: 2px 15px 10px; font-size: 14px; border-bottom: 1px solid var(--frx-border-soft); }
        .frx-ft-check.is-ok { color: var(--frx-good); font-weight: bold; }
        .frx-ft-check-n { color: var(--frx-warn); font-weight: bold; }
        ul.frx-ft-check-list { background: transparent; border-bottom: 1px solid var(--frx-border-soft); }
        .frx-ft-check-list .item-title i { color: var(--frx-warn) !important; }
        .frx-ft-check-list .item-inner { flex-wrap: wrap; } /* a name too long for its state: the state drops below */
        .frx-ft-check-list .frx-ft-check-state { font-size: 13px; color: var(--frx-text); white-space: nowrap; margin-left: auto; }
        .frx-ft-short { border-bottom: 1px solid var(--frx-border-soft); }
        .frx-dbg { position: fixed; inset: 0; z-index: 100001; background: var(--frx-scrim);
          display: flex; align-items: center; justify-content: center; padding: 12px; box-sizing: border-box; }
        .frx-dbg-box { width: 560px; max-width: 100%; max-height: 100%; display: flex; flex-direction: column;
          background: var(--frx-surface-2); color: var(--frx-text); border: 1px solid var(--frx-border); border-radius: 8px;
          box-shadow: 0 4px 14px var(--frx-shadow); font-size: 14px; }
        .frx-dbg-head { display: flex; align-items: center; padding: 10px 12px; font-size: 17px; font-weight: bold;
          border-bottom: 2px solid var(--frx-good); }
        .frx-dbg-head > i { color: var(--frx-good); }
        .frx-dbg-x { margin-left: auto; color: var(--frx-muted) !important; padding: 0 4px; }
        .frx-dbg-note { padding: 8px 12px 0; font-size: 13px; color: var(--frx-muted); }
        .frx-dbg-text { margin: 8px 12px; height: 50vh; min-height: 160px; resize: vertical; box-sizing: border-box;
          font: 12px/1.4 ui-monospace, Consolas, monospace; color: var(--frx-text); background: var(--frx-surface);
          border: 1px solid var(--frx-border); border-radius: 6px; padding: 8px; white-space: pre; }
        .frx-dbg-btns { display: flex; gap: 8px; padding: 0 12px 12px; }
        .frx-dbg-btns .button { flex: 1; }
      `,
      init() {
        document.addEventListener('click', (e) => {
          const ft = document.querySelector('.frx-ft');
          if (!ft || !e.target.closest) return;
          if (e.target.closest('.frx-ft-bar')) {
            e.preventDefault();
            if (!ft.classList.contains('is-open')) fillMenu(ft);
            ft.classList.toggle('is-open');
            return;
          }
          const el = e.target.closest('[data-frx-place]');
          const place = el && PLACES.find((p) => p.key === el.dataset.frxPlace);
          if (place && place.before) place.before();
          if (place && place.open) { e.preventDefault(); place.open(); }
          if (place || !e.target.closest('.frx-ft')) ft.classList.remove('is-open');
        }, true);
      },
      scan() {
        addBar();
        const ft = document.querySelector('.frx-ft');
        if (ft) updateBar(ft);
      },
    });
  })();
  start();
})();
