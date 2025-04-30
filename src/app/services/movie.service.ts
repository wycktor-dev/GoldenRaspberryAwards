import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedMovies } from '../models/paginated-movies.interface';
import { YearMultipleWinners } from '../models/year-multiple-winners.interface';
import { StudioWinCount } from '../models/studio-win-count.interface';
import { ProducerWinInterval } from '../models/producer-win-interval.interface';
import { Movie } from '../models/movie.interface';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'https://challenge.outsera.tech/api/movies';

  constructor(private http: HttpClient) { }

  getMovies(page: number, size: number, winner?: boolean, year?: number): Observable<PaginatedMovies> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (winner !== undefined && winner !== null) {
      params = params.set('winner', winner.toString());
    }
    if (year !== undefined && year !== null) {
      params = params.set('year', year.toString());
    }

    return this.http.get<PaginatedMovies>(this.apiUrl, { params });
  }

  getYearsWithMultipleWinners(): Observable<YearMultipleWinners> {
    const params = new HttpParams().set('projection', 'years-with-multiple-winners');
    return this.http.get<YearMultipleWinners>(this.apiUrl, { params });
  }

  getStudiosWithWinCount(): Observable<StudioWinCount> {
    const params = new HttpParams().set('projection', 'studios-with-win-count');
    return this.http.get<StudioWinCount>(this.apiUrl, { params });
  }

  getMaxMinWinIntervalForProducers(): Observable<ProducerWinInterval> {
    const params = new HttpParams().set('projection', 'max-min-win-interval-for-producers');
    return this.http.get<ProducerWinInterval>(this.apiUrl, { params });
  }

  // Busca vencedores por ano usando getMovies com filtros específicos para o dashboard.
  getWinnersByYear(year: number): Observable<Movie[]> { // Retorna Movie[] conforme formato da API para esta consulta específica.
    let params = new HttpParams()
      .set('winner', 'true')
      .set('year', year.toString());

    return this.http.get<Movie[]>(this.apiUrl, { params });
  }
}

