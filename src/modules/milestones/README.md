# Milestones

Every long-term milestone achievement and its level progression. 98 milestones are included.

---

## Types

### `Milestone`

| Field       | Type             | Description                                         |
| ----------- | ---------------- | --------------------------------------------------- |
| id          | string           | Stable identifier                                   |
| name        | string           | Display name                                        |
| img         | string           | Path to the milestone's icon, relative to `images/` |
| description | string           | Flavour text describing the milestone               |
| levels      | MilestoneLevel[] | Every level of the milestone                        |

### `MilestoneLevel`

| Field        | Type    | Description                             |
| ------------ | ------- | --------------------------------------- |
| level        | number  | Level number                            |
| count        | number  | Count required to reach this level      |
| permitPoints | number  | Permit points awarded on completion     |
| unit         | string? | Unit label for the count, if applicable |

---

## Factory

```ts
import { milestones } from "dinkum-data";

milestones(); // all 98 milestones
milestones(source); // wrap a pre-filtered array
```

---

## Methods

#### `.totalPermitPoints()`

Total permit points awarded across every level of every milestone in the current result set.

```ts
milestones().totalPermitPoints();
```

### Sorts

#### `.sortByLevelCount(order?: 'asc' | 'desc')`

Sort by number of levels. Defaults to `'desc'` (most levels first).

---

### Terminal methods

| Method              | Returns                  | Description                         |
| ------------------- | ------------------------ | ----------------------------------- |
| `.get()`            | `Milestone[]`            | All results                         |
| `.first()`          | `Milestone \| undefined` | First result                        |
| `.find(id)`         | `Milestone \| undefined` | Find by `id`                        |
| `.findByName(name)` | `Milestone \| undefined` | Case-insensitive exact name match   |
| `.search(query)`    | `Milestone[]`            | Case-insensitive partial name match |
| `.count()`          | `number`                 | Number of results                   |

---

## Examples

```ts
import { milestones } from "dinkum-data";

// Total permit points available from every milestone in the game
milestones().totalPermitPoints();

// Look up by name
milestones().findByName("Alpha Hunter");
```
