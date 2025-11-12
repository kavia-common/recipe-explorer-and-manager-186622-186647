import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';
import { FavoritesService } from '../../services/favorites.service';

/**
 * PUBLIC_INTERFACE
 * Details page for deep linking to a recipe id.
 */
@Component({
  standalone: true,
  selector: 'app-details-page',
  imports: [NgIf, NgFor, RouterLink],
  template: `
    <section *ngIf="recipe as r" style="display:grid; gap:1rem">
      <a routerLink="/" class="btn ghost" aria-label="Back to home">← Back</a>

      <div class="surface" style="overflow:hidden">
        <div style="position:relative; aspect-ratio: 16/8; background:#e5e7eb">
          <img [src]="r.image" [alt]="r.title" style="position:absolute; inset:0; width:100%; height:100%; object-fit:cover" />
        </div>
      </div>

      <div class="surface" style="padding:1rem; display:flex; align-items:center; justify-content:space-between; gap:1rem">
        <div>
          <h1 style="font-size:1.5rem">{{ r.title }}</h1>
          <div class="small-text" style="display:flex; gap:.75rem; color:#374151">
            <span>⏱ {{ r.timeMinutes }} min</span>
            <span>•</span>
            <span>🍽 {{ r.servings }} servings</span>
          </div>
        </div>
        <button class="btn" (click)="toggleFavorite()" [attr.aria-pressed]="isFavorite()" aria-label="Toggle favorite">
          <span *ngIf="!isFavorite()">☆ Favorite</span>
          <span *ngIf="isFavorite()">★ Favorited</span>
        </button>
      </div>

      <div class="surface" style="padding:1rem">
        <h3>Ingredients</h3>
        <ul>
          <li *ngFor="let ing of r.ingredients" class="small-text">• {{ ing }}</li>
        </ul>
      </div>

      <div class="surface" style="padding:1rem">
        <h3>Steps</h3>
        <ol>
          <li *ngFor="let step of r.steps; index as i" class="small-text">{{ i + 1 }}. {{ step }}</li>
        </ol>
      </div>
    </section>

    <section *ngIf="!recipe" class="surface" style="padding:1rem">
      Loading recipe...
    </section>
  `
})
export class DetailsPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly recipes = inject(RecipeService);
  private readonly fav = inject(FavoritesService);

  recipe?: Recipe;

  constructor() {
    const id = this.route.snapshot.paramMap.get('id') || '';
    if (!id) {
      this.router.navigateByUrl('/');
      return;
    }
    this.recipes.getById(id).subscribe(r => {
      if (!r) {
        this.router.navigateByUrl('/');
      } else {
        this.recipe = r;
      }
    });
  }

  isFavorite(): boolean {
    return this.recipe ? this.fav.isFavorite(this.recipe.id) : false;
  }

  toggleFavorite(): void {
    if (!this.recipe) return;
    this.fav.toggle(this.recipe.id);
  }
}
