import { QueryBase } from '@/common/query-base';
import data from '@/data/gear-and-equipment/cassettes.json';
import { Cassette } from '@/types';

const cassetteData: Cassette[] = data as Cassette[];

/** Query builder for cassette data. All filter and sort methods return a new CassetteQuery for chaining. */
export class CassetteQuery extends QueryBase<Cassette> {
  constructor(data: Cassette[] = cassetteData) {
    super(data);
  }

  /** Filter to cassettes obtainable from the given source (case-insensitive substring match). */
  bySource(source: string): CassetteQuery {
    const q = source.toLowerCase();
    return new CassetteQuery(
      this.data.filter((c) => c.source.some((s) => s.toLowerCase().includes(q))),
    );
  }

  /** Sort by buy price. Default: `'asc'` (cheapest first). */
  sortByBuyPrice(order: 'asc' | 'desc' = 'asc'): CassetteQuery {
    return new CassetteQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.buyPrice - b.buyPrice : b.buyPrice - a.buyPrice,
      ),
    );
  }
}

/** Returns a CassetteQuery for all cassette data. Pass `source` to wrap a pre-filtered array. */
export function cassettes(source: Cassette[] = cassetteData): CassetteQuery {
  return new CassetteQuery(source);
}
