import { BaseResource } from './common';

export interface Furniture extends BaseResource {
  displayPrice?: number;
  cataloguePrice?: number;
  melvinsCatalogue: boolean;
  furnitureSet?: string;
}
