import { Movie } from './movie.interface';

export interface Pageable {
  sort: {
    sorted: boolean;
    unsorted: boolean;
  };
  pageSize: number;
  pageNumber: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface PaginatedMovies {
  content: Movie[];
  pageable: Pageable;
  totalElements: number;
  last: boolean;
  totalPages: number;
  first: boolean;
  sort: {
    sorted: boolean;
    unsorted: boolean;
  };
  number: number;
  numberOfElements: number;
  size: number;
}