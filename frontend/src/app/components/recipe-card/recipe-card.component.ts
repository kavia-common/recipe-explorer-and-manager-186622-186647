import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Recipe } from '../../models/recipe.model';
import { FavoritesService } from '../../services/favorites.service';

/**
 * PUBLIC_INTERFACE
 * Card to display recipe summary with favorite control.
 */
@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink],
  template: `
    <article class="card" style="overflow:hidden">
      <a [routerLink]="['/details', recipe.id]" aria-label="View details" style="display:block; text-decoration:none; color:inherit">
        <div style="position:relative; aspect-ratio: 16/10; background:#e5e7eb">
          <img
            [src]="recipe.image"
            [alt]="recipe.title"
            style="position:absolute; inset:0; width:100%; height:100%; object-fit:cover;"
            loading="lazy"
          />
        </div>
        <div style="padding: .9rem 1rem">
          <div style="display:flex; align-items:center; gap:.5rem; margin-bottom:.35rem">
            <h3 style="font-size:1.05rem; font-weight:700; line-height:1.3">{{ recipe.title }}</h3>
            <span *ngIf="isFav()" class="small-text" style="color:var(--color-secondary)">★</span>
          </div>
          <p class="small-text" style="min-height:2.4em">{{ recipe.description }}</p>
          <div class="small-text" style="display:flex; gap:.5rem; margin-top:.5rem; color:#374151">
            <span>⏱ {{ recipe.timeMinutes }}m</span>
            <span>•</span>
            <span>🍽 {{ recipe.servings }}</span>
          </div>
          <div style="display:flex; gap:.5rem; flex-wrap:wrap; margin-top:.5rem">
            <span *ngFor="let tag of recipe.tags" class="small-text" style="background:rgba(37,99,235,0.08); color:var(--color-primary); padding:.15rem .5rem; border-radius:999px">
              #{{ tag }}
            </span>
          </div>
        </div>
      </a>
      <div style="padding: 0 1rem 1rem; display:flex; gap:.5rem">
        <button type="button" class="btn ghost" (click)="toggleFav($event)" [attr.aria-pressed]="isFav()" aria-label="Toggle favorite">
          <span *ngIf="!isFav()">☆ Favorite</span>
          <span *ngIf="isFav()">★ Favorited</span>
        </button>
        <a class="btn secondary" [routerLink]="['/details', recipe.id]" aria-label="Open details">Details</a>
      </div>
    </article>
  `
})
export class RecipeCardComponent {
  @Input() recipe!: Recipe;
  @Output() favoriteChange = new EventEmitter<{ id: string; favorite: boolean }>();
  private readonly fav = inject(FavoritesService);

  // PUBLIC_INTERFACE
  isFav(): boolean {
    return this.recipe ? this.fav.isFavorite(this.recipe.id) : false;
  }

  // PUBLIC_INTERFACE
  toggleFav(evt: unknown) {
    const e = evt as { preventDefault?: () => void; stopPropagation?: () => void } | undefined;
    e?.preventDefault?.();
    e?.stopPropagation?.();
    if (!this.recipe) return;
    this.fav.toggle(this.recipe.id);
    this.favoriteChange.emit({ id: this.recipe.id, favorite: this.fav.isFavorite(this.recipe.id) });
  }
}
