import styled, { css } from "styled-components";
import { theme } from "../../styles/theme";

interface ButtonProps {
  type: "main" | "error" | "black" | "error2";
  size: "standard" | "small";
  disabled?: boolean;
}

const sizeVariants = {
  standard: css`
    width: 180px;
    height: 54px;
    font-size: ${theme.font.button[1].size};
    font-weight: ${theme.font.button[1].fontweight};
  `,
  small: css`
    padding: 14px 20px;
    font-size: ${theme.font.button[2].size};
    font-weight: ${theme.font.button[2].fontweight};
  `,
};

const typeVariants = {
  main: css`
    background-color: ${theme.color.main[500]};
    color: ${theme.color.normal.white};
    &:hover {
      background-color: ${theme.color.main[300]};
    }
    &:active {
      background-color: ${theme.color.main[800]};
    }
    &:disabled {
      background-color: ${theme.color.main[50]};
    }
  `,
  error: css`
    background-color: ${theme.color.error[500]};
    color: ${theme.color.normal.white};
    &:hover {
      background-color: ${theme.color.error[300]};
    }
    &:active {
      background-color: ${theme.color.error[800]};
    }
    &:disabled {
      background-color: ${theme.color.error[50]};
    }
  `,
  black: css`
    background-color: ${theme.color.gray[50]};
    color: ${theme.color.normal.black};
    &:hover {
      border: 1px solid ${theme.color.normal.black};
    }
    &:active {
      background-color: ${theme.color.gray[50]};
    }
    &:disabled {
      background-color: ${theme.color.gray[200]};
    }
  `,
  error2: css`
    background-color: ${theme.color.gray[50]};
    color: ${theme.color.error[500]};
    &:hover {
      border: 1px solid ${theme.color.error[500]};
    }
    &:active {
      background-color: ${theme.color.gray};
    }
    &:disabled {
      background-color: ${theme.color.gray[200]};
    }
  `,
};

export const Button = styled.button<ButtonProps>`
  ${({ size }) => sizeVariants[size]}
  ${({ type }) => typeVariants[type]}
  border-radius: 12px;
  border: none;
`;
