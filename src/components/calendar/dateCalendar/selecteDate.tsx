import useCalendarContext from './useCalendarContext';

// SelectedDate 컴포넌트 정의
const SelectedDate = () => {
  // CalendarContext에서 selectedDate 가져오기
  const { selectedDate } = useCalendarContext();
  return <div>{selectedDate.date}</div>;
};

export default SelectedDate;