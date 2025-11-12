import { Component, inject, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { FavoritesService } from '../../services/favorites.service';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';
import { RecipeListComponent } from '../../components/recipe-list/recipe-list.component';

/**
 * PUBLIC_INTERFACE
 * Favorites page shows only favorited recipes.
 */
@Component({
  standalone: true,
  selector: 'app-favorites',
  imports: [NgIf, RecipeListComponent],
  template: `
    <section style="display:flex; flex-direction:column; gap:1rem">
      <div class="surface" style="padding:1rem">
        <h2>Favorites</h2>
        <p class="small-text">Your saved recipes are listed below.</p>
      </div>

      <app-recipe-list [recipes]="favorites()"></app-recipe-list>

      <div *ngIf="favorites().length === 0" class="surface" style="padding:1rem">
        You have no favorites yet. Browse recipes and tap ☆ Favorite to save them here.
      </div>
    </section>
  `
})
export class FavoritesComponent {
  private readonly fav = inject(FavoritesService);
  private readonly recipesSvc = inject(RecipeService);
  readonly favorites = signal<Recipe[]>([]);

  constructor() {
    this.reload();
    this.fav.favorites$.subscribe(() => this.reload());
  }

  private reload() {
    this.recipesSvc.list().subscribe(all => {
      const ids = this.fav.favorites;
      this.favorites.set(all.filter(r => ids.has(r.id)));
    });
  }
}
