import { QueryBase } from '@/common/query-base';
import data from '@/data/resources/animal-products.json';
import { AnimalProduct, Biome } from '@/types';

const animalProductData: AnimalProduct[] = data as AnimalProduct[];

/** Query builder for animal-product data. All filter methods return a new AnimalProductQuery for chaining. */
export class AnimalProductQuery extends QueryBase<AnimalProduct> {
  constructor(data: AnimalProduct[] = animalProductData) {
    super(data);
  }

  /** Filter to products found in the given biome. */
  byLocation(biome: Biome): AnimalProductQuery {
    return new AnimalProductQuery(this.data.filter((p) => p.locations?.includes(biome)));
  }
}

/** Returns an AnimalProductQuery for all animal-product data. Pass `source` to wrap a pre-filtered array. */
export function animalProducts(source: AnimalProduct[] = animalProductData): AnimalProductQuery {
  return new AnimalProductQuery(source);
}
