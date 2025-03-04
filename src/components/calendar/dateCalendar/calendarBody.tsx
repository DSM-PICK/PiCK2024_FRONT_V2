import React from 'react';
import styled from 'styled-components';
import useCalendarContext from './useCalendarContext';
import { theme } from '@/styles/theme';
import { useSwipeable } from 'react-swipeable';

// CalendarBody 컴포넌트의 props 인터페이스 정의
interface CalendarBodyProp {
  onClickDate: (date: string) => void;
}

// CalendarBody 컴포넌트 정의
const CalendarBody = ({ onClickDate }: CalendarBodyProp) => {
  // CalendarContext에서 dispatch 함수 가져오기
  const { dispatch } = useCalendarContext();
  // 요일 배열 정의
  const weeks = ['일', '월', '화', '수', '목', '금', '토'];
  // CalendarContext에서 필요한 값들 가져오기
  const { daysInMonth, selectedDate, currentDate } = useCalendarContext();

  // 다음 달로 변경하는 함수
  const handleChangeMonth = () => {
    dispatch.handleNextMonth();
  };

  // 이전 달로 변경하는 함수
  const handleChangePreMonth = () => {
    dispatch.handlePrevMonth();
  };

  // 스와이프 핸들러 정의
  const handlers = useSwipeable({
    onSwipedLeft: handleChangeMonth,
    onSwipedRight: handleChangePreMonth,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    // 스와이프 핸들러를 Container에 적용
    <Container {...handlers}>
      {/* 요일을 표시하는 부분 */}
      <DayWrapper>
        {weeks.map((week) => (
          <CalendarItem key={week}>{week}</CalendarItem>
        ))}
      </DayWrapper>
      {/* 날짜를 표시하는 부분 */}
      <DayWrapper>
        {daysInMonth.map((date) => (
          <Day
            onClick={() => onClickDate(date.date)}
            $isCurrentMonth={currentDate.month === date.month}
            $isSelectedDate={selectedDate.date === date.date}
            className={date.month}
            key={date.date}
          >
            <span>{date.day}</span>
          </Day>
        ))}
      </DayWrapper>
    </Container>
  );
};

export default CalendarBody;

// 스타일드 컴포넌트 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: white;
  padding-top: 25px;
  border-radius: 20px;
`;

const DayWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(50px, 1fr));
`;

const CalendarItem = styled.div`
  display: flex;
  justify-content: center;
  color: ${theme.color.normal.black};
`;

const Day = styled.div<{ $isCurrentMonth?: boolean; $isSelectedDate: boolean }>`
  padding: 10px;
  height: 50px;
  display: flex;
  font-size: ${theme.font.caption[1].size};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 50%;
  color: ${({ $isCurrentMonth }) =>
    !$isCurrentMonth ? theme.color.gray[300] : theme.color.normal.black};
  background-color: ${({ $isSelectedDate, theme }) =>
    $isSelectedDate ? theme.color.main[50] : 'transparent'};
`;