import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { YearMultipleWinners } from '../../models/year-multiple-winners.interface';
import { StudioWinCount } from '../../models/studio-win-count.interface';
import { ProducerWinInterval } from '../../models/producer-win-interval.interface';
import { Movie } from '../../models/movie.interface';
import { AppMaterialModule } from '../../app-material/app-material.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, AppMaterialModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  yearsWithMultipleWinners: YearMultipleWinners = { years: [] };
  studiosWithWinCount: StudioWinCount = { studios: [] };
  producerWinInterval: ProducerWinInterval = { min: [], max: [] };
  moviesByYear: Movie[] = [];
  searchYear: number | null = null;

  // Define as colunas exibidas nas tabelas
  yearsColumns: string[] = ['year', 'winnerCount'];
  studiosColumns: string[] = ['name', 'winCount'];
  producersColumns: string[] = ['producer', 'interval', 'previousWin', 'followingWin'];
  winnersByYearColumns: string[] = ['id', 'year', 'title'];
  
  // Variáveis para controlar se a pesquisa foi realizada
  hasSearched: boolean | undefined;
  showMessage = false;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.loadYearsWithMultipleWinners();
    this.loadStudiosWithWinCount();
    this.loadProducerWinInterval();
  }

  loadYearsWithMultipleWinners(): void {
    this.movieService.getYearsWithMultipleWinners().subscribe(data => {
      this.yearsWithMultipleWinners = data;
    });
  }

  loadStudiosWithWinCount(): void {
    this.movieService.getStudiosWithWinCount().subscribe(data => {
      // Ordena os estúdios por contagem de vitórias decrescente e pega os top 3
      data.studios.sort((a, b) => b.winCount - a.winCount);
      this.studiosWithWinCount = { studios: data.studios.slice(0, 3) }; 
    });
  }

  loadProducerWinInterval(): void {
    this.movieService.getMaxMinWinIntervalForProducers().subscribe(data => {
      this.producerWinInterval = data;
    });
  }

  searchWinnersByYear(): void {
    this.hasSearched = true;
    this.showMessage = false;
    if (this.searchYear !== null && this.searchYear > 0) {
        this.movieService.getWinnersByYear(this.searchYear).subscribe(data => {
            this.moviesByYear = data;
            if (this.moviesByYear.length === 0) {
                this.showMessage = true;
                setTimeout(() => {
                    this.showMessage = false;
                }, 3000);
            }
        });
    } else {
        this.moviesByYear = [];
    }
}
}