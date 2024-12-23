import { Injectable } from '@angular/core';
import { MonthData } from '../models/month-data.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private getKey(year: number, month: number): string {
    return `monthData_${year}_${month}`;
  }

  saveMonthData(year: number, month: number, data: MonthData): void {
    const key = this.getKey(year, month);
    localStorage.setItem(key, JSON.stringify(data));
  }

  loadMonthData(year: number, month: number): MonthData | null {
    const key = this.getKey(year, month);
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  clearMonthData(year: number, month: number): void {
    const key = this.getKey(year, month);
    localStorage.removeItem(key);
  }
}