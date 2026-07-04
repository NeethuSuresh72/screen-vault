import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Movie } from '../../services/movie';
import { DecimalPipe, UpperCasePipe } from '@angular/common';
import { HomeCard } from '../../ui/home-card/home-card';
import { Favorites } from '../../services/favorites';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterLink, DecimalPipe, UpperCasePipe, HomeCard],
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class Details implements OnInit {

  private route = inject(ActivatedRoute);
  private movieService = inject(Movie);
  private favoritesService = inject(Favorites);

  movie = signal<any | null>(null);
  cast = signal<any[]>([]);
  similarMovies = signal<any[]>([]);
  trailer = signal<string | null>(null);

  loading = signal(true);
  error = signal(false);

  ngOnInit(): void {

  this.route.paramMap.subscribe(params => {

    const id = Number(params.get('id'));

    if (!id) {
      this.error.set(true);
      this.loading.set(false);
      return;
    }

    this.loading.set(true);
    this.error.set(false);

    // Movie Details
    this.movieService.getMovieDetails(id).subscribe({
      next: (response) => {
        this.movie.set(response);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.error.set(true);
        this.loading.set(false);
      }
    });

    // Cast
    this.movieService.getMovieCredits(id).subscribe({
      next: (response) => {
        this.cast.set(response.cast.slice(0, 10));
      }
    });

    // Trailer
    this.movieService.getMovieVideos(id).subscribe({
      next: (response) => {

        const trailer = response.results.find(
          (video: any) =>
            video.site === 'YouTube' &&
            video.type === 'Trailer'
        );

        this.trailer.set(trailer ? trailer.key : null);

      }
    });

    // Similar Movies
    this.movieService.getSimilarMovies(id).subscribe({
      next: (response) => {
        this.similarMovies.set(response.results.slice(0, 8));
      }
    });

  });

}

toggleFavorite(): void {

  const currentMovie = this.movie();

  if (!currentMovie) {
    return;
  }

  if (this.isFavorite()) {
    this.favoritesService.remove(currentMovie.id);
  } else {
    this.favoritesService.add(currentMovie);
  }

}

isFavorite(): boolean {

  const currentMovie = this.movie();

  if (!currentMovie) {
    return false;
  }

  return this.favoritesService.isFavorite(currentMovie.id);

}

}

