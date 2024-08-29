import { theme } from '@/styles/theme';
import styled from 'styled-components';
import MealDrop from '../dropdown/mealStatus';

interface ListProp {
  number: string;
  name: string;
  status: 'OK' | 'NO' | 'QUIET';
  id: string;
  grade: boolean;
}

interface BadgeProps {
  status: 'OK' | 'NO';
}

const WeekEndList = ({ number, name, status, id, grade }: ListProp) => {
  const StatusChange = () => {
    switch (status) {
      case 'NO':
        return '미신청';
      case 'OK':
        return '신청';
      case 'QUIET':
        return '미응답';
    }
  };
  return (
    <ContentWrap type={grade}>
      <Title>{number}</Title>
      <Title>{name}</Title>
      {status !== 'QUIET' && <Option status={status}>{StatusChange()}</Option>}
      {status === 'QUIET' && <MealDrop id={id} />}
    </ContentWrap>
  );
};

export default WeekEndList;

const ContentWrap = styled.div<{ type: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ type }) => (type ? '16px 40px' : '20px 20%')};
  border-bottom: 1px solid ${theme.color.gray[50]};
`;

const Title = styled.p`
  font-size: ${theme.font.heading[3].size};
`;

const Option = styled.div<BadgeProps>`
  background-color: ${({ status, theme }) =>
    status === 'OK' ? theme.color.main[500] : theme.color.main[300]};
  padding: 8px 20px;
  border-radius: 12px;
  color: ${theme.color.normal.white};
`;
