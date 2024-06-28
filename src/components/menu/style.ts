import { styled } from "styled-components";
import { theme } from "@/styles/theme";

export const MenuWrap = styled.div`
  position: absolute;
  width: min-content;
  display: flex;
  flex-direction: column;
  padding: 48px 38px;
  overflow-y: scroll;
  height: 100dvh;
  top: 0;
  right: 0;
  background-color: ${theme.color.normal.white};
  z-index: 1;
`;

export const MenuContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
`;

export const MealWrap = styled.div`
  display: flex;
  gap: 28px;
  justify-content: center;
  align-items: center;
`;

export const MiniMenuContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const MenuText = styled.p`
  color: ${theme.color.gray[400]};
  font-size: ${theme.font.heading[4].size};
  font-weight: ${theme.font.heading[4].fontweight};
`;

export const Menu = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${theme.color.normal.black};
  opacity: 0.5;
  top: 0;
`;

export const SelfStudyListWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  gap: 10px;
  border-radius: 12px;
  background-color: ${theme.color.main[50]};
`;

export const CloseIcon = styled.img`
  margin-bottom: 36px;
`;
