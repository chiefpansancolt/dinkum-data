import { QueryBase } from '@/common/query-base';
import data from '@/data/buildings.json';
import { Building, DeedType } from '@/types';

const buildingData: Building[] = data as Building[];

/** Query builder for building data. All filter and sort methods return a new BuildingQuery for chaining. */
export class BuildingQuery extends QueryBase<Building> {
  constructor(data: Building[] = buildingData) {
    super(data);
  }

  /** Filter by deed type (`'Collectable'`, `'Movable'`, or `'Reference'`). */
  byDeedType(type: DeedType): BuildingQuery {
    return new BuildingQuery(this.data.filter((b) => b.deedType === type));
  }

  /** Filter to buildings tied to the given NPC (case-insensitive). */
  byNPC(npc: string): BuildingQuery {
    const q = npc.toLowerCase();
    return new BuildingQuery(this.data.filter((b) => b.npc.toLowerCase() === q));
  }

  /** Sort by deed price. Default: `'asc'` (cheapest first). */
  sortByDeedPrice(order: 'asc' | 'desc' = 'asc'): BuildingQuery {
    return new BuildingQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.deedPrice - b.deedPrice : b.deedPrice - a.deedPrice,
      ),
    );
  }
}

/** Returns a BuildingQuery for all building data. Pass `source` to wrap a pre-filtered array. */
export function buildings(source: Building[] = buildingData): BuildingQuery {
  return new BuildingQuery(source);
}
