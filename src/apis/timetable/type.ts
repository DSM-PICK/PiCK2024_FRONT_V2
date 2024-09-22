export interface TimetableProp {
  date: string;
  timetables: [
    {
      id: string;
      period: number;
      subject_name: string;
      image: string;
    },
  ];
}

export interface TimeTableChangeProps {
  day_week: number;
  period: number;
  grade: number;
  class_num: number;
  subject: string;
}
