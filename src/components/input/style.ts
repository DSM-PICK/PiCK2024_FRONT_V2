import { styled } from "styled-components";
import { theme } from "styles/theme";

export const inputContent = styled.input`
  display: flex;
  border: none;
  width: 100%;
  &::placeholder {
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
`;
export const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const inputLabel = styled.p`
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
  width: ${({ type }) => (type === "long" ? "100%" : "600px")};
  height: 48px;
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

export const SearchWidth = styled.div`
  padding: 12px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 340px;
  height: 48px;
  gap: 8px;
  border: 1px solid ${theme.color.gray[100]};
  background-color: ${theme.color.normal.white};
  border-radius: 12px;
  &:hover {
    border: 1px solid ${theme.color.main[500]};
    outline: none;
  }
`;

export const SearchInput = styled.input`
  display: flex;
  border: none;
  width: 100%;
  ::placeholder {
    font-size: ${theme.font.caption[2].size};
    color: ${theme.color.normal.white};
  }
  background-color: ${theme.color.normal.white};
  font-size: ${theme.font.caption[2].size};
  font-weight: ${theme.font.caption[2].fontweight};
  &:hover {
    outline: none;
  }
  outline: none;
  caret-color: ${theme.color.main[500]};
`;
