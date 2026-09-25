# Sign Writing Recipes

Every Sign Writing recipe and its license unlock level. 17 recipes are included.

---

## Type

### `Recipe`

Uses the same shared `Recipe` type as [Crafting Recipes](../recipes/crafting-recipes.md).

| Field         | Type                | Description                                    |
| ------------- | ------------------- | ---------------------------------------------- |
| id            | string              | Stable identifier                              |
| name          | string              | Display name                                   |
| img           | string              | Path to the sign's icon, relative to `images/` |
| source        | string[]?           | License level required to unlock               |
| baseSellPrice | number              | Base sell price in Dinks                       |
| buyPrice      | number?             | Purchase price, if purchasable                 |
| outputCount   | number \| 'Varies'? | Quantity produced per craft                    |
| variants      | ResourceVariant[]   | Ingredient sets that produce this sign         |
| buffs         | Buffs?              | Consumable buff effects, if any                |

---

## Factory

```ts
import { signWritingRecipes } from "dinkum-data";

signWritingRecipes(); // all 14 recipes
signWritingRecipes(source); // wrap a pre-filtered array
```

---

## Methods

### Filters

#### `.bySource(source: string)`

Filter to recipes obtainable from the given source (case-insensitive substring match).

```ts
signWritingRecipes().bySource("Sign Writing Licence Level 1").get();
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
import { signWritingRecipes } from "dinkum-data";

// Everything unlocked at the first Sign Writing Licence level
signWritingRecipes().bySource("Sign Writing Licence Level 1").get();
```
