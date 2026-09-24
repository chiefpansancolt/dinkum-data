import { QueryBase } from '@/common/query-base';
import data from '@/data/pedia/bugs.json';
import { Biome, Bug, RarityLevel, Season, TimePeriod } from '@/types';

const bugData: Bug[] = data as Bug[];

/** Query builder for bug data. All filter and sort methods return a new BugQuery for chaining. */
export class BugQuery extends QueryBase<Bug> {
  constructor(data: Bug[] = bugData) {
    super(data);
  }

  /** Filter to bugs found in the given biome. */
  byBiome(biome: Biome): BugQuery {
    return new BugQuery(this.data.filter((b) => b.biome.includes(biome)));
  }

  /** Filter by rarity. */
  byRarity(rarity: RarityLevel): BugQuery {
    return new BugQuery(this.data.filter((b) => b.rarity === rarity));
  }

  /** Filter to bugs available in the given season. */
  bySeason(season: Season): BugQuery {
    return new BugQuery(this.data.filter((b) => b.seasons.includes(season)));
  }

  /** Filter to bugs found during the given time period. */
  byTime(time: TimePeriod): BugQuery {
    return new BugQuery(this.data.filter((b) => b.timeFound.includes(time)));
  }

  /** Sort by base sell price. Default: `'desc'` (most valuable first). */
  sortByBaseSellPrice(order: 'asc' | 'desc' = 'desc'): BugQuery {
    return new BugQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.baseSellPrice - b.baseSellPrice : b.baseSellPrice - a.baseSellPrice,
      ),
    );
  }
}

/** Returns a BugQuery for all bug data. Pass `source` to wrap a pre-filtered array. */
export function bugs(source: Bug[] = bugData): BugQuery {
  return new BugQuery(source);
}
