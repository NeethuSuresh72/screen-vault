import { Component, inject } from '@angular/core';
import { HomeCard } from '../../ui/home-card/home-card';
import { Favorites as FavoritesService } from '../../services/favorites';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [HomeCard],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css'
})
export class Favorites {

  private favoritesService = inject(FavoritesService);

  favorites = this.favoritesService.favorites;

  removeFavorite(id: number): void {

  this.favoritesService.remove(id);

}

}