import { BaseResource, ClothingSlot } from './common';

export interface Clothing extends BaseResource {
  displayPrice: number | null;
  cataloguePrice: number | null;
  cloversCatalogue: boolean;
  slot: ClothingSlot[];
  type: string;
  set: string;
}
