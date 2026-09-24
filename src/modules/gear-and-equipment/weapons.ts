import { QueryBase } from '@/common/query-base';
import data from '@/data/gear-and-equipment/weapons.json';
import { Weapon } from '@/types';

const weaponData: Weapon[] = data as Weapon[];

/** Query builder for weapon data. All filter and sort methods return a new WeaponQuery for chaining. */
export class WeaponQuery extends QueryBase<Weapon> {
  constructor(data: Weapon[] = weaponData) {
    super(data);
  }

  /** Filter to weapons obtainable from the given source (case-insensitive substring match). */
  bySource(source: string): WeaponQuery {
    const q = source.toLowerCase();
    return new WeaponQuery(
      this.data.filter((w) => w.source.some((s) => s.toLowerCase().includes(q))),
    );
  }

  /** Sort by damage. Default: `'desc'` (strongest first). */
  sortByDamage(order: 'asc' | 'desc' = 'desc'): WeaponQuery {
    return new WeaponQuery(
      [...this.data].sort((a, b) => {
        const da = a.damage ?? 0;
        const db = b.damage ?? 0;
        return order === 'asc' ? da - db : db - da;
      }),
    );
  }
}

/** Returns a WeaponQuery for all weapon data. Pass `source` to wrap a pre-filtered array. */
export function weapons(source: Weapon[] = weaponData): WeaponQuery {
  return new WeaponQuery(source);
}
