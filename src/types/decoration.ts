import { BaseResource } from './common';

export const DECORATION_CATEGORIES = [
  'Paths & Steps',
  'Fences & Gates',
  'Benches',
  'Bridges',
  'Flags, Festoons & Arches',
  'Flower Beds',
  'Flowers in Pots',
  'Ladders',
  'Lights',
  'Market Stalls & Miscellaneous',
  'Pergolas',
  'Plush',
  'Statues',
  'Water Fountains & Waterbeds',
  'Winter Ice Sculpting',
  'Festive',
] as const;

export type DecorationCategory = (typeof DECORATION_CATEGORIES)[number];

export interface Decoration extends BaseResource {
  category: DecorationCategory;
}
