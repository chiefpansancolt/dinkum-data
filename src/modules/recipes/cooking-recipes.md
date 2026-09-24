# Cooking Recipes

Every cookable recipe, with ingredients, buffs, and where each recipe sells for the most. 70 recipes
are included.

---

## Type

### `CookingRecipe`

Extends `Recipe`.

| Field            | Type               | Description                                    |
| ---------------- | ------------------ | ---------------------------------------------- |
| id               | string             | Stable identifier                              |
| name             | string             | Display name                                   |
| img              | string             | Path to the dish's icon, relative to `images/` |
| baseSellPrice    | number             | Base sell price in Dinks                       |
| outputCount      | number \| 'Varies' | Quantity produced per craft                    |
| variants         | ResourceVariant[]  | Ingredient sets that produce this recipe       |
| buffs            | Buffs?             | Consumable buff effects                        |
| cookingLocation  | string[]           | Where the recipe can be cooked                 |
| sheilasSellPrice | number?            | Sell price at Sheila's                         |
| tedsSellPrice    | number \| null?    | Sell price at Ted's, if he buys it             |
| jimmysSellPrice  | number?            | Sell price at Jimmy's                          |

`ResourceVariant` is `{ id: string; outputCount?: number; inputs: Resource[] }`.

---

## Factory

```ts
import { cookingRecipes } from "dinkum-data";

cookingRecipes(); // all 70 recipes
cookingRecipes(source); // wrap a pre-filtered array
```

---

## Methods

### Filters

#### `.byLocation(location: string)`

Filter to recipes that can be cooked at the given location (exact match, case-insensitive).

```ts
cookingRecipes().byLocation("Campfire").get();
```

### Sorts

#### `.sortByBaseSellPrice(order?: 'asc' | 'desc')`

Sort by base sell price. Defaults to `'desc'` (most valuable first).

---

### Terminal methods

| Method              | Returns                      | Description                         |
| ------------------- | ---------------------------- | ----------------------------------- |
| `.get()`            | `CookingRecipe[]`            | All results                         |
| `.first()`          | `CookingRecipe \| undefined` | First result                        |
| `.find(id)`         | `CookingRecipe \| undefined` | Find by `id`                        |
| `.findByName(name)` | `CookingRecipe \| undefined` | Case-insensitive exact name match   |
| `.search(query)`    | `CookingRecipe[]`            | Case-insensitive partial name match |
| `.count()`          | `number`                     | Number of results                   |

---

## Examples

```ts
import { cookingRecipes } from "dinkum-data";

// Everything cookable on a Campfire, most valuable first
cookingRecipes().byLocation("Campfire").sortByBaseSellPrice().get();
```
