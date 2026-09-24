import { LicenseQuery, licenses } from '@/modules/licenses';
import { testQueryBaseContract } from '../helpers';

testQueryBaseContract('licenses', () => licenses());

describe('LicenseQuery', () => {
  it('accepts an explicit source array', () => {
    const subset = licenses().get().slice(0, 1);
    expect(new LicenseQuery(subset).count()).toBe(1);
  });

  it('uses default data when constructed without arguments', () => {
    expect(new LicenseQuery().count()).toBeGreaterThan(0);
  });

  it('totalPermitPoints() sums every level of every license', () => {
    const all = licenses().get();
    const expected = all.reduce(
      (sum, l) => sum + l.levels.reduce((s, lvl) => s + lvl.permitPointCost, 0),
      0,
    );
    expect(licenses().totalPermitPoints()).toBe(expected);
  });

  it('sortByLevelCount() sorts descending by default', () => {
    const sorted = licenses().sortByLevelCount().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].levels.length).toBeGreaterThanOrEqual(sorted[i].levels.length);
    }
  });

  it('sortByLevelCount() sorts ascending when requested', () => {
    const sorted = licenses().sortByLevelCount('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].levels.length).toBeLessThanOrEqual(sorted[i].levels.length);
    }
  });
});
