interface Student {
  user_id: string;
  name: string;
  grade: number;
  class_num: number;
  num: number;
  status: 'ATTENDANCE' | 'PICNIC' | 'GO_HOME' | 'EMPLOYMENT' | 'DROPOUT';
}

export interface StudentStatus {
  students: Student[];
  teacher: string;
}

export interface ChangeStatusType {
  user_id: string;
  status_type: string;
}
