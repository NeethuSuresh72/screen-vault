import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { HomeCarousel } from '../../ui/home-carousel/home-carousel';
import { HomeCard } from '../../ui/home-card/home-card';
import { Movie } from '../../services/movie';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HomeCarousel,
    HomeCard,
    RouterLink
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  trendingMovies = signal<any[]>([]);
  popularMovies = signal<any[]>([]);
  topRatedMovies = signal<any[]>([]);

  constructor(private movieService: Movie) {}

  ngOnInit(): void {
    this.getTrendingMovies();
    this.getPopularMovies();
    this.getTopRatedMovies();
  }

  getTrendingMovies() {
    this.movieService.getTrendingMovies().subscribe({
      next: (response) => {
        this.trendingMovies.set(response.results.slice(0, 4));
      },
      error: (error) => {
        console.error('Trending Movies Error', error);
      }
    });
  }

  getPopularMovies() {
    this.movieService.getPopularMovies().subscribe({
      next: (response) => {
        this.popularMovies.set(response.results.slice(0, 4));
      },
      error: (error) => {
        console.error('Popular Movies Error', error);
      }
    });
  }

  getTopRatedMovies() {
    this.movieService.getTopRatedMovies().subscribe({
      next: (response) => {
        this.topRatedMovies.set(response.results.slice(0, 4));
      },
      error: (error) => {
        console.error('Top Rated Movies Error', error);
      }
    });
  }

}