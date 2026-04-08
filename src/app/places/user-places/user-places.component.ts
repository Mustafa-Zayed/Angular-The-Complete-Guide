import { Component, inject, signal } from '@angular/core';
import { Subscription } from 'rxjs';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent {
  places = signal<Place[] | undefined>(undefined);
  private placesService = inject(PlacesService);
  private subscriptions: Subscription[] = [];
  isFetching = signal(false);
  error = signal('');

  ngOnInit() {
    this.isFetching.set(true);

    const sub = this.placesService.loadUserPlaces().subscribe({
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
