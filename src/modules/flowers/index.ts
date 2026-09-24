import { QueryBase } from '@/common/query-base';
import data from '@/data/flowers.json';
import { Biome, Flower } from '@/types';

const flowerData: Flower[] = data as Flower[];

/** Query builder for flower data. All filter and sort methods return a new FlowerQuery for chaining. */
export class FlowerQuery extends QueryBase<Flower> {
  constructor(data: Flower[] = flowerData) {
    super(data);
  }

  /** Filter to flowers found in the given biome. */
  byLocation(biome: Biome): FlowerQuery {
    return new FlowerQuery(this.data.filter((f) => f.locations.includes(biome)));
  }

  /** Sort by growth period in days. Default: `'asc'` (fastest first). */
  sortByGrowthPeriod(order: 'asc' | 'desc' = 'asc'): FlowerQuery {
    return new FlowerQuery(
      [...this.data].sort((a, b) => {
        const ga = a.growthPeriod ?? 0;
        const gb = b.growthPeriod ?? 0;
        return order === 'asc' ? ga - gb : gb - ga;
      }),
    );
  }
}

/** Returns a FlowerQuery for all flower data. Pass `source` to wrap a pre-filtered array. */
export function flowers(source: Flower[] = flowerData): FlowerQuery {
  return new FlowerQuery(source);
}
