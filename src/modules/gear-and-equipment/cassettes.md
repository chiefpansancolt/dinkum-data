# Cassettes

Music cassettes and their purchase price and source. 15 cassettes are included.

---

## Type

### `Cassette`

| Field    | Type     | Description                                        |
| -------- | -------- | -------------------------------------------------- |
| id       | string   | Stable identifier                                  |
| name     | string   | Display name                                       |
| img      | string   | Path to the cassette's icon, relative to `images/` |
| buyPrice | number   | Purchase price in Dinks                            |
| source   | string[] | Where the cassette is sold                         |

---

## Factory

```ts
import { cassettes } from "dinkum-data";

cassettes(); // all 15 cassettes
cassettes(source); // wrap a pre-filtered array
```

---

## Methods

### Filters

#### `.bySource(source: string)`

Filter to cassettes obtainable from the given source (case-insensitive substring match).

```ts
cassettes().bySource("Jimmy's Boat").get();
```

### Sorts

#### `.sortByBuyPrice(order?: 'asc' | 'desc')`

Sort by buy price. Defaults to `'asc'` (cheapest first).

---

### Terminal methods

| Method              | Returns                 | Description                         |
| ------------------- | ----------------------- | ----------------------------------- |
| `.get()`            | `Cassette[]`            | All results                         |
| `.first()`          | `Cassette \| undefined` | First result                        |
| `.find(id)`         | `Cassette \| undefined` | Find by `id`                        |
| `.findByName(name)` | `Cassette \| undefined` | Case-insensitive exact name match   |
| `.search(query)`    | `Cassette[]`            | Case-insensitive partial name match |
| `.count()`          | `number`                | Number of results                   |

---

## Examples

```ts
import { cassettes } from "dinkum-data";

// Every cassette sold on Jimmy's Boat, cheapest first
cassettes().bySource("Jimmy's Boat").sortByBuyPrice().get();
```
