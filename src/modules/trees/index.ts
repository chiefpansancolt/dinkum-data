import { QueryBase } from '@/common/query-base';
import data from '@/data/trees.json';
import { Biome, Tree } from '@/types';

const treeData: Tree[] = data as Tree[];

/** Query builder for tree data. All filter and sort methods return a new TreeQuery for chaining. */
export class TreeQuery extends QueryBase<Tree> {
  constructor(data: Tree[] = treeData) {
    super(data);
  }

  /** Filter to trees found in the given biome. */
  byLocation(biome: Biome): TreeQuery {
    return new TreeQuery(this.data.filter((t) => t.locations?.includes(biome)));
  }

  /** Sort by growth period in days. Default: `'asc'` (fastest first). */
  sortByGrowthPeriod(order: 'asc' | 'desc' = 'asc'): TreeQuery {
    return new TreeQuery(
      [...this.data].sort((a, b) => {
        const ga = a.growthPeriod ?? 0;
        const gb = b.growthPeriod ?? 0;
        return order === 'asc' ? ga - gb : gb - ga;
      }),
    );
  }
}

/** Returns a TreeQuery for all tree data. Pass `source` to wrap a pre-filtered array. */
export function trees(source: Tree[] = treeData): TreeQuery {
  return new TreeQuery(source);
}
