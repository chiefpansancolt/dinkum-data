# Animals

Wild, farm, and tameable animals in Dinkum, including their drops and produce. 45 animals are
included.

---

## Type

### `Animal`

| Field          | Type        | Description                                                              |
| -------------- | ----------- | ------------------------------------------------------------------------ |
| id             | string      | Stable identifier                                                        |
| name           | string      | Display name                                                             |
| img            | string      | Path to the animal's icon, relative to `images/`                         |
| temperament    | Temperament | `'Passive'`, `'Neutral'`, or `'Aggressive'`                              |
| habitat        | string[]?   | Biomes the animal is found in; omitted for animals with no fixed habitat |
| health         | number?     | Hit points                                                               |
| drops          | Resource[]  | Items dropped when defeated                                              |
| produces       | Resource[]? | Items produced over time when domesticated                               |
| researchReward | number?     | Research points awarded on first encounter                               |
| buyPrice       | number?     | Purchase price, for animals bought rather than caught                    |
| baseSellPrice  | number?     | Base sell price in Dinks                                                 |
| maxSellPrice   | number?     | Maximum sell price at full growth or quality                             |
| source         | string?     | Where the animal is obtained, if not simply encountered in the wild      |
| type           | AnimalType  | `'Wild Animal'`, `'Farm Animal'`, or `'Tammed Animal'`                   |
| domesticable   | boolean?    | Whether the animal can be tamed and kept on the farm                     |

`Resource` is `{ name: string; img: string; count: number }`.

---

## Factory

```ts
import { animals } from "dinkum-data";

animals(); // all 45 animals
animals(source); // wrap a pre-filtered array
```

---

## Methods

### Filters

#### `.byType(type: AnimalType)`

Filter by animal type.

```ts
animals().byType("Farm Animal").get();
```

#### `.byTemperament(temperament: Temperament)`

Filter by temperament.

```ts
animals().byTemperament("Aggressive").get();
```

#### `.byHabitat(habitat: string)`

Filter to animals found in the given habitat. Animals with no `habitat` field never match.

```ts
animals().byHabitat("Bushlands").get();
```

#### `.domesticable()`

Filter to animals that can be domesticated.

```ts
animals().domesticable().get();
```

### Sorts

#### `.sortByBaseSellPrice(order?: 'asc' | 'desc')`

Sort by base sell price. Defaults to `'desc'` (most valuable first). Animals without a
`baseSellPrice` sort as 0.

---

### Terminal methods

| Method              | Returns               | Description                         |
| ------------------- | --------------------- | ----------------------------------- |
| `.get()`            | `Animal[]`            | All results                         |
| `.first()`          | `Animal \| undefined` | First result                        |
| `.find(id)`         | `Animal \| undefined` | Find by `id`                        |
| `.findByName(name)` | `Animal \| undefined` | Case-insensitive exact name match   |
| `.search(query)`    | `Animal[]`            | Case-insensitive partial name match |
| `.count()`          | `number`              | Number of results                   |

---

## Examples

```ts
import { animals } from "dinkum-data";

// All domesticable animals, most valuable first
animals().domesticable().sortByBaseSellPrice().get();

// Every aggressive animal in the Desert
animals().byTemperament("Aggressive").byHabitat("Desert").get();

// Look up by name
animals().findByName("Bush Devil");
```
