# Buildings

Deeds and collectable/movable buildings available in Dinkum, with their construction costs. 31
buildings are included.

---

## Type

### `Building`

| Field          | Type       | Description                                             |
| -------------- | ---------- | ------------------------------------------------------- |
| id             | string     | Stable identifier                                       |
| name           | string     | Display name                                            |
| img            | string     | Path to the building's icon, relative to `images/`      |
| deedName       | string     | Name of the deed item required to place the building    |
| size           | string     | Footprint, e.g. `"6x5"`                                 |
| npc            | string     | NPC associated with the building                        |
| npcImg         | string     | Path to that NPC's portrait                             |
| description    | string     | Unlock condition or flavour text                        |
| buildTime      | string     | How many nights construction takes                      |
| deedPrice      | number     | Purchase price of the deed in Dinks                     |
| deedType       | DeedType   | `'Collectable'`, `'Movable'`, or `'Reference'`          |
| inputs         | Resource[] | Materials required to build                             |
| operatingHours | string[]   | Hours the building's associated shop or service is open |
| daysClosed     | string     | Days the building is closed, if any                     |

`Resource` is `{ name: string; img: string; count: number }`.

---

## Factory

```ts
import { buildings } from "dinkum-data";

buildings(); // all 31 buildings
buildings(source); // wrap a pre-filtered array
```

---

## Methods

### Filters

#### `.byDeedType(type: DeedType)`

Filter by deed type.

```ts
buildings().byDeedType("Collectable").get();
```

#### `.byNPC(npc: string)`

Filter to buildings tied to the given NPC (exact match, case-insensitive).

```ts
buildings().byNPC("Nancy").get();
```

### Sorts

#### `.sortByDeedPrice(order?: 'asc' | 'desc')`

Sort by deed price. Defaults to `'asc'` (cheapest first).

---

### Terminal methods

| Method              | Returns                 | Description                         |
| ------------------- | ----------------------- | ----------------------------------- |
| `.get()`            | `Building[]`            | All results                         |
| `.first()`          | `Building \| undefined` | First result                        |
| `.find(id)`         | `Building \| undefined` | Find by `id`                        |
| `.findByName(name)` | `Building \| undefined` | Case-insensitive exact name match   |
| `.search(query)`    | `Building[]`            | Case-insensitive partial name match |
| `.count()`          | `number`                | Number of results                   |

---

## Examples

```ts
import { buildings } from "dinkum-data";

// Every Collectable building, cheapest first
buildings().byDeedType("Collectable").sortByDeedPrice().get();

// Everything tied to Nancy
buildings().byNPC("Nancy").get();

// Look up by name
buildings().findByName("Airport");
```
