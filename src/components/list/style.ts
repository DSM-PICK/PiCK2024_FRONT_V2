import { styled } from 'styled-components';
import { theme } from '@/styles/theme';

interface AcceptListProp {
  isActive: boolean;
  type: 'application' | 'early-return';
}
export const OutAcceptWrap = styled.div<AcceptListProp>`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 10px;
  border-radius: 16px;
  min-width: min-content;
  background-color: ${theme.color.main[50]};
  border: 2px solid
    ${({ isActive, type }) =>
      isActive && type === 'application'
        ? theme.color.main[500]
        : theme.color.main[50]};
  &:hover {
    border: 2px solid
      ${({ type }) =>
        type === 'application' ? theme.color.main[500] : 'transparent'};
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
