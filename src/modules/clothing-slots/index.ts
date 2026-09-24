import data from '@/data/clothing-slots.json';
import { ClothingSlot, ClothingSlotTypes } from '@/types';

const clothingSlotData: ClothingSlotTypes = data as ClothingSlotTypes;

/** Return the clothing-slot taxonomy: which clothing `type` values belong to each slot. */
export function clothingSlots(): ClothingSlotTypes {
  return clothingSlotData;
}

/** Return the valid clothing `type` values for a single slot. */
export function clothingTypesForSlot(slot: ClothingSlot): string[] {
  return clothingSlotData[slot];
}
