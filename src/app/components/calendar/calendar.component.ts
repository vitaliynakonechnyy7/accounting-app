import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Day, Week } from '../../models/calendar.model';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container-page">
      <h5 class="h5">
        <span class="material-symbols-outlined" (click)="prevMonth()">chevron_left</span>
        {{ currentMonthName }} {{ currentYear }}
        <span class="material-symbols-outlined" (click)="nextMonth()">chevron_right</span>
      </h5>
      <table>
        <thead>
          <tr>
            <th class="th" *ngFor="let day of weekdays">{{ day }}</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let week of weeks">
            <td 
              [ngClass]="{
                'td': !day.isOtherMonth,
                'other-month': day.isOtherMonth,
                'highlighted-day': isWednesdayOrSunday(day)
              }" 
              *ngFor="let day of week.days"
              [class.today]="day.isToday">
              {{ day.number }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  @Output() monthChanged = new EventEmitter<Date>();
  @Input() version = 1;
  
  currentDate: Date = new Date();
  currentMonthName: string = '';
  currentYear: number = 0;
  weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  weeks: Week[] = [];

  ngOnInit() {
    this.updateCurrentMonthAndYear();
    this.generateCalendar();
  }

  private updateCurrentMonthAndYear() {
    this.currentMonthName = this.currentDate.toLocaleString('ru-RU', { month: 'long' });
    this.currentYear = this.currentDate.getFullYear();
  }

  private generateCalendar() {
    const today = new Date(this.currentDate);
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const daysInLastMonth = new Date(year, month, 0).getDate();
    const firstDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7;

    let day = 1;
    this.weeks = [];
    const rows = Math.ceil((daysInMonth + firstDayOfWeek) / 7);

    for (let i = 0; i < rows; i++) {
      const week: Week = { days: [] };
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDayOfWeek) {
          week.days.push({
            number: daysInLastMonth - firstDayOfWeek + j + 1,
            isToday: false,
            isCurrentMonth: false,
            isOtherMonth: true,
          });
        } else if (day > daysInMonth) {
          week.days.push({
            number: day - daysInMonth,
            isToday: false,
            isCurrentMonth: false,
            isOtherMonth: true,
          });
          day++;
        } else {
          week.days.push({
            number: day,
            isToday: day === today.getDate() && month === new Date().getMonth() && year === new Date().getFullYear(),
            isCurrentMonth: true,
            isOtherMonth: false,
          });
          day++;
        }
      }
      this.weeks.push(week);
    }
  }

  prevMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.monthChanged.emit(this.currentDate);
    this.updateCurrentMonthAndYear();
    this.generateCalendar();
  }

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.monthChanged.emit(this.currentDate);
    this.updateCurrentMonthAndYear();
    this.generateCalendar();
  }

  isWednesdayOrSunday(day: Day): boolean {
    const date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day.number);
    const dayOfWeek = date.getDay();
    return day.isCurrentMonth && (dayOfWeek === 3 || dayOfWeek === 0);
  }
}