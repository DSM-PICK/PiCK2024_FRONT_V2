import * as S from './style';

interface SelfStydyListProp {
  floor: number;
  teacher: string;
}

export const SelfStudyList = ({ floor, teacher }: SelfStydyListProp) => {
  return (
    <S.TextWrap>
      <S.FloorText>{floor}층</S.FloorText>
      <S.TeacherNameText>{teacher} 선생님</S.TeacherNameText>
    </S.TextWrap>
  );
};

export default SelfStudyList;
