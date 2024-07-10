import { Button } from "@/components/Button";
import { theme } from "@/styles/theme";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const NotFound = () => {
  const nav = useNavigate();
  return (
    <ContentWrap>
      <Title>아직 개발중인 페이지 입니다.</Title>
      <Button
        onClick={() => {
          nav(-1);
        }}
        type="main"
        size="standard"
      >
        홈으로 돌아가기
      </Button>
    </ContentWrap>
  );
};

export default NotFound;

const Title = styled.p`
  font-size: ${theme.font.heading[2].size};
  font-weight: ${theme.font.heading[2].fontweight};
`;

const ContentWrap = styled.div`
  display: flex;
  gap: 24px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100dvh;
`;
