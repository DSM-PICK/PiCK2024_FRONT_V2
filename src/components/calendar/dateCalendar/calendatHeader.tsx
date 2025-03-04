import styled from 'styled-components';
import useCalendarContext from './useCalendarContext';
import PreArrow from '@/assets/svg/preArrow.svg';
import NextArrow from '@/assets/svg/nextarrow.svg';
import { theme } from '@/styles/theme';

// CalendarHeader 컴포넌트 정의
const CalendarHeader = () => {
  // CalendarContext에서 dispatch 함수와 현재 날짜 가져오기
  const { dispatch, currentDate } = useCalendarContext();

  return (
    <Container>
      <ChangeButton>
        {/* 이전 달로 변경하는 버튼 */}
        <img src={PreArrow} alt="" onClick={dispatch.handlePrevMonth} />
        {/* 현재 연도와 월을 표시 */}
        <DateTitle>
          {currentDate.year}년 {currentDate.month}월
        </DateTitle>
        {/* 다음 달로 변경하는 버튼 */}
        <img src={NextArrow} alt="" onClick={dispatch.handleNextMonth} />
      </ChangeButton>
    </Container>
  );
};

export default CalendarHeader;

// 스타일드 컴포넌트 정의
const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const DateTitle = styled.p`
  font-size: ${theme.font.label[1].size};
  font-weight: ${theme.font.label[1].fontweight};
`;

const ChangeButton = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 20px;
  font-size: 20px;
  line-height: 25.6px;
`;