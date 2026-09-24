import { BookQuery, books } from '@/modules/gear-and-equipment/books';
import { CassetteQuery, cassettes } from '@/modules/gear-and-equipment/cassettes';
import { equipment, EquipmentQuery } from '@/modules/gear-and-equipment/equipment';
import { ToolQuery, tools } from '@/modules/gear-and-equipment/tools';
import { VehicleQuery, vehicles } from '@/modules/gear-and-equipment/vehicles';
import { WeaponQuery, weapons } from '@/modules/gear-and-equipment/weapons';
import { testQueryBaseContract } from '../helpers';

testQueryBaseContract('books', () => books());
testQueryBaseContract('cassettes', () => cassettes());
testQueryBaseContract('equipment', () => equipment());
testQueryBaseContract('tools', () => tools());
testQueryBaseContract('vehicles', () => vehicles());
testQueryBaseContract('weapons', () => weapons());

describe('BookQuery', () => {
  it('accepts an explicit source array', () => {
    const subset = books().get().slice(0, 1);
    expect(new BookQuery(subset).count()).toBe(1);
  });

  it('uses default data when constructed without arguments', () => {
    expect(new BookQuery().count()).toBeGreaterThan(0);
  });
});

describe('CassetteQuery filters', () => {
  it('accepts an explicit source array', () => {
    const subset = cassettes().get().slice(0, 1);
    expect(new CassetteQuery(subset).count()).toBe(1);
  });

  it('uses default data when constructed without arguments', () => {
    expect(new CassetteQuery().count()).toBeGreaterThan(0);
  });

  it('bySource() returns only matching cassettes', () => {
    const source = cassettes().first()!.source[0];
    for (const c of cassettes().bySource(source).get()) {
      expect(c.source.some((s) => s.toLowerCase().includes(source.toLowerCase()))).toBe(true);
    }
  });

  it('sortByBuyPrice() sorts ascending by default', () => {
    const sorted = cassettes().sortByBuyPrice().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].buyPrice).toBeLessThanOrEqual(sorted[i].buyPrice);
    }
  });

  it('sortByBuyPrice() sorts descending when requested', () => {
    const sorted = cassettes().sortByBuyPrice('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].buyPrice).toBeGreaterThanOrEqual(sorted[i].buyPrice);
    }
  });
});

describe('EquipmentQuery filters', () => {
  it('accepts an explicit source array', () => {
    const subset = equipment().get().slice(0, 1);
    expect(new EquipmentQuery(subset).count()).toBe(1);
  });

  it('uses default data when constructed without arguments', () => {
    expect(new EquipmentQuery().count()).toBeGreaterThan(0);
  });

  it('bySource() returns only matching equipment', () => {
    const source = equipment().first()!.source[0];
    for (const e of equipment().bySource(source).get()) {
      expect(e.source.some((s) => s.toLowerCase().includes(source.toLowerCase()))).toBe(true);
    }
  });

  it('byRequirementType() returns only matching equipment', () => {
    const withType = equipment()
      .get()
      .find((e) => e.requirementType)!;
    const results = equipment().byRequirementType(withType.requirementType!).get();
    expect(results.length).toBeGreaterThan(0);
    for (const e of results) {
      expect(e.requirementType?.toLowerCase()).toBe(withType.requirementType!.toLowerCase());
    }
  });

  it('byRequirementType() excludes equipment with no requirement type', () => {
    const noType = equipment()
      .get()
      .find((e) => !e.requirementType)!;
    expect(noType).toBeDefined();
    const results = equipment().byRequirementType('__nonexistent__').get();
    expect(results.some((e) => e.id === noType.id)).toBe(false);
  });

  it('windmillCompatible() returns only compatible items', () => {
    const results = equipment().windmillCompatible().get();
    expect(results.length).toBeGreaterThan(0);
    for (const e of results) expect(e.windmillCompatable).toBe(true);
  });

  it('solarPanelCompatible() returns only compatible items', () => {
    const results = equipment().solarPanelCompatible().get();
    expect(results.length).toBeGreaterThan(0);
    for (const e of results) expect(e.solarPanelCompatable).toBe(true);
  });

  it('sortByBaseSellPrice() sorts descending by default', () => {
    const sorted = equipment().sortByBaseSellPrice().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].baseSellPrice).toBeGreaterThanOrEqual(sorted[i].baseSellPrice);
    }
  });

  it('sortByBaseSellPrice() sorts ascending when requested', () => {
    const sorted = equipment().sortByBaseSellPrice('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].baseSellPrice).toBeLessThanOrEqual(sorted[i].baseSellPrice);
    }
  });
});

