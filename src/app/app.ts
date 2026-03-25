import { Component, signal } from '@angular/core';
import { DUMMY_USERS } from './componnets/user/dummy-users';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('essentials-modules');
  dummyUsers = DUMMY_USERS;
  userName?: string;
  selectedUserId?: string;

  onUserSelected(userId: string) {
    const userName = this.dummyUsers.find((user) => user.id === userId)?.name; // This will find the user with the matching id and return their name. The ?. is the optional chaining operator, which will return undefined if no user is found with the matching id instead of throwing an error.
    this.userName = userName;
    this.selectedUserId = userId;
  }
}
