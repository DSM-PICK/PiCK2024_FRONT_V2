import { theme } from "@/styles/theme";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

interface StoryProp {
  name: string;
  earlyreturn: number;
  application: number;
  id: string;
}

const StoryList = ({ name, earlyreturn, application, id }: StoryProp) => {
  const nav = useNavigate();
  return (
    <ListWrap
      onClick={() => {
        nav(`/previousList/${id}`);
      }}
    >
      <NameTitle>{name}</NameTitle>
      <ContentWrap>
        <CountWrap>
          <EarlyTitle>조기귀가</EarlyTitle>
          <CountTitle>{earlyreturn}회</CountTitle>
        </CountWrap>
        <CountWrap>
          <ApplicationTitle>외출</ApplicationTitle>
          <CountTitle>{application}회</CountTitle>
        </CountWrap>
      </ContentWrap>
    </ListWrap>
  );
};

export default StoryList;

const NameTitle = styled.p`
  font-size: ${theme.font.heading[4].size};
  margin-bottom: 12px;
`;

const ListWrap = styled.div`
  width: 280px;
  background-color: ${theme.color.main[50]};
  padding: 16px;
  border-radius: 12px;
`;

const CountWrap = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const ContentWrap = styled.div`
  display: flex;
  gap: 12px;
`;

const CountTitle = styled.p`
  font-size: ${theme.font.subTitle[1].size};
`;

const EarlyTitle = styled.p`
  color: ${theme.color.normal.white};
  background-color: ${theme.color.main[800]};
  text-align: center;
  font-size: ${theme.font.subTitle[3].size};
  padding: 8px 18px;
  border-radius: 12px;
`;

const ApplicationTitle = styled.p`
  color: ${theme.color.normal.white};
  background-color: ${theme.color.main[300]};
  text-align: center;
  font-size: ${theme.font.subTitle[3].size};
  padding: 8px 18px;
  border-radius: 12px;
`;
