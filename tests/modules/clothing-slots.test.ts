import { clothingSlots, clothingTypesForSlot } from '@/modules/clothing-slots';

describe('clothing slots', () => {
  it('clothingSlots() returns every slot', () => {
    const data = clothingSlots();
    expect(data.Head.length).toBeGreaterThan(0);
    expect(data.Face.length).toBeGreaterThan(0);
    expect(data.Body.length).toBeGreaterThan(0);
    expect(data.Legs.length).toBeGreaterThan(0);
    expect(data.Feet.length).toBeGreaterThan(0);
  });

  it('clothingTypesForSlot() returns the matching array', () => {
    expect(clothingTypesForSlot('Head')).toBe(clothingSlots().Head);
    expect(clothingTypesForSlot('Head')).toContain('Hat');
  });
});
