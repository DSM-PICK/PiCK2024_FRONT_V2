export interface GetAllMealsType {
  id: string;
  name: string;
  status: "OK" | "NO" | "QUIET";
  grade: number;
  class_num: number;
  num: number;
}

export interface ChangeStateParams {
  status: "OK" | "NO";
  userId: string;
}
