# dinkum-data

A comprehensive, fully-typed Node.js package containing Dinkum game data as structured JSON with
TypeScript types and image assets, consumable as an ESM or CJS npm package.

[![npm version](https://img.shields.io/npm/v/dinkum-data)](https://www.npmjs.com/package/dinkum-data)
[![license](https://img.shields.io/npm/l/dinkum-data)](LICENSE)
[![node](https://img.shields.io/node/v/dinkum-data)](package.json)

---

## Features

- **Comprehensive game data**: animals, buildings, the full 112-day calendar, clothing, flowers,
  furniture, licenses, milestones, NPCs, skills, trees, weight-calculator items, museum pedia
  entries (fish, bugs, critters), gear and equipment (books, cassettes, equipment, tools, vehicles,
  weapons), recipes (cooking, crafting, sign-writing), and resources (animal products, crops,
  foragables, minerals, other craftables, paint, relics, seeds, trophies)
- **Fully typed**: every entity has a precise TypeScript interface
- **Fluent query API**: chainable filter and sort methods per category
- **Image assets included**: over 2,000 item icons, accessible via relative path
- **Dual ESM + CJS**: works in both modern ESM projects and legacy CommonJS

---

## Requirements

- Node.js >= 24
- pnpm (for development)

---

## Installation

```bash
npm install dinkum-data
# or
pnpm add dinkum-data
```

---

## Quick Start

```typescript
import { animals, fish, licenses, seeds } from "dinkum-data";

// Animals
const bushDevil = animals().findByName("Bush Devil");
const domesticatable = animals().domesticable().get();

// Museum pedia
const rareFish = fish().byRarity("Rare").get();
const summerFish = fish().bySeason("Summer").sortByBaseSellPrice().get();

// Licenses
const miningLicence = licenses().findByName("Mining Licence");
console.log(licenses().totalPermitPoints());

// Seeds
const springSeeds = seeds().bySeason("Spring").sortByGrowthPeriod().get();
```

## Calendar

The 112-day calendar (4 seasons x 28 days) with embedded birthdays and events:

```typescript
import { calendar } from "dinkum-data";

const summer = calendar().bySeason("Summer");
const fletchBirthday = calendar().getBirthday("Fletch");
```

## Daily Milestones

```typescript
import { allDailyMilestones, dailyMilestonesByCategory } from "dinkum-data";

const fishingTasks = dailyMilestonesByCategory("fishingMilestones");
const everyTask = allDailyMilestones();
```

---

## Data & Images

Raw JSON and images are also available directly, without importing the JS/TS package:

```typescript
import fish from "dinkum-data/data/pedia/fish.json";
```

```html
<!-- the "img" field on each entry already contains the path relative to images/, e.g. "/images/pedia/fish/Inv_Anchovy.png" -->
<img src="node_modules/dinkum-data/images/pedia/fish/Inv_Anchovy.png" />
```

---

## Development

```bash
pnpm install
pnpm build
pnpm test
pnpm sample
```

---

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a full history of releases and changes.

---

## Disclaimer

This project is not affiliated with, endorsed by, or connected to Dinkum or its creators. All game
data is sourced from the [Dinkum Wiki](https://dinkum.fandom.com/wiki/Dinkum_Wiki). Game images and
names are used for reference purposes only.

## License

MIT. See [LICENSE](LICENSE) for details.
