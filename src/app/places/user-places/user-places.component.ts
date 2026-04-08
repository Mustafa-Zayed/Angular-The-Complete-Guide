import { Component, inject, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { Place } from '../place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Subscription, throwError } from 'rxjs';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent {
  places = signal<Place[] | undefined>(undefined);
  private httpClient = inject(HttpClient);
  private subscriptions: Subscription[] = [];
  isFetching = signal(false);
  error = signal('');

  ngOnInit() {
    this.isFetching.set(true);

    const sub = this.httpClient
      .get<{ places: Place[] }>('http://localhost:3000/user-places', {
        observe: 'body',
      })
      .pipe(
        map((body) => body.places),
        catchError((error) => {
          return throwError(
            () =>
              new Error(
                'Something went wrong fetching your favorite places. Please try again later.',
              ),
          );
        }),
      )
      .subscribe({
        next: (places) => {
          this.places.set(places);
        },
        error: (error: Error) => {
          this.error.set(error.message);
        },
        complete: () => this.isFetching.set(false),
      });

    this.subscriptions.push(sub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
