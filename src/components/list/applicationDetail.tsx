import { theme } from '@/styles/theme';
import { styled } from 'styled-components';

interface ApplicationProp {
  reason: string;
  start_time: string;
  end_time: string;
  date: string;
  type: 'APPLICATION' | 'EARLY_RETURN';
}

const ApplicationDetail = ({
  reason,
  start_time,
  end_time,
  date,
  type,
}: ApplicationProp) => {
  return (
    <Content>
      <TopTitle>
        <Bedge>{type === 'APPLICATION' ? '외출' : '조기귀가'}</Bedge>
        <Date>{date}</Date>
        <Time>
          {start_time} ~ {end_time}
        </Time>
      </TopTitle>
      <ContentText>{reason}</ContentText>
    </Content>
  );
};

export default ApplicationDetail;

const Content = styled.div`
  min-width: 100%;
  white-space: nowrap;
  background-color: ${theme.color.main[50]};
  padding: 20px 20px 60px 20px;
  border-radius: 16px;
`;

const ContentText = styled.p`
  font-size: ${theme.font.subTitle[1].size};
`;

const TopTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 16px;
`;

const Date = styled.p`
  font-size: ${theme.font.heading[3].size};
`;

const Time = styled.p`
  font-size: ${theme.font.subTitle[1].size};
  color: ${theme.color.gray[900]};
  white-space: normal;
`;

const Bedge = styled.div`
  background-color: ${theme.color.main[500]};
  padding: 8px 18px;
  color: ${theme.color.normal.white};
  text-align: center;
  font-size: ${theme.font.button[2].size};
  border-radius: 12px;
`;
