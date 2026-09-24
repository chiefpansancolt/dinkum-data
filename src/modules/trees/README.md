# Trees

Trees found across Dinkum's biomes, including the seed or foragable each grows from and their
regrowth timing. 17 trees are included.

---

## Type

### `Tree`

| Field        | Type               | Description                                        |
| ------------ | ------------------ | -------------------------------------------------- |
| id           | string             | Stable identifier                                  |
| name         | string             | Display name                                       |
| img          | string             | Path to the tree's icon, relative to `images/`     |
| seed         | Seed \| Foragable? | The seed or foragable this tree grows from, if any |
| itemsDropped | Resource[]         | Items harvested from the tree                      |
| locations    | Biome[]?           | Biomes the tree is found in                        |
| growthPeriod | number?            | Days to reach maturity                             |
| regrowth     | number?            | Days between harvests once mature                  |

`Resource` is `{ name: string; img: string; count: number }`.

---

## Factory

```ts
import { trees } from "dinkum-data";

trees(); // all 17 trees
trees(source); // wrap a pre-filtered array
```

---

## Methods

### Filters

#### `.byLocation(biome: Biome)`

Filter to trees found in the given biome. Trees with no `locations` never match.

```ts
trees().byLocation("Pine Forests").get();
```

### Sorts

#### `.sortByGrowthPeriod(order?: 'asc' | 'desc')`

Sort by growth period in days. Defaults to `'asc'` (fastest first). Trees without a `growthPeriod`
sort as 0.

---

### Terminal methods

| Method              | Returns             | Description                         |
| ------------------- | ------------------- | ----------------------------------- |
| `.get()`            | `Tree[]`            | All results                         |
| `.first()`          | `Tree \| undefined` | First result                        |
| `.find(id)`         | `Tree \| undefined` | Find by `id`                        |
| `.findByName(name)` | `Tree \| undefined` | Case-insensitive exact name match   |
| `.search(query)`    | `Tree[]`            | Case-insensitive partial name match |
| `.count()`          | `number`            | Number of results                   |

---

## Examples

```ts
import { trees } from "dinkum-data";

// Every tree in Pine Forests, fastest growing first
trees().byLocation("Pine Forests").sortByGrowthPeriod().get();

// Look up by name
trees().findByName("Apple Tree");
```
