import { createContext, useContext } from 'react';

// 날짜 정보 인터페이스 정의
interface DateInfo {
  year: string;
  month: string;
  day: string;
}

// CalendarContext의 타입 정의
interface CalendarContextType {
  currentDate: DateInfo; // 현재 날짜 정보
  daysInMonth: (DateInfo & { date: string; dayIndexOfWeek: number })[]; // 해당 월의 날짜 정보 배열
  dispatch: {
    handlePrevMonth: () => void; // 이전 달로 변경하는 함수
    handleNextMonth: () => void; // 다음 달로 변경하는 함수
  };
  selectedDate: {
    date: string; // 선택된 날짜
    selectDate: (date: string) => void; // 날짜 선택 함수
  };
}

// CalendarContext 생성
export const CalendarContext = createContext<CalendarContextType | null>(null);

// useCalendarContext 훅 정의
export default function useCalendarContext() {
  // CalendarContext 사용
  const context = useContext(CalendarContext);
  // CalendarContext가 없을 경우 에러 발생
  if (!context) {
    throw new Error('useCalendarContext must be used within CalendarProvider');
  }
  return context;
}