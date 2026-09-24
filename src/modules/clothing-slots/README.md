# Clothing Slots

The clothing-slot taxonomy: which `Clothing.type` values are valid for each of the 5 clothing slots
(`Head`, `Face`, `Body`, `Legs`, `Feet`).

This module has no `QueryBase` query builder, since the source data is a fixed grouped object rather
than a flat, filterable list.

---

## Type

### `ClothingSlotTypes`

`Record<ClothingSlot, string[]>`: an object with one array of valid `type` strings per slot.

---

## Functions

```ts
import { clothingSlots, clothingTypesForSlot } from "dinkum-data";
```

#### `clothingSlots()`

Return the full taxonomy, grouped by slot.

```ts
clothingSlots().Head; // ["Hat", "Scarf", "Bow", "Bonnet", "Bandana", "Hood", "Bandage"]
```

#### `clothingTypesForSlot(slot: ClothingSlot)`

Return the valid `type` values for a single slot.

```ts
clothingTypesForSlot("Feet"); // ["Shoes", "Boots", "Flats"]
```

---

## Examples

```ts
import { clothing, clothingTypesForSlot } from "dinkum-data";

// Build a type dropdown for the Head slot
const headTypes = clothingTypesForSlot("Head");

// Cross-reference with actual clothing data
const hats = clothing()
  .bySlot("Head")
  .get()
  .filter((c) => c.type === "Hat");
```
