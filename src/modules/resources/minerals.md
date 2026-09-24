# Minerals

Ores, gemstones, and other minerals, with the biomes they're found in. 15 minerals are included.

---

## Type

### `Mineral`

| Field         | Type      | Description                                       |
| ------------- | --------- | ------------------------------------------------- |
| id            | string    | Stable identifier                                 |
| name          | string    | Display name                                      |
| img           | string    | Path to the mineral's icon, relative to `images/` |
| source        | string[]? | How the mineral is obtained, if not simply mined  |
| baseSellPrice | number    | Base sell price in Dinks                          |
| buyPrice      | number?   | Purchase price, if purchasable                    |
| locations     | Biome[]?  | Biomes the mineral is found in                    |

---

## Factory

```ts
import { minerals } from "dinkum-data";

minerals(); // all 15 minerals
minerals(source); // wrap a pre-filtered array
```

---

## Methods

### Filters

#### `.byLocation(biome: Biome)`

Filter to minerals found in the given biome. Minerals with no `locations` never match.

```ts
minerals().byLocation("Island Reef").get();
```

---

### Terminal methods

| Method              | Returns                | Description                         |
| ------------------- | ---------------------- | ----------------------------------- |
| `.get()`            | `Mineral[]`            | All results                         |
| `.first()`          | `Mineral \| undefined` | First result                        |
| `.find(id)`         | `Mineral \| undefined` | Find by `id`                        |
| `.findByName(name)` | `Mineral \| undefined` | Case-insensitive exact name match   |
| `.search(query)`    | `Mineral[]`            | Case-insensitive partial name match |
| `.count()`          | `number`               | Number of results                   |

---

## Examples

```ts
import { minerals } from "dinkum-data";

// Every mineral found in the Island Reef
minerals().byLocation("Island Reef").get();

// Look up by name
minerals().findByName("Berkonium Ore");
```
