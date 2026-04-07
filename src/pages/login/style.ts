import { styled } from 'styled-components';
import { theme } from '@/styles/theme';
import { Link } from 'react-router-dom';

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

export const Error = styled.p`
  color: ${theme.color.error[500]};
`;

export const BottomBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const LinkText = styled(Link)`
  margin-left: 2px;
  font-size: ${theme.font.caption[2].size};
  font-weight: ${theme.font.caption[2].fontweight};
  color: ${theme.color.main[500]};
  text-decoration: none;
  &:hover {
    color: ${theme.color.main[900]};
    text-decoration: underline;
  }
  &:focus-visible {
    outline: 2px solid ${theme.color.main[500]};
    outline-offset: 2px;
    text-decoration: underline;
  }
`;

export const LinkBox = styled.div`
  display: flex;
  flex-direction: column;
`;
