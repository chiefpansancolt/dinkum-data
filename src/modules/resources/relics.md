# Relics

Relics dug up from junk piles and sold to John or Franklyn. 15 relics are included.

---

## Type

### `Relic`

| Field              | Type     | Description                                     |
| ------------------ | -------- | ----------------------------------------------- |
| id                 | string   | Stable identifier                               |
| name               | string   | Display name                                    |
| img                | string   | Path to the relic's icon, relative to `images/` |
| baseSellPrice      | number   | Base sell price in Dinks                        |
| buyPrice           | number?  | Purchase price, if purchasable                  |
| locations          | string[] | Junk piles or sources the relic can be dug from |
| johnsSellPrice     | number   | Sell price at John's Goods                      |
| franklynsSellPrice | number?  | Sell price to Franklyn, if he buys it           |

---

## Factory

```ts
import { relics } from "dinkum-data";

relics(); // all 15 relics
relics(source); // wrap a pre-filtered array
```

---

## Methods

### Filters

#### `.byLocation(location: string)`

Filter to relics found at the given location (exact match, case-insensitive).

```ts
relics().byLocation("Old Barrel").get();
```

### Sorts

#### `.sortByJohnsSellPrice(order?: 'asc' | 'desc')`

Sort by John's sell price. Defaults to `'desc'` (most valuable first).

### Other

#### `.uniqueLocations()`

Every distinct dig-site location across the current result set, alphabetically sorted. Useful for
building a location filter without hand-maintaining a separate list.

```ts
relics().uniqueLocations(); // ["Car Relic", "Crab Pot", "John's Goods", "Old Barrel", "Satellite", "Wheelie Bin"]
```

---

### Terminal methods

| Method              | Returns              | Description                         |
| ------------------- | -------------------- | ----------------------------------- |
| `.get()`            | `Relic[]`            | All results                         |
| `.first()`          | `Relic \| undefined` | First result                        |
| `.find(id)`         | `Relic \| undefined` | Find by `id`                        |
| `.findByName(name)` | `Relic \| undefined` | Case-insensitive exact name match   |
| `.search(query)`    | `Relic[]`            | Case-insensitive partial name match |
| `.count()`          | `number`             | Number of results                   |

---

## Examples

```ts
import { relics } from "dinkum-data";

// Every relic from an Old Barrel, most valuable first
relics().byLocation("Old Barrel").sortByJohnsSellPrice().get();
```
