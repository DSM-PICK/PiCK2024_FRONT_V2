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
