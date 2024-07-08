export interface GetMonthSchedule {
  month: string;
  year: string;
}

export interface MonthScheduleData {
  id: string;
  event_name: string;
  month: number;
  day: number;
  day_name: string;
}

export interface addSchedule {
  event_name: string;
  date: string | null;
}

export interface schedulesdata {
  id: string;
  event_name: string;
  month: number;
  day: number;
}

export interface CreateScheduleType {
  event_name: string;
  date: string;
}
