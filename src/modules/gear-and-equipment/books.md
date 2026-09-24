# Books

Collectible books, with every place they can be acquired and their buy/sell prices. 6 books are
included.

---

## Type

### `Book`

| Field   | Type         | Description                                    |
| ------- | ------------ | ---------------------------------------------- |
| id      | string       | Stable identifier                              |
| name    | string       | Display name                                   |
| img     | string       | Path to the book's icon, relative to `images/` |
| details | BookDetail[] | Every acquisition source for this book         |

### `BookDetail`

| Field        | Type             | Description                                                      |
| ------------ | ---------------- | ---------------------------------------------------------------- |
| aquiredFrom  | string           | Where this copy is obtained                                      |
| requirements | string           | Requirement to obtain it from this source                        |
| buyingPrice  | number \| 'Gift' | Purchase price, or `'Gift'` if it can only be received as a gift |
| sellingPrice | number           | Sell price in Dinks                                              |

---

## Factory

```ts
import { books } from "dinkum-data";

books(); // all 6 books
books(source); // wrap a pre-filtered array
```

---

### Terminal methods

| Method              | Returns             | Description                         |
| ------------------- | ------------------- | ----------------------------------- |
| `.get()`            | `Book[]`            | All results                         |
| `.first()`          | `Book \| undefined` | First result                        |
| `.find(id)`         | `Book \| undefined` | Find by `id`                        |
| `.findByName(name)` | `Book \| undefined` | Case-insensitive exact name match   |
| `.search(query)`    | `Book[]`            | Case-insensitive partial name match |
| `.count()`          | `number`            | Number of results                   |

---

## Examples

```ts
import { books } from "dinkum-data";

books().get();
books().findByName("Adventurer's Journal");
```
