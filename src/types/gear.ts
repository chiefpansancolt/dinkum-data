import { Base } from './common';

export interface BookDetail {
  aquiredFrom: string;
  requirements: string;
  buyingPrice: number | 'Gift';
  sellingPrice: number;
}

export interface Book extends Base {
  details: BookDetail[];
}

export interface Cassette extends Base {
  buyPrice: number;
  source: string[];
}
