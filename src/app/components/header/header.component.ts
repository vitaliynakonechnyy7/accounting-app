import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MonthSelectorComponent } from '../month-selector/month-selector.component';
import { MonthGroup } from '../../models/month-group.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule, 
    MatButtonModule, 
    MatIconModule,
    MonthSelectorComponent
  ],
  template: `
    <div class="header">
      <h1>Учет пожертвований</h1>
      <div class="header-actions">
        <app-month-selector
          (monthGroupSelected)="onMonthGroupSelected($event)">
        </app-month-selector>
        <button mat-icon-button (click)="toggleCalendar.emit()">
          <mat-icon>calendar_today</mat-icon>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .header {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      width: 100%;
      padding: 0 20px;
      background: #f5f5f5;
      border-bottom: 1px solid #e0e0e0;
    }
    h1 {
      margin: 0;
    }
    .header-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  `]
})
export class HeaderComponent {
  @Output() toggleCalendar = new EventEmitter<void>();
  @Output() monthGroupSelect = new EventEmitter<MonthGroup>();

  onMonthGroupSelected(group: MonthGroup) {
    this.monthGroupSelect.emit(group);
  }
}