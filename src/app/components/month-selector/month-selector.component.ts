import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MonthGroup } from '../../models/month-group.model';
import { FiscalYearService } from '../../services/fiscal-year.service';

@Component({
  selector: 'app-month-selector',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatButtonModule],
  template: `
    <button mat-button [matMenuTriggerFor]="menu">
      {{ selectedGroup?.name || 'Выбрать квартал для проверки' }}
    </button>
    <mat-menu #menu="matMenu">
      <button mat-menu-item *ngFor="let group of monthGroups" 
              (click)="selectMonthGroup(group)">
        {{ group.name }}
      </button>
    </mat-menu>
  `,
  styles: [`
    button {
      margin-left: 16px;
    }
  `]
})
export class MonthSelectorComponent implements OnInit {
  @Output() monthGroupSelected = new EventEmitter<MonthGroup>();
  monthGroups: MonthGroup[];
  selectedGroup: MonthGroup | null = null;

  constructor(private fiscalYearService: FiscalYearService) {
    this.monthGroups = this.fiscalYearService.getQuarterGroups();
  }

  ngOnInit() {
    const currentMonth = new Date().getMonth();
    const currentQuarter = this.monthGroups.find(group => 
      group.months.includes(currentMonth)
    );
    
    if (currentQuarter) {
      this.selectMonthGroup(currentQuarter);
    }
  }

  selectMonthGroup(group: MonthGroup) {
    this.selectedGroup = group;
    this.monthGroupSelected.emit(group);
  }
}