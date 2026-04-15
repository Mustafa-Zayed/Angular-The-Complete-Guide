import { Component, DestroyRef, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import {
  ActivatedRoute,
  RouterOutlet,
  RouterLink,
  ResolveFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent {
  // @Input({ required: true }) userId!: string;
  // userName() {
  //   return this.usersService.users.find((user) => user.id === this.userId)?.name;
  // }

  // userId = input.required<string>(); // extracted from the route
  // userName = computed(
  //   () => this.usersService.users.find((user) => user.id === this.userId())?.name,
  // );

  // userId = '';
  message = input.required<string>(); // extracted from the route through the resolve function automatically though withComponentInputBinding(), or data property in the ActivatedRoute.
  userName = input.required<string>(); // extracted from the route through the resolve function automatically though withComponentInputBinding(), or data property in the ActivatedRoute.
  // private usersService = inject(UsersService);
  // private activatedRoute = inject(ActivatedRoute);
  // private destroyRef = inject(DestroyRef);

  // userName() {
  //   return this.usersService.users.find((user) => user.id === this.userId)?.name;
  // }

  // ngOnInit(): void {
  //   const subscription = this.activatedRoute.paramMap.subscribe((paramMap) => {
  //     this.userId = paramMap.get('userId') || '';
  //   });
  //   this.destroyRef.onDestroy(() => {
  //     subscription.unsubscribe();
  //   });
  // }
}

/**
 * This function is used to resolve the user name from the route, it will be called in app.routes.ts in
 * the resolve property before the component is created. No need to call ActivatedRoute and subscribe
 * instead of ActivatedRouteSnapshot because this function will be called every time this route gets activated
 */
export const resolveUserName: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot,
) => {
  const usersService = inject(UsersService);
  const userName =
    usersService.users.find((u) => u.id === activatedRoute.paramMap.get('userId'))?.name || '';
  return userName;
};

export const resolveTitle: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot,
) => {
  return resolveUserName(activatedRoute, routerState) + "'s Tasks";
};
