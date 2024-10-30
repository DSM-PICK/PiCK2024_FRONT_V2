interface Time {
  hour: number;
  minute: number;
}

export const getTimeString = ({ hour, minute }: Time): string =>
  `${hour}:${minute}`;

interface Student {
  grade: number;
  class_num: number;
  num: number;
  user_name?: string;
  name?: string;
}

interface studentNum {
  grade: number;
  class_num: number;
  num: number;
}

export const getStudentString = ({
  grade,
  class_num,
  num,
  user_name,
  name,
}: Student) => {
  const change = num.toString().length === 1 ? `0${num}` : `${num}`;
  return `${grade}${class_num}${change} ${user_name || name}`;
};

export const setStudentNum = ({ grade, class_num, num }: studentNum) => {
  const change = num.toString().length === 1 ? `0${num}` : `${num}`;
  return `${grade}${class_num}${change}`;
};

export type outCheck = 'OK' | 'NO';

export const Grade = (grade: number[]) => {
  if (grade.includes(4)) {
    return '전';
  } else {
    return grade.join(', ');
  }
};

export const ChangeOut = (type: 'APPLICATION' | 'EARLY_RETURN') => {
  if (type === 'APPLICATION') {
    return '외출';
  } else if (type === 'EARLY_RETURN') {
    return '조기귀가';
  }
};

export const useChangeStatusName = (status: string) => {
  switch (status) {
    case 'ATTENDANCE':
      return '출석';
    case 'PICNIC':
      return '현체';
    case 'EMPLOYMENT':
      return '취업';
    case 'GO_HOME':
      return '귀가';
    case 'DROPOUT':
      return '자퇴';
    case 'GO_OUT':
      return '외출';
    default:
      return '';
  }
};
