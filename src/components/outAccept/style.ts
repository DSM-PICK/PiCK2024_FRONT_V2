import { styled } from "styled-components";
import { theme } from "styles/theme";

export const OutAcceptWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 10px;
  border-radius: 16px;
  width: calc(100% / 3.28);
  height: 164px;
  background-color: ${theme.color.main[50]};
  border: 2px solid ${theme.color.main[50]};
  &:hover {
    border: 2px solid ${theme.color.main[500]};
  }
`;
