import { QueryBase } from '@/common/query-base';
import data from '@/data/pedia/critters.json';
import { Biome, Critter, RarityLevel, Season, TimePeriod } from '@/types';

const critterData: Critter[] = data as Critter[];

/** Query builder for critter data. All filter and sort methods return a new CritterQuery for chaining. */
export class CritterQuery extends QueryBase<Critter> {
  constructor(data: Critter[] = critterData) {
    super(data);
  }

  /** Filter to critters found in the given biome. */
  byBiome(biome: Biome): CritterQuery {
    return new CritterQuery(this.data.filter((c) => c.biome.includes(biome)));
  }

  /** Filter by rarity. */
  byRarity(rarity: RarityLevel): CritterQuery {
    return new CritterQuery(this.data.filter((c) => c.rarity === rarity));
  }

  /** Filter to critters available in the given season. */
  bySeason(season: Season): CritterQuery {
    return new CritterQuery(this.data.filter((c) => c.seasons.includes(season)));
  }

  /** Filter to critters found during the given time period. */
  byTime(time: TimePeriod): CritterQuery {
    return new CritterQuery(this.data.filter((c) => c.timeFound.includes(time)));
  }

  /** Sort by base sell price. Default: `'desc'` (most valuable first). */
  sortByBaseSellPrice(order: 'asc' | 'desc' = 'desc'): CritterQuery {
    return new CritterQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.baseSellPrice - b.baseSellPrice : b.baseSellPrice - a.baseSellPrice,
      ),
    );
  }
}

/** Returns a CritterQuery for all critter data. Pass `source` to wrap a pre-filtered array. */
export function critters(source: Critter[] = critterData): CritterQuery {
  return new CritterQuery(source);
}
