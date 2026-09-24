import { QueryBase } from '@/common/query-base';
import data from '@/data/resources/foragables.json';
import { Biome, Foragable } from '@/types';

const foragableData: Foragable[] = data as Foragable[];

/** Query builder for foragable data. All filter methods return a new ForagableQuery for chaining. */
export class ForagableQuery extends QueryBase<Foragable> {
  constructor(data: Foragable[] = foragableData) {
    super(data);
  }

  /** Filter to foragables found in the given biome. */
  byLocation(biome: Biome): ForagableQuery {
    return new ForagableQuery(this.data.filter((f) => f.locations?.includes(biome)));
  }
}

/** Returns a ForagableQuery for all foragable data. Pass `source` to wrap a pre-filtered array. */
export function foragables(source: Foragable[] = foragableData): ForagableQuery {
  return new ForagableQuery(source);
}
