import { QueryBase } from '@/common/query-base';
import data from '@/data/pedia/fish.json';
import { Biome, Fish, RarityLevel, Season, TimePeriod } from '@/types';

const fishData: Fish[] = data as Fish[];

/** Query builder for fish data. All filter and sort methods return a new FishQuery for chaining. */
export class FishQuery extends QueryBase<Fish> {
  constructor(data: Fish[] = fishData) {
    super(data);
  }

  /** Filter to fish found in the given biome. */
  byBiome(biome: Biome): FishQuery {
    return new FishQuery(this.data.filter((f) => f.biome.includes(biome)));
  }

  /** Filter by rarity. */
  byRarity(rarity: RarityLevel): FishQuery {
    return new FishQuery(this.data.filter((f) => f.rarity === rarity));
  }

  /** Filter to fish available in the given season. */
  bySeason(season: Season): FishQuery {
    return new FishQuery(this.data.filter((f) => f.seasons.includes(season)));
  }

  /** Filter to fish caught during the given time period. */
  byTime(time: TimePeriod): FishQuery {
    return new FishQuery(this.data.filter((f) => f.timeFound.includes(time)));
  }

  /** Sort by raw (uncooked) base sell price. Default: `'desc'` (most valuable first). */
  sortByBaseSellPrice(order: 'asc' | 'desc' = 'desc'): FishQuery {
    return new FishQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.baseSellPrice - b.baseSellPrice : b.baseSellPrice - a.baseSellPrice,
      ),
    );
  }

  /** Sort by cooked sell price. Default: `'desc'` (most valuable first). */
  sortByCookedPrice(order: 'asc' | 'desc' = 'desc'): FishQuery {
    return new FishQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.cookedPrice - b.cookedPrice : b.cookedPrice - a.cookedPrice,
      ),
    );
  }
}

/** Returns a FishQuery for all fish data. Pass `source` to wrap a pre-filtered array. */
export function fish(source: Fish[] = fishData): FishQuery {
  return new FishQuery(source);
}
