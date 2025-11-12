import { Component, inject, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { RecipeListComponent } from '../../components/recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from '../../components/recipe-details/recipe-details.component';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';

/**
 * PUBLIC_INTERFACE
 * Home page shows search bar and grid of recipes with modal details.
 */
@Component({
  standalone: true,
  selector: 'app-home',
  imports: [NgIf, SearchBarComponent, RecipeListComponent, RecipeDetailsComponent],
  template: `
    <section style="display:flex; flex-direction:column; gap:1rem">
      <app-search-bar (search)="onSearch($event)"></app-search-bar>

      <div>
        <h2 class="small-text" style="margin:.5rem 0 1rem; color:#374151">Results</h2>
        <app-recipe-list [recipes]="recipes()" (favoriteChange)="onFavChange($event)"></app-recipe-list>
      </div>
    </section>

    <app-recipe-details *ngIf="showModal()" [recipe]="selected()" (close)="closeModal()"></app-recipe-details>
  `
})
export class HomeComponent {
  private readonly recipeService = inject(RecipeService);

  readonly recipes = signal<Recipe[]>([]);
  readonly selected = signal<Recipe | null>(null);
  readonly showModal = signal<boolean>(false);
  private searchTerm = signal<string>('');

  constructor() {
    this.load();
  }

  onSearch(q: string) {
    this.searchTerm.set(q);
    this.load();
  }

  onFavChange(_: { id: string; favorite: boolean }) {
    // Placeholder for future analytics or state sync
  }

  private load() {
    this.recipeService.list(this.searchTerm()).subscribe(list => {
      this.recipes.set(list);
    });
  }

  openModal(r: Recipe) {
    this.selected.set(r);
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
    this.selected.set(null);
  }
}
