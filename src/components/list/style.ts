import { styled } from 'styled-components';
import { theme } from '@/styles/theme';

interface AcceptListProp {
  isActive: boolean;
  type: 'applicationaccept' | 'early-returnaccept' | 'applicationList' | 'early-returnList';
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
    isActive && type !== 'early-returnList'
      ? theme.color.main[500]
      : theme.color.main[50]};
  cursor: pointer;
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
