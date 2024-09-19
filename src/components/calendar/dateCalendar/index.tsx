import { ReactNode } from 'react';
import styled from 'styled-components';

import { CalendarContext } from './useCalendarContext';
import CalendarHeader from './calendatHeader';
import CalendarBody from './calendarBody';
import useCalendar from '@/hook/useCalendar';
import SelectedDate from './selecteDate';

const CalendarRoot = ({ children }: { children: ReactNode }) => {
  const calendar = useCalendar();
  return (
    <CalendarContext.Provider value={calendar}>
      <Container>{children}</Container>
    </CalendarContext.Provider>
  );
};

const DateCalendar = Object.assign(CalendarRoot, {
  Header: CalendarHeader,
  Body: CalendarBody,
  Footer: SelectedDate,
});

export default DateCalendar;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: absolute;
`;
