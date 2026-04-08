import { Component, inject, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Subscription, throwError } from 'rxjs';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent {
  places = signal<Place[] | undefined>(undefined);
  private httpClient = inject(HttpClient);
  private subscriptions: Subscription[] = [];
  isFetching = signal(false);
  error = signal('');

  ngOnInit() {
    this.isFetching.set(true);

    const sub = this.httpClient
      .get<{ places: Place[] }>('http://localhost:3000/places', {
        observe: 'response',
      })
      .pipe(
        map((response) => response.body?.places),
        catchError((error) => {
          console.log(error);
          return throwError(
            () =>
              new Error('Something went wrong fetching available places. Please try again later.'),
          );
        }),
      )
      .subscribe({
        next: (places) => {
          // console.log(places);
          this.places.set(places);
        },
        error: (error: Error) => {
          console.log(error);
          this.error.set(error.message);
        },
        complete: () => this.isFetching.set(false),
      });

    this.subscriptions.push(sub);
  }

  onSelectPlace(selectedPlace: Place) {
    this.httpClient
      .put('http://localhost:3000/user-places', { placeId: selectedPlace.id })
      .subscribe((response) => {
        console.log(response);
      });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
