# dinkum-data

<div align="center">
  <h3>A comprehensive, fully-typed dataset for Dinkum</h3>
  <p>Structured JSON data, 2,000+ image assets, and a chainable query builder API for animals, farming, gear, recipes, and more.</p>

![Codecov](https://img.shields.io/codecov/c/github/chiefpansancolt/dinkum-data?style=flat-square&logo=%3Csvg%20role%3D%22img%22%20viewBox%3D%220%200%2024%2024%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ctitle%3ECodecov%3C%2Ftitle%3E%3Cpath%20d%3D%22M12.006.481C5.391.486.005%205.831%200%2012.399v.03l2.042%201.19.028-.018a5.82%205.82%200%20013.308-1.02c.37%200%20.733.034%201.085.1l-.036-.006a5.69%205.69%200%20012.874%201.43l-.004-.002.35.326.198-.434c.192-.42.414-.814.66-1.173.1-.144.208-.29.332-.446l.205-.257-.252-.211a8.33%208.33%200%2000-3.836-1.807l-.052-.008a8.565%208.565%200%2000-4.08.251l.06-.016c.972-4.256%204.714-7.223%209.133-7.226a9.31%209.31%200%20016.6%202.713%209.196%209.196%200%20012.508%204.498%208.385%208.385%200%2000-2.498-.379h-.154c-.356.006-.7.033-1.036.078l.045-.005-.042.006a8.103%208.103%200%2000-.39.06c-.057.01-.114.022-.17.033a8.102%208.102%200%2000-.392.09l-.138.034a9.21%209.21%200%2000-.483.144l-.03.01c-.354.12-.708.268-1.05.44l-.027.013c-.152.076-.305.16-.47.256l-.035.022a8.216%208.216%200%2000-2.108%201.8l-.011.014-.075.092a8.345%208.345%200%2000-.378.503c-.088.13-.177.269-.288.452l-.06.104a8.985%208.985%200%2000-.234.432l-.016.029c-.17.34-.317.698-.44%201.063l-.017.053a8.052%208.052%200%2000-.41%202.716v-.007.112a12%2012%200%2000.023.431l-.002-.037a11.676%2011.676%200%2000.042.412l.005.042.013.103c.018.127.038.252.062.378.241%201.266.845%202.532%201.745%203.66l.041.051.042-.05c.359-.424%201.249-1.77%201.325-2.577v-.015l-.006-.013a5.56%205.56%200%2001-.64-2.595c0-3.016%202.37-5.521%205.396-5.702l.2-.007a5.93%205.93%200%20013.47%201.025l.027.019L24%2012.416v-.03a11.77%2011.77%200%2000-3.51-8.423A11.962%2011.962%200%200012.007.48z%22%2F%3E%3C%2Fsvg%3E&logoColor=%23F01F7A)
![NPM Downloads](https://img.shields.io/npm/d18m/dinkum-data?style=flat-square&logo=%3Csvg%20role%3D%22img%22%20viewBox%3D%220%200%2024%2024%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ctitle%3Enpm%3C%2Ftitle%3E%3Cpath%20d%3D%22M1.763%200C.786%200%200%20.786%200%201.763v20.474C0%2023.214.786%2024%201.763%2024h20.474c.977%200%201.763-.786%201.763-1.763V1.763C24%20.786%2023.214%200%2022.237%200zM5.13%205.323l13.837.019-.009%2013.836h-3.464l.01-10.382h-3.456L12.04%2019.17H5.113z%22%2F%3E%3C%2Fsvg%3E&logoColor=%23CB3837)
![GitHub Release](https://img.shields.io/github/v/release/chiefpansancolt/dinkum-data?style=flat-square)

</div>

---

## 📦 Installation

```bash
npm install dinkum-data
# or
pnpm add dinkum-data
```

---

## 🚀 Quick Start

Every module exports a **factory function** that returns a chainable query builder.

```ts
import { animals, fish, licenses, seeds } from "dinkum-data";

// Domesticable animals
animals().domesticable().get();

// Find a specific fish
fish().findByName("Sturgeon");

// Rare fish, most valuable first
fish().byRarity("Rare").sortByBaseSellPrice().get();

// Spring-plantable seeds, fastest growing first
seeds().bySeason("Spring").sortByGrowthPeriod().get();

// Total permit points needed to max every license
licenses().totalPermitPoints();
```

---

## ⚙️ How It Works

All standard modules follow the same **query builder pattern** built on a shared `QueryBase<T>`
class:

```ts
factory() // Start with all data
  .filterMethod() // Chain filters (returns new query)
  .sortMethod() // Chain sorts (returns new query)
  .terminalMethod(); // Get results
```

### Terminal Methods

Every query builder provides these 6 terminal methods:

| Method              | Returns          | Description                           |
| ------------------- | ---------------- | ------------------------------------- |
| `.get()`            | `T[]`            | All results as an array               |
| `.first()`          | `T \| undefined` | First result                          |
| `.find(id)`         | `T \| undefined` | Find by exact ID                      |
| `.findByName(name)` | `T \| undefined` | Find by name (case-insensitive)       |
| `.search(query)`    | `T[]`            | Partial name match (case-insensitive) |
| `.count()`          | `number`         | Number of results                     |

### Chaining

Filter and sort methods always return a **new query instance**, so you can chain freely without
mutation:

```ts
const rareFish = fish().byRarity("Rare");
const mostValuable = rareFish.sortByBaseSellPrice().first();
const count = rareFish.count();
```

Four modules don't follow this pattern, since their source data isn't a flat, filterable list. See
[Calendar](src/modules/calendar/README.md),
[Daily Milestones](src/modules/daily-milestones/README.md),
[Clothing Slots](src/modules/clothing-slots/README.md), and
[Buff Icons](src/modules/buff-icons/README.md) below.

---

## 📚 Modules

### 🐾 Wildlife & Museum

| Module                                    | Factory      | Items | Description                        |
| ----------------------------------------- | ------------ | ----- | ---------------------------------- |
| [animals](src/modules/animals/README.md)  | `animals()`  | 45    | Wild, farm, and tameable animals   |
| [bugs](src/modules/pedia/bugs.md)         | `bugs()`     | 50    | Museum-donatable bugs              |
| [critters](src/modules/pedia/critters.md) | `critters()` | 25    | Museum-donatable critters          |
| [fish](src/modules/pedia/fish.md)         | `fish()`     | 45    | Museum-donatable and cookable fish |

### 🌾 Farming & Foraging

| Module                                            | Factory        | Items | Description                           |
| ------------------------------------------------- | -------------- | ----- | ------------------------------------- |
| [crops](src/modules/resources/crops.md)           | `crops()`      | 16    | Farmable crops with their seeds       |
| [seeds](src/modules/resources/seeds.md)           | `seeds()`      | 35    | Every plantable seed                  |
| [foragables](src/modules/resources/foragables.md) | `foragables()` | 38    | Wild-foraged plants and items         |
| [trees](src/modules/trees/README.md)              | `trees()`      | 17    | Trees with growth and regrowth timing |
| [flowers](src/modules/flowers/README.md)          | `flowers()`    | 43    | Flowers found across every biome      |

### ⛏️ Resources & Materials

| Module                                                        | Factory             | Items | Description                          |
| ------------------------------------------------------------- | ------------------- | ----- | ------------------------------------ |
| [animal-products](src/modules/resources/animal-products.md)   | `animalProducts()`  | 36    | Items dropped or produced by animals |
| [minerals](src/modules/resources/minerals.md)                 | `minerals()`        | 15    | Ores and gemstones                   |
| [paint](src/modules/resources/paint.md)                       | `paint()`           | 12    | Paint colors                         |
| [relics](src/modules/resources/relics.md)                     | `relics()`          | 15    | Dig-site relics                      |
| [trophies](src/modules/resources/trophies.md)                 | `trophies()`        | 6     | Competition trophies                 |
| [other-craftables](src/modules/resources/other-craftables.md) | `otherCraftables()` | 32    | Processed goods from machines        |

### 🍳 Recipes

| Module                                                              | Factory                | Items | Description                |
| ------------------------------------------------------------------- | ---------------------- | ----- | -------------------------- |
| [cooking-recipes](src/modules/recipes/cooking-recipes.md)           | `cookingRecipes()`     | 72    | Cookable dishes with buffs |
| [crafting-recipes](src/modules/recipes/crafting-recipes.md)         | `craftingRecipes()`    | 235   | Craftable items            |
| [sign-writing-recipes](src/modules/recipes/sign-writing-recipes.md) | `signWritingRecipes()` | 14    | Sign Writing recipes       |

### ⚔️ Gear & Equipment

| Module                                                   | Factory       | Items | Description                         |
| -------------------------------------------------------- | ------------- | ----- | ----------------------------------- |
| [books](src/modules/gear-and-equipment/books.md)         | `books()`     | 6     | Collectible books                   |
| [cassettes](src/modules/gear-and-equipment/cassettes.md) | `cassettes()` | 15    | Music cassettes                     |
| [equipment](src/modules/gear-and-equipment/equipment.md) | `equipment()` | 58    | Wearable and placeable equipment    |
| [tools](src/modules/gear-and-equipment/tools.md)         | `tools()`     | 63    | Gathering and combat tools          |
| [vehicles](src/modules/gear-and-equipment/vehicles.md)   | `vehicles()`  | 21    | Gliders and other rideable vehicles |
| [weapons](src/modules/gear-and-equipment/weapons.md)     | `weapons()`   | 30    | Melee and ranged weapons            |

### 👕 Clothing & Furniture

| Module                                                 | Factory           | Items | Description                              |
| ------------------------------------------------------ | ----------------- | ----- | ---------------------------------------- |
| [clothing](src/modules/clothing/README.md)             | `clothing()`      | 520   | Wearable clothing across every slot      |
| [clothing-slots](src/modules/clothing-slots/README.md) | `clothingSlots()` | n/a   | Which clothing types belong to each slot |
| [furniture](src/modules/furniture/README.md)           | `furniture()`     | 421   | Placeable furniture                      |

### 🏠 World

| Module                                       | Factory       | Items | Description                             |
| -------------------------------------------- | ------------- | ----- | --------------------------------------- |
| [buildings](src/modules/buildings/README.md) | `buildings()` | 31    | Deeds and collectable/movable buildings |
| [npcs](src/modules/npcs/README.md)           | `npcs()`      | 22    | Every resident NPC                      |

### 🏆 Progression

| Module                                                             | Factory                 | Items | Description                           |
| ------------------------------------------------------------------ | ----------------------- | ----- | ------------------------------------- |
| [licenses](src/modules/licenses/README.md)                         | `licenses()`            | 25    | Purchasable licenses and their levels |
| [milestones](src/modules/milestones/README.md)                     | `milestones()`          | 98    | Long-term milestone achievements      |
| [milestone-categories](src/modules/milestone-categories/README.md) | `milestoneCategories()` | 9     | Categories used to group milestones   |
| [skills](src/modules/skills/README.md)                             | `skills()`              | 6     | Trainable skills                      |
| [daily-milestones](src/modules/daily-milestones/README.md)         | `dailyMilestones()`     | 120   | Repeatable daily task pool            |

### 📅 Calendar

| Module                                     | Factory      | Description                                         |
| ------------------------------------------ | ------------ | --------------------------------------------------- |
| [calendar](src/modules/calendar/README.md) | `calendar()` | The full 112-day calendar with birthdays and events |

### 🔖 Reference Data

| Module                                         | Factory       | Description                        |
| ---------------------------------------------- | ------------- | ---------------------------------- |
| [buff-icons](src/modules/buff-icons/README.md) | `buffIcons()` | Icon image path for each buff tier |

### 🧮 Calculators

| Module                                             | Factory         | Items | Description                                     |
| -------------------------------------------------- | --------------- | ----- | ----------------------------------------------- |
| [weight-items](src/modules/weight-items/README.md) | `weightItems()` | 12    | Items sold by weight, for the Weight Calculator |

---

## 📖 Module Documentation

Each module has a detailed doc with complete method signatures, type definitions, field
descriptions, and usage examples, linked from the tables above and located at:

```
src/modules/<module-name>/README.md
```

(nested categories document each module as `src/modules/<category>/<module-name>.md` instead, since
they aren't one folder per module)

---

## 🖼️ Image Assets

2,000+ images bundled under `images/`, organized by category. Folder names match the path stored in
each entry's `img` field exactly (case-sensitive).

| Folder              | Description                                                            |
| ------------------- | ---------------------------------------------------------------------- |
| `animals/`          | Animal sprites and their drops                                         |
| `buffs/`            | Buff and status effect icons                                           |
| `buildings/`        | Building and deed icons                                                |
| `clothing/`         | Clothing item icons                                                    |
| `flowers/`          | Flower icons                                                           |
| `furniture/`        | Furniture icons                                                        |
| `gearAndEquipment/` | Books, cassettes, equipment, tools, vehicles, weapons                  |
| `licences/`         | License icons                                                          |
| `milestones/`       | Milestone icons                                                        |
| `npcs/`             | NPC portraits                                                          |
| `other/`            | Miscellaneous icons                                                    |
| `pedia/`            | Fish, bug, and critter icons                                           |
| `recipes/`          | Cooking, crafting, and sign-writing recipe icons                       |
| `resources/`        | Animal products, crops, foragables, minerals, and other resource icons |
| `trees/`            | Tree icons                                                             |
| `weightItems/`      | Weight-calculator item icons                                           |

### Using Images in Your Project

Every data item's `img` field stores a path relative to the package root, already prefixed with
`/images/`. Prefix with the package name to resolve it:

```ts
import { animals } from "dinkum-data";

const animal = animals().findByName("Bin Chook");
const imgPath = `dinkum-data${animal.img}`;
// → "dinkum-data/images/animals/Bin_Chook.png"
```

**Next.js example:**

```tsx
import Image from "next/image";
import binChook from "dinkum-data/images/animals/Bin_Chook.png";

export default function AnimalCard() {
  return <Image src={binChook} alt="Bin Chook" width={48} height={48} />;
}
```

---

## 📋 Raw Data Access

JSON data files can be imported directly, without importing the JS/TS package:

```ts
import fish from "dinkum-data/data/pedia/fish.json";
```

---

## 📈 Change Log

Check out the [Change Log](CHANGELOG.md) for new breaking changes, features, and bug fixes per
release of a new version.

---

## 🤝 Contributing

Bug Reports, Feature Requests, and Pull Requests are welcome on GitHub at
[https://github.com/chiefpansancolt/dinkum-data](https://github.com/chiefpansancolt/dinkum-data).
This project is intended to be a safe, welcoming space for collaboration, and contributors are
expected to adhere to the [Contributor Covenant](https://www.contributor-covenant.org/) code of
conduct.

To see more about Contributing check out this [document](.github/CONTRIBUTING.md).

1. Fork Repo and create new branch
2. Once all is changed and committed create a pull request.
3. Ensure all merge conflicts are fixed and CI is passing.

---

## 🛠️ Development

See [CONTRIBUTING.md](.github/CONTRIBUTING.md) for setup instructions and
[DEVELOPMENT.md](.github/DEVELOPMENT.md) for the full guide on adding new modules.

```bash
pnpm install         # Install dependencies
pnpm build           # Build with tsup
pnpm test:coverage   # Run tests with the 100% coverage gate
pnpm lint            # Type-check + ESLint
pnpm format          # Format with Prettier
pnpm sample          # Exercise queries end to end
```

---

## 💖 Support the Project

If you find this project helpful, consider supporting its development:

<div align="center">

[![GitHub Sponsors](https://img.shields.io/badge/GitHub-Sponsor-pink?style=for-the-badge&logo=github)](https://github.com/sponsors/chiefpansancolt)
[![Ko-fi](https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ko-fi.com/chiefpansancolt)
[![Patreon](https://img.shields.io/badge/Patreon-F96854?style=for-the-badge&logo=patreon&logoColor=white)](https://patreon.com/chiefpansancolt)

</div>

---

## 📄 License

dinkum-data is available as open source under the terms of the [MIT License](LICENSE).

---

## Disclaimer

This project is not affiliated with, endorsed by, or connected to Dinkum or its creators. All game
data is sourced from the [Dinkum Wiki](https://dinkum.fandom.com/wiki/Dinkum_Wiki). Game images and
names are used for reference purposes only.

---

<div align="center">
  <p>Built with ❤️ by <a href="https://github.com/chiefpansancolt">chiefpansancolt</a></p>
</div>
