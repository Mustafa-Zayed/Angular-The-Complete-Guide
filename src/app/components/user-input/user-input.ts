import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { InvestmentInput } from '../../models/investment-input.model';

@Component({
  selector: 'app-user-input',
  imports: [FormsModule],
  templateUrl: './user-input.html',
  styleUrl: './user-input.css',
})
export class UserInput {
  enteredInitialInvestment = '0';
  enteredAnnualInvestment = '0';
  enteredExpectedReturn = '5';
  enteredDuration = '10';

  @Output() calculate = new EventEmitter<InvestmentInput>();

  onSubmit() {
    const data: InvestmentInput = {
      initialInvestment: parseFloat(this.enteredInitialInvestment),
      annualInvestment: parseFloat(this.enteredAnnualInvestment),
      expectedReturn: parseFloat(this.enteredExpectedReturn),
      duration: parseFloat(this.enteredDuration),
    };
    this.calculate.emit(data);
  }
}
