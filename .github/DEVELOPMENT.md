# Development Guide

This guide walks through the architecture, conventions, and step-by-step process for working with
this repository.

## Architecture Overview

```
src/
  index.ts                    # Re-exports all modules and types
  common/
    query-base.ts             # QueryBase<T> abstract base class
  types/
    index.ts                  # Re-exports all type files
    common.ts                 # Shared types (Biome, Season, RarityLevel, etc.)
    <module>.ts               # Per-module type definitions
  modules/
    <module>/
      index.ts                # Query class + factory function
    pedia/                    # Museum collectibles (bugs, critters, fish)
    gear-and-equipment/       # Books, cassettes, equipment, tools, vehicles, weapons
    recipes/                  # Cooking, crafting, sign-writing recipes
    resources/                # Animal products, crops, foragables, minerals, etc.

data/
  <module>.json               # Flat JSON arrays of game data
  pedia/<module>.json
  gear-and-equipment/<module>.json
  recipes/<module>.json
  resources/<module>.json

images/
  <category>/                 # Bundled image assets, mirroring the paths in each entry's "img" field

sample/
  index.ts                    # Runs a handful of queries across every module

tests/
  helpers.ts                  # Shared QueryBase contract assertions
  index.test.ts               # Smoke test importing the top-level barrel
  modules/
    <module>.test.ts          # Per-module test file
```

## Query Builder Pattern

Every data module follows the same pattern built on `QueryBase<T>`:

### QueryBase provides 6 terminal methods

```ts
abstract class QueryBase<T extends { id: string; name: string }> {
  get(): T[]; // All results as array
  first(): T | undefined; // First result
  find(id: string): T | undefined; // Exact ID match
  findByName(name: string): T | undefined; // Case-insensitive name match
  search(query: string): T[]; // Case-insensitive partial name match
  count(): number; // Result count
}
```

### Rules

1. **Filter methods** return `new XxxQuery(filteredData)` — never mutate
2. **Sort methods** return `new XxxQuery(sortedData)` — never mutate
3. **Terminal methods** return data or primitives — end the chain
4. The internal data const must not shadow the factory function name (e.g. `animalData`, not
   `animals`)
5. Factory functions accept an optional `source` parameter for wrapping pre-filtered arrays

### Modules without QueryBase

- **calendar** — `CalendarQuery` addresses days by season/day number rather than id/name, since a
  calendar day has neither
- **daily-milestones** — plain functions over a grouped object (`dailyMilestones()`,
  `dailyMilestonesByCategory()`, `allDailyMilestones()`), since the source data is categorized
  groups, not a flat list

## Naming Conventions

| Thing               | Convention                       | Example                             |
| ------------------- | -------------------------------- | ----------------------------------- |
| Factory function    | Domain noun (camelCase)          | `animals()`, `crops()`, `fish()`    |
| Query class         | PascalCase + `Query`             | `AnimalQuery`, `CropQuery`          |
| Type interface      | PascalCase domain noun           | `Animal`, `Crop`, `Fish`            |
| Data file           | kebab-case                       | `animals.json`, `weight-items.json` |
| Type file           | kebab-case matching data file    | `animal.ts`, `weight-item.ts`       |
| Module folder       | kebab-case matching data file    | `animals/`, `weight-items/`         |
| Internal data const | descriptive, avoids factory name | `animalData`, `cropData`            |

## Import Conventions

```ts
// Within src/ — use path aliases
import { QueryBase } from "@/common/query-base";
import data from "@/data/animals.json";
import { Animal } from "@/types";
```

## Adding a New Data Module

This walkthrough uses a hypothetical **"npcs"** module as an example (already implemented, but
follow the same steps for anything new).

### Step 1: Define the type

Create `src/types/npc.ts`:

```ts
export interface NPC {
  id: string;
  name: string;
  img: string;
  occupation: string;
}
```

**Rules:**

- `id` and `name` are required (QueryBase constraint)
- Use `?` optional fields only when data is genuinely missing for some entries
- Add shared types (Biome, Season, RarityLevel, etc.) to `common.ts` if they don't already exist

Register in `src/types/index.ts`:

```ts
export * from "./npc";
```

### Step 2: Create the data file

Create `data/npcs.json` as a flat JSON array. Image paths are relative to the package root and must
match the `images/` directory exactly (case-sensitive).

### Step 3: Create the query module

Create `src/modules/npcs/index.ts`:

