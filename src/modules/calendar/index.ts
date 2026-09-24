import data from '@/data/calendar.json';
import { Birthday, CalendarDay, CalendarEvent, Season } from '@/types';

const calendarData: { days: CalendarDay[] } = data as { days: CalendarDay[] };

/**
 * Query builder for the static 112-day Dinkum calendar (4 seasons x 28 days).
 * Unlike other queries, this is not indexed by id/name; days are addressed by season and day number.
 */
export class CalendarQuery {
  constructor(private readonly days: CalendarDay[] = calendarData.days) {}

  /** Return every day in the calendar, in season order (Summer, Autumn, Winter, Spring). */
  get(): CalendarDay[] {
    return this.days;
  }

  /** Return the number of days. */
  count(): number {
    return this.days.length;
  }

  /** Return every day in the given season. */
  bySeason(season: Season): CalendarDay[] {
    return this.days.filter((d) => d.season === season);
  }

  /** Return a single day by season and day number (1-28). */
  getDay(season: Season, day: number): CalendarDay | undefined {
    return this.days.find((d) => d.season === season && d.day === day);
  }

  /** Return every birthday across the whole calendar. */
  getAllBirthdays(): Birthday[] {
    return this.days.flatMap((d) => d.birthdays);
  }

  /** Return every event across the whole calendar. */
  getAllEvents(): CalendarEvent[] {
    return this.days.flatMap((d) => d.events);
  }

  /** Return the birthday for the given character, if any. */
  getBirthday(character: string): Birthday | undefined {
    const q = character.toLowerCase();
    return this.getAllBirthdays().find((b) => b.character.toLowerCase() === q);
  }
}

/** Returns a CalendarQuery over the full Dinkum calendar. */
export function calendar(): CalendarQuery {
  return new CalendarQuery();
}
