import { QueryBase } from '@/common/query-base';
import data from '@/data/npcs.json';
import { NPC } from '@/types';

const npcData: NPC[] = data as NPC[];

/** Query builder for NPC data. All filter methods return a new NPCQuery for chaining. */
export class NPCQuery extends QueryBase<NPC> {
  constructor(data: NPC[] = npcData) {
    super(data);
  }

  /** Filter to NPCs whose occupation description contains the given text (case-insensitive). */
  byOccupation(text: string): NPCQuery {
    const q = text.toLowerCase();
    return new NPCQuery(this.data.filter((n) => n.occupation.toLowerCase().includes(q)));
  }
}

/** Returns an NPCQuery for all NPC data. Pass `source` to wrap a pre-filtered array. */
export function npcs(source: NPC[] = npcData): NPCQuery {
  return new NPCQuery(source);
}
