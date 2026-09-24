import { QueryBase } from '@/common/query-base';
import data from '@/data/milestone-categories.json';
import { MilestoneCategory } from '@/types';

const milestoneCategoryData: MilestoneCategory[] = data as MilestoneCategory[];

/** Query builder for milestone-category data. */
export class MilestoneCategoryQuery extends QueryBase<MilestoneCategory> {
  constructor(data: MilestoneCategory[] = milestoneCategoryData) {
    super(data);
  }
}

/**
 * Returns a MilestoneCategoryQuery for the 9 milestone categories. Pass `source` to wrap a
 * pre-filtered array. A milestone belongs to a category when its `id` contains the category's
 * `id` as a substring (e.g. every fishing milestone's `id` contains `"fish"`).
 */
export function milestoneCategories(
  source: MilestoneCategory[] = milestoneCategoryData,
): MilestoneCategoryQuery {
  return new MilestoneCategoryQuery(source);
}
