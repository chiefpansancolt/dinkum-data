import { QueryBase } from '@/common/query-base';
import data from '@/data/weight-items.json';
import { WeightItem } from '@/types';

const weightItemData: WeightItem[] = data as WeightItem[];

/** Query builder for weight-item data. All sort methods return a new WeightItemQuery for chaining. */
export class WeightItemQuery extends QueryBase<WeightItem> {
  constructor(data: WeightItem[] = weightItemData) {
    super(data);
  }

  /** Sort by price per kilogram. Default: `'desc'` (most valuable first). */
  sortByPricePerKg(order: 'asc' | 'desc' = 'desc'): WeightItemQuery {
    return new WeightItemQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.pricePerKg - b.pricePerKg : b.pricePerKg - a.pricePerKg,
      ),
    );
  }
}

/** Returns a WeightItemQuery for all weight-item data. Pass `source` to wrap a pre-filtered array. */
export function weightItems(source: WeightItem[] = weightItemData): WeightItemQuery {
  return new WeightItemQuery(source);
}
