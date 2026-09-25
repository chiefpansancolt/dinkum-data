# Vehicles

Gliders and other rideable vehicles, with their unlock requirements. 26 vehicles are included.

---

## Type

### `Vehicle`

| Field                | Type           | Description                                        |
| -------------------- | -------------- | -------------------------------------------------- |
| id                   | string         | Stable identifier                                  |
| name                 | string         | Display name                                       |
| img                  | string         | Path to the vehicle's icon, relative to `images/`  |
| source               | string[]       | Where the vehicle is obtained                      |
| baseSellPrice        | number         | Base sell price in Dinks                           |
| buyPrice             | number?        | Purchase price, if purchasable                     |
| requirementLevel     | number \| null | Skill or license level required, or `null` if none |
| requirementType      | string?        | Name of the license or skill required              |
| shinyDiscCount       | number?        | Shiny Discs required to craft                      |
| berkoniumOreCount    | number?        | Berkonium Ore required to craft                    |
| windmillCompatable   | boolean?       | Can be powered by a Windmill                       |
| solarPanelCompatable | boolean?       | Can be powered by a Solar Panel                    |
| inputs               | Resource[]?    | Other crafting inputs                              |

`Resource` is `{ name: string; img: string; count: number }`.

---

## Factory

```ts
import { vehicles } from "dinkum-data";

vehicles(); // all 26 vehicles
vehicles(source); // wrap a pre-filtered array
```

---

## Methods

### Filters

#### `.bySource(source: string)`

Filter to vehicles obtainable from the given source (case-insensitive substring match).

```ts
vehicles().bySource("Deep Mine").get();
```

#### `.byRequirementType(type: string)`

Filter by the license or skill required to unlock the vehicle (case-insensitive). Vehicles with no
requirement never match.

```ts
vehicles().byRequirementType("Vehicle Licence").get();
```

### Sorts

#### `.sortByBaseSellPrice(order?: 'asc' | 'desc')`

Sort by base sell price. Defaults to `'desc'` (most valuable first).

---

### Terminal methods

| Method              | Returns                | Description                         |
| ------------------- | ---------------------- | ----------------------------------- |
| `.get()`            | `Vehicle[]`            | All results                         |
| `.first()`          | `Vehicle \| undefined` | First result                        |
| `.find(id)`         | `Vehicle \| undefined` | Find by `id`                        |
| `.findByName(name)` | `Vehicle \| undefined` | Case-insensitive exact name match   |
| `.search(query)`    | `Vehicle[]`            | Case-insensitive partial name match |
| `.count()`          | `number`               | Number of results                   |

---

## Examples

```ts
import { vehicles } from "dinkum-data";

// Everything found in the Deep Mine
vehicles().bySource("Deep Mine").get();

// Every vehicle that needs a Vehicle Licence
vehicles().byRequirementType("Vehicle Licence").get();
```
