export interface Login {
  admin_id: string;
  password: string;
}

export interface Signup {
  account_id: string;
  password: string;
  name: string;
  grade: number;
  class_num: number;
  code: string;
  secret_key: string;
}
