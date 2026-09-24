import { QueryBase } from '@/common/query-base';
import data from '@/data/recipes/sign-writing-recipes.json';
import { Recipe } from '@/types';

const signWritingRecipeData: Recipe[] = data as Recipe[];

/** Query builder for sign-writing recipe data. All filter and sort methods return a new SignWritingRecipeQuery for chaining. */
export class SignWritingRecipeQuery extends QueryBase<Recipe> {
  constructor(data: Recipe[] = signWritingRecipeData) {
    super(data);
  }

  /** Filter to recipes obtainable from the given source (case-insensitive substring match). */
  bySource(source: string): SignWritingRecipeQuery {
    const q = source.toLowerCase();
    return new SignWritingRecipeQuery(
      this.data.filter((r) => r.source?.some((s) => s.toLowerCase().includes(q))),
    );
  }

  /** Sort by base sell price. Default: `'desc'` (most valuable first). */
  sortByBaseSellPrice(order: 'asc' | 'desc' = 'desc'): SignWritingRecipeQuery {
    return new SignWritingRecipeQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.baseSellPrice - b.baseSellPrice : b.baseSellPrice - a.baseSellPrice,
      ),
    );
  }
}

/** Returns a SignWritingRecipeQuery for all sign-writing recipe data. Pass `source` to wrap a pre-filtered array. */
export function signWritingRecipes(
  source: Recipe[] = signWritingRecipeData,
): SignWritingRecipeQuery {
  return new SignWritingRecipeQuery(source);
}
