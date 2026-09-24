import { clothing, ClothingQuery } from '@/modules/clothing';
import { testQueryBaseContract } from '../helpers';

testQueryBaseContract('clothing', () => clothing());

describe('ClothingQuery filters', () => {
  it('accepts an explicit source array', () => {
    const subset = clothing().get().slice(0, 1);
    expect(new ClothingQuery(subset).count()).toBe(1);
  });

  it('uses default data when constructed without arguments', () => {
    expect(new ClothingQuery().count()).toBeGreaterThan(0);
  });

  it('bySlot() returns only items with that slot', () => {
    const results = clothing().bySlot('Head').get();
    expect(results.length).toBeGreaterThan(0);
    for (const c of results) expect(c.slot).toContain('Head');
  });

  it('byType() returns only matching items', () => {
    const type = clothing().first()!.type;
    const results = clothing().byType(type).get();
    expect(results.length).toBeGreaterThan(0);
    for (const c of results) expect(c.type.toLowerCase()).toBe(type.toLowerCase());
  });

  it('bySet() returns only matching items', () => {
    const withSet = clothing()
      .get()
      .find((c) => c.set)!;
    const results = clothing().bySet(withSet.set).get();
    expect(results.length).toBeGreaterThan(0);
    for (const c of results) expect(c.set.toLowerCase()).toBe(withSet.set.toLowerCase());
  });

  it('cloversCatalogue() returns only catalogue items', () => {
    const results = clothing().cloversCatalogue().get();
    expect(results.length).toBeGreaterThan(0);
    for (const c of results) expect(c.cloversCatalogue).toBe(true);
  });

  it('sortByBaseSellPrice() sorts descending by default', () => {
    const sorted = clothing().sortByBaseSellPrice().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].baseSellPrice).toBeGreaterThanOrEqual(sorted[i].baseSellPrice);
    }
  });

  it('sortByBaseSellPrice() sorts ascending when requested', () => {
    const sorted = clothing().sortByBaseSellPrice('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].baseSellPrice).toBeLessThanOrEqual(sorted[i].baseSellPrice);
    }
  });
});
