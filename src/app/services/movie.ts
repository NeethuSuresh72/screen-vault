import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Movie {

  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl;

  private headers = new HttpHeaders({
    Authorization: `Bearer ${environment.token}`,
    accept: 'application/json'
  });

  constructor() {}

  getTrendingMovies(page: number = 1) {
    return this.http.get<any>(
      `${this.apiUrl}/trending/movie/week`,
      { headers: this.headers, params: { page }  }
    );
  }

  getPopularMovies(page: number = 1) {
    return this.http.get<any>(
      `${this.apiUrl}/movie/popular`,
      { headers: this.headers, params: { page }  }
    );
  }

  getTopRatedMovies(page: number = 1) {
    return this.http.get<any>(
      `${this.apiUrl}/movie/top_rated`,
      { headers: this.headers, params: { page }  }
    );
  }

  getUpcomingMovies(page: number = 1) {
    return this.http.get<any>(
      `${this.apiUrl}/movie/upcoming`,
      { headers: this.headers, params: { page }  }
    );
  }

  getMovieDetails(id: number) {
    return this.http.get<any>(
      `${this.apiUrl}/movie/${id}`,
      { headers: this.headers }
    );
  }

  getMoviesByCategory(category: string, page: number = 1) {
    switch (category) {
      case 'trending':
        return this.getTrendingMovies(page);
      case 'popular':
        return this.getPopularMovies(page);
      case 'top_rated':
        return this.getTopRatedMovies(page);
      case 'upcoming':
        return this.getUpcomingMovies(page);
      default:
        return this.getPopularMovies(page);
    }
  }

  getMovieCredits(id: number) {
  return this.http.get<any>(
    `${this.apiUrl}/movie/${id}/credits`,
    { headers: this.headers }
  );
}

getMovieVideos(id: number) {
  return this.http.get<any>(
    `${this.apiUrl}/movie/${id}/videos`,
    { headers: this.headers }
  );
}

getSimilarMovies(id: number) {
  return this.http.get<any>(
    `${this.apiUrl}/movie/${id}/similar`,
    { headers: this.headers }
  );
}

searchMovies(query: string, page: number = 1) {
    return this.http.get<any>(
      `${this.apiUrl}/search/movie`,
      { headers: this.headers, params: { query, page } }
    );
  }

}