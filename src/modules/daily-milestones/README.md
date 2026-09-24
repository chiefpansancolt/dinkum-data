# Daily Milestones

The repeatable daily task pool, grouped by category (Day One, Travel, NPC, Fishing, Farming,
Foraging, Logging, Mining, Excavation, Bug Catching, Crafting, Hunting, Trapping, Dinks). 120 tasks
are included across all categories.

This module has no `QueryBase` query builder, since the source data is a fixed set of grouped arrays
rather than one flat, filterable list.

---

## Types

### `DailyMilestone`

| Field        | Type   | Description                         |
| ------------ | ------ | ----------------------------------- |
| id           | string | Stable identifier                   |
| name         | string | Task description                    |
| permitPoints | number | Permit points awarded on completion |

### `DailyMilestones`

An object with one array of `DailyMilestone[]` per category:

`dayOneMilestones`, `travelMilestones`, `npcMilestones`, `fishingMilestones`, `farmingMilestones`,
`foragingMilestones`, `loggingMilestones`, `miningMilestones`, `excavationMilestones`,
`bugCatchingMilestones`, `craftingMilestones`, `huntingMilestones`, `trappingMilestones`,
`dinksMilestones`.

---

## Functions

```ts
import { allDailyMilestones, dailyMilestones, dailyMilestonesByCategory } from "dinkum-data";
```

#### `dailyMilestones()`

Return the raw daily-milestone data, grouped by category.

```ts
dailyMilestones().fishingMilestones;
```

#### `dailyMilestonesByCategory(category: keyof DailyMilestones)`

Return the daily milestones for a single category.

```ts
dailyMilestonesByCategory("fishingMilestones");
```

#### `allDailyMilestones()`

Return every daily milestone across all categories, flattened into a single array.

```ts
allDailyMilestones(); // DailyMilestone[120]
```

---

## Examples

```ts
import { allDailyMilestones, dailyMilestonesByCategory } from "dinkum-data";

// All fishing-related daily tasks
dailyMilestonesByCategory("fishingMilestones");

// Total permit points available across every daily task
allDailyMilestones().reduce((sum, m) => sum + m.permitPoints, 0);
```
