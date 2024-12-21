import { Injectable } from '@angular/core';
import { MonthGroup } from '../models/month-group.model';

@Injectable({
  providedIn: 'root'
})
export class FiscalYearService {
  getCurrentFiscalYear(): number {
    const today = new Date();
    const month = today.getMonth();
    // If we're in September or later, we're in the next fiscal year
    return today.getFullYear() + (month >= 8 ? 1 : 0);
  }

  getQuarterGroups(): MonthGroup[] {
    return [
      {
        id: 'q1',
        name: 'Сентябрь - Ноябрь',
        months: [8, 9, 10]
      },
      {
        id: 'q2',
        name: 'Декабрь - Февраль',
        months: [11, 0, 1]
      },
      {
        id: 'q3',
        name: 'Март - Май',
        months: [2, 3, 4]
      },
      {
        id: 'q4',
        name: 'Июнь - Август',
        months: [5, 6, 7]
      }
    ];
  }

  getYearForMonth(month: number): number {
    const fiscalYear = this.getCurrentFiscalYear();
    // For months after August (fiscal year start), use previous calendar year
    return month >= 8 ? fiscalYear - 1 : fiscalYear;
  }
}