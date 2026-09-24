import { QueryBase } from '@/common/query-base';
import data from '@/data/furniture.json';
import { Furniture } from '@/types';

const furnitureData: Furniture[] = data as Furniture[];

/** Query builder for furniture data. All filter and sort methods return a new FurnitureQuery for chaining. */
export class FurnitureQuery extends QueryBase<Furniture> {
  constructor(data: Furniture[] = furnitureData) {
    super(data);
  }

  /** Filter to furniture belonging to the given set. */
  bySet(set: string): FurnitureQuery {
    const q = set.toLowerCase();
    return new FurnitureQuery(this.data.filter((f) => f.furnitureSet?.toLowerCase() === q));
  }

  /** Filter to furniture obtainable from the given source (case-insensitive substring match). */
  bySource(source: string): FurnitureQuery {
    const q = source.toLowerCase();
    return new FurnitureQuery(
      this.data.filter((f) => f.source?.some((s) => s.toLowerCase().includes(q))),
    );
  }

  /** Filter to furniture available in Melvin's Catalogue. */
  melvinsCatalogue(): FurnitureQuery {
    return new FurnitureQuery(this.data.filter((f) => f.melvinsCatalogue));
  }

  /** Sort by base sell price. Default: `'desc'` (most valuable first). */
  sortByBaseSellPrice(order: 'asc' | 'desc' = 'desc'): FurnitureQuery {
    return new FurnitureQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.baseSellPrice - b.baseSellPrice : b.baseSellPrice - a.baseSellPrice,
      ),
    );
  }
}

/** Returns a FurnitureQuery for all furniture data. Pass `source` to wrap a pre-filtered array. */
export function furniture(source: Furniture[] = furnitureData): FurnitureQuery {
  return new FurnitureQuery(source);
}
