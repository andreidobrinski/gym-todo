export interface ITodo {
  title: string;
  complete: boolean;
  dateCompleted: Date | null;
  repeatInterval: number;
  isToday?: boolean;
}
