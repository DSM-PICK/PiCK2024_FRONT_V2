import { styled } from "styled-components";
import { theme } from "@/styles/theme";

export const LoginWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100dvh;
  padding: 0;
`;

export const LoginText = styled.p`
  font-size: ${theme.font.heading[1].size};
  font-weight: ${theme.font.heading[1].fontWeight};
  user-select: none;
`;

export const PiCKText = styled.span`
  color: ${theme.color.main[500]};
`;

export const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 40px;
`;

export const Pickman = styled.image`
  position: absolute;
  left: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  bottom: 0%;
`;
