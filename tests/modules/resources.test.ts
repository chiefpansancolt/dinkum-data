import { AnimalProductQuery, animalProducts } from '@/modules/resources/animal-products';
import { CropQuery, crops } from '@/modules/resources/crops';
import { ForagableQuery, foragables } from '@/modules/resources/foragables';
import { MineralQuery, minerals } from '@/modules/resources/minerals';
import { OtherCraftableQuery, otherCraftables } from '@/modules/resources/other-craftables';
import { paint, PaintQuery } from '@/modules/resources/paint';
import { RelicQuery, relics } from '@/modules/resources/relics';
import { SeedQuery, seeds } from '@/modules/resources/seeds';
import { trophies, TrophyQuery } from '@/modules/resources/trophies';
import { testQueryBaseContract } from '../helpers';

testQueryBaseContract('animalProducts', () => animalProducts());
testQueryBaseContract('crops', () => crops());
testQueryBaseContract('foragables', () => foragables());
testQueryBaseContract('minerals', () => minerals());
testQueryBaseContract('otherCraftables', () => otherCraftables());
testQueryBaseContract('paint', () => paint());
testQueryBaseContract('relics', () => relics());
testQueryBaseContract('seeds', () => seeds());
testQueryBaseContract('trophies', () => trophies());

describe('AnimalProductQuery filters', () => {
  it('accepts an explicit source array', () => {
    const subset = animalProducts().get().slice(0, 1);
    expect(new AnimalProductQuery(subset).count()).toBe(1);
  });

  it('uses default data when constructed without arguments', () => {
    expect(new AnimalProductQuery().count()).toBeGreaterThan(0);
  });

  it('byLocation() returns only matching products', () => {
    const withLocation = animalProducts()
      .get()
      .find((p) => p.locations && p.locations.length > 0)!;
    const biome = withLocation.locations![0];
    const results = animalProducts().byLocation(biome).get();
    expect(results.length).toBeGreaterThan(0);
    for (const p of results) expect(p.locations).toContain(biome);
  });

  it('byLocation() excludes products with no location', () => {
    const noLocation = animalProducts()
      .get()
      .find((p) => !p.locations || p.locations.length === 0)!;
    expect(noLocation).toBeDefined();
    const results = animalProducts().byLocation('Deep Mine').get();
    expect(results.some((p) => p.id === noLocation.id)).toBe(false);
  });
});

describe('CropQuery filters', () => {
  it('accepts an explicit source array', () => {
    const subset = crops().get().slice(0, 1);
    expect(new CropQuery(subset).count()).toBe(1);
  });

  it('uses default data when constructed without arguments', () => {
    expect(new CropQuery().count()).toBeGreaterThan(0);
  });

  it('bySeason() returns only matching crops', () => {
    const withSeed = crops()
      .get()
      .find((c) => c.seed)!;
    const season = withSeed.seed!.season[0];
    const results = crops().bySeason(season).get();
    expect(results.length).toBeGreaterThan(0);
    for (const c of results) expect(c.seed?.season).toContain(season);
  });

  it('bySeason() excludes crops with no seed', () => {
    const noSeed = crops()
      .get()
      .find((c) => !c.seed)!;
    expect(noSeed).toBeDefined();
    const results = crops().bySeason('Winter').get();
    expect(results.some((c) => c.id === noSeed.id)).toBe(false);
  });

  it('sortByBaseSellPrice() sorts descending by default', () => {
    const sorted = crops().sortByBaseSellPrice().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].baseSellPrice).toBeGreaterThanOrEqual(sorted[i].baseSellPrice);
    }
  });

  it('sortByBaseSellPrice() sorts ascending when requested', () => {
    const sorted = crops().sortByBaseSellPrice('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].baseSellPrice).toBeLessThanOrEqual(sorted[i].baseSellPrice);
    }
  });
});

describe('ForagableQuery filters', () => {
  it('accepts an explicit source array', () => {
    const subset = foragables().get().slice(0, 1);
    expect(new ForagableQuery(subset).count()).toBe(1);
  });

  it('uses default data when constructed without arguments', () => {
    expect(new ForagableQuery().count()).toBeGreaterThan(0);
  });

  it('byLocation() returns only matching foragables', () => {
    const withLocation = foragables()
      .get()
      .find((f) => f.locations && f.locations.length > 0)!;
    const biome = withLocation.locations![0];
    const results = foragables().byLocation(biome).get();
    expect(results.length).toBeGreaterThan(0);
    for (const f of results) expect(f.locations).toContain(biome);
  });

  it('byLocation() excludes foragables with no location', () => {
    const noLocation = foragables()
      .get()
      .find((f) => !f.locations || f.locations.length === 0)!;
    expect(noLocation).toBeDefined();
    const results = foragables().byLocation('Deep Mine').get();
    expect(results.some((f) => f.id === noLocation.id)).toBe(false);
  });
});

