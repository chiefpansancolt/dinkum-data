import { QueryBase } from '@/common/query-base';
import data from '@/data/skills.json';
import { Skill } from '@/types';

const skillData: Skill[] = data as Skill[];

/** Query builder for skill data. */
export class SkillQuery extends QueryBase<Skill> {
  constructor(data: Skill[] = skillData) {
    super(data);
  }
}

/** Returns a SkillQuery for all skill data. Pass `source` to wrap a pre-filtered array. */
export function skills(source: Skill[] = skillData): SkillQuery {
  return new SkillQuery(source);
}
