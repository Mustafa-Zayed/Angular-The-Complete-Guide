import { Component, computed, inject } from '@angular/core';
import { InvestmentService } from '../../services/investment.service';

@Component({
  selector: 'app-investment-results',
  standalone: false,
  templateUrl: './investment-results.html',
  styleUrl: './investment-results.css',
})
export class InvestmentResults {
  investmentService = inject(InvestmentService);
  results = computed(() => this.investmentService.results());
}
