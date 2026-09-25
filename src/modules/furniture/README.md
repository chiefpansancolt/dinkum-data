# Furniture

Placeable furniture for houses and buildings, including catalogue pricing and set membership. 443
items are included.

---

## Type

### `Furniture`

| Field            | Type      | Description                                         |
| ---------------- | --------- | --------------------------------------------------- |
| id               | string    | Stable identifier                                   |
| name             | string    | Display name                                        |
| img              | string    | Path to the item's icon, relative to `images/`      |
| source           | string[]? | Where the item is obtained                          |
| baseSellPrice    | number    | Base sell price in Dinks                            |
| buyPrice         | number?   | Purchase price, if purchasable                      |
| displayPrice     | number?   | Price shown at Melvin's Catalogue                   |
| cataloguePrice   | number?   | Actual catalogue purchase price                     |
| melvinsCatalogue | boolean   | Whether the item is available in Melvin's Catalogue |
| furnitureSet     | string?   | Set the item belongs to, if any                     |

---

## Factory

```ts
import { furniture } from "dinkum-data";

furniture(); // all 443 items
furniture(source); // wrap a pre-filtered array
```

---

## Methods

### Filters

#### `.bySet(set: string)`

Filter to furniture belonging to the given set (case-insensitive). Items with no set never match.

```ts
furniture().bySet("Cabin Set").get();
```

#### `.bySource(source: string)`

Filter to furniture obtainable from the given source (case-insensitive substring match).

```ts
furniture().bySource("Recycling Bin").get();
```

#### `.melvinsCatalogue()`

Filter to furniture available in Melvin's Catalogue.

```ts
furniture().melvinsCatalogue().get();
```

### Sorts

#### `.sortByBaseSellPrice(order?: 'asc' | 'desc')`

Sort by base sell price. Defaults to `'desc'` (most valuable first).

---

### Terminal methods

| Method              | Returns                  | Description                         |
| ------------------- | ------------------------ | ----------------------------------- |
| `.get()`            | `Furniture[]`            | All results                         |
| `.first()`          | `Furniture \| undefined` | First result                        |
| `.find(id)`         | `Furniture \| undefined` | Find by `id`                        |
| `.findByName(name)` | `Furniture \| undefined` | Case-insensitive exact name match   |
| `.search(query)`    | `Furniture[]`            | Case-insensitive partial name match |
| `.count()`          | `number`                 | Number of results                   |

---

## Examples

```ts
import { furniture } from "dinkum-data";

// Everything in Melvin's Catalogue, most valuable first
furniture().melvinsCatalogue().sortByBaseSellPrice().get();

// Everything obtainable from the Recycling Bin
furniture().bySource("Recycling Bin").get();
```
