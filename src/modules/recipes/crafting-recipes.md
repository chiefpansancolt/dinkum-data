# Crafting Recipes

Every craftable recipe and its unlock source. 235 recipes are included.

---

## Type

### `Recipe`

| Field         | Type                | Description                                    |
| ------------- | ------------------- | ---------------------------------------------- |
| id            | string              | Stable identifier                              |
| name          | string              | Display name                                   |
| img           | string              | Path to the item's icon, relative to `images/` |
| source        | string[]?           | Where the recipe is unlocked                   |
| baseSellPrice | number              | Base sell price in Dinks                       |
| buyPrice      | number?             | Purchase price, if purchasable                 |
| outputCount   | number \| 'Varies'? | Quantity produced per craft                    |
| variants      | ResourceVariant[]   | Ingredient sets that produce this item         |
| buffs         | Buffs?              | Consumable buff effects, if any                |

`ResourceVariant` is `{ id: string; outputCount?: number; inputs: Resource[] }`.

---

## Factory

```ts
import { craftingRecipes } from "dinkum-data";

craftingRecipes(); // all 235 recipes
craftingRecipes(source); // wrap a pre-filtered array
```

---

## Methods

### Filters

#### `.bySource(source: string)`

Filter to recipes obtainable from the given source (case-insensitive substring match).

```ts
craftingRecipes().bySource("Building Licence").get();
```

### Sorts

#### `.sortByBaseSellPrice(order?: 'asc' | 'desc')`

Sort by base sell price. Defaults to `'desc'` (most valuable first).

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
import { craftingRecipes } from "dinkum-data";

// Everything unlocked through a Building Licence
craftingRecipes().bySource("Building Licence").get();
```
