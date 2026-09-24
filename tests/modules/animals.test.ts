import { AnimalQuery, animals } from '@/modules/animals';
import { testQueryBaseContract } from '../helpers';

testQueryBaseContract('animals', () => animals());

describe('AnimalQuery filters', () => {
  it('accepts an explicit source array', () => {
    const subset = animals().get().slice(0, 1);
    expect(new AnimalQuery(subset).count()).toBe(1);
  });

  it('uses default data when constructed without arguments', () => {
    expect(new AnimalQuery().count()).toBeGreaterThan(0);
  });

  it('byType() returns only matching animals', () => {
    const results = animals().byType('Wild Animal').get();
    expect(results.length).toBeGreaterThan(0);
    for (const a of results) expect(a.type).toBe('Wild Animal');
  });

  it('byTemperament() returns only matching animals', () => {
    const results = animals().byTemperament('Passive').get();
    expect(results.length).toBeGreaterThan(0);
    for (const a of results) expect(a.temperament).toBe('Passive');
  });

  it('byHabitat() returns only animals with that habitat', () => {
    const withHabitat = animals()
      .get()
      .find((a) => a.habitat && a.habitat.length > 0)!;
    const habitat = withHabitat.habitat![0];
    const results = animals().byHabitat(habitat).get();
    expect(results.length).toBeGreaterThan(0);
    for (const a of results) expect(a.habitat).toContain(habitat);
  });

  it('byHabitat() excludes animals with no habitat', () => {
    const noHabitat = animals()
      .get()
      .find((a) => !a.habitat || a.habitat.length === 0)!;
    expect(noHabitat).toBeDefined();
    const results = animals().byHabitat('__nonexistent__').get();
    expect(results.some((a) => a.id === noHabitat.id)).toBe(false);
  });

  it('domesticable() returns only domesticable animals', () => {
    const results = animals().domesticable().get();
    expect(results.length).toBeGreaterThan(0);
    for (const a of results) expect(a.domesticable).toBe(true);
  });

  it('sortByBaseSellPrice() sorts descending by default', () => {
    const sorted = animals().sortByBaseSellPrice().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].baseSellPrice ?? 0).toBeGreaterThanOrEqual(sorted[i].baseSellPrice ?? 0);
    }
  });

  it('sortByBaseSellPrice() sorts ascending when requested', () => {
    const sorted = animals().sortByBaseSellPrice('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].baseSellPrice ?? 0).toBeLessThanOrEqual(sorted[i].baseSellPrice ?? 0);
    }
  });
});
