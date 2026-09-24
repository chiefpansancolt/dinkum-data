# Weapons

Melee and ranged weapons, with their damage and source. 30 weapons are included.

---

## Type

### `Weapon`

| Field         | Type           | Description                                      |
| ------------- | -------------- | ------------------------------------------------ |
| id            | string         | Stable identifier                                |
| name          | string         | Display name                                     |
| img           | string         | Path to the weapon's icon, relative to `images/` |
| source        | string[]       | Where the weapon is obtained                     |
| baseSellPrice | number         | Base sell price in Dinks                         |
| buyPrice      | number?        | Purchase price, if purchasable                   |
| damage        | number \| null | Damage dealt                                     |
| licenceLevel  | number \| null | License level required, or `null` if none        |
| inputs        | Resource[]?    | Crafting inputs                                  |
| buyUnits      | BuyUnits?      | `'Dinks'` or `'Permit Points'`, when purchasable |

`Resource` is `{ name: string; img: string; count: number }`.

---

## Factory

```ts
import { weapons } from "dinkum-data";

weapons(); // all 30 weapons
weapons(source); // wrap a pre-filtered array
```

---

## Methods

### Filters

#### `.bySource(source: string)`

Filter to weapons obtainable from the given source (case-insensitive substring match).

```ts
weapons().bySource("Ted Selly").get();
```

### Sorts

#### `.sortByDamage(order?: 'asc' | 'desc')`

Sort by damage. Defaults to `'desc'` (strongest first).

---

### Terminal methods

| Method              | Returns               | Description                         |
| ------------------- | --------------------- | ----------------------------------- |
| `.get()`            | `Weapon[]`            | All results                         |
| `.first()`          | `Weapon \| undefined` | First result                        |
| `.find(id)`         | `Weapon \| undefined` | Find by `id`                        |
| `.findByName(name)` | `Weapon \| undefined` | Case-insensitive exact name match   |
| `.search(query)`    | `Weapon[]`            | Case-insensitive partial name match |
| `.count()`          | `number`              | Number of results                   |

---

## Examples

```ts
import { weapons } from "dinkum-data";

// Everything sold by Ted Selly, strongest first
weapons().bySource("Ted Selly").sortByDamage().get();

// The strongest weapon in the game
weapons().sortByDamage().first();
```
