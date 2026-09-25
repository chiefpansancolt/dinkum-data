# NPCs

Every resident NPC in Dinkum, with their occupation, move-in requirements, and food preferences. 23
NPCs are included.

---

## Type

### `NPC`

| Field                       | Type   | Description                                       |
| --------------------------- | ------ | ------------------------------------------------- |
| id                          | string | Stable identifier                                 |
| name                        | string | Display name                                      |
| img                         | string | Path to the NPC's portrait, relative to `images/` |
| occupation                  | string | Their role in town                                |
| requirements.visit          | string | Requirement to visit the NPC                      |
| requirements.moveIn         | string | Requirement for the NPC to move in                |
| foodPreferences.likes       | string | Favorite food                                     |
| foodPreferences.likesImg    | string | Path to that food's icon                          |
| foodPreferences.dislikes    | string | Disliked food                                     |
| foodPreferences.dislikesImg | string | Path to that food's icon                          |

---

## Factory

```ts
import { npcs } from "dinkum-data";

npcs(); // all 23 NPCs
npcs(source); // wrap a pre-filtered array
```

---

## Methods

### Filters

#### `.byOccupation(text: string)`

Filter to NPCs whose occupation description contains the given text (case-insensitive).

```ts
npcs().byOccupation("quest giver").get();
```

---

### Terminal methods

| Method              | Returns            | Description                         |
| ------------------- | ------------------ | ----------------------------------- |
| `.get()`            | `NPC[]`            | All results                         |
| `.first()`          | `NPC \| undefined` | First result                        |
| `.find(id)`         | `NPC \| undefined` | Find by `id`                        |
| `.findByName(name)` | `NPC \| undefined` | Case-insensitive exact name match   |
| `.search(query)`    | `NPC[]`            | Case-insensitive partial name match |
| `.count()`          | `number`           | Number of results                   |

---

## Examples

```ts
import { npcs } from "dinkum-data";

// Every NPC whose occupation mentions the Town Hall
npcs().byOccupation("Town Hall").get();

// Look up by name
npcs().findByName("Fletch");
```
