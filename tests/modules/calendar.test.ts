import { calendar, CalendarQuery } from '@/modules/calendar';

describe('CalendarQuery', () => {
  it('has 112 days (4 seasons x 28 days)', () => {
    expect(calendar().count()).toBe(112);
  });

  it('accepts an explicit source array', () => {
    const subset = calendar().get().slice(0, 1);
    expect(new CalendarQuery(subset).count()).toBe(1);
  });

  it('uses default data when constructed without arguments', () => {
    expect(new CalendarQuery().count()).toBeGreaterThan(0);
  });

  it('bySeason() returns exactly 28 days', () => {
    expect(calendar().bySeason('Summer').length).toBe(28);
  });

  it('getDay() returns the requested day', () => {
    const day = calendar().getDay('Summer', 1);
    expect(day?.day).toBe(1);
    expect(day?.season).toBe('Summer');
  });

  it('getDay() returns undefined for a day that does not exist', () => {
    expect(calendar().getDay('Summer', 99)).toBeUndefined();
  });

  it('getBirthday() finds a known character', () => {
    const birthday = calendar().getBirthday('Fletch');
    expect(birthday).toBeDefined();
    expect(birthday?.character).toBe('Fletch');
  });

  it('getBirthday() returns undefined for an unknown character', () => {
    expect(calendar().getBirthday('__nonexistent__')).toBeUndefined();
  });

  it('getAllEvents() and getAllBirthdays() return non-empty arrays', () => {
    expect(calendar().getAllEvents().length).toBeGreaterThan(0);
    expect(calendar().getAllBirthdays().length).toBeGreaterThan(0);
  });
});
