import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Rota padrão
  { path: 'dashboard', component: DashboardComponent },
  { path: 'list', component: MovieListComponent },
  { path: '**', redirectTo: '/dashboard' } // Rota curinga para redirecionar URLs não encontradas
];