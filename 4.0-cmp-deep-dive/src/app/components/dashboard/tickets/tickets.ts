import { Component } from '@angular/core';
import { DashboardItem } from '../shared/dashboard-item/dashboard-item';
import { NewTicket } from './new-ticket/new-ticket';
import { TicketModel } from './ticket.model';
import { Ticket } from './ticket/ticket';

@Component({
  selector: 'app-tickets',
  imports: [DashboardItem, NewTicket, Ticket],
  templateUrl: './tickets.html',
  styleUrl: './tickets.css',
})
export class Tickets {
  image = { src: 'list.png', alt: 'A list of items' };
  title = 'Support Tickets';

  tickets: TicketModel[] = [];

  onTicketSubmit(ticket: { title: string; request: string }) {
    const newTicket: TicketModel = {
      id: Math.random().toString(),
      title: ticket.title,
      request: ticket.request,
      status: 'open',
    };

    this.tickets.push(newTicket);
    console.log('tickets:', this.tickets);
  }

  onMarkAsCompleted(id: string) {
    const ticket = this.tickets.find((t) => t.id === id);
    if (ticket) {
      ticket.status = 'closed';
    }
  }
}
