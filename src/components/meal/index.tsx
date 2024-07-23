import * as S from './style';

interface Meal {
  title: string;
  content: string[];
}

const MealInfo = ({ title, content }: Meal) => {
  return (
    <S.MealInfoWrap>
      <S.MealTitle>{title}</S.MealTitle>
      <S.MealContentWrap>
        {content.length === 1 || content.length === 0 ? (
          <S.MealContent>급식 정보가 없습니다</S.MealContent>
        ) : (
          content.map((item) => <S.MealContent>{item}</S.MealContent>)
        )}
      </S.MealContentWrap>
    </S.MealInfoWrap>
  );
};

export default MealInfo;
