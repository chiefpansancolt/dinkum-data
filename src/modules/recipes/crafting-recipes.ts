import { QueryBase } from '@/common/query-base';
import data from '@/data/recipes/crafting-recipes.json';
import { Recipe } from '@/types';

const craftingRecipeData: Recipe[] = data as Recipe[];

/** Query builder for crafting recipe data. All filter and sort methods return a new CraftingRecipeQuery for chaining. */
export class CraftingRecipeQuery extends QueryBase<Recipe> {
  constructor(data: Recipe[] = craftingRecipeData) {
    super(data);
  }

  /** Filter to recipes obtainable from the given source (case-insensitive substring match). */
  bySource(source: string): CraftingRecipeQuery {
    const q = source.toLowerCase();
    return new CraftingRecipeQuery(
      this.data.filter((r) => r.source?.some((s) => s.toLowerCase().includes(q))),
    );
  }

  /** Sort by base sell price. Default: `'desc'` (most valuable first). */
  sortByBaseSellPrice(order: 'asc' | 'desc' = 'desc'): CraftingRecipeQuery {
    return new CraftingRecipeQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.baseSellPrice - b.baseSellPrice : b.baseSellPrice - a.baseSellPrice,
      ),
    );
  }
}

/** Returns a CraftingRecipeQuery for all crafting recipe data. Pass `source` to wrap a pre-filtered array. */
export function craftingRecipes(source: Recipe[] = craftingRecipeData): CraftingRecipeQuery {
  return new CraftingRecipeQuery(source);
}
