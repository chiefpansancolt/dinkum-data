import { QueryBase } from '@/common/query-base';
import data from '@/data/recipes/cooking-recipes.json';
import { CookingRecipe } from '@/types';

const cookingRecipeData: CookingRecipe[] = data as CookingRecipe[];

/** Query builder for cooking recipe data. All filter and sort methods return a new CookingRecipeQuery for chaining. */
export class CookingRecipeQuery extends QueryBase<CookingRecipe> {
  constructor(data: CookingRecipe[] = cookingRecipeData) {
    super(data);
  }

  /** Filter to recipes that can be cooked at the given location (case-insensitive). */
  byLocation(location: string): CookingRecipeQuery {
    const q = location.toLowerCase();
    return new CookingRecipeQuery(
      this.data.filter((r) => r.cookingLocation.some((l) => l.toLowerCase() === q)),
    );
  }

  /** Sort by base sell price. Default: `'desc'` (most valuable first). */
  sortByBaseSellPrice(order: 'asc' | 'desc' = 'desc'): CookingRecipeQuery {
    return new CookingRecipeQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.baseSellPrice - b.baseSellPrice : b.baseSellPrice - a.baseSellPrice,
      ),
    );
  }
}

/** Returns a CookingRecipeQuery for all cooking recipe data. Pass `source` to wrap a pre-filtered array. */
export function cookingRecipes(source: CookingRecipe[] = cookingRecipeData): CookingRecipeQuery {
  return new CookingRecipeQuery(source);
}
