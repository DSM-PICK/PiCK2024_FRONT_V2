import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns';
import { useState } from 'react';

const useCalendar = () => {
  // 현재 날짜 상태 정의
  const [currentDate, setCurrentDate] = useState(new Date());
  // 현재 연도, 월, 일 추출
  const [currentYear, currentMonth, currentDay] = format(
    currentDate,
    'yyyy-MM-dd',
  ).split('-');
  // 선택된 날짜 상태 정의
  const [selectedDate, setSelectedDate] = useState<string>(
    format(new Date(), 'yyyy-MM-dd'),
  );

  // 현재 월의 시작 날짜와 끝 날짜 계산
  const startCurrentMonth = startOfMonth(currentDate);
  const endCurrentMonth = endOfMonth(currentDate);
  // 첫 주의 시작 날짜와 마지막 주의 끝 날짜 계산
  const startOfFirstWeek = startOfWeek(startCurrentMonth, { weekStartsOn: 0 });
  const endOfLastWeek = endOfWeek(endCurrentMonth, { weekStartsOn: 0 });

  // 해당 월의 모든 날짜 배열 생성
  const days = eachDayOfInterval({
    start: startOfFirstWeek,
    end: endOfLastWeek,
  });

  // 이전 달로 변경하는 함수
  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => subMonths(prevDate, 1));
  };

  // 다음 달로 변경하는 함수
  const handleNextMonth = () => {
    setCurrentDate((prevDate) => addMonths(prevDate, 1));
  };

  // 날짜 선택 함수
  const handleSelectDate = (date: string) => {
    setSelectedDate(date);
  };

  // 해당 월의 날짜 정보 배열 생성
  const daysInMonth = days.map((day) => ({
    date: format(day, 'yyyy-MM-dd'),
    year: format(day, 'yyyy'),
    month: format(day, 'MM'),
    day: format(day, 'dd'),
    dayIndexOfWeek: getDay(day),
  }));

  return {
    currentDate: {
      year: currentYear,
      month: currentMonth,
      day: currentDay,
    },
    daysInMonth,
    dispatch: {
      handlePrevMonth,
      handleNextMonth,
    },
    selectedDate: {
      date: selectedDate,
      selectDate: handleSelectDate,
    },
  };
};

export default useCalendar;