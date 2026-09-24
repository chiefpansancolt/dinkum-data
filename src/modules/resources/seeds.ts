import { QueryBase } from '@/common/query-base';
import data from '@/data/resources/seeds.json';
import { Season, Seed } from '@/types';

const seedData: Seed[] = data as Seed[];

/** Query builder for seed data. All filter and sort methods return a new SeedQuery for chaining. */
export class SeedQuery extends QueryBase<Seed> {
  constructor(data: Seed[] = seedData) {
    super(data);
  }

  /** Filter by seed category. */
  byCategory(category: string): SeedQuery {
    const q = category.toLowerCase();
    return new SeedQuery(this.data.filter((s) => s.category.toLowerCase() === q));
  }

  /** Filter to seeds plantable in the given season. */
  bySeason(season: Season): SeedQuery {
    return new SeedQuery(this.data.filter((s) => s.season.includes(season)));
  }

  /** Sort by growth period in days. Default: `'asc'` (fastest first). */
  sortByGrowthPeriod(order: 'asc' | 'desc' = 'asc'): SeedQuery {
    return new SeedQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.growthPeriod - b.growthPeriod : b.growthPeriod - a.growthPeriod,
      ),
    );
  }
}

/** Returns a SeedQuery for all seed data. Pass `source` to wrap a pre-filtered array. */
export function seeds(source: Seed[] = seedData): SeedQuery {
  return new SeedQuery(source);
}
