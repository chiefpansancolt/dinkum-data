import { BuildingQuery, buildings } from '@/modules/buildings';
import { testQueryBaseContract } from '../helpers';

testQueryBaseContract('buildings', () => buildings());

describe('BuildingQuery filters', () => {
  it('accepts an explicit source array', () => {
    const subset = buildings().get().slice(0, 1);
    expect(new BuildingQuery(subset).count()).toBe(1);
  });

  it('uses default data when constructed without arguments', () => {
    expect(new BuildingQuery().count()).toBeGreaterThan(0);
  });

  it('byDeedType() returns only matching buildings', () => {
    const results = buildings().byDeedType('Collectable').get();
    expect(results.length).toBeGreaterThan(0);
    for (const b of results) expect(b.deedType).toBe('Collectable');
  });

  it('byNPC() returns only matching buildings', () => {
    const npc = buildings().first()!.npc;
    const results = buildings().byNPC(npc).get();
    expect(results.length).toBeGreaterThan(0);
    for (const b of results) expect(b.npc).toBe(npc);
  });

  it('sortByDeedPrice() sorts ascending by default', () => {
    const sorted = buildings().sortByDeedPrice().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].deedPrice).toBeLessThanOrEqual(sorted[i].deedPrice);
    }
  });

  it('sortByDeedPrice() sorts descending when requested', () => {
    const sorted = buildings().sortByDeedPrice('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].deedPrice).toBeGreaterThanOrEqual(sorted[i].deedPrice);
    }
  });
});