describe('MineralQuery filters', () => {
  it('accepts an explicit source array', () => {
    const subset = minerals().get().slice(0, 1);
    expect(new MineralQuery(subset).count()).toBe(1);
  });

  it('uses default data when constructed without arguments', () => {
    expect(new MineralQuery().count()).toBeGreaterThan(0);
  });

  it('byLocation() returns only matching minerals', () => {
    const mineral = minerals()
      .get()
      .find((m) => m.locations && m.locations.length > 0)!;
    const biome = mineral.locations![0];
    for (const m of minerals().byLocation(biome).get()) expect(m.locations).toContain(biome);
  });

  it('byLocation() excludes minerals with no location', () => {
    const noLocation = minerals()
      .get()
      .find((m) => !m.locations || m.locations.length === 0)!;
    expect(noLocation).toBeDefined();
    const results = minerals().byLocation('Deep Mine').get();
    expect(results.some((m) => m.id === noLocation.id)).toBe(false);
  });
});

describe('OtherCraftableQuery filters', () => {
  it('accepts an explicit source array', () => {
    const subset = otherCraftables().get().slice(0, 1);
    expect(new OtherCraftableQuery(subset).count()).toBe(1);
  });

  it('uses default data when constructed without arguments', () => {
    expect(new OtherCraftableQuery().count()).toBeGreaterThan(0);
  });

  it('bySource() returns only matching craftables', () => {
    const withSource = otherCraftables()
      .get()
      .find((c) => c.source && c.source.length > 0)!;
    const source = withSource.source![0];
    const results = otherCraftables().bySource(source).get();
    expect(results.length).toBeGreaterThan(0);
    for (const c of results) {
      expect(c.source?.some((s) => s.toLowerCase().includes(source.toLowerCase()))).toBe(true);
    }
  });

  it('bySource() excludes craftables with no source', () => {
    const noSource = otherCraftables()
      .get()
      .find((c) => !c.source || c.source.length === 0)!;
    expect(noSource).toBeDefined();
    const results = otherCraftables().bySource('__nonexistent__').get();
    expect(results.some((c) => c.id === noSource.id)).toBe(false);
  });
});

describe('PaintQuery filters', () => {
  it('accepts an explicit source array', () => {
    const subset = paint().get().slice(0, 1);
    expect(new PaintQuery(subset).count()).toBe(1);
  });

  it('uses default data when constructed without arguments', () => {
    expect(new PaintQuery().count()).toBeGreaterThan(0);
  });

  it('bySource() returns only matching paint', () => {
    const source = paint().first()!.source![0];
    for (const p of paint().bySource(source).get()) {
      expect(p.source?.some((s) => s.toLowerCase().includes(source.toLowerCase()))).toBe(true);
    }
  });

  it('bySource() excludes paint with no source', () => {
    const noSource = new PaintQuery([{ ...paint().first()!, source: undefined }]);
    expect(noSource.bySource('anything').count()).toBe(0);
  });
});

describe('RelicQuery filters', () => {
  it('accepts an explicit source array', () => {
    const subset = relics().get().slice(0, 1);
    expect(new RelicQuery(subset).count()).toBe(1);
  });

  it('uses default data when constructed without arguments', () => {
    expect(new RelicQuery().count()).toBeGreaterThan(0);
  });

  it('byLocation() returns only matching relics', () => {
    const location = relics().first()!.locations[0];
    const results = relics().byLocation(location).get();
    expect(results.length).toBeGreaterThan(0);
    for (const r of results)
      expect(r.locations.map((l) => l.toLowerCase())).toContain(location.toLowerCase());
  });

  it('sortByJohnsSellPrice() sorts descending by default', () => {
    const sorted = relics().sortByJohnsSellPrice().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].johnsSellPrice).toBeGreaterThanOrEqual(sorted[i].johnsSellPrice);
    }
  });

  it('sortByJohnsSellPrice() sorts ascending when requested', () => {
    const sorted = relics().sortByJohnsSellPrice('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].johnsSellPrice).toBeLessThanOrEqual(sorted[i].johnsSellPrice);
    }
  });
});

describe('SeedQuery filters', () => {
  it('accepts an explicit source array', () => {
    const subset = seeds().get().slice(0, 1);
    expect(new SeedQuery(subset).count()).toBe(1);
  });

  it('uses default data when constructed without arguments', () => {
    expect(new SeedQuery().count()).toBeGreaterThan(0);
  });

  it('byCategory() returns only matching seeds', () => {
    const category = seeds().first()!.category;
    const results = seeds().byCategory(category).get();
    expect(results.length).toBeGreaterThan(0);
    for (const s of results) expect(s.category.toLowerCase()).toBe(category.toLowerCase());
  });

  it('bySeason() returns only matching seeds', () => {
    const season = seeds().first()!.season[0];
    for (const s of seeds().bySeason(season).get()) expect(s.season).toContain(season);
  });

  it('sortByGrowthPeriod() sorts ascending by default', () => {
    const sorted = seeds().sortByGrowthPeriod().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].growthPeriod).toBeLessThanOrEqual(sorted[i].growthPeriod);
    }
  });

  it('sortByGrowthPeriod() sorts descending when requested', () => {
    const sorted = seeds().sortByGrowthPeriod('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].growthPeriod).toBeGreaterThanOrEqual(sorted[i].growthPeriod);
    }
  });
});

describe('TrophyQuery', () => {
  it('accepts an explicit source array', () => {
    const subset = trophies().get().slice(0, 1);
    expect(new TrophyQuery(subset).count()).toBe(1);
  });

  it('uses default data when constructed without arguments', () => {
    expect(new TrophyQuery().count()).toBeGreaterThan(0);
  });
});
