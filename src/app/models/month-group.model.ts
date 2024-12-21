export interface MonthGroup {
  id: string;
  name: string;
  months: number[];
}

export const MONTH_GROUPS: MonthGroup[] = [
  {
    id: 'q1',
    name: 'Январь - Март',
    months: [0, 1, 2]
  },
  {
    id: 'q2',
    name: 'Апрель - Июнь',
    months: [3, 4, 5]
  },
  {
    id: 'q3',
    name: 'Июль - Сентябрь',
    months: [6, 7, 8]
  },
  {
    id: 'q4',
    name: 'Октябрь - Декабрь',
    months: [9, 10, 11]
  }
];