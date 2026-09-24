# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
