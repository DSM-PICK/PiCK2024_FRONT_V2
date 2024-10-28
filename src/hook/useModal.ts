interface useAcceptModalProp {
  students: string[];
  accept: 'OK' | 'NO';
  option: string;
}

export const useAcceptModal = ({
  students,
  accept,
  option,
}: useAcceptModalProp) => {
  return students.length === 0
    ? `${students[0]}외 ${students.length - 1}명의 ${option} ${accept === 'OK' ? '수락' : '거절'}하시겠습니까?`
    : `${students[0]} 학생의 ${option} ${accept === 'OK' ? '수락' : '거절'}하시겠습니까?`;
};
