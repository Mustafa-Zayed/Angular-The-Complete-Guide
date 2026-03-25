import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { App } from './app';
import { Header } from './componnets/header/header';
import { User } from './componnets/user/user';
import { Tasks } from './componnets/tasks/tasks';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [App],
  imports: [BrowserModule, Header, User, Tasks], // we can import the standalone components that app component needs in imports.
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
