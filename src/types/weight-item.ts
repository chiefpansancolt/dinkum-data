import { Base } from './common';

export interface WeightItem extends Base {
  pricePerKg: number;
  minWeight: number;
  maxWeight: number;
}
