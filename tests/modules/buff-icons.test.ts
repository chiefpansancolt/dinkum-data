import { buffIcons } from '@/modules/buff-icons';

describe('buff icons', () => {
  it('buffIcons() returns an icon path for every buff tier', () => {
    const icons = buffIcons();
    expect(icons.length).toBe('/images/buffs/Full_Buff.png');
    expect(icons.attackLevel1).toBe('/images/other/Attack_Buff.png');
    expect(icons.coolLevel2).toBe('/images/buffs/Cool_Buff_1.png');
  });
});
