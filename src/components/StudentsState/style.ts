import styled from "styled-components";
import { theme } from "../../styles/theme";
import { Link } from "react-router-dom";

export const StudentsStateContainer = styled.div`
  width: 100%;
  height: 182px;
  border-radius: 12px;
  background-color: ${theme.color.main[50]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 28px 26px;
  box-sizing: border-box;
`;

export const StudentsStateText = styled.p`
  color: ${theme.color.normal.black};
  font-size: ${theme.font.heading[4].size};
  font-weight: ${theme.font.heading[4].fontweight};
  text-align: center;
  white-space: nowrap;
`;

export const StudentsStatePointText = styled.span`
  color: ${theme.color.main[700]};
  font-size: 20px;
  font-weight: 600;
`;

export const StudentsStateButton = styled(Link)`
  width: 100%;
  height: 38px;
  border-radius: 8px;
  background-color: ${theme.color.main[700]};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${theme.color.normal.white};
  text-decoration: none;

  &:hover {
    background-color: ${theme.color.main[300]};
  }
  &:active {
    background-color: ${theme.color.main[800]};
  }
`;

export const StudentsStateFlexbox = styled.div`
  height: 100%;
  width: 60%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const StudentsStateImg = styled.img`
  height: 100%;
`;
