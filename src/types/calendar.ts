import { Season, Weekday } from './common';

export interface Birthday {
  day: number;
  season: Season;
  character: string;
  likes: string;
}

export interface CalendarEvent {
  name: string;
  startDay: number;
  endDay: number;
  season: Season;
  emoji: string;
}

export interface CalendarDay {
  day: number;
  season: Season;
  weekday: Weekday;
  events: CalendarEvent[];
  birthdays: Birthday[];
}
