import { BugQuery, bugs } from '@/modules/pedia/bugs';
import { CritterQuery, critters } from '@/modules/pedia/critters';
import { fish, FishQuery } from '@/modules/pedia/fish';
import { testQueryBaseContract } from '../helpers';

testQueryBaseContract('bugs', () => bugs());
testQueryBaseContract('critters', () => critters());
testQueryBaseContract('fish', () => fish());

describe('BugQuery filters', () => {
  it('accepts an explicit source array', () => {
    const subset = bugs().get().slice(0, 1);
    expect(new BugQuery(subset).count()).toBe(1);
  });

  it('uses default data when constructed without arguments', () => {
    expect(new BugQuery().count()).toBeGreaterThan(0);
  });

  it('byBiome() returns only matching bugs', () => {
    const biome = bugs().first()!.biome[0];
    for (const b of bugs().byBiome(biome).get()) expect(b.biome).toContain(biome);
  });

  it('byRarity() returns only matching bugs', () => {
    const rarity = bugs().first()!.rarity;
    for (const b of bugs().byRarity(rarity).get()) expect(b.rarity).toBe(rarity);
  });

  it('bySeason() returns only matching bugs', () => {
    const season = bugs().first()!.seasons[0];
    for (const b of bugs().bySeason(season).get()) expect(b.seasons).toContain(season);
  });

  it('byTime() returns only matching bugs', () => {
    const time = bugs().first()!.timeFound[0];
    for (const b of bugs().byTime(time).get()) expect(b.timeFound).toContain(time);
  });

  it('sortByBaseSellPrice() sorts descending by default', () => {
    const sorted = bugs().sortByBaseSellPrice().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].baseSellPrice).toBeGreaterThanOrEqual(sorted[i].baseSellPrice);
    }
  });

  it('sortByBaseSellPrice() sorts ascending when requested', () => {
    const sorted = bugs().sortByBaseSellPrice('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].baseSellPrice).toBeLessThanOrEqual(sorted[i].baseSellPrice);
    }
  });
});

describe('CritterQuery filters', () => {
  it('accepts an explicit source array', () => {
    const subset = critters().get().slice(0, 1);
    expect(new CritterQuery(subset).count()).toBe(1);
  });

  it('uses default data when constructed without arguments', () => {
    expect(new CritterQuery().count()).toBeGreaterThan(0);
  });

  it('byBiome() returns only matching critters', () => {
    const biome = critters().first()!.biome[0];
    for (const c of critters().byBiome(biome).get()) expect(c.biome).toContain(biome);
  });

  it('byRarity() returns only matching critters', () => {
    const rarity = critters().first()!.rarity;
    for (const c of critters().byRarity(rarity).get()) expect(c.rarity).toBe(rarity);
  });

  it('bySeason() returns only matching critters', () => {
    const season = critters().first()!.seasons[0];
    for (const c of critters().bySeason(season).get()) expect(c.seasons).toContain(season);
  });

  it('byTime() returns only matching critters', () => {
    const time = critters().first()!.timeFound[0];
    for (const c of critters().byTime(time).get()) expect(c.timeFound).toContain(time);
  });

  it('sortByBaseSellPrice() sorts descending by default', () => {
    const sorted = critters().sortByBaseSellPrice().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].baseSellPrice).toBeGreaterThanOrEqual(sorted[i].baseSellPrice);
    }
  });

  it('sortByBaseSellPrice() sorts ascending when requested', () => {
    const sorted = critters().sortByBaseSellPrice('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].baseSellPrice).toBeLessThanOrEqual(sorted[i].baseSellPrice);
    }
  });
});

describe('FishQuery filters', () => {
  it('accepts an explicit source array', () => {
    const subset = fish().get().slice(0, 1);
    expect(new FishQuery(subset).count()).toBe(1);
  });

  it('uses default data when constructed without arguments', () => {
    expect(new FishQuery().count()).toBeGreaterThan(0);
  });

  it('byBiome() returns only matching fish', () => {
    const biome = fish().first()!.biome[0];
    for (const f of fish().byBiome(biome).get()) expect(f.biome).toContain(biome);
  });

  it('byRarity() returns only matching fish', () => {
    const rarity = fish().first()!.rarity;
    for (const f of fish().byRarity(rarity).get()) expect(f.rarity).toBe(rarity);
  });

  it('bySeason() returns only matching fish', () => {
    const season = fish().first()!.seasons[0];
    for (const f of fish().bySeason(season).get()) expect(f.seasons).toContain(season);
  });

  it('byTime() returns only matching fish', () => {
    const time = fish().first()!.timeFound[0];
    for (const f of fish().byTime(time).get()) expect(f.timeFound).toContain(time);
  });

  it('sortByBaseSellPrice() sorts descending by default', () => {
    const sorted = fish().sortByBaseSellPrice().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].baseSellPrice).toBeGreaterThanOrEqual(sorted[i].baseSellPrice);
    }
  });

  it('sortByBaseSellPrice() sorts ascending when requested', () => {
    const sorted = fish().sortByBaseSellPrice('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].baseSellPrice).toBeLessThanOrEqual(sorted[i].baseSellPrice);
    }
  });

  it('sortByCookedPrice() sorts descending by default', () => {
    const sorted = fish().sortByCookedPrice().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].cookedPrice).toBeGreaterThanOrEqual(sorted[i].cookedPrice);
    }
  });

  it('sortByCookedPrice() sorts ascending when requested', () => {
    const sorted = fish().sortByCookedPrice('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].cookedPrice).toBeLessThanOrEqual(sorted[i].cookedPrice);
    }
  });
});
