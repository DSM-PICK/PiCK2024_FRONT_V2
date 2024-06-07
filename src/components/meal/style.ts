import { styled } from "styled-components";
import { theme } from "styles/theme";

export const MealInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 239px;
  padding: 24px 64px;
  height: 100%;
  gap: 24px;
  background-color: ${theme.color.main[50]};
  border-radius: 12px;
`;

export const MealTitle = styled.p`
  font-size: ${theme.font.heading[4].size};
  font-weight: ${theme.font.heading[4].fontweight};
  color: ${theme.color.main[700]};
`;

export const MealContent = styled.p`
  font-size: ${theme.font.body[2].size};
  font-weight: ${theme.font.body[2].fontweight};
  white-space: nowrap;
`;

export const MealContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;
