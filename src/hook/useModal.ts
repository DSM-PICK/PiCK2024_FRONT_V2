// useAcceptModal 훅의 props 인터페이스 정의
interface useAcceptModalProp {
  students: string[]; // 학생 이름 배열
  accept: 'OK' | 'NO'; // 수락 여부
  option: string; // 옵션
}

// useAcceptModal 훅 정의
export const useAcceptModal = ({
  students,
  accept,
  option,
}: useAcceptModalProp) => {
  // 학생 배열이 비어있을 경우 메시지 반환
  if (students.length === 0) {
    return `${option} ${accept === 'OK' ? '수락' : '거절'}하시겠습니까?`;
  }
  // 학생 배열에 한 명 이상 있을 경우 메시지 반환
  return students.length > 1
    ? `${students[0]}외 ${students.length - 1}명의 ${option} ${accept === 'OK' ? '수락' : '거절'}하시겠습니까?`
    : `${students[0]} 학생의 ${option} ${accept === 'OK' ? '수락' : '거절'}하시겠습니까?`;
};