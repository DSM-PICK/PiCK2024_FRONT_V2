import { styled } from 'styled-components';
import { theme } from '@/styles/theme';

export const FloorText = styled.p`
  font-size: ${theme.font.heading[4].size};
  font-weight: ${theme.font.heading[4].fontweight};
  color: ${theme.color.main[600]};
`;

export const TeacherNameText = styled.p`
  font-size: ${theme.font.heading[4].size};
  font-weight: ${theme.font.heading[4].fontweight};
`;

export const TextWrap = styled.div`
  display: flex;
  width: 100%;
  gap: 44px;
`;
