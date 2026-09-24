# Other Craftables

Miscellaneous craftable resources that don't fit the recipe categories, such as processed goods from
the Crusher, Stone Grinder, and Grain Mill. 32 items are included.

---

## Type

### `Recipe`

Uses the same shared `Recipe` type as [Crafting Recipes](../recipes/crafting-recipes.md).

| Field         | Type                | Description                                    |
| ------------- | ------------------- | ---------------------------------------------- |
| id            | string              | Stable identifier                              |
| name          | string              | Display name                                   |
| img           | string              | Path to the item's icon, relative to `images/` |
| source        | string[]?           | The machine or process that produces it        |
| baseSellPrice | number              | Base sell price in Dinks                       |
| buyPrice      | number?             | Purchase price, if purchasable                 |
| outputCount   | number \| 'Varies'? | Quantity produced per craft                    |
| variants      | ResourceVariant[]   | Ingredient sets that produce this item         |
| buffs         | Buffs?              | Consumable buff effects, if any                |

---

## Factory

```ts
import { otherCraftables } from "dinkum-data";

otherCraftables(); // all 32 items
otherCraftables(source); // wrap a pre-filtered array
```

---

## Methods

### Filters

#### `.bySource(source: string)`

Filter to craftables obtainable from the given source (case-insensitive substring match). Items with
no source never match.

```ts
otherCraftables().bySource("Crusher").get();
```

---

### Terminal methods

| Method              | Returns               | Description                         |
| ------------------- | --------------------- | ----------------------------------- |
| `.get()`            | `Recipe[]`            | All results                         |
| `.first()`          | `Recipe \| undefined` | First result                        |
| `.find(id)`         | `Recipe \| undefined` | Find by `id`                        |
| `.findByName(name)` | `Recipe \| undefined` | Case-insensitive exact name match   |
| `.search(query)`    | `Recipe[]`            | Case-insensitive partial name match |
| `.count()`          | `number`              | Number of results                   |

---

## Examples

```ts
import { otherCraftables } from "dinkum-data";

// Everything produced by the Crusher
otherCraftables().bySource("Crusher").get();
```
