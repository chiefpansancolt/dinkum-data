# Trophies

Trophies awarded from Bug Catching and Fish Catching Competitions. 6 trophies are included.

---

## Type

### `Trophy`

`Trophy` is an alias for `BaseResource`.

| Field         | Type      | Description                                      |
| ------------- | --------- | ------------------------------------------------ |
| id            | string    | Stable identifier                                |
| name          | string    | Display name                                     |
| img           | string    | Path to the trophy's icon, relative to `images/` |
| source        | string[]? | The competition the trophy is awarded from       |
| baseSellPrice | number    | Base sell price in Dinks                         |
| buyPrice      | number?   | Purchase price, if purchasable                   |

---

## Factory

```ts
import { trophies } from "dinkum-data";

trophies(); // all 6 trophies
trophies(source); // wrap a pre-filtered array
```

---

### Terminal methods

| Method              | Returns               | Description                         |
| ------------------- | --------------------- | ----------------------------------- |
| `.get()`            | `Trophy[]`            | All results                         |
| `.first()`          | `Trophy \| undefined` | First result                        |
| `.find(id)`         | `Trophy \| undefined` | Find by `id`                        |
| `.findByName(name)` | `Trophy \| undefined` | Case-insensitive exact name match   |
| `.search(query)`    | `Trophy[]`            | Case-insensitive partial name match |
| `.count()`          | `number`              | Number of results                   |

---

## Examples

```ts
import { trophies } from "dinkum-data";

trophies().get();
trophies().findByName("Gold Bug Comp Trophy");
```
