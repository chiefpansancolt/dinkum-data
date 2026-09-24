# Equipment

Wearable and placeable equipment, including license/skill requirements and Windmill/Solar Panel
compatibility. 58 items are included.

---

## Type

### `Equipment`

| Field                | Type           | Description                                        |
| -------------------- | -------------- | -------------------------------------------------- |
| id                   | string         | Stable identifier                                  |
| name                 | string         | Display name                                       |
| img                  | string         | Path to the item's icon, relative to `images/`     |
| source               | string[]       | Where the item is obtained                         |
| baseSellPrice        | number         | Base sell price in Dinks                           |
| buyPrice             | number?        | Purchase price, if purchasable                     |
| description          | string         | What the item does                                 |
| requirementLevel     | number \| null | Skill or license level required, or `null` if none |
| requirementType      | string?        | Name of the license or skill required              |
| shinyDiscCount       | number?        | Shiny Discs required to craft                      |
| berkoniumOreCount    | number?        | Berkonium Ore required to craft                    |
| windmillCompatable   | boolean?       | Can be powered by a Windmill                       |
| solarPanelCompatable | boolean?       | Can be powered by a Solar Panel                    |
| inputs               | Resource[]?    | Other crafting inputs                              |
| buyUnits             | BuyUnits?      | `'Dinks'` or `'Permit Points'`, when purchasable   |

`Resource` is `{ name: string; img: string; count: number }`.

---

## Factory

```ts
import { equipment } from "dinkum-data";

equipment(); // all 58 items
equipment(source); // wrap a pre-filtered array
```

---

## Methods

### Filters

#### `.bySource(source: string)`

Filter to equipment obtainable from the given source (case-insensitive substring match).

```ts
equipment().bySource("Crafting Table").get();
```

#### `.byRequirementType(type: string)`

Filter by the license or skill required to unlock the item (case-insensitive). Items with no
requirement never match.

```ts
equipment().byRequirementType("Irrigation Licence").get();
```

#### `.windmillCompatible()`

Filter to equipment compatible with the Windmill.

```ts
equipment().windmillCompatible().get();
```

#### `.solarPanelCompatible()`

Filter to equipment compatible with the Solar Panel.

```ts
equipment().solarPanelCompatible().get();
```

### Sorts

#### `.sortByBaseSellPrice(order?: 'asc' | 'desc')`

Sort by base sell price. Defaults to `'desc'` (most valuable first).

---

### Terminal methods

| Method              | Returns                  | Description                         |
| ------------------- | ------------------------ | ----------------------------------- |
| `.get()`            | `Equipment[]`            | All results                         |
| `.first()`          | `Equipment \| undefined` | First result                        |
| `.find(id)`         | `Equipment \| undefined` | Find by `id`                        |
| `.findByName(name)` | `Equipment \| undefined` | Case-insensitive exact name match   |
| `.search(query)`    | `Equipment[]`            | Case-insensitive partial name match |
| `.count()`          | `number`                 | Number of results                   |

---

## Examples

```ts
import { equipment } from "dinkum-data";

// Everything craftable at the Crafting Table
equipment().bySource("Crafting Table").get();

// Every Windmill-powered device
equipment().windmillCompatible().get();
```
