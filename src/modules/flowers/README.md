# Flowers

Flowers found across Dinkum's biomes, including the seed or foragable each grows from. 43 flowers
are included.

---

## Type

### `Flower`

| Field         | Type               | Description                                          |
| ------------- | ------------------ | ---------------------------------------------------- |
| id            | string             | Stable identifier                                    |
| name          | string             | Display name                                         |
| img           | string             | Path to the flower's icon, relative to `images/`     |
| source        | string[]?          | Where the flower is obtained                         |
| baseSellPrice | number             | Base sell price in Dinks                             |
| buyPrice      | number?            | Purchase price, if purchasable                       |
| seed          | Seed \| Foragable? | The seed or foragable this flower grows from, if any |
| itemsDropped  | Resource[]?        | Items produced when harvested                        |
| locations     | Biome[]            | Biomes the flower is found in                        |
| conditions    | string?            | Special growing conditions                           |
| growthPeriod  | number?            | Days to reach maturity                               |
| regrowth      | number?            | Days between harvests once mature                    |

`Resource` is `{ name: string; img: string; count: number }`.

---

## Factory

```ts
import { flowers } from "dinkum-data";

flowers(); // all 43 flowers
flowers(source); // wrap a pre-filtered array
```

---

## Methods

### Filters

#### `.byLocation(biome: Biome)`

Filter to flowers found in the given biome.

```ts
flowers().byLocation("Plains").get();
```

### Sorts

#### `.sortByGrowthPeriod(order?: 'asc' | 'desc')`

Sort by growth period in days. Defaults to `'asc'` (fastest first). Flowers without a `growthPeriod`
sort as 0.

---

### Terminal methods

| Method              | Returns               | Description                         |
| ------------------- | --------------------- | ----------------------------------- |
| `.get()`            | `Flower[]`            | All results                         |
| `.first()`          | `Flower \| undefined` | First result                        |
| `.find(id)`         | `Flower \| undefined` | Find by `id`                        |
| `.findByName(name)` | `Flower \| undefined` | Case-insensitive exact name match   |
| `.search(query)`    | `Flower[]`            | Case-insensitive partial name match |
| `.count()`          | `number`              | Number of results                   |

---

## Examples

```ts
import { flowers } from "dinkum-data";

// Every flower in Bushlands, fastest-growing first
flowers().byLocation("Bushlands").sortByGrowthPeriod().get();

// Look up by name
flowers().findByName("Billy Button");
```
