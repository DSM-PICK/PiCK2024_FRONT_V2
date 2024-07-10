import React from "react";
import { getToday } from "@/utils/date";
import * as S from "./style";
import StudentsState from "@/components/StudentsState";
import MealInfo from "@/components/meal";
import closeIcon from "@/assets/svg/close.svg";
import SelfStudyList from "@/components/selfStudyTeacher";
import { TodaySelfStudy } from "@/apis/self-study";
import { TodayMeals } from "@/apis/meal";
import { StudentStateCount } from "@/apis/application";

interface MenuProp {
  closeOnClick: () => void;
}

const Menu = ({ closeOnClick }: MenuProp) => {
  const { data: selfStudyData } = TodaySelfStudy();
  const { data: mealsData } = TodayMeals();
  const { data: StudentStateCountData } = StudentStateCount();

  return (
    <>
      <S.Menu onClick={closeOnClick} />
      <S.MenuWrap>
        <S.MenuContentWrap>
          <S.CloseIcon
            src={closeIcon}
            alt="닫기"
            width={32}
            height={32}
            onClick={closeOnClick}
          />
          <S.MenuText>오늘의 급식 ({getToday()})</S.MenuText>
          <S.MealWrap>
            <MealInfo
              title="점심"
              content={mealsData?.meals?.lunch?.slice(0) || []}
            />
            <MealInfo
              title="저녁"
              content={mealsData?.meals?.dinner?.slice(0) || []}
            />
          </S.MealWrap>
          <S.MenuText>오늘의 자습감독</S.MenuText>
          <S.SelfStudyListWrap>
            {selfStudyData?.length === 0
              ? "오늘의 자습감독 정보가 없습니다"
              : selfStudyData?.map((item) => (
                  <SelfStudyList
                    floor={item.floor}
                    teacher={item.teacher_name}
                  />
                ))}
          </S.SelfStudyListWrap>
          <S.MiniMenuContent>
            <S.MenuText>상태</S.MenuText>
            <StudentsState
              type="outing"
              person={StudentStateCountData?.out || 0}
            />
            <StudentsState
              type="classroomMovement"
              person={StudentStateCountData?.class_move || 0}
            />
          </S.MiniMenuContent>
        </S.MenuContentWrap>
      </S.MenuWrap>
    </>
  );
};

export default Menu;
