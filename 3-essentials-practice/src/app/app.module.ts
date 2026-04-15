import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { App } from './app';
import { InvestmentResults } from './components/investment-results/investment-results';
import { Header } from './components/header/header';
import { UserInputModule } from './components/user-input/user-input.module';

@NgModule({
  declarations: [App, Header, InvestmentResults],
  imports: [BrowserModule, UserInputModule],
  bootstrap: [App],
})
export class AppModule {}
