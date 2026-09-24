import { SkillQuery, skills } from '@/modules/skills';
import { testQueryBaseContract } from '../helpers';

testQueryBaseContract('skills', () => skills());

describe('SkillQuery', () => {
  it('accepts an explicit source array', () => {
    const subset = skills().get().slice(0, 1);
    expect(new SkillQuery(subset).count()).toBe(1);
  });

  it('uses default data when constructed without arguments', () => {
    expect(new SkillQuery().count()).toBeGreaterThan(0);
  });
});
