import { QueryBase } from '@/common/query-base';
import data from '@/data/animals.json';
import { Animal, AnimalType, Temperament } from '@/types';

const animalData: Animal[] = data as Animal[];

/** Query builder for animal data. All filter and sort methods return a new AnimalQuery for chaining. */
export class AnimalQuery extends QueryBase<Animal> {
  constructor(data: Animal[] = animalData) {
    super(data);
  }

  /** Filter by animal type (`'Wild Animal'`, `'Farm Animal'`, or `'Tammed Animal'`). */
  byType(type: AnimalType): AnimalQuery {
    return new AnimalQuery(this.data.filter((a) => a.type === type));
  }

  /** Filter by temperament. */
  byTemperament(temperament: Temperament): AnimalQuery {
    return new AnimalQuery(this.data.filter((a) => a.temperament === temperament));
  }

  /** Filter to animals found in the given habitat (case-insensitive). */
  byHabitat(habitat: string): AnimalQuery {
    const q = habitat.toLowerCase();
    return new AnimalQuery(this.data.filter((a) => a.habitat?.some((h) => h.toLowerCase() === q)));
  }

  /** Filter to animals that can be domesticated. */
  domesticable(): AnimalQuery {
    return new AnimalQuery(this.data.filter((a) => a.domesticable === true));
  }

  /** Sort by base sell price. Default: `'desc'` (most valuable first). */
  sortByBaseSellPrice(order: 'asc' | 'desc' = 'desc'): AnimalQuery {
    return new AnimalQuery(
      [...this.data].sort((a, b) => {
        const pa = a.baseSellPrice ?? 0;
        const pb = b.baseSellPrice ?? 0;
        return order === 'asc' ? pa - pb : pb - pa;
      }),
    );
  }
}

/** Returns an AnimalQuery for all animal data. Pass `source` to wrap a pre-filtered array. */
export function animals(source: Animal[] = animalData): AnimalQuery {
  return new AnimalQuery(source);
}
