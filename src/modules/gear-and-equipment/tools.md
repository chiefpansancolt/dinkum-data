# Tools

Gathering and combat tools, with the license and source needed to unlock each. 89 tools are
included.

---

## Type

### `Tool`

| Field             | Type           | Description                                      |
| ----------------- | -------------- | ------------------------------------------------ |
| id                | string         | Stable identifier                                |
| name              | string         | Display name                                     |
| img               | string         | Path to the tool's icon, relative to `images/`   |
| source            | string[]       | Where the tool is obtained                       |
| baseSellPrice     | number         | Base sell price in Dinks                         |
| buyPrice          | number?        | Purchase price, if purchasable                   |
| damage            | number \| null | Damage dealt, or `null` for non-combat tools     |
| licence           | string         | License required to buy or use the tool          |
| shinyDiscCount    | number?        | Shiny Discs required to craft                    |
| berkoniumOreCount | number?        | Berkonium Ore required to craft                  |
| inputs            | Resource[]?    | Other crafting inputs                            |
| buyUnits          | BuyUnits?      | `'Dinks'` or `'Permit Points'`, when purchasable |

`Resource` is `{ name: string; img: string; count: number }`.

---

## Factory

```ts
import { tools } from "dinkum-data";

tools(); // all 89 tools
tools(source); // wrap a pre-filtered array
```

---

## Methods

### Filters

#### `.byLicence(licence: string)`

Filter to tools that require the given license (exact match, case-insensitive).

```ts
tools().byLicence("Mining").get();
```

#### `.bySource(source: string)`

Filter to tools obtainable from the given source (case-insensitive substring match).

```ts
tools().bySource("John's Goods").get();
```

### Sorts

#### `.sortByDamage(order?: 'asc' | 'desc')`

Sort by damage. Defaults to `'desc'` (strongest first). Tools with no damage (e.g. gathering tools)
sort as 0.

---

### Terminal methods

| Method              | Returns             | Description                         |
| ------------------- | ------------------- | ----------------------------------- |
| `.get()`            | `Tool[]`            | All results                         |
| `.first()`          | `Tool \| undefined` | First result                        |
| `.find(id)`         | `Tool \| undefined` | Find by `id`                        |
| `.findByName(name)` | `Tool \| undefined` | Case-insensitive exact name match   |
| `.search(query)`    | `Tool[]`            | Case-insensitive partial name match |
| `.count()`          | `number`            | Number of results                   |

---

## Examples

```ts
import { tools } from "dinkum-data";

// Every Mining-license tool
tools().byLicence("Mining").get();

// Strongest combat tools
tools().sortByDamage().get();
```
