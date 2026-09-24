# Calendar

The full Dinkum calendar: 4 seasons of 28 days each (112 days total), with every birthday and event
embedded on the day it occurs.

Unlike other modules, calendar days have no `id` or `name`, so `CalendarQuery` does not extend
`QueryBase<T>` and addresses days by season and day number instead.

---

## Types

### `CalendarDay`

| Field     | Type            | Description                                       |
| --------- | --------------- | ------------------------------------------------- |
| day       | number          | Day of the season, 1-28                           |
| season    | Season          | `'Summer'`, `'Autumn'`, `'Winter'`, or `'Spring'` |
| weekday   | Weekday         | Day of the week                                   |
| events    | CalendarEvent[] | Events occurring on this day                      |
| birthdays | Birthday[]      | NPC birthdays occurring on this day               |

### `Birthday`

| Field     | Type   | Description                  |
| --------- | ------ | ---------------------------- |
| day       | number | Day of the season            |
| season    | Season | Season the birthday falls in |
| character | string | NPC name                     |
| likes     | string | Their favorite gift          |

### `CalendarEvent`

| Field    | Type   | Description                            |
| -------- | ------ | -------------------------------------- |
| name     | string | Event name                             |
| startDay | number | First day of the season the event runs |
| endDay   | number | Last day of the season the event runs  |
| season   | Season | Season the event occurs in             |
| emoji    | string | Emoji shown alongside the event name   |

---

## Factory

```ts
import { calendar } from "dinkum-data";

calendar(); // a CalendarQuery over all 112 days
```

---

## Methods

#### `.get()`

Return every day in the calendar, in season order (Summer, Autumn, Winter, Spring).

```ts
calendar().get(); // CalendarDay[112]
```

#### `.count()`

Return the number of days (always 112).

#### `.bySeason(season: Season)`

Return every day in the given season (always 28 days).

```ts
calendar().bySeason("Summer");
```

#### `.getDay(season: Season, day: number)`

Return a single day by season and day number, or `undefined` if it doesn't exist.

```ts
calendar().getDay("Summer", 22);
```

#### `.getAllBirthdays()`

Return every birthday across the whole calendar.

#### `.getAllEvents()`

Return every event across the whole calendar.

#### `.getBirthday(character: string)`

Return the birthday for the given character (case-insensitive), or `undefined` if not found.

```ts
calendar().getBirthday("Fletch");
```

---

## Examples

```ts
import { calendar } from "dinkum-data";

// Every day in Winter
calendar().bySeason("Winter");

// What's happening on Summer day 22
calendar().getDay("Summer", 22);
// { day: 22, season: 'Summer', events: [{ name: 'Fish Catching Competition', ... }], ... }

// When is Fletch's birthday
calendar().getBirthday("Fletch");
// { day: 1, season: 'Summer', character: 'Fletch', likes: 'Bush Lime' }

// Every event in the game
calendar().getAllEvents();
```
