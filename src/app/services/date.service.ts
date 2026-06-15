import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  getThursdaysAndSundays(year: number, month: number): Date[] {
    const dates: Date[] = [];
    const date = new Date(year, month, 1);
    
    while (date.getMonth() === month) {
      const day = date.getDay();
      if (day === 0 || day === 4) { // 0 is Sunday, 4 is Thursday
        dates.push(new Date(date));
      }
      date.setDate(date.getDate() + 1);
    }
    
    return dates;
  }
}
