import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { HomeCard } from '../../ui/home-card/home-card';
import { Movie } from '../../services/movie';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [HomeCard, RouterLink],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search implements OnInit {

  query = signal('');
  movies = signal<any[]>([]);
  page = signal(1);
  loading = signal(false);
  errorMessage = signal('');

  constructor(
    private route: ActivatedRoute,
    private movieService: Movie
  ) {}

  ngOnInit(): void {

    this.route.queryParamMap.subscribe(params => {

      const q = params.get('q') ?? '';

      this.query.set(q);
      this.page.set(1);
      this.movies.set([]);
      this.errorMessage.set('');

      if (q.trim()) {
        this.search();
      }

    });

  }

  search() {

    this.loading.set(true);

    this.movieService.searchMovies(this.query(), this.page()).subscribe({

      next: (response) => {

        this.movies.update(current => [...current, ...response.results]);
        this.loading.set(false);

      },

      error: (error) => {

        console.error('Search Error', error);
        this.errorMessage.set('Something went wrong while searching. Please try again.');
        this.loading.set(false);

      }

    });

  }

  loadMore() {

    this.page.update(page => page + 1);
    this.search();

  }

}