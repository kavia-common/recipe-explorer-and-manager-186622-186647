import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const LS_KEY = 'recipe_favorites_v1';

/**
 * PUBLIC_INTERFACE
 * Manages favorite recipe IDs with localStorage persistence.
 */
@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly _favorites$ = new BehaviorSubject<Set<string>>(this.loadFromStorage());
  readonly favorites$ = this._favorites$.asObservable();

  /**
   * PUBLIC_INTERFACE
   * Returns current favorites as a set.
   */
  get favorites(): Set<string> {
    return this._favorites$.value;
  }

  /**
   * PUBLIC_INTERFACE
   * Toggle favorite by id.
   */
  toggle(id: string): void {
    const next = new Set(this._favorites$.value);
    if (next.has(id)) next.delete(id); else next.add(id);
    this._favorites$.next(next);
    this.saveToStorage(next);
  }

  /**
   * PUBLIC_INTERFACE
   * Check if a recipe is in favorites.
   */
  isFavorite(id: string): boolean {
    return this._favorites$.value.has(id);
  }

  private loadFromStorage(): Set<string> {
    try {
      // eslint-disable-next-line no-undef
      const ls: Storage | undefined = (typeof localStorage !== 'undefined') ? localStorage : undefined;
      const raw = ls ? ls.getItem(LS_KEY) : null;
      if (!raw) return new Set<string>();
      const arr = JSON.parse(raw) as string[];
      return new Set(arr);
    } catch {
      return new Set<string>();
    }
  }

  private saveToStorage(set: Set<string>): void {
    try {
      // eslint-disable-next-line no-undef
      const ls: Storage | undefined = (typeof localStorage !== 'undefined') ? localStorage : undefined;
      if (ls) {
        ls.setItem(LS_KEY, JSON.stringify(Array.from(set)));
      }
    } catch {
      // ignore storage errors
    }
  }
}
