# Seeds

Every plantable seed, for crops, trees, and bushes alike, with growth timing and season. 36 seeds
are included.

---

## Type

### `Seed`

| Field          | Type      | Description                                       |
| -------------- | --------- | ------------------------------------------------- |
| id             | string    | Stable identifier                                 |
| name           | string    | Display name                                      |
| img            | string    | Path to the seed's icon, relative to `images/`    |
| source         | string[]? | Where the seed is purchased or obtained           |
| baseSellPrice  | number    | Base sell price in Dinks                          |
| buyPrice       | number?   | Purchase price, if purchasable                    |
| category       | string    | `'Crop Seed'`, `'Tree Seed'`, `'Bush Seed'`, etc. |
| growthPeriod   | number    | Days to reach maturity                            |
| outputCountMin | number?   | Minimum yield per harvest                         |
| outputCountMax | number?   | Maximum yield per harvest                         |
| regrowth       | number?   | Days between harvests once mature                 |
| season         | Season[]  | Seasons the seed can be planted in                |

---

## Factory

```ts
import { seeds } from "dinkum-data";

seeds(); // all 36 seeds
seeds(source); // wrap a pre-filtered array
```

---

## Methods

### Filters

#### `.byCategory(category: string)`

Filter by seed category (exact match, case-insensitive).

```ts
seeds().byCategory("Tree Seed").get();
```

#### `.bySeason(season: Season)`

Filter to seeds plantable in the given season.

```ts
seeds().bySeason("Summer").get();
```

### Sorts

#### `.sortByGrowthPeriod(order?: 'asc' | 'desc')`

Sort by growth period in days. Defaults to `'asc'` (fastest first).

---

### Terminal methods

| Method              | Returns             | Description                         |
| ------------------- | ------------------- | ----------------------------------- |
| `.get()`            | `Seed[]`            | All results                         |
| `.first()`          | `Seed \| undefined` | First result                        |
| `.find(id)`         | `Seed \| undefined` | Find by `id`                        |
| `.findByName(name)` | `Seed \| undefined` | Case-insensitive exact name match   |
| `.search(query)`    | `Seed[]`            | Case-insensitive partial name match |
| `.count()`          | `number`            | Number of results                   |

---

## Examples

```ts
import { seeds } from "dinkum-data";

// Every summer seed, fastest growing first
seeds().bySeason("Summer").sortByGrowthPeriod().get();

// Every tree seed
seeds().byCategory("Tree Seed").get();
```
