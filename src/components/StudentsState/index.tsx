import * as S from './style';
import outingImg from '@/assets/svg/outing.svg';
import classroomMovementImg from '@/assets/svg/classroomMovement.svg';

interface StudentsStateType {
  type: 'outing' | 'classroomMovement';
  person: number;
}

const StudentsState = ({ type, person }: StudentsStateType) => {
  const mainText =
    type === 'outing' ? '현재 외출 중인 학생은' : '현재 교실 이동 중인 학생은';
  const buttonText =
    type === 'outing' ? '외출자 목록 보기' : '교실 이동 학생 보기';
  const img = type === 'outing' ? outingImg : classroomMovementImg;
  const rout = type === 'outing' ? 'outList' : 'classMove';
  return (
    <S.StudentsStateContainer>
      <S.StudentsStateFlexbox>
        <S.StudentsStateText>
          {mainText}
          <br />총
          <S.StudentsStatePointText> {person}명</S.StudentsStatePointText>
          입니다.
        </S.StudentsStateText>
        <S.StudentsStateButton href={rout}>{buttonText}</S.StudentsStateButton>
      </S.StudentsStateFlexbox>
      <S.StudentsStateImg src={img} alt="" />
    </S.StudentsStateContainer>
  );
};

export default StudentsState;
