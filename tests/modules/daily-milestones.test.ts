import {
  allDailyMilestones,
  dailyMilestones,
  dailyMilestonesByCategory,
} from '@/modules/daily-milestones';

describe('daily milestones', () => {
  it('dailyMilestones() returns every category', () => {
    const data = dailyMilestones();
    expect(data.dayOneMilestones.length).toBeGreaterThan(0);
    expect(data.fishingMilestones.length).toBeGreaterThan(0);
  });

  it('dailyMilestonesByCategory() returns the matching array', () => {
    expect(dailyMilestonesByCategory('travelMilestones')).toBe(dailyMilestones().travelMilestones);
  });

  it('allDailyMilestones() flattens every category', () => {
    const total = Object.values(dailyMilestones()).reduce((sum, arr) => sum + arr.length, 0);
    expect(allDailyMilestones().length).toBe(total);
  });
});
