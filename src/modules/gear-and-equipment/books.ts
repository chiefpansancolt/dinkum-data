import { QueryBase } from '@/common/query-base';
import data from '@/data/gear-and-equipment/books.json';
import { Book } from '@/types';

const bookData: Book[] = data as Book[];

/** Query builder for book data. */
export class BookQuery extends QueryBase<Book> {
  constructor(data: Book[] = bookData) {
    super(data);
  }
}

/** Returns a BookQuery for all book data. Pass `source` to wrap a pre-filtered array. */
export function books(source: Book[] = bookData): BookQuery {
  return new BookQuery(source);
}