describe('ToolQuery filters', () => {
  it('accepts an explicit source array', () => {
    const subset = tools().get().slice(0, 1);
    expect(new ToolQuery(subset).count()).toBe(1);
  });

  it('uses default data when constructed without arguments', () => {
    expect(new ToolQuery().count()).toBeGreaterThan(0);
  });

  it('byLicence() returns only matching tools', () => {
    const licence = tools().first()!.licence;
    for (const t of tools().byLicence(licence).get()) expect(t.licence).toBe(licence);
  });

  it('bySource() returns only matching tools', () => {
    const source = tools().first()!.source[0];
    for (const t of tools().bySource(source).get()) {
      expect(t.source.some((s) => s.toLowerCase().includes(source.toLowerCase()))).toBe(true);
    }
  });

  it('sortByDamage() sorts descending by default', () => {
    const sorted = tools().sortByDamage().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].damage ?? 0).toBeGreaterThanOrEqual(sorted[i].damage ?? 0);
    }
  });

  it('sortByDamage() sorts ascending when requested', () => {
    const sorted = tools().sortByDamage('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].damage ?? 0).toBeLessThanOrEqual(sorted[i].damage ?? 0);
    }
  });
});

describe('VehicleQuery filters', () => {
  it('accepts an explicit source array', () => {
    const subset = vehicles().get().slice(0, 1);
    expect(new VehicleQuery(subset).count()).toBe(1);
  });

  it('uses default data when constructed without arguments', () => {
    expect(new VehicleQuery().count()).toBeGreaterThan(0);
  });

  it('bySource() returns only matching vehicles', () => {
    const source = vehicles().first()!.source[0];
    for (const v of vehicles().bySource(source).get()) {
      expect(v.source.some((s) => s.toLowerCase().includes(source.toLowerCase()))).toBe(true);
    }
  });

  it('byRequirementType() returns only matching vehicles', () => {
    const withType = vehicles()
      .get()
      .find((v) => v.requirementType)!;
    const results = vehicles().byRequirementType(withType.requirementType!).get();
    expect(results.length).toBeGreaterThan(0);
    for (const v of results) {
      expect(v.requirementType?.toLowerCase()).toBe(withType.requirementType!.toLowerCase());
    }
  });

  it('byRequirementType() excludes vehicles with no requirement type', () => {
    const noType = vehicles()
      .get()
      .find((v) => !v.requirementType)!;
    expect(noType).toBeDefined();
    const results = vehicles().byRequirementType('__nonexistent__').get();
    expect(results.some((v) => v.id === noType.id)).toBe(false);
  });

  it('sortByBaseSellPrice() sorts descending by default', () => {
    const sorted = vehicles().sortByBaseSellPrice().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].baseSellPrice).toBeGreaterThanOrEqual(sorted[i].baseSellPrice);
    }
  });

  it('sortByBaseSellPrice() sorts ascending when requested', () => {
    const sorted = vehicles().sortByBaseSellPrice('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].baseSellPrice).toBeLessThanOrEqual(sorted[i].baseSellPrice);
    }
  });
});

describe('WeaponQuery filters', () => {
  it('accepts an explicit source array', () => {
    const subset = weapons().get().slice(0, 1);
    expect(new WeaponQuery(subset).count()).toBe(1);
  });

  it('uses default data when constructed without arguments', () => {
    expect(new WeaponQuery().count()).toBeGreaterThan(0);
  });

  it('bySource() returns only matching weapons', () => {
    const source = weapons().first()!.source[0];
    for (const w of weapons().bySource(source).get()) {
      expect(w.source.some((s) => s.toLowerCase().includes(source.toLowerCase()))).toBe(true);
    }
  });

  it('sortByDamage() sorts descending by default', () => {
    const sorted = weapons().sortByDamage().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].damage ?? 0).toBeGreaterThanOrEqual(sorted[i].damage ?? 0);
    }
  });

  it('sortByDamage() sorts ascending when requested', () => {
    const sorted = weapons().sortByDamage('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].damage ?? 0).toBeLessThanOrEqual(sorted[i].damage ?? 0);
    }
  });
});
