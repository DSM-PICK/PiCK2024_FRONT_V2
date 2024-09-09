import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const OutListWarp = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SemiTitle = styled.p`
  font-size: ${theme.font.heading[3].size};
  color: ${theme.color.gray[600]};
`;

export const OutListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  row-gap: 40px;
  column-gap: 60px;
`;
