export const BIOMES = [
  'Beach',
  'Bushlands',
  'Plains',
  'Pine Forests',
  'Tropics',
  'Desert',
  'Underground',
  'Island Reef',
  'Everywhere',
  'Rivers',
  'Ocean',
  'Deep Ocean',
  'Ponds',
  'Billabongs',
  'Mangroves',
  'Hot Hot Hot',
  'Undergrove',
  'Deep Mine',
  'Great Bite',
] as const;

export type Biome = (typeof BIOMES)[number];

export const TIME_PERIODS = ['Morning', 'Day', 'Evening', 'Night', 'All'] as const;

export type TimePeriod = (typeof TIME_PERIODS)[number];

export const SEASONS = ['All', 'Spring', 'Summer', 'Autumn', 'Winter'] as const;

export type Season = (typeof SEASONS)[number];

export const RARITY_LEVELS = ['Common', 'Uncommon', 'Rare', 'Very Rare', 'Super Rare'] as const;

export type RarityLevel = (typeof RARITY_LEVELS)[number];

export const WEEKDAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

export type Weekday = (typeof WEEKDAYS)[number];

export const TEMPERAMENTS = ['Passive', 'Neutral', 'Aggressive'] as const;

export type Temperament = (typeof TEMPERAMENTS)[number];

export const ANIMAL_TYPES = ['Wild Animal', 'Farm Animal', 'Tammed Animal'] as const;

export type AnimalType = (typeof ANIMAL_TYPES)[number];

export const DEED_TYPES = ['Collectable', 'Movable', 'Reference'] as const;

export type DeedType = (typeof DEED_TYPES)[number];

export const LICENSE_TYPES = [
  'Mining',
  'Fishing',
  'Farming',
  'Logging',
  'Hunting',
  'Building',
  'Vehicle',
  'Commerce',
] as const;

export type LicenseType = (typeof LICENSE_TYPES)[number];

export const CLOTHING_SLOTS = ['Head', 'Face', 'Body', 'Legs', 'Feet'] as const;

export type ClothingSlot = (typeof CLOTHING_SLOTS)[number];

export type BuyUnits = 'Dinks' | 'Permit Points';

/** Base fields shared by every entry across the dataset. */
export interface Base {
  id: string;
  name: string;
  img: string;
}

/** Base fields shared by every purchasable, sellable, or crafted item. */
export interface BaseResource extends Base {
  source?: string[];
  baseSellPrice: number;
  buyPrice?: number;
}

/** Base fields shared by Museum-donatable collectibles (fish, bugs, critters). */
export interface PediaItem extends BaseResource {
  biome: Biome[];
  timeFound: TimePeriod[];
  seasons: Season[];
  rarity: RarityLevel;
}

/** A named, counted item, typically a drop, ingredient, or crafting input. */
export interface Resource {
  name: string;
  img: string;
  count: number;
}

/** One input/output variant of a craftable recipe. */
export interface ResourceVariant {
  id: string;
  outputCount?: number;
  inputs: Resource[];
}

/** Consumable buff effects applied by food, drink, or equipment. */
export interface Buffs {
  length: number;
  healthRegenRate?: number;
  healthMax?: number;
  staminaRegenRate?: number;
  staminaMax?: number;
  attackLevel?: number;
  defenseLevel?: number;
  experienceLevel?: number;
  fishLevel?: number;
  foragingLevel?: number;
  miningLevel?: number;
  speedLevel?: number;
  swimmingLevel?: number;
  charged?: boolean;
  diligent?: boolean;
  sleepless?: boolean;
  fastHealthTickSpeedLevel?: number;
  coolLevel?: number;
}

/** Icon image path for each buff tier shown in the UI. */
export interface BuffIcons {
  length: string;
  healthRegenRate: string;
  healthMax: string;
  staminaRegenRate: string;
  staminaMax: string;
  attackLevel1: string;
  attackLevel2: string;
  attackLevel3: string;
  defenseLevel1: string;
  defenseLevel2: string;
  defenseLevel3: string;
  experienceLevel1: string;
  experienceLevel2: string;
  experienceLevel3: string;
  fishLevel1: string;
  fishLevel2: string;
  fishLevel3: string;
  foragingLevel1: string;
  foragingLevel2: string;
  foragingLevel3: string;
  miningLevel1: string;
  miningLevel2: string;
  miningLevel3: string;
  speedLevel1: string;
  speedLevel2: string;
  speedLevel3: string;
  swimmingLevel1: string;
  swimmingLevel2: string;
  charged: string;
  diligent: string;
  sleepless: string;
  fastHealthTickSpeedLevel1: string;
  fastHealthTickSpeedLevel2: string;
  coolLevel1: string;
  coolLevel2: string;
}
