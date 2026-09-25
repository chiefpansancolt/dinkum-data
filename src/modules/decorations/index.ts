import { QueryBase } from '@/common/query-base';
import data from '@/data/decorations.json';
import { Decoration, DecorationCategory } from '@/types';

const decorationsData: Decoration[] = data as Decoration[];

/** Query builder for decoration data. All filter and sort methods return a new DecorationQuery for chaining. */
export class DecorationQuery extends QueryBase<Decoration> {
  constructor(data: Decoration[] = decorationsData) {
    super(data);
  }

  /** Filter to decorations belonging to the given category. */
  byCategory(category: DecorationCategory): DecorationQuery {
    return new DecorationQuery(this.data.filter((d) => d.category === category));
  }

  /** Filter to decorations obtainable from the given source (case-insensitive substring match). */
  bySource(source: string): DecorationQuery {
    const q = source.toLowerCase();
    return new DecorationQuery(
      this.data.filter((d) => d.source?.some((s) => s.toLowerCase().includes(q))),
    );
  }

  /** Sort by base sell price. Default: `'desc'` (most valuable first). */
  sortByBaseSellPrice(order: 'asc' | 'desc' = 'desc'): DecorationQuery {
    return new DecorationQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.baseSellPrice - b.baseSellPrice : b.baseSellPrice - a.baseSellPrice,
      ),
    );
  }
}

/** Returns a DecorationQuery for all decoration data. Pass `source` to wrap a pre-filtered array. */
export function decorations(source: Decoration[] = decorationsData): DecorationQuery {
  return new DecorationQuery(source);
}
