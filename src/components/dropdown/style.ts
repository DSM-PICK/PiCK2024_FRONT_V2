import styled from "styled-components";
import { theme } from "styles/theme";

interface DropdownClickProp {
  isActive: boolean;
}

export const DropdownClickContainer = styled.div<DropdownClickProp>`
  display: ${({ isActive }) => (isActive ? "flex" : "none")};
  position: absolute;
  flex-direction: column;
  width: 140px;
  border-radius: 12px;
  background-color: ${theme.color.normal.white};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  background-color: ${theme.color.normal.white};
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

  &:hover {
    border: 1px solid ${theme.color.main[300]};
  }
`;

export const DropdownTitle = styled.div`
  width: 140px;
  height: 49px;
  border: 2px solid ${theme.color.gray[300]};
  border-radius: 12px;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: space-around;

  color: ${theme.color.normal.black};
  font-weight: ${theme.font.button[2].fontweight};
  font-size: ${theme.font.button[2].size};

  &:hover {
    border: 2px solid ${theme.color.main[500]};
  }
`;

export const PositionDiv = styled.div`
  position: relative;
  user-select: none;
`;
