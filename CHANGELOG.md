# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-09-25

A full reconciliation pass against the [Dinkum Wiki](https://dinkum.fandom.com/wiki/Dinkum_Wiki),
covering every existing module plus a brand-new `decorations()` module and the 1st Anniversary
Update ("The Great Bite").

### Added

- `decorations()`: new module covering 265 placeable world decorations across 16 categories (Paths &
  Steps, Fences & Gates, Benches, Bridges, Flags/Festoons/Arches, Flower Beds, Flowers in Pots,
  Ladders, Lights, Market Stalls & Miscellaneous, Pergolas, Plush, Statues, Water Fountains &
  Waterbeds, Winter Ice Sculpting, and Festive).
- `foodModellerRecipes()`: new module for Food Modeller display conversions.
- Full content from the 1st Anniversary Update ("The Great Bite") patch notes: the `Great Bite`
  biome, the Night Merchant NPC and calendar event, the Scooter vehicle, 20 new tools (Auto Animal
  Trap, Black Pocket Watch, Boaricoot Whistle, Medkit, Secateurs, 3 Single Person Tent colors, and
  all 12 Swag Pack Customisation skins), 4 new equipment items (Fish Berley Box, Improved Stone
  Grinder, Orb of Stars, Servo), 12 new clothing items, 4 new decorations (Lighthouse, Tyre Bench,
  Tyre Planter, Old Bowser), and 2 new furniture items (Toy Ute, Votive Candle).
- Missing items found and added across nearly every module during the wiki reconciliation pass: Rice
  crop, 16 furniture items, 6 tools, Alpha Battle Fish and Alpha Plant Hammer weapons, Giant Shell
  weight item, Mallee Gum Tree, Guest House Upgrade 2 building, Critter Book, Encyclopedia, and Tome
  of Wounding books, the Thunderstruck milestone, Blue Sign / White Sign / Yellow Item Sign
  sign-writing recipes, Termite Nest resource, Cocoon and other resource entries, and Quiche and
  Mighty Sandwich cooking recipes.
- README "Known Gaps" section documenting patch-note items that can't yet be sourced because the
  wiki has no page for them: Switch Railway Track, Metal Detector Level 2, Pastel Floors, Smooth
  Brown Path, and Shovel of Pebbles.

### Fixed

- Corrected a systematic ~1.6x stale-price bug affecting 19 wild animal `researchReward` values.
- Corrected stale or incorrect prices and sources across minerals, other-craftables, cassettes
  (purchased with Permit Points, not Dinks), cooking recipes, paint, vehicles/gliders, furniture,
  buildings, clothing, and animal products.
- Fixed cassette Pop Cassette sourcing and several relic entries missing their Old Gizmo source.
- Fixed name typos: Burrowcoot, Macquarie Perch, and the Trapping Licence level 2 description.
- Corrected the Storage Barrel source list and Bug Terrarium sell price and ingredient name.

## [0.2.0] - 2026-09-24

### Added

- `clothingSlots()` / `clothingTypesForSlot()`: the clothing-slot taxonomy (which `Clothing.type`
  values belong to each slot), previously only available locally in dinkum-tracker.
- `buffIcons()`: the icon image path for each buff tier, previously only available locally in
  dinkum-tracker.
- `milestoneCategories()`: the 9 milestone categories used to group milestones for filtering,
  previously only available locally in dinkum-tracker.
- `relics().uniqueLocations()`: every distinct relic dig-site location, derived from the relic data
  rather than hand-maintained separately.

## [0.1.0] - 2026-09-23

### Added

Initial release: structured JSON data, TypeScript types, image assets, and a chainable query builder
API for Dinkum, sourced from [Dinkum Wiki](https://dinkum.fandom.com/wiki/Dinkum_Wiki).
