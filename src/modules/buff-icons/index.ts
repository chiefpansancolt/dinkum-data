import data from '@/data/buff-icons.json';
import { BuffIcons } from '@/types';

const buffIconData: BuffIcons = data as BuffIcons;

/** Return the icon image path for each buff tier. */
export function buffIcons(): BuffIcons {
  return buffIconData;
}
