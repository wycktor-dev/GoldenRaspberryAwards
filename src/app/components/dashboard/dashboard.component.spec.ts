import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { DashboardComponent } from './dashboard.component';
import { MovieService } from '../../services/movie.service';
import { AppMaterialModule } from '../../app-material/app-material.module';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { YearMultipleWinners } from '../../models/year-multiple-winners.interface';
import { StudioWinCount } from '../../models/studio-win-count.interface';
import { ProducerWinInterval } from '../../models/producer-win-interval.interface';
import { Movie } from '../../models/movie.interface';

const mockYears: YearMultipleWinners = { years: [
  { year: 1986, winnerCount: 2 },
  { year: 1990, winnerCount: 2 }
]};
const mockStudios: StudioWinCount = { studios: [
  { name: 'Studio A', winCount: 5 },
  { name: 'Studio B', winCount: 4 },
  { name: 'Studio C', winCount: 3 },
  { name: 'Studio D', winCount: 2 }
]};
const mockIntervals: ProducerWinInterval = {
  min: [{ producer: 'Producer Min', interval: 1, previousWin: 2001, followingWin: 2002 }],
  max: [{ producer: 'Producer Max', interval: 10, previousWin: 1990, followingWin: 2000 }]
};
const mockMoviesByYear: Movie[] = [{ id: 1, year: 2018, title: 'Movie 2018', studios: ['Studio X'], producers: ['Producer Y'], winner: true }];

class MockMovieService {
  getYearsWithMultipleWinners() { return of(mockYears); }
  getStudiosWithWinCount() { return of(mockStudios); }
  getMaxMinWinIntervalForProducers() { return of(mockIntervals); }
  getWinnersByYear(year: number) { 
    if (year === 2018) {
        return of(mockMoviesByYear);
    } else {
        return of([]);
    }
  }
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let movieService: MovieService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppMaterialModule, 
        FormsModule, 
        NoopAnimationsModule,
        DashboardComponent
      ],
      providers: [
        { provide: MovieService, useClass: MockMovieService },
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load years with multiple winners on init', () => {
    expect(component.yearsWithMultipleWinners.years.length).toBe(2);
    expect(component.yearsWithMultipleWinners).toEqual(mockYears);
  });

  it('should load top 3 studios with win count on init', () => {
    expect(component.studiosWithWinCount.studios.length).toBe(3);
    expect(component.studiosWithWinCount.studios[0].name).toBe('Studio A');
    expect(component.studiosWithWinCount.studios[0].winCount).toBe(5);
  });

  it('should load producer win intervals on init', () => {
    expect(component.producerWinInterval.min.length).toBe(1);
    expect(component.producerWinInterval.max.length).toBe(1);
    expect(component.producerWinInterval).toEqual(mockIntervals);
  });

  it('should search winners by year when search button is clicked', () => {
    component.searchYear = 2018;
    component.searchWinnersByYear();
    fixture.detectChanges();
    expect(component.moviesByYear.length).toBe(1);
    expect(component.moviesByYear).toEqual(mockMoviesByYear);
    expect(component.showMessage).toBeFalse();
  });

  it('should clear results if search year is invalid', () => {
      component.searchYear = 2018;
      component.searchWinnersByYear();
      fixture.detectChanges();
      expect(component.moviesByYear.length).toBe(1);

      component.searchYear = null;
      component.searchWinnersByYear();
      fixture.detectChanges();
      expect(component.moviesByYear.length).toBe(0);
      expect(component.showMessage).toBeFalse();
  });

  it('should display message if no winners found', () => {
      component.searchYear = 2021;
      component.searchWinnersByYear();
      fixture.detectChanges();
      expect(component.showMessage).toBeTrue();
      setTimeout(() => {
          expect(component.showMessage).toBeFalse();
      }, 3000);
  });

  it('should call movieService.getWinnersByYear with the correct year', () => {
      const spy = spyOn(movieService, 'getWinnersByYear').and.callThrough();
      component.searchYear = 2020;
      component.searchWinnersByYear();
      expect(spy).toHaveBeenCalledWith(2020);
  });
});