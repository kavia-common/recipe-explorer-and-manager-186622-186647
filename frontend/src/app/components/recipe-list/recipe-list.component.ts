import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Recipe } from '../../models/recipe.model';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';

/**
 * PUBLIC_INTERFACE
 * Displays a grid of RecipeCard items.
 */
@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [NgFor, NgIf, RecipeCardComponent],
  template: `
    <div *ngIf="recipes?.length === 0" class="surface" style="padding:1rem">
      No recipes found. Try a different search.
    </div>

    <section class="grid" aria-live="polite">
      <div
        *ngFor="let r of recipes"
        class="grid-col-12 grid-col-sm-6 grid-col-md-4 grid-col-lg-3"
        style="display:block"
      >
        <app-recipe-card [recipe]="r" (favoriteChange)="favoriteChange.emit($event)"></app-recipe-card>
      </div>
    </section>
  `
})
export class RecipeListComponent {
  @Input() recipes: Recipe[] = [];
  @Output() favoriteChange = new EventEmitter<{ id: string; favorite: boolean }>();
}
