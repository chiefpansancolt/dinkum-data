import { QueryBase } from '@/common/query-base';
import data from '@/data/clothing.json';
import { Clothing, ClothingSlot } from '@/types';

const clothingData: Clothing[] = data as Clothing[];

/** Query builder for clothing data. All filter and sort methods return a new ClothingQuery for chaining. */
export class ClothingQuery extends QueryBase<Clothing> {
  constructor(data: Clothing[] = clothingData) {
    super(data);
  }

  /** Filter to clothing that occupies the given slot (e.g. `'Head'`, `'Body'`). */
  bySlot(slot: ClothingSlot): ClothingQuery {
    return new ClothingQuery(this.data.filter((c) => c.slot.includes(slot)));
  }

  /** Filter by clothing type (e.g. `'Hat'`, `'Shirt'`). */
  byType(type: string): ClothingQuery {
    const q = type.toLowerCase();
    return new ClothingQuery(this.data.filter((c) => c.type.toLowerCase() === q));
  }

  /** Filter to clothing belonging to the given set. */
  bySet(set: string): ClothingQuery {
    const q = set.toLowerCase();
    return new ClothingQuery(this.data.filter((c) => c.set.toLowerCase() === q));
  }

  /** Filter to clothing available in Clover's Catalogue. */
  cloversCatalogue(): ClothingQuery {
    return new ClothingQuery(this.data.filter((c) => c.cloversCatalogue));
  }

  /** Sort by base sell price. Default: `'desc'` (most valuable first). */
  sortByBaseSellPrice(order: 'asc' | 'desc' = 'desc'): ClothingQuery {
    return new ClothingQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.baseSellPrice - b.baseSellPrice : b.baseSellPrice - a.baseSellPrice,
      ),
    );
  }
}

/** Returns a ClothingQuery for all clothing data. Pass `source` to wrap a pre-filtered array. */
export function clothing(source: Clothing[] = clothingData): ClothingQuery {
  return new ClothingQuery(source);
}
