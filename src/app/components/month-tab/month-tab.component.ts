import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DonationDay } from '../../models/donation-day.model';
import { MonthData } from '../../models/month-data.model';
import { DateService } from '../../services/date.service';
import { StorageService } from '../../services/storage.service';
import { ReceiptStatusComponent } from '../receipt-status/receipt-status.component';

@Component({
  selector: 'app-month-tab',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    ReceiptStatusComponent
  ],
  template: `
    <div class="month-container">
      <div class="donations-grid">
        <div class="donation-column">
          <h3>Среда</h3>
          <div *ngFor="let day of wednesdayDonations; let i = index" 
               class="donation-row"
               [class.alternate]="i % 2 === 0">
            <span class="date">{{day.date | date:'mediumDate'}}</span>
            <mat-form-field>
              <input matInput type="number" [(ngModel)]="day.amount" 
                     (ngModelChange)="calculateTotals()">
            </mat-form-field>
            <app-receipt-status
              [hasOriginal]="day.hasOriginal"
              [hasCopy]="day.hasCopy"
              (originalChange)="updateOriginal(day, $event)"
              (copyChange)="updateCopy(day, $event)">
            </app-receipt-status>
          </div>
        </div>

        <div class="donation-column">
          <h3>Воскресенье</h3>
          <div *ngFor="let day of sundayDonations; let i = index" 
               class="donation-row"
               [class.alternate]="i % 2 === 0">
            <span class="date">{{day.date | date:'mediumDate'}}</span>
            <mat-form-field>
              <input matInput type="number" [(ngModel)]="day.amount" 
                     (ngModelChange)="calculateTotals()">
            </mat-form-field>
            <app-receipt-status
              [hasOriginal]="day.hasOriginal"
              [hasCopy]="day.hasCopy"
              (originalChange)="updateOriginal(day, $event)"
              (copyChange)="updateCopy(day, $event)">
            </app-receipt-status>
          </div>
        </div>
      </div>

      <div class="totals-section">
        <div class="expenses-row">
          <mat-form-field>
            <mat-label>Расходы</mat-label>
            <input matInput type="number" [(ngModel)]="monthData.expenses" 
                   (ngModelChange)="calculateTotals()">
          </mat-form-field>

          <mat-form-field>
            <mat-label>Дополнительные расходы</mat-label>
            <input matInput type="number" [(ngModel)]="additionalExpense" 
                   (keyup.enter)="addExpense()">
          </mat-form-field>
        </div>

        <div class="summary">
          <p>Общая сумма пожертвований: {{monthData.totalDonations | currency:'UAH':'symbol-narrow':'1.0-0'}}</p>
          <p>Расходы: {{monthData.expenses | currency:'UAH':'symbol-narrow':'1.0-0'}}</p>
          <p>Итого: {{monthData.netAmount | currency:'UAH':'symbol-narrow':'1.0-0'}}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .month-container {
      padding: 20px;
    }
    .donations-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
    }
    .donation-column {
      display: flex;
      flex-direction: column;
      gap: 1em;
      padding: 16px;
      border-radius: 8px;
    }
    .donation-row {
      display: flex;
      height: 55px;
      align-items: baseline;
      gap: 16px;
      padding: 8px;
      border-radius: 4px;
    }
    .donation-row.alternate {
      background: var(--color-neutral-50);
    }
    .date {
      min-width: 120px;
      font-weight: 500;
      color: var(--color-neutral-700);
    }
    .totals-section {
      margin-top: 32px;
      border-top: 1px solid var(--color-neutral-200);
      padding-top: 16px;
    }
    .expenses-row {
      display: flex;
      gap: 16px;
      align-items: center;
    }
    .summary {
      margin-top: 16px;
    }
    h3 {
      margin: 0 0 16px 0;
      color: var(--color-neutral-800);
    }
    mat-form-field {
      width: 120px;
    }
  `]
})
export class MonthTabComponent implements OnInit {
  @Input() year!: number;
  @Input() month!: number;

  monthData: MonthData = {
    donations: [],
    expenses: 0,
    totalDonations: 0,
    netAmount: 0
  };

  additionalExpense: number | null = null;
  wednesdayDonations: DonationDay[] = [];
  sundayDonations: DonationDay[] = [];

  constructor(
    private dateService: DateService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    const savedData = this.storageService.loadMonthData(this.year, this.month);
    if (savedData) {
      this.monthData = {
        ...savedData,
        donations: savedData.donations.map(d => ({
          ...d,
          date: new Date(d.date)
        }))
      };
    } else {
      const dates = this.dateService.getWednesdaysAndSundays(this.year, this.month);
      this.monthData.donations = dates.map(date => ({
        date,
        amount: 0,
        hasOriginal: false,
        hasCopy: false
      }));
    }

    this.wednesdayDonations = this.monthData.donations.filter(
      day => day.date.getDay() === 3
    );
    this.sundayDonations = this.monthData.donations.filter(
      day => day.date.getDay() === 0
    );
  }

  private saveData() {
    this.storageService.saveMonthData(this.year, this.month, this.monthData);
  }

  updateOriginal(day: DonationDay, value: boolean) {
    day.hasOriginal = value;
    this.calculateTotals();
    this.saveData();
  }

  updateCopy(day: DonationDay, value: boolean) {
    day.hasCopy = value;
    this.calculateTotals();
    this.saveData();
  }

  calculateTotals() {
    this.monthData.totalDonations = this.monthData.donations
      .reduce((sum, day) => sum + (day.amount || 0), 0);
    this.monthData.netAmount = this.monthData.totalDonations - this.monthData.expenses;
    this.saveData();
  }

  addExpense() {
    if (this.additionalExpense) {
      this.monthData.expenses += this.additionalExpense;
      this.additionalExpense = null;
      this.calculateTotals();
      this.saveData();
    }
  }
}