import { styled } from 'styled-components';
import { theme } from '@/styles/theme';

export const LayoutStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 32px 240px;
  margin-bottom: 200px;
`;

export const Nav = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const NowText = styled.p`
  display: flex;
  gap: 12px;
  color: ${theme.color.gray[900]};
  font-size: ${theme.font.subTitle[1].size};
  font-weight: ${theme.font.subTitle[1].fontweight};
`;

export const TitleText = styled.p`
  font-size: ${theme.font.heading[1].size};
  font-weight: ${theme.font.heading[1].fontWeight};
`;

export const Line = styled.div`
  width: 100%;
  border: 0.5px solid ${theme.color.gray[200]};
`;

export const Right = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
`;

export const Date = styled.p`
  font-size: ${theme.font.heading[2].size};
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
