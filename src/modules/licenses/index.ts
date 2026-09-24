import { QueryBase } from '@/common/query-base';
import data from '@/data/licenses.json';
import { License } from '@/types';

const licenseData: License[] = data as License[];

/** Query builder for license data. All filter and sort methods return a new LicenseQuery for chaining. */
export class LicenseQuery extends QueryBase<License> {
  constructor(data: License[] = licenseData) {
    super(data);
  }

  /** Total permit points required across every level of every license in the current result set. */
  totalPermitPoints(): number {
    return this.data.reduce(
      (sum, license) => sum + license.levels.reduce((s, l) => s + l.permitPointCost, 0),
      0,
    );
  }

  /** Sort by number of levels. Default: `'desc'` (most levels first). */
  sortByLevelCount(order: 'asc' | 'desc' = 'desc'): LicenseQuery {
    return new LicenseQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.levels.length - b.levels.length : b.levels.length - a.levels.length,
      ),
    );
  }
}

/** Returns a LicenseQuery for all license data. Pass `source` to wrap a pre-filtered array. */
export function licenses(source: License[] = licenseData): LicenseQuery {
  return new LicenseQuery(source);
}
