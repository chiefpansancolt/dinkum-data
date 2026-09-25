import { DecorationQuery, decorations } from '@/modules/decorations';
import { testQueryBaseContract } from '../helpers';

testQueryBaseContract('decorations', () => decorations());

describe('DecorationQuery filters', () => {
  it('accepts an explicit source array', () => {
    const subset = decorations().get().slice(0, 1);
    expect(new DecorationQuery(subset).count()).toBe(1);
  });

  it('uses default data when constructed without arguments', () => {
    expect(new DecorationQuery().count()).toBeGreaterThan(0);
  });

  it('byCategory() returns only matching items', () => {
    const withCategory = decorations().first()!;
    const results = decorations().byCategory(withCategory.category).get();
    expect(results.length).toBeGreaterThan(0);
    for (const d of results) {
      expect(d.category).toBe(withCategory.category);
    }
  });

  it('bySource() returns only matching items', () => {
    const withSource = decorations()
      .get()
      .find((d) => d.source && d.source.length > 0)!;
    const source = withSource.source![0];
    const results = decorations().bySource(source).get();
    expect(results.length).toBeGreaterThan(0);
    for (const d of results) {
      expect(d.source?.some((s) => s.toLowerCase().includes(source.toLowerCase()))).toBe(true);
    }
  });

  it('bySource() excludes items with no source', () => {
    const noSource = { ...decorations().first()!, source: undefined };
    const results = new DecorationQuery([noSource]).bySource('anything').get();
    expect(results.some((d) => d.id === noSource.id)).toBe(false);
  });

  it('sortByBaseSellPrice() sorts descending by default', () => {
    const sorted = decorations().sortByBaseSellPrice().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].baseSellPrice).toBeGreaterThanOrEqual(sorted[i].baseSellPrice);
    }
  });

  it('sortByBaseSellPrice() sorts ascending when requested', () => {
    const sorted = decorations().sortByBaseSellPrice('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].baseSellPrice).toBeLessThanOrEqual(sorted[i].baseSellPrice);
    }
  });
});
