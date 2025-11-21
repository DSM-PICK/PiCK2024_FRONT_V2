import { styled } from 'styled-components';
import { theme } from '@/styles/theme';

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100dvh;
`;

export const Heading = styled.p`
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
  padding-bottom: 20px;
`;

export const Error = styled.div`
  color: ${theme.color.error[500]};
  font-size: ${theme.font.label[1].size};
  font-weight: ${theme.font.label[1].fontweight};
`;

export const SectionWrap = styled.div`
  height: 130px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
