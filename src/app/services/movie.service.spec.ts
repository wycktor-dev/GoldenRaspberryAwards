import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovieService } from './movie.service';
import { PaginatedMovies } from '../models/paginated-movies.interface';
import { YearMultipleWinners } from '../models/year-multiple-winners.interface';
import { StudioWinCount } from '../models/studio-win-count.interface';
import { ProducerWinInterval } from '../models/producer-win-interval.interface';
import { Movie } from '../models/movie.interface';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;
  const apiUrl = 'https://challenge.outsera.tech/api/movies';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService]
    });
    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve movies with pagination', () => {
    const dummyMovies: PaginatedMovies = {
      content: [{ id: 1, year: 2020, title: 'Test Movie', studios: ['Studio A'], producers: ['Producer A'], winner: true }],
      pageable: { sort: { sorted: false, unsorted: true }, pageSize: 10, pageNumber: 0, offset: 0, paged: true, unpaged: false },
      totalElements: 1,
      last: true,
      totalPages: 1,
      first: true,
      sort: { sorted: false, unsorted: true },
      number: 0,
      numberOfElements: 1,
      size: 10
    };
    const page = 0;
    const size = 10;

    service.getMovies(page, size).subscribe(movies => {
      expect(movies.content.length).toBe(1);
      expect(movies).toEqual(dummyMovies);
    });

    const req = httpMock.expectOne(`${apiUrl}?page=${page}&size=${size}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyMovies);
  });

  it('should retrieve movies with filters (winner=true, year=2018)', () => {
    const dummyMovies: PaginatedMovies = { content: [], pageable: { sort: { sorted: false, unsorted: true }, pageSize: 10, pageNumber: 0, offset: 0, paged: true, unpaged: false }, totalElements: 0, last: true, totalPages: 1, first: true, sort: { sorted: false, unsorted: true }, number: 0, numberOfElements: 0, size: 10 };
    const page = 0;
    const size = 10;
    const winner = true;
    const year = 2018;

    service.getMovies(page, size, winner, year).subscribe(movies => {
      expect(movies).toEqual(dummyMovies);
    });

    const req = httpMock.expectOne(`${apiUrl}?page=${page}&size=${size}&winner=${winner}&year=${year}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyMovies);
  });

  it('should retrieve years with multiple winners', () => {
    const dummyData: YearMultipleWinners = { years: [{ year: 1986, winnerCount: 2 }] };

    service.getYearsWithMultipleWinners().subscribe(data => {
      expect(data.years.length).toBe(1);
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne(`${apiUrl}?projection=years-with-multiple-winners`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });

  it('should retrieve studios with win count', () => {
    const dummyData: StudioWinCount = { studios: [{ name: 'Studio B', winCount: 5 }] };

    service.getStudiosWithWinCount().subscribe(data => {
      expect(data.studios.length).toBe(1);
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne(`${apiUrl}?projection=studios-with-win-count`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });

  it('should retrieve max/min win interval for producers', () => {
    const dummyData: ProducerWinInterval = {
      min: [{ producer: 'Producer C', interval: 1, previousWin: 2001, followingWin: 2002 }],
      max: [{ producer: 'Producer D', interval: 10, previousWin: 1990, followingWin: 2000 }]
    };

    service.getMaxMinWinIntervalForProducers().subscribe(data => {
      expect(data.min.length).toBe(1);
      expect(data.max.length).toBe(1);
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne(`${apiUrl}?projection=max-min-win-interval-for-producers`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });

  it('should retrieve winners by year', () => {
    const dummyMovies: Movie[] = [{ id: 2, year: 2018, title: 'Winner Movie', studios: ['Studio E'], producers: ['Producer F'], winner: true }];
    const year = 2018;

    service.getWinnersByYear(year).subscribe(movies => {
      expect(movies.length).toBe(1);
      expect(movies).toEqual(dummyMovies);
    });

    const req = httpMock.expectOne(`${apiUrl}?winner=true&year=${year}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyMovies);
  });

});

