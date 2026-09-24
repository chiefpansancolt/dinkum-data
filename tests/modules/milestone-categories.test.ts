import { milestoneCategories, MilestoneCategoryQuery } from '@/modules/milestone-categories';
import { milestones } from '@/modules/milestones';
import { testQueryBaseContract } from '../helpers';

testQueryBaseContract('milestoneCategories', () => milestoneCategories());

describe('MilestoneCategoryQuery', () => {
  it('accepts an explicit source array', () => {
    const subset = milestoneCategories().get().slice(0, 1);
    expect(new MilestoneCategoryQuery(subset).count()).toBe(1);
  });

  it('uses default data when constructed without arguments', () => {
    expect(new MilestoneCategoryQuery().count()).toBeGreaterThan(0);
  });

  it('every category id matches at least one real milestone', () => {
    const allIds = milestones()
      .get()
      .map((m) => m.id);
    for (const category of milestoneCategories().get()) {
      expect(allIds.some((id) => id.includes(category.id))).toBe(true);
    }
  });
});
