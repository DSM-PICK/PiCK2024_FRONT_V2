import { styled } from "styled-components";
import { theme } from "styles/theme";

export const inputContent = styled.input`
  display: flex;
  border: none;
  width: 100%;
  ::placeholder {
    font-size: ${theme.font.caption[1].size};
    color: ${theme.color.gray[300]};
  }
  background-color: ${theme.color.gray[50]};
  font-size: ${theme.font.caption[1].size};
  font-weight: ${theme.font.caption[1].fontweight};
  &:hover {
    outline: none;
  }
  outline: none;
  caret-color: ${theme.color.main[500]};
  margin: 0;
`;
export const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const inputLabel = styled.p`
  margin: 0;
  font-size: ${theme.font.label[1].size};
  font-weight: ${theme.font.label[1].fontweight};
`;

export const InputContainer = styled.div<{
  type: "long" | "login" | "password";
}>`
  padding: 12px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ type }) => (type === "long" ? "76%" : "32%")};
  background-color: ${theme.color.gray[50]};
  border-radius: 12px;
  &:hover {
    border: 1px solid ${theme.color.main[500]};
    outline: none;
  }
  box-sizing: border-box;
`;

export const Icon = styled.div`
  width: 24px;
  height: 24px;
`;
