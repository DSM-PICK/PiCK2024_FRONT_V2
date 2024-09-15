export interface todaySelfStudTeacher {
  floor: number;
  teacher: string;
}

export interface TodayMealsType {
  date: string;
  meals: {
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
  username: string;
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
  username: string;
}

export interface OutListProp {
  id: string;
  username: string;
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
