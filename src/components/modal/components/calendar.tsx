import styled from 'styled-components';
import DateCalendar from '@/components/calendar/dateCalendar';

interface Props {
  onClickDate: (date: string) => void;
}

const CalendarComponents = ({ onClickDate }: Props) => {
  return (
    <Container>
      <DateCalendar.Header />
      <DateCalendar.Body onClickDate={onClickDate} />
    </Container>
  );
};

const WrappedCalendarComponents = ({ onClickDate }: Props) => (
  <DateCalendar>
    <CalendarComponents onClickDate={onClickDate} />
  </DateCalendar>
);

export default WrappedCalendarComponents;

const Container = styled.div`
  height: fit-content;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: #fff;
  padding: 40px 20px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
`;
