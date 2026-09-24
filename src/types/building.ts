import { Base, DeedType, Resource } from './common';

export interface Building extends Base {
  deedName: string;
  size: string;
  npc: string;
  npcImg: string;
  description: string;
  buildTime: string;
  deedPrice: number;
  deedType: DeedType;
  inputs: Resource[];
  operatingHours: string[];
  daysClosed: string;
}