```ts
import { QueryBase } from "@/common/query-base";
import data from "@/data/npcs.json";
import { NPC } from "@/types";

const npcData: NPC[] = data as NPC[];

/** Query builder for NPC data. All filter methods return a new NPCQuery for chaining. */
export class NPCQuery extends QueryBase<NPC> {
  constructor(data: NPC[] = npcData) {
    super(data);
  }

  /** Filter to NPCs whose occupation description contains the given text (case-insensitive). */
  byOccupation(text: string): NPCQuery {
    const q = text.toLowerCase();
    return new NPCQuery(this.data.filter((n) => n.occupation.toLowerCase().includes(q)));
  }
}

/** Returns an NPCQuery for all NPC data. Pass `source` to wrap a pre-filtered array. */
export function npcs(source: NPC[] = npcData): NPCQuery {
  return new NPCQuery(source);
}
```

**Key patterns:**

- Class-level JSDoc:
  `/** Query builder for X data. All filter and sort methods return a new XQuery for chaining. */`
- Factory JSDoc: `/** Returns an XQuery for all X data. Pass \`source\` to wrap a pre-filtered
  array. \*/`
- Filter/sort methods always spread `[...this.data]` before sorting
- Return `new NPCQuery(...)`, never `this`

### Step 4: Register the module export

Add to `src/index.ts`:

```ts
export * from "./modules/npcs";
```

If the module lives in a nested category (`pedia/`, `gear-and-equipment/`, `recipes/`,
`resources/`), export it from that category's own `index.ts` instead, which is already re-exported
from the top level.

### Step 5: Add images

Place image files under `images/`, mirroring the path used in each entry's `img` field (e.g. an
entry with `"img": "/images/npcs/NPC_Fletch.png"` needs `images/npcs/NPC_Fletch.png`).

### Step 6: Register in the sample script

Add the import and a couple of representative calls to `sample/index.ts`.

### Step 7: Write tests

Create `tests/modules/npcs.test.ts`:

```ts
import { NPCQuery, npcs } from "@/modules/npcs";
import { testQueryBaseContract } from "../helpers";

testQueryBaseContract("npcs", () => npcs());

describe("NPCQuery filters", () => {
  it("accepts an explicit source array", () => {
    const subset = npcs().get().slice(0, 1);
    expect(new NPCQuery(subset).count()).toBe(1);
  });

  it("uses default data when constructed without arguments", () => {
    expect(new NPCQuery().count()).toBeGreaterThan(0);
  });

  it("byOccupation() finds NPCs by occupation substring", () => {
    const fletch = npcs().findByName("Fletch")!;
    const word = fletch.occupation.split(/\s+/)[0];
    const results = npcs().byOccupation(word).get();
    expect(results.some((n) => n.id === fletch.id)).toBe(true);
  });
});
```

**Coverage notes:**

- `testQueryBaseContract` covers the shared `get`/`count`/`first`/`find`/`findByName`/`search`
  contract — always call it first
- The class constructor's own default parameter is a separate branch from the factory function's
  default parameter. The factory always resolves its own default before calling `new XQuery(...)`,
  so `new XQuery()` with zero arguments must be called directly to cover that branch
- Every sort method needs both `'asc'` and `'desc'` exercised
- Every optional-chaining filter (`?.`) needs a real dataset entry that has the field and one that
  doesn't — check with a quick Python/Node one-liner over the JSON before writing the test rather
  than guessing

### Step 8: Format and validate

```bash
pnpm format          # Format all files
pnpm lint            # Type-check + ESLint
pnpm test:coverage   # Run test suite with the 100% coverage gate
pnpm sample          # Exercise queries end to end
```

## Checklist Summary

When adding a new module, make sure you've touched all of these:

- [ ] `src/types/<module>.ts` — type interface
- [ ] `src/types/index.ts` — re-export the type
- [ ] `data/<module>.json` — data file
- [ ] `src/modules/<module>/index.ts` — query class + factory
- [ ] `src/index.ts` (or the category's `index.ts`) — re-export the module
- [ ] `images/<category>/` — image assets
- [ ] `sample/index.ts` — a representative call or two
- [ ] `tests/modules/<module>.test.ts` — test file, including both constructor-default branches and
      both directions of every sort
- [ ] Run `pnpm format && pnpm lint && pnpm test:coverage && pnpm sample`

## Scripts Reference

| Command              | Description                            |
| -------------------- | -------------------------------------- |
| `pnpm build`         | Build with tsup (ESM + CJS + .d.ts)    |
| `pnpm dev`           | Build in watch mode                    |
| `pnpm lint`          | `tsc --noEmit && eslint .`             |
| `pnpm format`        | Prettier write (\*.ts, \*.md, \*.json) |
| `pnpm format:check`  | Prettier check (no write)              |
| `pnpm test`          | Jest test suite                        |
| `pnpm test:watch`    | Jest in watch mode                     |
| `pnpm test:coverage` | Jest with coverage report (100% gate)  |
| `pnpm sample`        | Run the sample script                  |
| `pnpm typecheck`     | TypeScript type-check only             |
