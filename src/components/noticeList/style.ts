import styled from "styled-components";
import { theme } from "styles/theme";

export const NoticeWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 58px 28px 24px;
  cursor: pointer;
  border-bottom: 1px solid ${theme.color.gray[50]};
  font-size: ${theme.font.heading[4].size};
  font-weight: ${theme.font.heading[4].fontweight};
  &:hover {
    background-color: ${theme.color.main[50]};
  }
`;

export const NoticeLeft = styled.div`
  display: flex;
  gap: 118px;
`;

export const NoticeRight = styled.div`
  display: flex;
  gap: 70px;
`;
