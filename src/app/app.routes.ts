import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Details } from './pages/details/details';
import { Category } from './pages/category/category';
import { Favorites } from './pages/favorites/favorites';
import { About } from './pages/about/about';
import { Search } from './pages/search/search';

export const routes: Routes = [
    {
     path: '',
     component: Home
    },
    {
     path: 'movie/:id',
     component: Details
    },
    {
     path: 'favorites',
     component: Favorites
    },
    {
     path: 'about',
     component: About
    },
    {
     path: 'search',
     component: Search
    },
    {
     path: 'movies/:category',
     component: Category
    },
    {
     path: '**',
     redirectTo: ''
    },
    
];