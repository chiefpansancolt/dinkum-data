import { BaseResource, Buffs, ResourceVariant } from './common';

export interface Recipe extends BaseResource {
  outputCount?: number | 'Varies';
  variants: ResourceVariant[];
  buffs?: Buffs;
}

export interface CookingRecipe extends Recipe {
  outputCount: number | 'Varies';
  cookingLocation: string[];
  sheilasSellPrice?: number;
  tedsSellPrice?: number | null;
  jimmysSellPrice?: number;
}
