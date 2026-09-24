# Fish

Museum-donatable and cookable fish, with biome, rarity, season, and time-of-day data. 45 fish are
included.

---

## Type

### `Fish`

Extends `PediaItem` with cooked-value fields.

| Field         | Type         | Description                                                          |
| ------------- | ------------ | -------------------------------------------------------------------- |
| id            | string       | Stable identifier                                                    |
| name          | string       | Display name                                                         |
| img           | string       | Path to the fish's icon, relative to `images/`                       |
| source        | string[]?    | Where the fish is caught                                             |
| baseSellPrice | number       | Base (raw) sell price in Dinks                                       |
| buyPrice      | number?      | Purchase price, if purchasable                                       |
| biome         | Biome[]      | Biomes the fish is found in                                          |
| timeFound     | TimePeriod[] | Times of day the fish is active                                      |
| seasons       | Season[]     | Seasons the fish is active                                           |
| rarity        | RarityLevel  | `'Common'`, `'Uncommon'`, `'Rare'`, `'Very Rare'`, or `'Super Rare'` |
| cookedPrice   | number       | Sell price once cooked                                               |
| cookedPieces  | number       | Number of cooked pieces yielded                                      |

---

## Factory

```ts
import { fish } from "dinkum-data";

fish(); // all 45 fish
fish(source); // wrap a pre-filtered array
```

---

## Methods

### Filters

#### `.byBiome(biome: Biome)`

Filter to fish found in the given biome.

```ts
fish().byBiome("Ocean").get();
```

#### `.byRarity(rarity: RarityLevel)`

Filter by rarity.

```ts
fish().byRarity("Rare").get();
```

#### `.bySeason(season: Season)`

Filter to fish available in the given season.

```ts
fish().bySeason("Summer").get();
```

#### `.byTime(time: TimePeriod)`

Filter to fish caught during the given time period.

```ts
fish().byTime("Morning").get();
```

### Sorts

#### `.sortByBaseSellPrice(order?: 'asc' | 'desc')`

Sort by raw (uncooked) base sell price. Defaults to `'desc'` (most valuable first).

#### `.sortByCookedPrice(order?: 'asc' | 'desc')`

Sort by cooked sell price. Defaults to `'desc'` (most valuable first).

---

### Terminal methods

| Method              | Returns             | Description                         |
| ------------------- | ------------------- | ----------------------------------- |
| `.get()`            | `Fish[]`            | All results                         |
| `.first()`          | `Fish \| undefined` | First result                        |
| `.find(id)`         | `Fish \| undefined` | Find by `id`                        |
| `.findByName(name)` | `Fish \| undefined` | Case-insensitive exact name match   |
| `.search(query)`    | `Fish[]`            | Case-insensitive partial name match |
| `.count()`          | `number`            | Number of results                   |

---

## Examples

```ts
import { fish } from "dinkum-data";

// Every summer fish, best cooked sell price first
fish().bySeason("Summer").sortByCookedPrice().get();

// Rare ocean fish
fish().byBiome("Ocean").byRarity("Rare").get();
```
