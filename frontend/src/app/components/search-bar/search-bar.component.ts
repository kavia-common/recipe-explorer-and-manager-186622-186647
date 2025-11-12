import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * PUBLIC_INTERFACE
 * SearchBar emits search text changes and submit event.
 */
@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form (ngSubmit)="onSubmit()" class="surface" style="padding:.75rem; display:flex; gap:.5rem; align-items:center" role="search" aria-label="Recipe search">
      <input
        class="input"
        type="search"
        name="q"
        [(ngModel)]="query"
        [placeholder]="placeholder"
        aria-label="Search recipes"
      />
      <button type="submit" class="btn button-icon" aria-label="Search">
        <span>Search</span>
      </button>
    </form>
  `
})
export class SearchBarComponent {
  @Input() placeholder = 'Search recipes by name or tag...';
  @Input() initial = '';
  @Output() search = new EventEmitter<string>();

  query = '';

  ngOnInit() {
    this.query = this.initial || '';
  }

  onSubmit() {
    this.search.emit(this.query);
  }
}
