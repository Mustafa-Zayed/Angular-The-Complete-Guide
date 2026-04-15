import { Component, input, output, signal } from '@angular/core';
import { TicketModel } from '../ticket.model';

@Component({
  selector: 'app-ticket',
  imports: [],
  templateUrl: './ticket.html',
  styleUrl: './ticket.css',
})
export class Ticket {
  ticket = input.required<TicketModel>();
  detailsVisible = signal(false);
  onMarkAsCompleted = output<void>();

  toggleDetails() {
    // this.detailsVisible.set(!this.detailsVisible());
    this.detailsVisible.update((value) => !value);
  }

  markAsCompleted() {
    this.onMarkAsCompleted.emit();
  }
}
