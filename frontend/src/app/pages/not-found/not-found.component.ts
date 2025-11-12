import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * PUBLIC_INTERFACE
 * Generic 404 page.
 */
@Component({
  standalone: true,
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <section class="surface" style="padding:2rem; text-align:center">
      <h1 style="font-size:2rem; color: var(--color-primary); margin-bottom:.5rem">404</h1>
      <p class="small-text" style="margin-bottom:1rem">The page you requested could not be found.</p>
      <a routerLink="/" class="btn">Go Home</a>
    </section>
  `
})
export class NotFoundComponent {}
