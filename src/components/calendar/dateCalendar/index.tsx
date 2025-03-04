import { ReactNode } from 'react';
import styled from 'styled-components';

import { CalendarContext } from './useCalendarContext';
import CalendarHeader from './calendatHeader';
import CalendarBody from './calendarBody';
import useCalendar from '@/hook/useCalendar';
import SelectedDate from './selecteDate';

// CalendarRoot 컴포넌트 정의
const CalendarRoot = ({ children }: { children: ReactNode }) => {
  // useCalendar 훅을 사용하여 calendar 값 가져오기
  const calendar = useCalendar();
  return (
    // CalendarContext.Provider로 calendar 값을 전달
    <CalendarContext.Provider value={calendar}>
      <Container>{children}</Container>
    </CalendarContext.Provider>
  );
};

// DateCalendar 컴포넌트 정의 및 CalendarRoot에 Header, Body, Footer 속성 추가
const DateCalendar = Object.assign(CalendarRoot, {
  Header: CalendarHeader,
  Body: CalendarBody,
  Footer: SelectedDate,
});

export default DateCalendar;

// 스타일드 컴포넌트 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: absolute;
`;