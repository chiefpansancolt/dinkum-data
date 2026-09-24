import { QueryBase } from '@/common/query-base';
import data from '@/data/resources/other-craftables.json';
import { Recipe } from '@/types';

const otherCraftableData: Recipe[] = data as Recipe[];

/** Query builder for other-craftable data. All filter methods return a new OtherCraftableQuery for chaining. */
export class OtherCraftableQuery extends QueryBase<Recipe> {
  constructor(data: Recipe[] = otherCraftableData) {
    super(data);
  }

  /** Filter to craftables obtainable from the given source (case-insensitive substring match). */
  bySource(source: string): OtherCraftableQuery {
    const q = source.toLowerCase();
    return new OtherCraftableQuery(
      this.data.filter((c) => c.source?.some((s) => s.toLowerCase().includes(q))),
    );
  }
}

/** Returns an OtherCraftableQuery for all other-craftable data. Pass `source` to wrap a pre-filtered array. */
export function otherCraftables(source: Recipe[] = otherCraftableData): OtherCraftableQuery {
  return new OtherCraftableQuery(source);
}
