import { AnimalType, Base, Resource, Temperament } from './common';

export interface Animal extends Base {
  temperament: Temperament;
  habitat?: string[];
  health?: number;
  drops: Resource[];
  produces?: Resource[];
  researchReward?: number;
  buyPrice?: number;
  baseSellPrice?: number;
  maxSellPrice?: number;
  source?: string;
  type: AnimalType;
  domesticable?: boolean;
}
