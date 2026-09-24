import { FlowerQuery, flowers } from '@/modules/flowers';
import { testQueryBaseContract } from '../helpers';

testQueryBaseContract('flowers', () => flowers());

describe('FlowerQuery filters', () => {
  it('accepts an explicit source array', () => {
    const subset = flowers().get().slice(0, 1);
    expect(new FlowerQuery(subset).count()).toBe(1);
  });

  it('uses default data when constructed without arguments', () => {
    expect(new FlowerQuery().count()).toBeGreaterThan(0);
  });

  it('byLocation() returns only matching flowers', () => {
    const location = flowers().first()!.locations[0];
    const results = flowers().byLocation(location).get();
    expect(results.length).toBeGreaterThan(0);
    for (const f of results) expect(f.locations).toContain(location);
  });

  it('sortByGrowthPeriod() sorts ascending by default', () => {
    const sorted = flowers().sortByGrowthPeriod().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].growthPeriod ?? 0).toBeLessThanOrEqual(sorted[i].growthPeriod ?? 0);
    }
  });

  it('sortByGrowthPeriod() sorts descending when requested', () => {
    const sorted = flowers().sortByGrowthPeriod('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].growthPeriod ?? 0).toBeGreaterThanOrEqual(sorted[i].growthPeriod ?? 0);
    }
  });
});
