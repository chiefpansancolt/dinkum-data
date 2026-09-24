# Clothing

Wearable clothing across every slot, including catalogue availability and set membership. 514 items
are included.

---

## Type

### `Clothing`

| Field            | Type           | Description                                                               |
| ---------------- | -------------- | ------------------------------------------------------------------------- |
| id               | string         | Stable identifier                                                         |
| name             | string         | Display name                                                              |
| img              | string         | Path to the item's icon, relative to `images/`                            |
| source           | string[]?      | Where the item is obtained                                                |
| baseSellPrice    | number         | Base sell price in Dinks                                                  |
| buyPrice         | number?        | Purchase price, if purchasable                                            |
| displayPrice     | number \| null | Price shown at Clover's Catalogue, or `null` if unavailable               |
| cataloguePrice   | number \| null | Actual catalogue purchase price, or `null` if unavailable                 |
| cloversCatalogue | boolean        | Whether the item is available in Clover's Catalogue                       |
| slot             | ClothingSlot[] | Slots the item occupies: `'Head'`, `'Face'`, `'Body'`, `'Legs'`, `'Feet'` |
| type             | string         | Clothing type, e.g. `'Hood'`, `'Shirt'`, `'Boots'`                        |
| set              | string         | Set name, or an empty string if not part of a set                         |

---

## Factory

```ts
import { clothing } from "dinkum-data";

clothing(); // all 514 items
clothing(source); // wrap a pre-filtered array
```

---

## Methods

### Filters

#### `.bySlot(slot: ClothingSlot)`

Filter to clothing that occupies the given slot.

```ts
clothing().bySlot("Head").get();
```

#### `.byType(type: string)`

Filter by clothing type (case-insensitive).

```ts
clothing().byType("Hood").get();
```

#### `.bySet(set: string)`

Filter to clothing belonging to the given set (case-insensitive).

```ts
clothing().bySet("Aurora Set").get();
```

#### `.cloversCatalogue()`

Filter to clothing available in Clover's Catalogue.

```ts
clothing().cloversCatalogue().get();
```

### Sorts

#### `.sortByBaseSellPrice(order?: 'asc' | 'desc')`

Sort by base sell price. Defaults to `'desc'` (most valuable first).

---

### Terminal methods

| Method              | Returns                 | Description                         |
| ------------------- | ----------------------- | ----------------------------------- |
| `.get()`            | `Clothing[]`            | All results                         |
| `.first()`          | `Clothing \| undefined` | First result                        |
| `.find(id)`         | `Clothing \| undefined` | Find by `id`                        |
| `.findByName(name)` | `Clothing \| undefined` | Case-insensitive exact name match   |
| `.search(query)`    | `Clothing[]`            | Case-insensitive partial name match |
| `.count()`          | `number`                | Number of results                   |

---

## Examples

```ts
import { clothing } from "dinkum-data";

// Every hat, most valuable first
clothing().bySlot("Head").sortByBaseSellPrice().get();

// Everything from the Adventure set
clothing().bySet("Aurora Set").get();

// Everything currently in Clover's Catalogue
clothing().cloversCatalogue().get();
```
