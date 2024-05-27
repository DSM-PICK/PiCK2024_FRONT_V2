import { styled } from "styled-components";
import { theme } from "styles/theme";

export const helpMenuContent = styled.div`
  padding: 16px 24px;
  display: flex;
  gap: 34px;
  font-size: ${theme.font.body[2].size};
  font-weight: ${theme.font.body[2].fontweight};
  color: ${theme.color.normal.black};
  cursor: pointer;
`;

export const TestTitle = styled.div`
  width: max-content;
  padding: 14px 24px;
  display: flex;
  font-size: ${theme.font.body[2].size};
  font-weight: ${theme.font.body[2].fontweight};
  color: ${theme.color.gray[400]};
`;

export const AlarmWrap = styled.div`
  position: absolute;
  width: 400px;
  border-radius: 12px;
  background-color: ${theme.color.normal.white};
  border: 1px solid ${theme.color.gray[50]};
`;
