import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { Recipe } from '../../models/recipe.model';

/**
 * PUBLIC_INTERFACE
 * Displays recipe details inside a modal shell. Emits close event.
 */
@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [NgIf, NgFor],
  template: `
    <div class="modal-backdrop" role="dialog" aria-modal="true" aria-label="Recipe details" (click)="onBackdrop($event)">
      <div class="modal" (click)="$event.stopPropagation()">
        <div style="display:flex; align-items:center; justify-content:space-between; padding:1rem 1.25rem; border-bottom:1px solid rgba(17,24,39,0.06)">
          <h2 style="font-size:1.25rem">{{ recipe?.title }}</h2>
          <button class="btn ghost" (click)="close.emit()" aria-label="Close details">Close</button>
        </div>
        <div style="display:grid; grid-template-columns: 1fr; gap:1rem; padding:1rem">
          <div class="surface" style="overflow:hidden">
            <div style="position:relative; aspect-ratio: 16/9; background:#e5e7eb">
              <img [src]="recipe?.image" [alt]="recipe?.title" style="position:absolute; inset:0; width:100%; height:100%; object-fit:cover" />
            </div>
          </div>
          <div class="surface" style="padding:1rem">
            <p class="small-text" style="margin-bottom:.5rem">{{ recipe?.description }}</p>
            <div class="small-text" style="display:flex; gap:.75rem; color:#374151">
              <span>⏱ {{ recipe?.timeMinutes }} min</span>
              <span>•</span>
              <span>🍽 {{ recipe?.servings }} servings</span>
            </div>
          </div>
          <div class="surface" style="padding:1rem">
            <h3 style="margin-bottom:.5rem">Ingredients</h3>
            <ul>
              <li *ngFor="let ing of recipe?.ingredients" class="small-text">• {{ ing }}</li>
            </ul>
          </div>
          <div class="surface" style="padding:1rem">
            <h3 style="margin-bottom:.5rem">Steps</h3>
            <ol>
              <li *ngFor="let step of recipe?.steps; index as i" class="small-text">{{ i + 1 }}. {{ step }}</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  `
})
export class RecipeDetailsComponent {
  @Input() recipe: Recipe | null = null;
  @Output() close = new EventEmitter<void>();

  onBackdrop(_: unknown) {
    this.close.emit();
  }
}
