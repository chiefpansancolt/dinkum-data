import { furniture, FurnitureQuery } from '@/modules/furniture';
import { testQueryBaseContract } from '../helpers';

testQueryBaseContract('furniture', () => furniture());

describe('FurnitureQuery filters', () => {
  it('accepts an explicit source array', () => {
    const subset = furniture().get().slice(0, 1);
    expect(new FurnitureQuery(subset).count()).toBe(1);
  });

  it('uses default data when constructed without arguments', () => {
    expect(new FurnitureQuery().count()).toBeGreaterThan(0);
  });

  it('bySet() returns only matching items', () => {
    const withSet = furniture()
      .get()
      .find((f) => f.furnitureSet)!;
    const results = furniture().bySet(withSet.furnitureSet!).get();
    expect(results.length).toBeGreaterThan(0);
    for (const f of results) {
      expect(f.furnitureSet?.toLowerCase()).toBe(withSet.furnitureSet!.toLowerCase());
    }
  });

  it('bySet() excludes items with no set', () => {
    const noSet = furniture()
      .get()
      .find((f) => !f.furnitureSet)!;
    expect(noSet).toBeDefined();
    const results = furniture().bySet('__nonexistent__').get();
    expect(results.some((f) => f.id === noSet.id)).toBe(false);
  });

  it('bySource() returns only matching items', () => {
    const withSource = furniture()
      .get()
      .find((f) => f.source && f.source.length > 0)!;
    const source = withSource.source![0];
    const results = furniture().bySource(source).get();
    expect(results.length).toBeGreaterThan(0);
    for (const f of results) {
      expect(f.source?.some((s) => s.toLowerCase().includes(source.toLowerCase()))).toBe(true);
    }
  });

  it('bySource() excludes items with no source', () => {
    const noSource = furniture()
      .get()
      .find((f) => !f.source || f.source.length === 0)!;
    expect(noSource).toBeDefined();
    const results = furniture().bySource('__nonexistent__').get();
    expect(results.some((f) => f.id === noSource.id)).toBe(false);
  });

  it('melvinsCatalogue() returns only catalogue items', () => {
    const results = furniture().melvinsCatalogue().get();
    expect(results.length).toBeGreaterThan(0);
    for (const f of results) expect(f.melvinsCatalogue).toBe(true);
  });

  it('sortByBaseSellPrice() sorts descending by default', () => {
    const sorted = furniture().sortByBaseSellPrice().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].baseSellPrice).toBeGreaterThanOrEqual(sorted[i].baseSellPrice);
    }
  });

  it('sortByBaseSellPrice() sorts ascending when requested', () => {
    const sorted = furniture().sortByBaseSellPrice('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].baseSellPrice).toBeLessThanOrEqual(sorted[i].baseSellPrice);
    }
  });
});
