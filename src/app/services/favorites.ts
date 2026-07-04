import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Favorites {

  favorites = signal<any[]>(this.loadFavorites());

  private loadFavorites(): any[] {
    const data = localStorage.getItem('favorites');
    return data ? JSON.parse(data) : [];
  }

  private saveFavorites(): void {
    localStorage.setItem(
      'favorites',
      JSON.stringify(this.favorites())
    );
  }

  add(movie: any): void {

    if (this.isFavorite(movie.id)) {
      return;
    }

    this.favorites.update(list => [...list, movie]);
    this.saveFavorites();

  }

  remove(id: number): void {

    this.favorites.update(list =>
      list.filter(movie => movie.id !== id)
    );

    this.saveFavorites();

  }

  isFavorite(id: number): boolean {

    return this.favorites().some(movie => movie.id === id);

  }

}