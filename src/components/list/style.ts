import { styled } from "styled-components";
import { theme } from "styles/theme";

interface AcceptListProp {
  isActive: boolean;
}
export const OutAcceptWrap = styled.div<AcceptListProp>`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 10px;
  border-radius: 16px;
  width: calc(100% / 3.28);
  min-width: min-content;
  background-color: ${theme.color.main[50]};
  border: 2px solid
    ${({ isActive }) =>
      isActive ? theme.color.main[500] : theme.color.main[50]};
  &:hover {
    border: 2px solid ${theme.color.main[500]};
  }
`;
export const OutAcceptTitle = styled.p`
  font-size: ${theme.font.heading[3].size};
  font-weight: ${theme.font.heading[3].fontweight};
`;

export const OutAcceptDate = styled.p`
  font-size: ${theme.font.subTitle[1].size};
  font-weight: ${theme.font.subTitle[1].fontweight};
  color: ${theme.color.gray[900]};
`;

export const OutAcceptContent = styled.p`
  font-size: ${theme.font.subTitle[1].size};
`;
