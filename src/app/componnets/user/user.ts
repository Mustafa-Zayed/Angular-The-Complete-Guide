import { Component, computed, input, Input, signal } from '@angular/core';
import { DUMMY_USERS } from './dummy-users';

// const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);
@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  // // selectedUser = DUMMY_USERS[randomIndex]; // Called a state. If changed, has to be reflected in the UI.
  // selectedUser = signal(DUMMY_USERS[randomIndex]);

  // @Input({ required: true }) avatar!: string;
  // @Input({ required: true }) name!: string;

  avatar = input.required<string>();
  name = input.required<string>();

  imagePath = computed(() => `assets/users/${this.avatar()}`);

  // get imagePath() {
  //   return `assets/users/${this.avatar}`;
  // }

  // imagePath = computed(() => `assets/users/${this.selectedUser().avatar}`);

  onSelectUser() {
    // const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);
    // // this.selectedUser = DUMMY_USERS[randomIndex]; // This will update the state and the UI will reflect the change due to zone.js detecting the change and triggering a re-render of the component.
    // this.selectedUser.set(DUMMY_USERS[randomIndex]);
  }
}
