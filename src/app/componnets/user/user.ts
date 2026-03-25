import { Component, computed, EventEmitter, input, Input, output, Output, signal } from '@angular/core';
import { DUMMY_USERS } from './dummy-users';
import { type UserInput } from './user.model';
import { Card } from "../shared/card/card";

// const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);


@Component({
  selector: 'app-user',
  imports: [Card],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  // // selectedUser = DUMMY_USERS[randomIndex]; // Called a state. If changed, has to be reflected in the UI.
  // selectedUser = signal(DUMMY_USERS[randomIndex]);

  // @Input({ required: true }) id!: string;
  // @Input({ required: true }) avatar!: string;
  // @Input({ required: true }) name!: string;
  // @Output() select = new EventEmitter<string>();

  // id = input.required<string>();
  // avatar = input.required<string>();
  // name = input.required<string>();

  user = input.required<UserInput>();

  select = output<string>(); // same as new EventEmitter<string>(). Just a more concise way to define an output event emitter and if you don't need any decorators.
  
  imagePath = computed(() => `assets/users/${this.user().avatar}`);

  // imagePath = computed(() => `assets/users/${this.avatar()}`);

  // get imagePath() {
  //   return `assets/users/${this.avatar}`;
  // }

  // imagePath = computed(() => `assets/users/${this.selectedUser().avatar}`);

  activeUser = input.required<boolean>();

  onSelectUser() {
    // const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);
    // // this.selectedUser = DUMMY_USERS[randomIndex]; // This will update the state and the UI will reflect the change due to zone.js detecting the change and triggering a re-render of the component.
    // this.selectedUser.set(DUMMY_USERS[randomIndex]);

    // this.select.emit(this.id());

    this.select.emit(this.user().id);
  }
}
