import { Link } from "react-router-dom";
import styled from "styled-components";
import { theme } from "@/styles/theme";

export const MainRouterButtonContainer = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 14%;
  margin-bottom: 52px;
`;

export const MainRouterImgContainer = styled.div`
  background-color: ${theme.color.main[300]};
  width: 100px;
  height: 100px;
  border-radius: 28px;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: background-color 500ms;

  &:hover {
    background-color: ${theme.color.main[600]};
  }
`;

export const MainRouterText = styled.p`
  font-size: ${theme.font.subTitle[2].size};
  font-weight: ${theme.font.subTitle[2].fontweight};
  color: ${theme.color.normal.black};
  padding: 0;
  margin: 0;
`;

export const MainRouterFlexbox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: space-between;
`;
