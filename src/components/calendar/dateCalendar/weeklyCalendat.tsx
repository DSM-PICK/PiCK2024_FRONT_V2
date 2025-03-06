import React from 'react';
import styled from 'styled-components';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { theme } from '@/styles/theme';
import upArrow from '@/assets/svg/nextarrow.svg';
import useCalendarContext from './useCalendarContext';

interface WeeklyCalendarProps {
  selectedDate: Date;
  onBackToMonthlyClick: () => void;
  onDateSelect: (date: string) => void;
}

// WeeklyCalendar 컴포넌트 정의
const WeeklyCalendar = ({
  selectedDate,
  onBackToMonthlyClick,
  onDateSelect,
}: WeeklyCalendarProps) => {
  // CalendarContext에서 currentDate 가져오기
  const { currentDate } = useCalendarContext();
  // 주의 시작 날짜 계산
  const startDate = startOfWeek(selectedDate, { weekStartsOn: 0 });
  // 요일 배열 정의
  const weeks = ['일', '월', '화', '수', '목', '금', '토'];
  // 주의 날짜 배열 생성
  const daysOfWeek = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
  // 선택된 날짜인지 확인하는 함수
  const isSelectedDate = (date: Date) => isSameDay(date, selectedDate);

  return (
    <Container>
      {/* 월간 달력으로 돌아가는 버튼 */}
      <img src={upArrow} onClick={onBackToMonthlyClick} />

      {/* 현재 연도와 월을 표시 */}
      <DateTitle>
        {currentDate.year}년 {currentDate.month}월
      </DateTitle>
      <ContainerWrap>
        {/* 요일을 표시하는 부분 */}
        <DayWrapper>
          {weeks.map((week) => (
            <CalendarItem key={week}>{week}</CalendarItem>
          ))}
        </DayWrapper>
        {/* 날짜를 표시하는 부분 */}
        <Header>
          {daysOfWeek.map((date, index) => (
            <Day
              key={index}
              $isSelectedDate={isSelectedDate(date)}
              onClick={() => onDateSelect(date.toString())}
            >
              {format(date, 'd')}
            </Day>
          ))}
        </Header>
      </ContainerWrap>
    </Container>
  );
};

export default WeeklyCalendar;

// 스타일드 컴포넌트 정의
const DateTitle = styled.p`
  font-size: ${theme.font.label[1].size};
  font-weight: ${theme.font.label[1].fontweight};
  display: flex;
  justify-content: center;
`;

const ContainerWrap = styled.div`
  padding: 25px 0;
`;

const DayWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(50px, 1fr));
  grid-row-gap: 15px;
  height: 30px;
  border-bottom: 1px solid ${theme.color.gray[50]};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CalendarItem = styled.div`
  display: flex;
  justify-content: center;
  color: ${theme.color.normal.black};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 8px;
`;

const Day = styled.div<{ $isSelectedDate: boolean }>`
  height: 48px;
  width: 48px;
  display: flex;
  font-size: ${theme.font.caption[1].size};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 50%;
  color: ${theme.color.normal.black};
  background-color: ${({ $isSelectedDate, theme }) =>
    $isSelectedDate ? theme.color.main[50] : 'transparent'};
`;