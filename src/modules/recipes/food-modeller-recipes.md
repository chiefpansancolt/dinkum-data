# Food Modeller Recipes

Every Food Modeller conversion, turning food and crops into display furniture. 89 recipes are
included.

---

## Type

### `Recipe`

Uses the same shared `Recipe` type as [Crafting Recipes](../recipes/crafting-recipes.md).

| Field         | Type                | Description                                            |
| ------------- | ------------------- | ------------------------------------------------------ |
| id            | string              | Stable identifier                                      |
| name          | string              | Display name                                           |
| img           | string              | Path to the display item's icon, relative to `images/` |
| source        | string[]?           | Where the recipe is obtained                           |
| baseSellPrice | number              | Base sell price in Dinks                               |
| buyPrice      | number?             | Purchase price, if purchasable                         |
| outputCount   | number \| 'Varies'? | Quantity produced per conversion                       |
| variants      | ResourceVariant[]   | Item sets that produce this display piece              |
| buffs         | Buffs?              | Consumable buff effects, if any                        |

---

## Factory

```ts
import { foodModellerRecipes } from "dinkum-data";

foodModellerRecipes(); // all 89 recipes
foodModellerRecipes(source); // wrap a pre-filtered array
```

---

## Methods

### Filters

#### `.bySource(source: string)`

Filter to recipes obtainable from the given source (case-insensitive substring match).

```ts
foodModellerRecipes().bySource("Food Modeller").get();
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
import { foodModellerRecipes } from "dinkum-data";

// Everything the Food Modeller can produce, most valuable first
foodModellerRecipes().sortByBaseSellPrice().get();
```
