import styled from 'styled-components';
import { theme } from '@/styles/theme';

interface DropdownClickProp {
  isActive: boolean;
}

export const DropdownClickContainer = styled.div<DropdownClickProp>`
  display: ${({ isActive }) => (isActive ? 'flex' : 'none')};
  position: absolute;
  flex-direction: column;
  top: 120%;
  width: 100%;
  max-height: 250px;
  overflow-y: auto;
  border-radius: 12px;
  background-color: ${theme.color.normal.white};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  background-color: ${theme.color.normal.white};
  z-index: 1;
`;

export const DropdownClick = styled.div<DropdownClickProp>`
  font-weight: ${theme.font.button[2].fontweight};
  font-size: ${theme.font.button[2].size};
  color: ${theme.color.normal.black};
  padding: 14px 20px;
  box-sizing: border-box;
  border-radius: 12px;
  background-color: ${theme.color.normal.white};
  border: 1px solid ${theme.color.normal.white};
  width: 100%;

  &:hover {
    background-color: ${theme.color.main[50]};
  }
`;

export const DropdownTitle = styled.div`
  position: relative;
  min-width: 140px;
  height: 49px;
  border: 2px solid ${theme.color.gray[300]};
  border-radius: 12px;
  box-sizing: border-box;
  padding: 0 8px;
  gap: 12px;

  display: flex;
  align-items: center;
  justify-content: space-around;

  color: ${theme.color.normal.black};
  font-weight: ${theme.font.button[2].fontweight};
  font-size: ${theme.font.button[2].size};

  &:hover {
    border: 2px solid ${theme.color.main[300]};
  }

  &:active {
    border: 2px solid ${theme.color.main[500]};
  }
`;
