import { MonthScheduleData } from '@/apis/schedule/type';
import { dataType } from '@/apis/type';
import { theme } from '@/styles/theme';
import { useMemo, useState } from 'react';
import { styled } from 'styled-components';

interface CalendarProp {
  data: MonthScheduleData[] | dataType[];
}

export const ReCalendar = ({ data }: CalendarProp) => {
  const today = useMemo(() => {
    const now = new Date();
    return {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      date: now.getDate(),
    };
  }, []);

  const [selectedDate, setSelectedDate] = useState(today);

  const weekDays = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ];

  const firstDayOfMonth = useMemo(() => {
    return new Date(selectedDate.year, selectedDate.month - 1, 1).getDay();
  }, [selectedDate]);

  const daysInMonth = useMemo(() => {
    return new Date(selectedDate.year, selectedDate.month, 0).getDate();
  }, [selectedDate]);

  const days = useMemo(() => {
    const daysArray = [];
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }
    return daysArray;
  }, [daysInMonth]);

  return (
    <CalendarContainer>
      <Week>
        {weekDays.map((day, index) => (
          <WeekText key={index}>{day}</WeekText>
        ))}
      </Week>
      <DayWrap>
        {days.map((day, index) => {
          const filteredEvents = data?.filter(
            (event: MonthScheduleData | dataType) => {
              if ('day' in event) {
                return event.day === day;
              } else if ('date' in event) {
                const eventDate = new Date(event.date);
                return (
                  eventDate.getFullYear() === selectedDate.year &&
                  eventDate.getMonth() + 1 === selectedDate.month &&
                  eventDate.getDate() === day
                );
              }
              return false;
            },
          );

          return (
            <Day key={index}>
              <DayNumber>{day}</DayNumber>
              {filteredEvents?.map((event, idx) => (
                <Event key={idx}>{event.event_name || event.teacher}</Event>
              ))}
            </Day>
          );
        })}
      </DayWrap>
    </CalendarContainer>
  );
};

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

const DayWrap = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(7, 1fr);
`;

const Week = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(7, 1fr);
`;

const WeekText = styled.p`
  font-size: ${theme.font.heading[3].size};
  font-weight: ${theme.font.heading[3].fontweight};
  text-align: center;
  border: 1px solid ${theme.color.gray[100]};
`;

const Day = styled.div`
  border: 1px solid ${theme.color.gray[100]};
  padding: 8px;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DayNumber = styled.p`
  font-size: ${theme.font.heading[4].size};
  font-weight: ${theme.font.heading[4].fontweight};
`;

const Event = styled.p`
  font-size: ${theme.font.body[2].size};
  color: ${theme.color.main[500]};
`;
