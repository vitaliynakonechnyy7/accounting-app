import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MonthTabComponent } from './components/month-tab/month-tab.component';
import { HeaderComponent } from './components/header/header.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MonthGroup } from './models/month-group.model';
import { FiscalYearService } from './services/fiscal-year.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    MatTabsModule, 
    MonthTabComponent, 
    HeaderComponent,
    CalendarComponent
  ],
  template: `
    <div class="app-container">
      <app-header 
        (toggleCalendar)="showCalendar = !showCalendar"
        (monthGroupSelect)="onMonthGroupSelect($event)">
      </app-header>
      
      <div class="content" [class.with-calendar]="showCalendar">
        <app-calendar *ngIf="showCalendar" 
                     (monthChanged)="onMonthChanged($event)">
        </app-calendar>
        
        <mat-tab-group>
          <mat-tab *ngFor="let month of selectedMonths" [label]="getMonthName(month)">
            <app-month-tab 
              [year]="fiscalService.getYearForMonth(month)" 
              [month]="month">
            </app-month-tab>
          </mat-tab>
        </mat-tab-group>
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .content.with-calendar {
      flex-direction: row;
    }
    mat-tab-group {
      flex: 1;
    }
  `]
})
export class App {
  showCalendar = false;
  selectedMonths: number[] = [new Date().getMonth()];

  constructor(public fiscalService: FiscalYearService) {}

  onMonthChanged(date: Date) {
    console.log('Month changed:', date);
  }

  onMonthGroupSelect(group: MonthGroup) {
    this.selectedMonths = group.months;
  }

  getMonthName(month: number): string {
    const year = this.fiscalService.getYearForMonth(month);
    return `${new Date(year, month, 1).toLocaleString('ru-RU', { month: 'long' })} ${year}`;
  }
}