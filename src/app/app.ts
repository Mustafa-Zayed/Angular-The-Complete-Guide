import { Component, signal } from '@angular/core';
import { Header } from './componnets/header/header';
import { User } from './componnets/user/user';
import { DUMMY_USERS } from './componnets/user/dummy-users';

@Component({
  selector: 'app-root', // Component directive
  imports: [Header, User],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('first-app');
  dummyUsers = DUMMY_USERS;
}
