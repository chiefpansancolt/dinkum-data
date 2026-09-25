# Decorations

Placeable world decorations grouped by category: paths, fences, benches, bridges, lights, statues,
and more. 265 items are included. Many of these items also appear in
[crafting-recipes](../recipes/crafting-recipes.md) or [furniture](../furniture/README.md); this
module is a curated index across every decoration category shown on the wiki, not a separate source
of truth for those items' prices.

---

## Type

### `Decoration`

| Field         | Type      | Description                                    |
| ------------- | --------- | ---------------------------------------------- |
| id            | string    | Stable identifier                              |
| name          | string    | Display name                                   |
| img           | string    | Path to the item's icon, relative to `images/` |
| category      | string    | Decoration category (see below)                |
| source        | string[]? | Where the item is obtained                     |
| baseSellPrice | number    | Base sell price in Dinks                       |
| buyPrice      | number?   | Purchase price, if purchasable                 |

### `DecorationCategory`

One of: `'Paths & Steps'`, `'Fences & Gates'`, `'Benches'`, `'Bridges'`,
`'Flags, Festoons & Arches'`, `'Flower Beds'`, `'Flowers in Pots'`, `'Ladders'`, `'Lights'`,
`'Market Stalls & Miscellaneous'`, `'Pergolas'`, `'Plush'`, `'Statues'`,
`'Water Fountains & Waterbeds'`, `'Winter Ice Sculpting'`, `'Festive'`.

---

## Factory

```ts
import { decorations } from "dinkum-data";

decorations(); // all 265 items
decorations(source); // wrap a pre-filtered array
```

---

## Methods

### Filters

#### `.byCategory(category: DecorationCategory)`

Filter to decorations belonging to the given category.

```ts
decorations().byCategory("Statues").get();
```

#### `.bySource(source: string)`

Filter to decorations obtainable from the given source (case-insensitive substring match).

```ts
decorations().bySource("Blueprint").get();
```

### Sorts

#### `.sortByBaseSellPrice(order?: 'asc' | 'desc')`

Sort by base sell price. Defaults to `'desc'` (most valuable first).

---

### Terminal methods

| Method              | Returns                   | Description                         |
| ------------------- | ------------------------- | ----------------------------------- |
| `.get()`            | `Decoration[]`            | All results                         |
| `.first()`          | `Decoration \| undefined` | First result                        |
| `.find(id)`         | `Decoration \| undefined` | Find by `id`                        |
| `.findByName(name)` | `Decoration \| undefined` | Case-insensitive exact name match   |
| `.search(query)`    | `Decoration[]`            | Case-insensitive partial name match |
| `.count()`          | `number`                  | Number of results                   |

---

## Examples

```ts
import { decorations } from "dinkum-data";

// Every statue, most valuable first
decorations().byCategory("Statues").sortByBaseSellPrice().get();

// Everything obtainable from a Blueprint
decorations().bySource("Franklyn's Lab").get();
```
