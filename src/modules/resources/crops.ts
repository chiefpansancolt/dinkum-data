import { QueryBase } from '@/common/query-base';
import data from '@/data/resources/crops.json';
import { Crop, Season } from '@/types';

const cropData: Crop[] = data as Crop[];

/** Query builder for crop data. All filter methods return a new CropQuery for chaining. */
export class CropQuery extends QueryBase<Crop> {
  constructor(data: Crop[] = cropData) {
    super(data);
  }

  /** Filter to crops whose seed is plantable in the given season. */
  bySeason(season: Season): CropQuery {
    return new CropQuery(this.data.filter((c) => c.seed?.season.includes(season)));
  }

  /** Sort by base sell price. Default: `'desc'` (most valuable first). */
  sortByBaseSellPrice(order: 'asc' | 'desc' = 'desc'): CropQuery {
    return new CropQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.baseSellPrice - b.baseSellPrice : b.baseSellPrice - a.baseSellPrice,
      ),
    );
  }
}

/** Returns a CropQuery for all crop data. Pass `source` to wrap a pre-filtered array. */
export function crops(source: Crop[] = cropData): CropQuery {
  return new CropQuery(source);
}
