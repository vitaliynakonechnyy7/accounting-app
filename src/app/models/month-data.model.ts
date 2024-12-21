import { DonationDay } from './donation-day.model';

export interface MonthData {
  donations: DonationDay[];
  expenses: number;
  totalDonations: number;
  netAmount: number;
}