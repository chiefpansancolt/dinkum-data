import { QueryBase } from '@/common/query-base';
import data from '@/data/resources/trophies.json';
import { Trophy } from '@/types';

const trophyData: Trophy[] = data as Trophy[];

/** Query builder for trophy data. */
export class TrophyQuery extends QueryBase<Trophy> {
  constructor(data: Trophy[] = trophyData) {
    super(data);
  }
}

/** Returns a TrophyQuery for all trophy data. Pass `source` to wrap a pre-filtered array. */
export function trophies(source: Trophy[] = trophyData): TrophyQuery {
  return new TrophyQuery(source);
}
