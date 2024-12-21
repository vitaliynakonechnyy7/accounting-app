export interface Day {
  number: number;
  isToday: boolean;
  isCurrentMonth: boolean;
  isOtherMonth: boolean;
}

export interface Week {
  days: Day[];
}