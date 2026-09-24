import { QueryBase } from '@/common/query-base';
import data from '@/data/resources/minerals.json';
import { Biome, Mineral } from '@/types';

const mineralData: Mineral[] = data as Mineral[];

/** Query builder for mineral data. All filter methods return a new MineralQuery for chaining. */
export class MineralQuery extends QueryBase<Mineral> {
  constructor(data: Mineral[] = mineralData) {
    super(data);
  }

  /** Filter to minerals found in the given biome. */
  byLocation(biome: Biome): MineralQuery {
    return new MineralQuery(this.data.filter((m) => m.locations?.includes(biome)));
  }
}

/** Returns a MineralQuery for all mineral data. Pass `source` to wrap a pre-filtered array. */
export function minerals(source: Mineral[] = mineralData): MineralQuery {
  return new MineralQuery(source);
}
