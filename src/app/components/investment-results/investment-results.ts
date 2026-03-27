import { Component, computed, inject, input, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { AnnualData } from '../../models/annual-data.model';
import { InvestmentService } from '../../services/investment.service';

@Component({
  selector: 'app-investment-results',
  imports: [CurrencyPipe],
  templateUrl: './investment-results.html',
  styleUrl: './investment-results.css',
})
export class InvestmentResults {
  investmentService = inject(InvestmentService);
  results = computed(() => this.investmentService.results());
}
