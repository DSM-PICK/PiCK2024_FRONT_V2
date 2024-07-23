export interface ApplicationCount {
  id: string;
  name: string;
  grade: number;
  class_num: number;
  num: number;
  application_cnt: number;
  early_return_cnt: number;
}

export interface DetailApplication {
  username: string;
  application_story: {
    reason: string;
    start_time: string;
    end_time: string;
    date: string;
    type: 'APPLICATION' | 'EARLY_RETURN';
  }[];
}
