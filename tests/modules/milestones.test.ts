import { MilestoneQuery, milestones } from '@/modules/milestones';
import { testQueryBaseContract } from '../helpers';

testQueryBaseContract('milestones', () => milestones());

describe('MilestoneQuery', () => {
  it('accepts an explicit source array', () => {
    const subset = milestones().get().slice(0, 1);
    expect(new MilestoneQuery(subset).count()).toBe(1);
  });

  it('uses default data when constructed without arguments', () => {
    expect(new MilestoneQuery().count()).toBeGreaterThan(0);
  });

  it('totalPermitPoints() sums every level of every milestone', () => {
    const all = milestones().get();
    const expected = all.reduce(
      (sum, m) => sum + m.levels.reduce((s, lvl) => s + lvl.permitPoints, 0),
      0,
    );
    expect(milestones().totalPermitPoints()).toBe(expected);
  });

  it('sortByLevelCount() sorts descending by default', () => {
    const sorted = milestones().sortByLevelCount().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].levels.length).toBeGreaterThanOrEqual(sorted[i].levels.length);
    }
  });

  it('sortByLevelCount() sorts ascending when requested', () => {
    const sorted = milestones().sortByLevelCount('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].levels.length).toBeLessThanOrEqual(sorted[i].levels.length);
    }
  });
});
