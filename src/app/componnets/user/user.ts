import { Component, computed, input, output } from '@angular/core';
import { type UserInput } from './user.model';
import { Card } from '../shared/card/card';

@Component({
  selector: 'app-user',
  imports: [Card],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  user = input.required<UserInput>();

  select = output<string>(); // same as new EventEmitter<string>(). Just a more concise way to define an output event emitter and if you don't need any decorators.

  imagePath = computed(() => `assets/users/${this.user().avatar}`);

  activeUser = input.required<boolean>();

  onSelectUser() {
    this.select.emit(this.user().id);
  }
}
