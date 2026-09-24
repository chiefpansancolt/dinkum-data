import data from '@/data/daily-milestones.json';
import { DailyMilestone, DailyMilestones } from '@/types';

const dailyMilestoneData: DailyMilestones = data as DailyMilestones;

/** Return the raw daily-milestone data, grouped by category. */
export function dailyMilestones(): DailyMilestones {
  return dailyMilestoneData;
}

/** Return the daily milestones for a single category (e.g. `'fishingMilestones'`). */
export function dailyMilestonesByCategory(category: keyof DailyMilestones): DailyMilestone[] {
  return dailyMilestoneData[category];
}

/** Return every daily milestone across all categories, flattened into a single array. */
export function allDailyMilestones(): DailyMilestone[] {
  return Object.values(dailyMilestoneData).flat();
}
