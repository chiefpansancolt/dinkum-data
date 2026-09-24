import { QueryBase } from '@/common/query-base';
import data from '@/data/gear-and-equipment/vehicles.json';
import { Vehicle } from '@/types';

const vehicleData: Vehicle[] = data as Vehicle[];

/** Query builder for vehicle data. All filter and sort methods return a new VehicleQuery for chaining. */
export class VehicleQuery extends QueryBase<Vehicle> {
  constructor(data: Vehicle[] = vehicleData) {
    super(data);
  }

  /** Filter to vehicles obtainable from the given source (case-insensitive substring match). */
  bySource(source: string): VehicleQuery {
    const q = source.toLowerCase();
    return new VehicleQuery(
      this.data.filter((v) => v.source.some((s) => s.toLowerCase().includes(q))),
    );
  }

  /** Filter by unlock requirement type (e.g. license, skill). */
  byRequirementType(type: string): VehicleQuery {
    const q = type.toLowerCase();
    return new VehicleQuery(this.data.filter((v) => v.requirementType?.toLowerCase() === q));
  }

  /** Sort by base sell price. Default: `'desc'` (most valuable first). */
  sortByBaseSellPrice(order: 'asc' | 'desc' = 'desc'): VehicleQuery {
    return new VehicleQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.baseSellPrice - b.baseSellPrice : b.baseSellPrice - a.baseSellPrice,
      ),
    );
  }
}

/** Returns a VehicleQuery for all vehicle data. Pass `source` to wrap a pre-filtered array. */
export function vehicles(source: Vehicle[] = vehicleData): VehicleQuery {
  return new VehicleQuery(source);
}
