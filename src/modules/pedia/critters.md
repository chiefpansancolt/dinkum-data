# Critters

Museum-donatable critters, with biome, rarity, season, and time-of-day data. 25 critters are
included.

---

## Type

### `Critter`

`Critter` is an alias for `PediaItem`.

| Field         | Type         | Description                                                          |
| ------------- | ------------ | -------------------------------------------------------------------- |
| id            | string       | Stable identifier                                                    |
| name          | string       | Display name                                                         |
| img           | string       | Path to the critter's icon, relative to `images/`                    |
| source        | string[]?    | Where the critter is obtained                                        |
| baseSellPrice | number       | Base sell price in Dinks                                             |
| buyPrice      | number?      | Purchase price, if purchasable                                       |
| biome         | Biome[]      | Biomes the critter is found in                                       |
| timeFound     | TimePeriod[] | Times of day the critter is active                                   |
| seasons       | Season[]     | Seasons the critter is active                                        |
| rarity        | RarityLevel  | `'Common'`, `'Uncommon'`, `'Rare'`, `'Very Rare'`, or `'Super Rare'` |

---

## Factory

```ts
import { critters } from "dinkum-data";

critters(); // all 25 critters
critters(source); // wrap a pre-filtered array
```

---

## Methods

### Filters

#### `.byBiome(biome: Biome)`

Filter to critters found in the given biome.

```ts
critters().byBiome("Beach").get();
```

#### `.byRarity(rarity: RarityLevel)`

Filter by rarity.

```ts
critters().byRarity("Rare").get();
```

#### `.bySeason(season: Season)`

Filter to critters active in the given season.

```ts
critters().bySeason("Winter").get();
```

#### `.byTime(time: TimePeriod)`

Filter to critters active during the given time period.

```ts
critters().byTime("Day").get();
```

### Sorts

#### `.sortByBaseSellPrice(order?: 'asc' | 'desc')`

Sort by base sell price. Defaults to `'desc'` (most valuable first).

---

### Terminal methods

| Method              | Returns                | Description                         |
| ------------------- | ---------------------- | ----------------------------------- |
| `.get()`            | `Critter[]`            | All results                         |
| `.first()`          | `Critter \| undefined` | First result                        |
| `.find(id)`         | `Critter \| undefined` | Find by `id`                        |
| `.findByName(name)` | `Critter \| undefined` | Case-insensitive exact name match   |
| `.search(query)`    | `Critter[]`            | Case-insensitive partial name match |
| `.count()`          | `number`               | Number of results                   |

---

## Examples

```ts
import { critters } from "dinkum-data";

// Rare critters found on the Beach
critters().byBiome("Beach").byRarity("Rare").get();

// Most valuable critters
critters().sortByBaseSellPrice().get();
```
