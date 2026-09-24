import { QueryBase } from '@/common/query-base';
import data from '@/data/resources/paint.json';
import { Paint } from '@/types';

const paintData: Paint[] = data as Paint[];

/** Query builder for paint data. All filter methods return a new PaintQuery for chaining. */
export class PaintQuery extends QueryBase<Paint> {
  constructor(data: Paint[] = paintData) {
    super(data);
  }

  /** Filter to paints obtainable from the given source (case-insensitive substring match). */
  bySource(source: string): PaintQuery {
    const q = source.toLowerCase();
    return new PaintQuery(
      this.data.filter((p) => p.source?.some((s) => s.toLowerCase().includes(q))),
    );
  }
}

/** Returns a PaintQuery for all paint data. Pass `source` to wrap a pre-filtered array. */
export function paint(source: Paint[] = paintData): PaintQuery {
  return new PaintQuery(source);
}
