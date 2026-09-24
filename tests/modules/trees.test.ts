import { TreeQuery, trees } from '@/modules/trees';
import { testQueryBaseContract } from '../helpers';

testQueryBaseContract('trees', () => trees());

describe('TreeQuery', () => {
  it('accepts an explicit source array', () => {
    const subset = trees().get().slice(0, 1);
    expect(new TreeQuery(subset).count()).toBe(1);
  });

  it('uses default data when constructed without arguments', () => {
    expect(new TreeQuery().count()).toBeGreaterThan(0);
  });

  it('byLocation() returns only matching trees', () => {
    const withLocation = trees()
      .get()
      .find((t) => t.locations && t.locations.length > 0)!;
    const biome = withLocation.locations![0];
    const results = trees().byLocation(biome).get();
    expect(results.length).toBeGreaterThan(0);
    for (const t of results) expect(t.locations).toContain(biome);
  });

  it('byLocation() excludes trees with no location', () => {
    const noLocation = trees()
      .get()
      .find((t) => !t.locations || t.locations.length === 0)!;
    expect(noLocation).toBeDefined();
    const results = trees().byLocation('Deep Mine').get();
    expect(results.some((t) => t.id === noLocation.id)).toBe(false);
  });

  it('sortByGrowthPeriod() sorts ascending by default', () => {
    const sorted = trees().sortByGrowthPeriod().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].growthPeriod ?? 0).toBeLessThanOrEqual(sorted[i].growthPeriod ?? 0);
    }
  });

  it('sortByGrowthPeriod() sorts descending when requested', () => {
    const sorted = trees().sortByGrowthPeriod('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].growthPeriod ?? 0).toBeGreaterThanOrEqual(sorted[i].growthPeriod ?? 0);
    }
  });
});
