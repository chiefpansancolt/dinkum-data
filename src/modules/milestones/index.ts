import { QueryBase } from '@/common/query-base';
import data from '@/data/milestones.json';
import { Milestone } from '@/types';

const milestoneData: Milestone[] = data as Milestone[];

/** Query builder for milestone data. All filter and sort methods return a new MilestoneQuery for chaining. */
export class MilestoneQuery extends QueryBase<Milestone> {
  constructor(data: Milestone[] = milestoneData) {
    super(data);
  }

  /** Total permit points awarded across every level of every milestone in the current result set. */
  totalPermitPoints(): number {
    return this.data.reduce(
      (sum, milestone) => sum + milestone.levels.reduce((s, l) => s + l.permitPoints, 0),
      0,
    );
  }

  /** Sort by number of levels. Default: `'desc'` (most levels first). */
  sortByLevelCount(order: 'asc' | 'desc' = 'desc'): MilestoneQuery {
    return new MilestoneQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.levels.length - b.levels.length : b.levels.length - a.levels.length,
      ),
    );
  }
}

/** Returns a MilestoneQuery for all milestone data. Pass `source` to wrap a pre-filtered array. */
export function milestones(source: Milestone[] = milestoneData): MilestoneQuery {
  return new MilestoneQuery(source);
}
