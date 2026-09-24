# Paint

Paint colors used for customizing buildings and vehicles. 12 colors are included.

---

## Type

### `Paint`

`Paint` is an alias for `BaseResource`.

| Field         | Type      | Description                                     |
| ------------- | --------- | ----------------------------------------------- |
| id            | string    | Stable identifier                               |
| name          | string    | Display name                                    |
| img           | string    | Path to the paint's icon, relative to `images/` |
| source        | string[]? | Where the paint is obtained                     |
| baseSellPrice | number    | Base sell price in Dinks                        |
| buyPrice      | number?   | Purchase price, if purchasable                  |

---

## Factory

```ts
import { paint } from "dinkum-data";

paint(); // all 12 colors
paint(source); // wrap a pre-filtered array
```

---

## Methods

### Filters

#### `.bySource(source: string)`

Filter to paint obtainable from the given source (case-insensitive substring match). Colors with no
source never match.

```ts
paint().bySource("Deep Mine").get();
```

---

### Terminal methods

| Method              | Returns              | Description                         |
| ------------------- | -------------------- | ----------------------------------- |
| `.get()`            | `Paint[]`            | All results                         |
| `.first()`          | `Paint \| undefined` | First result                        |
| `.find(id)`         | `Paint \| undefined` | Find by `id`                        |
| `.findByName(name)` | `Paint \| undefined` | Case-insensitive exact name match   |
| `.search(query)`    | `Paint[]`            | Case-insensitive partial name match |
| `.count()`          | `number`             | Number of results                   |

---

## Examples

```ts
import { paint } from "dinkum-data";

// Every paint color found in the Deep Mine
paint().bySource("Deep Mine").get();
```
