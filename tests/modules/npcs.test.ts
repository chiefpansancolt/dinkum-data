import { NPCQuery, npcs } from '@/modules/npcs';
import { testQueryBaseContract } from '../helpers';

testQueryBaseContract('npcs', () => npcs());

describe('NPCQuery filters', () => {
  it('accepts an explicit source array', () => {
    const subset = npcs().get().slice(0, 1);
    expect(new NPCQuery(subset).count()).toBe(1);
  });

  it('uses default data when constructed without arguments', () => {
    expect(new NPCQuery().count()).toBeGreaterThan(0);
  });

  it('byOccupation() finds NPCs by occupation substring', () => {
    const fletch = npcs().findByName('Fletch')!;
    const word = fletch.occupation.split(/\s+/)[0];
    const results = npcs().byOccupation(word).get();
    expect(results.some((n) => n.id === fletch.id)).toBe(true);
  });

  it('byOccupation() excludes NPCs without a match', () => {
    const results = npcs().byOccupation('__nonexistent__').get();
    expect(results.length).toBe(0);
  });
});
