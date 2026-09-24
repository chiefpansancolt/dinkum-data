import { WeightItemQuery, weightItems } from '@/modules/weight-items';
import { testQueryBaseContract } from '../helpers';

testQueryBaseContract('weightItems', () => weightItems());

describe('WeightItemQuery', () => {
  it('accepts an explicit source array', () => {
    const subset = weightItems().get().slice(0, 1);
    expect(new WeightItemQuery(subset).count()).toBe(1);
  });

  it('uses default data when constructed without arguments', () => {
    expect(new WeightItemQuery().count()).toBeGreaterThan(0);
  });

  it('sortByPricePerKg() sorts descending by default', () => {
    const sorted = weightItems().sortByPricePerKg().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].pricePerKg).toBeGreaterThanOrEqual(sorted[i].pricePerKg);
    }
  });

  it('sortByPricePerKg() sorts ascending when requested', () => {
    const sorted = weightItems().sortByPricePerKg('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].pricePerKg).toBeLessThanOrEqual(sorted[i].pricePerKg);
    }
  });
});
