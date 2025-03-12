export interface GetAllMealsType {
  id: string;
  user_name: string;
  status: 'OK' | 'NO';
  grade: number;
  class_num: number;
  num: number;
}

export interface ChangeStateParams {
  status: 'OK' | 'NO';
  userId: string;
}
