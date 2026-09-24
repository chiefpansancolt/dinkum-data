import { QueryBase } from '@/common/query-base';
import data from '@/data/gear-and-equipment/equipment.json';
import { Equipment } from '@/types';

const equipmentData: Equipment[] = data as Equipment[];

/** Query builder for equipment data. All filter and sort methods return a new EquipmentQuery for chaining. */
export class EquipmentQuery extends QueryBase<Equipment> {
  constructor(data: Equipment[] = equipmentData) {
    super(data);
  }

  /** Filter to equipment obtainable from the given source (case-insensitive substring match). */
  bySource(source: string): EquipmentQuery {
    const q = source.toLowerCase();
    return new EquipmentQuery(
      this.data.filter((e) => e.source.some((s) => s.toLowerCase().includes(q))),
    );
  }

  /** Filter by unlock requirement type (e.g. license, skill). */
  byRequirementType(type: string): EquipmentQuery {
    const q = type.toLowerCase();
    return new EquipmentQuery(this.data.filter((e) => e.requirementType?.toLowerCase() === q));
  }

  /** Filter to equipment compatible with the Windmill. */
  windmillCompatible(): EquipmentQuery {
    return new EquipmentQuery(this.data.filter((e) => e.windmillCompatable === true));
  }

  /** Filter to equipment compatible with the Solar Panel. */
  solarPanelCompatible(): EquipmentQuery {
    return new EquipmentQuery(this.data.filter((e) => e.solarPanelCompatable === true));
  }

  /** Sort by base sell price. Default: `'desc'` (most valuable first). */
  sortByBaseSellPrice(order: 'asc' | 'desc' = 'desc'): EquipmentQuery {
    return new EquipmentQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.baseSellPrice - b.baseSellPrice : b.baseSellPrice - a.baseSellPrice,
      ),
    );
  }
}

/** Returns an EquipmentQuery for all equipment data. Pass `source` to wrap a pre-filtered array. */
export function equipment(source: Equipment[] = equipmentData): EquipmentQuery {
  return new EquipmentQuery(source);
}
