# Bugs

Museum-donatable bugs, with biome, rarity, season, and time-of-day data. 50 bugs are included.

---

## Type

### `Bug`

`Bug` is an alias for `PediaItem`.

| Field         | Type         | Description                                                                           |
| ------------- | ------------ | ------------------------------------------------------------------------------------- |
| id            | string       | Stable identifier                                                                     |
| name          | string       | Display name                                                                          |
| img           | string       | Path to the bug's icon, relative to `images/`                                         |
| source        | string[]?    | Where the bug is obtained                                                             |
| baseSellPrice | number       | Base sell price in Dinks                                                              |
| buyPrice      | number?      | Purchase price, if purchasable                                                        |
| biome         | Biome[]      | Biomes the bug is found in                                                            |
| timeFound     | TimePeriod[] | Times of day the bug is active: `'Morning'`, `'Day'`, `'Evening'`, `'Night'`, `'All'` |
| seasons       | Season[]     | Seasons the bug is active                                                             |
| rarity        | RarityLevel  | `'Common'`, `'Uncommon'`, `'Rare'`, `'Very Rare'`, or `'Super Rare'`                  |

---

## Factory

```ts
import { bugs } from "dinkum-data";

bugs(); // all 50 bugs
bugs(source); // wrap a pre-filtered array
```

---

## Methods

### Filters

#### `.byBiome(biome: Biome)`

Filter to bugs found in the given biome.

```ts
bugs().byBiome("Pine Forests").get();
```

#### `.byRarity(rarity: RarityLevel)`

Filter by rarity.

```ts
bugs().byRarity("Super Rare").get();
```

#### `.bySeason(season: Season)`

Filter to bugs active in the given season.

```ts
bugs().bySeason("Summer").get();
```

#### `.byTime(time: TimePeriod)`

Filter to bugs active during the given time period.

```ts
bugs().byTime("Night").get();
```

### Sorts

#### `.sortByBaseSellPrice(order?: 'asc' | 'desc')`

Sort by base sell price. Defaults to `'desc'` (most valuable first).

---

### Terminal methods

| Method              | Returns            | Description                         |
| ------------------- | ------------------ | ----------------------------------- |
| `.get()`            | `Bug[]`            | All results                         |
| `.first()`          | `Bug \| undefined` | First result                        |
| `.find(id)`         | `Bug \| undefined` | Find by `id`                        |
| `.findByName(name)` | `Bug \| undefined` | Case-insensitive exact name match   |
| `.search(query)`    | `Bug[]`            | Case-insensitive partial name match |
| `.count()`          | `number`           | Number of results                   |

---

## Examples

```ts
import { bugs } from "dinkum-data";

// Super rare bugs active at night in Autumn
bugs().byRarity("Super Rare").byTime("Night").bySeason("Autumn").get();

// Most valuable bugs
bugs().sortByBaseSellPrice().get();
```
