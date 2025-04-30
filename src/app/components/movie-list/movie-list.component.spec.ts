import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { MovieListComponent } from './movie-list.component';
import { MovieService } from '../../services/movie.service';
import { AppMaterialModule } from '../../app-material/app-material.module';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PaginatedMovies } from '../../models/paginated-movies.interface';
import { Movie } from '../../models/movie.interface';
import { provideHttpClient } from '@angular/common/http';

const mockMoviePage1: PaginatedMovies = {
  content: [
    { id: 1, year: 2020, title: 'Movie 1', studios: ['Studio A'], producers: ['Producer A'], winner: false },
    { id: 2, year: 2021, title: 'Movie 2', studios: ['Studio B'], producers: ['Producer B'], winner: true }
  ],
  pageable: { sort: { sorted: false, unsorted: true }, pageSize: 2, pageNumber: 0, offset: 0, paged: true, unpaged: false },
  totalElements: 4,
  last: false,
  totalPages: 2,
  first: true,
  sort: { sorted: false, unsorted: true },
  number: 0,
  numberOfElements: 2,
  size: 2
};

const mockMoviePage2: PaginatedMovies = {
  content: [
    { id: 3, year: 2022, title: 'Movie 3', studios: ['Studio C'], producers: ['Producer C'], winner: false },
    { id: 4, year: 2021, title: 'Movie 4', studios: ['Studio D'], producers: ['Producer D'], winner: true }
  ],
  pageable: { sort: { sorted: false, unsorted: true }, pageSize: 2, pageNumber: 1, offset: 2, paged: true, unpaged: false },
  totalElements: 4,
  last: true,
  totalPages: 2,
  first: false,
  sort: { sorted: false, unsorted: true },
  number: 1,
  numberOfElements: 2,
  size: 2
};

const mockFilteredMovies: PaginatedMovies = {
  content: [
    { id: 2, year: 2021, title: 'Movie 2', studios: ['Studio B'], producers: ['Producer B'], winner: true },
    { id: 4, year: 2021, title: 'Movie 4', studios: ['Studio D'], producers: ['Producer D'], winner: true }
  ],
  pageable: { sort: { sorted: false, unsorted: true }, pageSize: 10, pageNumber: 0, offset: 0, paged: true, unpaged: false },
  totalElements: 2,
  last: true,
  totalPages: 1,
  first: true,
  sort: { sorted: false, unsorted: true },
  number: 0,
  numberOfElements: 2,
  size: 10
};

class MockMovieService {
  getMovies(page: number, size: number, winner?: boolean, year?: number) {
    if (year === 2021 && winner === true) {
        return of(mockFilteredMovies);
    }
    if (page === 0 && size === 2 && winner === undefined && year === undefined) {
      return of(mockMoviePage1);
    }
    if (page === 1 && size === 2 && winner === undefined && year === undefined) {
      return of(mockMoviePage2);
    }

    return of({ content: [], pageable: { sort: { sorted: false, unsorted: true }, pageSize: size, pageNumber: page, offset: page * size, paged: true, unpaged: false }, totalElements: 0, last: true, totalPages: 0, first: true, sort: { sorted: false, unsorted: true }, number: page, numberOfElements: 0, size: size });
  }
}

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;
  let movieService: MovieService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppMaterialModule,
        FormsModule,
        NoopAnimationsModule,
        MovieListComponent
      ],
      providers: [
        { provide: MovieService, useClass: MockMovieService },
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieService);
    component.pageSize = 2;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load first page of movies on init', () => {
    expect(component.movies.length).toBe(2);
    expect(component.totalElements).toBe(4);
    expect(component.movies[0].title).toBe('Movie 1');
  });

  it('should load next page when pagination changes', () => {
    const pageEvent: PageEvent = { pageIndex: 1, pageSize: 2, length: 4 };
    component.onPageChange(pageEvent);
    fixture.detectChanges();

    expect(component.movies.length).toBe(2);
    expect(component.movies[0].title).toBe('Movie 3');
    expect(component.pageIndex).toBe(1);
    expect(component.pageSize).toBe(2);
  });

  it('should apply filters and reset to first page', fakeAsync(() => {
    const spy = spyOn(movieService, 'getMovies').and.callThrough();
    component.filterYear = 2021;
    component.filterWinner = true;
    component.pageSize = 10;
    component.applyFilters();
    tick();
    fixture.detectChanges();
    
    expect(component.pageIndex).toBe(0);
    expect(spy).toHaveBeenCalledWith(0, 10, true, 2021);
    expect(component.movies.length).toBe(2);
    expect(component.movies[0].title).toBe('Movie 2');
    expect(component.totalElements).toBe(2);
  }));

  it('should call loadMovies when applyFilters is called', () => {
    const spy = spyOn(component, 'loadMovies');
    component.applyFilters();
    expect(spy).toHaveBeenCalled();
  });

  it('should convert winner status correctly', () => {
    expect(component.getWinnerStatus(true)).toBe('Sim');
    expect(component.getWinnerStatus(false)).toBe('Não');
  });

});