import { PediaItem } from './common';

export type Bug = PediaItem;

export type Critter = PediaItem;

export interface Fish extends PediaItem {
  cookedPrice: number;
  cookedPieces: number;
}
