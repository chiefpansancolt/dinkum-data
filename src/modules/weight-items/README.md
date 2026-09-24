# Weight Items

Items sold by weight rather than by unit, with their price per kilogram and weight range, for the
Weight Calculator. 12 items are included.

---

## Type

### `WeightItem`

| Field      | Type   | Description                                    |
| ---------- | ------ | ---------------------------------------------- |
| id         | string | Stable identifier                              |
| name       | string | Display name                                   |
| img        | string | Path to the item's icon, relative to `images/` |
| pricePerKg | number | Sell price per kilogram in Dinks               |
| minWeight  | number | Minimum weight in kilograms                    |
| maxWeight  | number | Maximum weight in kilograms                    |

---

## Factory

```ts
import { weightItems } from "dinkum-data";

weightItems(); // all 12 items
weightItems(source); // wrap a pre-filtered array
```

---

## Methods

### Sorts

#### `.sortByPricePerKg(order?: 'asc' | 'desc')`

Sort by price per kilogram. Defaults to `'desc'` (most valuable first).

---

### Terminal methods

| Method              | Returns                   | Description                         |
| ------------------- | ------------------------- | ----------------------------------- |
| `.get()`            | `WeightItem[]`            | All results                         |
| `.first()`          | `WeightItem \| undefined` | First result                        |
| `.find(id)`         | `WeightItem \| undefined` | Find by `id`                        |
| `.findByName(name)` | `WeightItem \| undefined` | Case-insensitive exact name match   |
| `.search(query)`    | `WeightItem[]`            | Case-insensitive partial name match |
| `.count()`          | `number`                  | Number of results                   |

---

## Examples

```ts
import { weightItems } from "dinkum-data";

// Estimate the sell value of a weighed item
const item = weightItems().findByName("Aquamarine")!;
const estimate = item.pricePerKg * item.maxWeight;

// Most valuable weighed items per kilogram
weightItems().sortByPricePerKg().get();
```
