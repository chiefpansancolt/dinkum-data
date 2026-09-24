import { QueryBase } from '@/common/query-base';
import data from '@/data/resources/relics.json';
import { Relic } from '@/types';

const relicData: Relic[] = data as Relic[];

/** Query builder for relic data. All filter and sort methods return a new RelicQuery for chaining. */
export class RelicQuery extends QueryBase<Relic> {
  constructor(data: Relic[] = relicData) {
    super(data);
  }

  /** Filter to relics found at the given location (case-insensitive). */
  byLocation(location: string): RelicQuery {
    const q = location.toLowerCase();
    return new RelicQuery(this.data.filter((r) => r.locations.some((l) => l.toLowerCase() === q)));
  }

  /** Sort by John's sell price. Default: `'desc'` (most valuable first). */
  sortByJohnsSellPrice(order: 'asc' | 'desc' = 'desc'): RelicQuery {
    return new RelicQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.johnsSellPrice - b.johnsSellPrice : b.johnsSellPrice - a.johnsSellPrice,
      ),
    );
  }

  /** Every distinct dig-site location across the current result set, alphabetically sorted. */
  uniqueLocations(): string[] {
    return [...new Set(this.data.flatMap((r) => r.locations))].sort();
  }
}

/** Returns a RelicQuery for all relic data. Pass `source` to wrap a pre-filtered array. */
export function relics(source: Relic[] = relicData): RelicQuery {
  return new RelicQuery(source);
}
