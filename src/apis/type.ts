export interface todaySelfStudTeacher {
  floor: number;
  teacher_name: string;
}

export interface TodayMealsType {
  date: string;
  meals: {
    breakfast: string[];
    lunch: string[];
    dinner: string[];
  };
}

export interface StateCountType {
  out: number;
  class_move: number;
}

export interface SimpleNoticeType {
  id: string;
  title: string;
  create_at: string;
  teacher: string;
  grade: number[];
}

export interface MynameType {
  name: string;
  grade: number;
  class_num: number;
}

export interface NoticeDetailType {
  id: string;
  title: string;
  create_at: string;
  teacher: string;
  content: string;
}
export interface ChangeProps {
  text: string;
  name: string;
}

export interface UploadNoticeType {
  title: string;
  content: string;
  grade: number[];
}
