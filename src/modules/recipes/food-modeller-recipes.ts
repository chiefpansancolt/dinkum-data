import { QueryBase } from '@/common/query-base';
import data from '@/data/recipes/food-modeller-recipes.json';
import { Recipe } from '@/types';

const foodModellerRecipeData: Recipe[] = data as Recipe[];

/** Query builder for Food Modeller recipe data. All filter and sort methods return a new FoodModellerRecipeQuery for chaining. */
export class FoodModellerRecipeQuery extends QueryBase<Recipe> {
  constructor(data: Recipe[] = foodModellerRecipeData) {
    super(data);
  }

  /** Filter to recipes obtainable from the given source (case-insensitive substring match). */
  bySource(source: string): FoodModellerRecipeQuery {
    const q = source.toLowerCase();
    return new FoodModellerRecipeQuery(
      this.data.filter((r) => r.source?.some((s) => s.toLowerCase().includes(q))),
    );
  }

  /** Sort by base sell price. Default: `'desc'` (most valuable first). */
  sortByBaseSellPrice(order: 'asc' | 'desc' = 'desc'): FoodModellerRecipeQuery {
    return new FoodModellerRecipeQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.baseSellPrice - b.baseSellPrice : b.baseSellPrice - a.baseSellPrice,
      ),
    );
  }
}

/** Returns a FoodModellerRecipeQuery for all Food Modeller recipe data. Pass `source` to wrap a pre-filtered array. */
export function foodModellerRecipes(
  source: Recipe[] = foodModellerRecipeData,
): FoodModellerRecipeQuery {
  return new FoodModellerRecipeQuery(source);
}
