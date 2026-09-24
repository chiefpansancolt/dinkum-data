import { QueryBase } from '@/common/query-base';
import data from '@/data/gear-and-equipment/tools.json';
import { Tool } from '@/types';

const toolData: Tool[] = data as Tool[];

/** Query builder for tool data. All filter and sort methods return a new ToolQuery for chaining. */
export class ToolQuery extends QueryBase<Tool> {
  constructor(data: Tool[] = toolData) {
    super(data);
  }

  /** Filter to tools unlocked by the given license (case-insensitive). */
  byLicence(licence: string): ToolQuery {
    const q = licence.toLowerCase();
    return new ToolQuery(this.data.filter((t) => t.licence.toLowerCase() === q));
  }

  /** Filter to tools obtainable from the given source (case-insensitive substring match). */
  bySource(source: string): ToolQuery {
    const q = source.toLowerCase();
    return new ToolQuery(
      this.data.filter((t) => t.source.some((s) => s.toLowerCase().includes(q))),
    );
  }

  /** Sort by damage. Tools with no damage (e.g. gathering tools) sort as 0. Default: `'desc'`. */
  sortByDamage(order: 'asc' | 'desc' = 'desc'): ToolQuery {
    return new ToolQuery(
      [...this.data].sort((a, b) => {
        const da = a.damage ?? 0;
        const db = b.damage ?? 0;
        return order === 'asc' ? da - db : db - da;
      }),
    );
  }
}

/** Returns a ToolQuery for all tool data. Pass `source` to wrap a pre-filtered array. */
export function tools(source: Tool[] = toolData): ToolQuery {
  return new ToolQuery(source);
}
