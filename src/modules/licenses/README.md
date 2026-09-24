# Licenses

Every purchasable license and its level progression, permit point costs, and unlock descriptions. 25
licenses are included.

---

## Types

### `License`

| Field        | Type           | Description                                       |
| ------------ | -------------- | ------------------------------------------------- |
| id           | string         | Stable identifier                                 |
| name         | string         | Display name                                      |
| img          | string         | Path to the license's icon, relative to `images/` |
| requirements | string         | What the license requires to obtain               |
| levels       | LicenseLevel[] | Every level of the license                        |

### `LicenseLevel`

| Field           | Type   | Description                              |
| --------------- | ------ | ---------------------------------------- |
| level           | number | Level number                             |
| skillLevel      | number | Skill level required to reach this level |
| permitPointCost | number | Permit points required to purchase       |
| description     | string | What this level unlocks                  |

---

## Factory

```ts
import { licenses } from "dinkum-data";

licenses(); // all 25 licenses
licenses(source); // wrap a pre-filtered array
```

---

## Methods

#### `.totalPermitPoints()`

Total permit points required across every level of every license in the current result set.

```ts
licenses().totalPermitPoints();
```

### Sorts

#### `.sortByLevelCount(order?: 'asc' | 'desc')`

Sort by number of levels. Defaults to `'desc'` (most levels first).

---

### Terminal methods

| Method              | Returns                | Description                         |
| ------------------- | ---------------------- | ----------------------------------- |
| `.get()`            | `License[]`            | All results                         |
| `.first()`          | `License \| undefined` | First result                        |
| `.find(id)`         | `License \| undefined` | Find by `id`                        |
| `.findByName(name)` | `License \| undefined` | Case-insensitive exact name match   |
| `.search(query)`    | `License[]`            | Case-insensitive partial name match |
| `.count()`          | `number`               | Number of results                   |

---

## Examples

```ts
import { licenses } from "dinkum-data";

// Total permit points needed to max out every license in the game
licenses().totalPermitPoints();

// The license with the most levels
licenses().sortByLevelCount().first();

// Look up by name
licenses().findByName("Mining Licence");
```
