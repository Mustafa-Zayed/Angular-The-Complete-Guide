import { Component, computed, DestroyRef, inject, Input, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnInit {
  // @Input({ required: true }) userId!: string;
  // userName() {
  //   return this.usersService.users.find((user) => user.id === this.userId)?.name;
  // }

  // userId = input.required<string>(); // extracted from the route
  // userName = computed(
  //   () => this.usersService.users.find((user) => user.id === this.userId())?.name,
  // );

  userId = '';
  private usersService = inject(UsersService);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  userName() {
    return this.usersService.users.find((user) => user.id === this.userId)?.name;
  }

  ngOnInit(): void {
    const subscription = this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.userId = paramMap.get('userId') || '';
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
