import { Component } from '@angular/core';

import { Header } from './components/header/header';
import { ServerStatus } from './components/dashboard/server-status/server-status';
import { Traffic } from './components/dashboard/traffic/traffic';
import { Tickets } from './components/dashboard/tickets/tickets';

@Component({
  selector: 'app-root',
  imports: [Header, ServerStatus, Traffic, Tickets],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
