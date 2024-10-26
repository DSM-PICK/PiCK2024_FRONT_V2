export type AttendanceType =
  | 'ATTENDANCE'
  | 'PICNIC'
  | 'GO_HOME'
  | 'EMPLOYMENT'
  | 'DROPOUT';

export interface todaySelfStudTeacher {
  floor: number;
  teacher: string;
}

export interface TodayMealsType {
  date: string;
  meal_list: {
    breakfast: {
      menu: string[];
      cal: string;
    };

    lunch: {
      menu: string[];
      cal: string;
    };

    dinner: {
      menu: string[];
      cal: string;
    };
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
}

export interface MynameType {
  name: string;
  grade: number;
  class_num: number;
}

export interface OutListProp {
  user_name: string;
  start: string;
  end: string;
  grade: number;
  class_num: number;
  num: number;
  reason: string;
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
}

export interface applicationDataProp {
  class_num: number;
  end: string;
  grade: number;
  id: string;
  num: number;
  reason: string;
  start: string;
  user_id: string;
  user_name: string;
}

export interface OutListProp {
  id: string;
  user_name: string;
  end_time: string;
  grade: number;
  class_num: number;
  num: number;
  reason: string;
}

export interface dataType {
  floor: number;
  teacher: string;
  date: string;
}

export interface EarlyReturnType {
  id: string;
  user_name: string;
  start: string;
  grade: number;
  class_num: number;
  num: number;
  reason: string;
}

export interface attendanceType {
  id: string;
  user_name: string;
  grade: number;
  class_num: number;
  num: number;
  status6: AttendanceType;
  status7: AttendanceType;
  status8: AttendanceType;
  status9: AttendanceType;
  status10: AttendanceType;
  classroom_name: string;
}

export interface ChangeAttendance {
  user_id: string;
  status_list: string[];
}
