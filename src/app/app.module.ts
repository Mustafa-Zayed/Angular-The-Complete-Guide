import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SharedModule } from './componnets/shared/shared.module';
import { TasksModule } from './componnets/tasks/tasks.module';

import { App } from './app';
import { Header } from './componnets/header/header';
import { User } from './componnets/user/user';

@NgModule({
  declarations: [App, Header, User],
  imports: [BrowserModule, TasksModule, SharedModule], // we can import the standalone components that app component needs in imports.
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
