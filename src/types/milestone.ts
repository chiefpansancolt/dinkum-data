import { Base } from './common';

export interface MilestoneLevel {
  level: number;
  count: number;
  permitPoints: number;
  unit?: string;
}

export interface Milestone extends Base {
  description: string;
  levels: MilestoneLevel[];
}

/**
 * A milestone category tag. `id` is the substring every milestone in that category shares in its
 * own `id` (e.g. every fishing milestone's `id` contains `"fish"`).
 */
export interface MilestoneCategory {
  id: string;
  name: string;
}

export interface DailyMilestone {
  id: string;
  name: string;
  permitPoints: number;
}

export interface DailyMilestones {
  dayOneMilestones: DailyMilestone[];
  travelMilestones: DailyMilestone[];
  npcMilestones: DailyMilestone[];
  fishingMilestones: DailyMilestone[];
  farmingMilestones: DailyMilestone[];
  foragingMilestones: DailyMilestone[];
  loggingMilestones: DailyMilestone[];
  miningMilestones: DailyMilestone[];
  excavationMilestones: DailyMilestone[];
  bugCatchingMilestones: DailyMilestone[];
  craftingMilestones: DailyMilestone[];
  huntingMilestones: DailyMilestone[];
  trappingMilestones: DailyMilestone[];
  dinksMilestones: DailyMilestone[];
}
