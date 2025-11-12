import { Injectable, inject } from '@angular/core';
import { ENV } from '../core/environment.tokens';
import { Recipe } from '../models/recipe.model';
import { MOCK_RECIPES } from '../mock/recipes.mock';
import { Observable, of } from 'rxjs';

/**
 * PUBLIC_INTERFACE
 * Service to fetch and search recipes. Reads API base from environment but uses mock data for now.
 */
@Injectable({ providedIn: 'root' })
export class RecipeService {
  private readonly env = inject(ENV);

  get apiBase(): string {
    return this.env.apiBaseUrl || this.env.backendUrl;
  }

  /**
   * PUBLIC_INTERFACE
   * Return list of recipes with optional search filtering by title or tag.
   */
  list(search?: string): Observable<Recipe[]> {
    const term = (search || '').trim().toLowerCase();
    if (!term) return of(MOCK_RECIPES);
    const filtered = MOCK_RECIPES.filter(r =>
      r.title.toLowerCase().includes(term) ||
      r.tags.some(t => t.toLowerCase().includes(term))
    );
    return of(filtered);
  }

  /**
   * PUBLIC_INTERFACE
   * Get a single recipe by id.
   */
  getById(id: string): Observable<Recipe | undefined> {
    return of(MOCK_RECIPES.find(r => r.id === id));
  }
}
