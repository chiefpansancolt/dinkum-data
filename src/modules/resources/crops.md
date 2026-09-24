# Crops

Farmable crops, with the seed each one grows from. 16 crops are included.

---

## Type

### `Crop`

| Field         | Type      | Description                                    |
| ------------- | --------- | ---------------------------------------------- |
| id            | string    | Stable identifier                              |
| name          | string    | Display name                                   |
| img           | string    | Path to the crop's icon, relative to `images/` |
| source        | string[]? | Where the seed is purchased                    |
| baseSellPrice | number    | Base sell price in Dinks                       |
| buyPrice      | number?   | Seed purchase price                            |
| buffs         | Buffs?    | Consumable buff effects, if edible             |
| seed          | Seed?     | The seed this crop grows from                  |

---

## Factory

```ts
import { crops } from "dinkum-data";

crops(); // all 16 crops
crops(source); // wrap a pre-filtered array
```

---

## Methods

### Filters

#### `.bySeason(season: Season)`

Filter to crops whose seed is plantable in the given season. Crops with no `seed` never match.

```ts
crops().bySeason("Summer").get();
```

### Sorts

#### `.sortByBaseSellPrice(order?: 'asc' | 'desc')`

Sort by base sell price. Defaults to `'desc'` (most valuable first).

---

### Terminal methods

| Method              | Returns             | Description                         |
| ------------------- | ------------------- | ----------------------------------- |
| `.get()`            | `Crop[]`            | All results                         |
| `.first()`          | `Crop \| undefined` | First result                        |
| `.find(id)`         | `Crop \| undefined` | Find by `id`                        |
| `.findByName(name)` | `Crop \| undefined` | Case-insensitive exact name match   |
| `.search(query)`    | `Crop[]`            | Case-insensitive partial name match |
| `.count()`          | `number`            | Number of results                   |

---

## Examples

```ts
import { crops } from "dinkum-data";

// Every crop plantable in Summer, most valuable first
crops().bySeason("Summer").sortByBaseSellPrice().get();

// Look up by name
crops().findByName("Beetroot");
```
