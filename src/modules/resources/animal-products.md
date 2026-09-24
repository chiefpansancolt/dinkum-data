# Animal Products

Items dropped or produced by animals, with the biomes they're found in. 36 items are included.

---

## Type

### `AnimalProduct`

| Field         | Type      | Description                                    |
| ------------- | --------- | ---------------------------------------------- |
| id            | string    | Stable identifier                              |
| name          | string    | Display name                                   |
| img           | string    | Path to the item's icon, relative to `images/` |
| source        | string[]? | The animal(s) that produce this item           |
| baseSellPrice | number    | Base sell price in Dinks                       |
| buyPrice      | number?   | Purchase price, if purchasable                 |
| buffs         | Buffs?    | Consumable buff effects, if edible             |
| locations     | Biome[]?  | Biomes where the source animal is found        |

---

## Factory

```ts
import { animalProducts } from "dinkum-data";

animalProducts(); // all 36 items
animalProducts(source); // wrap a pre-filtered array
```

---

## Methods

### Filters

#### `.byLocation(biome: Biome)`

Filter to products found in the given biome. Products with no `locations` never match.

```ts
animalProducts().byLocation("Bushlands").get();
```

---

### Terminal methods

| Method              | Returns                      | Description                         |
| ------------------- | ---------------------------- | ----------------------------------- |
| `.get()`            | `AnimalProduct[]`            | All results                         |
| `.first()`          | `AnimalProduct \| undefined` | First result                        |
| `.find(id)`         | `AnimalProduct \| undefined` | Find by `id`                        |
| `.findByName(name)` | `AnimalProduct \| undefined` | Case-insensitive exact name match   |
| `.search(query)`    | `AnimalProduct[]`            | Case-insensitive partial name match |
| `.count()`          | `number`                     | Number of results                   |

---

## Examples

```ts
import { animalProducts } from "dinkum-data";

// Every animal product found in Bushlands
animalProducts().byLocation("Bushlands").get();

// Look up by name
animalProducts().findByName("Alpha Antler");
```
