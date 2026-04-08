import { Component, inject, signal } from '@angular/core';
import { Subscription } from 'rxjs';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent {
  places = signal<Place[] | undefined>(undefined);
  private placesService = inject(PlacesService);
  private subscriptions: Subscription[] = [];
  isFetching = signal(false);
  error = signal('');

  ngOnInit() {
    this.isFetching.set(true);

    const sub = this.placesService.loadAvailablePlaces().subscribe({
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
    const sub = this.placesService.addPlaceToUserPlaces(selectedPlace.id).subscribe((response) => {
      console.log(response);
    });

    this.subscriptions.push(sub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
