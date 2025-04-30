import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.interface';
import { PaginatedMovies } from '../../models/paginated-movies.interface';
import { AppMaterialModule } from '../../app-material/app-material.module';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, AppMaterialModule, FormsModule],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  totalElements: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;
  pageSizeOptions: number[] = [5, 10, 15, 20];

  // Propriedades para filtros
  filterYear: number | null = null;
  filterWinner: boolean | null = null;

  displayedColumns: string[] = ['id', 'year', 'title', 'winner'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    // Converte filterWinner nulo para undefined, se necessário para a chamada da API
    const winnerParam = this.filterWinner === null ? undefined : this.filterWinner;
    const yearParam = this.filterYear === null ? undefined : this.filterYear;

    this.movieService.getMovies(this.pageIndex, this.pageSize, winnerParam, yearParam)
      .subscribe((data: PaginatedMovies) => {
        this.movies = data.content;
        this.totalElements = data.totalElements;

      });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadMovies();
  }

  applyFilters(): void {
    this.pageIndex = 0; // Reseta para a primeira página ao aplicar filtros
    if (this.paginator) {
        this.paginator.pageIndex = 0;
    }
    this.loadMovies();
  }

  getWinnerStatus(winner: boolean): string {
    return winner ? 'Sim' : 'Não';
  }
}