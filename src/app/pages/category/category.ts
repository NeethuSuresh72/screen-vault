import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { HomeCard } from '../../ui/home-card/home-card';
import { Movie } from '../../services/movie';

const CATEGORY_TITLES: Record<string, string> = {
  trending: '🔥 Trending Movies',
  popular: '⭐ Popular Movies',
  top_rated: '🏆 Top Rated Movies',
  upcoming: '🎬 Upcoming Movies'
};

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [HomeCard, RouterLink],
  templateUrl: './category.html',
  styleUrl: './category.css'
})
export class Category implements OnInit {

  movies = signal<any[]>([]);
  title = signal<string>('');
  page = signal<number>(1);
  totalPages = signal<number>(1);
  loading = signal<boolean>(false);
  error = signal<boolean>(false);

  private category = '';

  constructor(
    private route: ActivatedRoute,
    private movieService: Movie
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category') ?? 'popular';
      this.title.set(CATEGORY_TITLES[this.category] ?? 'Movies');

      // reset state when category changes
      this.movies.set([]);
      this.page.set(1);
      this.totalPages.set(1);

      this.loadMovies();
    });
  }

  loadMovies(): void {
    this.loading.set(true);
    this.error.set(false);

    this.movieService.getMoviesByCategory(this.category, this.page()).subscribe({
      next: (response) => {
        this.movies.update(current => [...current, ...response.results]);
        this.totalPages.set(response.total_pages);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Category Movies Error', err);
        this.error.set(true);
        this.loading.set(false);
      }
    });
  }

  loadMore(): void {
    if (this.page() >= this.totalPages()) {
      return;
    }
    this.page.update(p => p + 1);
    this.loadMovies();
  }

  get hasMore(): boolean {
    return this.page() < this.totalPages();
  }

}