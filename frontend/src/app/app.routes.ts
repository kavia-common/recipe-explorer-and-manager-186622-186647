import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'Recipe Explorer - Home'
  },
  {
    path: 'favorites',
    loadComponent: () => import('./pages/favorites/favorites.component').then(m => m.FavoritesComponent),
    title: 'Recipe Explorer - Favorites'
  },
  {
    path: 'details/:id',
    loadComponent: () => import('./pages/details/details-page.component').then(m => m.DetailsPageComponent),
    title: 'Recipe Explorer - Details'
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: 'Page Not Found'
  }
];
