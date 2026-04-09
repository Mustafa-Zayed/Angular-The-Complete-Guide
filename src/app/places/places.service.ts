import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, throwError } from 'rxjs';

import { Place } from './place.model';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private httpClient = inject(HttpClient);
  private userPlaces = signal<Place[]>([]);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/places',
      'Something went wrong fetching places. Please try again later.',
    );
  }

  loadUserPlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/user-places',
      'Something went wrong fetching your favorite places. Please try again later.',
    ).pipe(
      // You can use tap as to execute some code as if you would do it in the subscribe handler but without subscribing
      tap({
        next: (places) => this.userPlaces.set(places || []),
      }),
    );
  }

  addPlaceToUserPlaces(place: Place) {
    const prevPlaces = this.userPlaces();

    if (!prevPlaces.some((p) => p.id === place.id)) {
      this.userPlaces.set([...prevPlaces, place]);
    }

    // this.userPlaces.update((currentPlaces) => [...currentPlaces, place]); // Optimistic Update if you don't care about the previous state checked in the lines above -> not recommended
    return this.httpClient
      .put<{ userPlaces: Place[] }>('http://localhost:3000/user-places', { placeId: place.id })
      .pipe(
        catchError((error) => {
          this.userPlaces.set(prevPlaces);
          return throwError(
            () => new Error('Failed to store selected place. Please try again later.'),
          );
        }),
        // tap({
        //   next: (response) => {
        //     if (!prevPlaces.some((p) => p.id === place.id)) {
        //       this.userPlaces.set([...prevPlaces, place]);
        //     }
        //   },
        // }),
      );
  }

  removeUserPlace(place: Place) {}

  private fetchPlaces(url: string, errorMessage: string) {
    return this.httpClient
      .get<{ places: Place[] }>(url, {
        observe: 'response',
      })
      .pipe(
        map((response) => response.body?.places),
        catchError((error) => {
          console.log(error);
          return throwError(() => new Error(errorMessage));
        }),
      );
  }
}
