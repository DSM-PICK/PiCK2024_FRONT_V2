import styled, { css } from "styled-components";
import { theme } from "../../styles/theme";

interface ButtonProps {
  type: "main" | "error" | "black" | "error2";
  size: "standard" | "small";
  disabled: boolean;
}

const sizeVariants = {
  standard: {
    width: "180px",
    height: "54px",
    fontSize: theme.font.button[1].size,
    fontWeight: theme.font.button[1].fontweight,
  },
  small: {
    width: "98px",
    height: "48px",
    fontSize: theme.font.button[2].size,
    fontWeight: theme.font.button[2].fontweight,
  },
};

const typeVariants = {
  main: {
    backgroundColor: theme.color.main[500],
    color: theme.color.normal.white,
    hover: {
      backgroundColor: theme.color.main[300],
    },
    pressed: {
      backgroundColor: theme.color.main[800],
    },
    disabled: {
      backgroundColor: theme.color.main[50],
    },
    border: "1px solid transparent",
  },
  error: {
    backgroundColor: theme.color.error[500],
    color: theme.color.normal.white,
    hover: {
      backgroundColor: theme.color.error[300],
    },
    pressed: {
      backgroundColor: theme.color.error[800],
    },
    disabled: {
      backgroundColor: theme.color.error[50],
    },
    border: "1px solid transparent",
  },
  black: {
    backgroundColor: theme.color.gray[50],
    color: theme.color.normal.black,
    hover: {
      backgroundColor: theme.color.gray[50],
    },
    pressed: {
      backgroundColor: theme.color.gray[50],
    },
    border: "1px solid black",
  },
  error2: {
    backgroundColor: theme.color.gray[50],
    color: theme.color.error,
    hover: {
      backgroundColor: theme.color.gray,
    },
    pressed: {
      backgroundColor: theme.color.gray,
    },
    border: "1px solid red",
  },
};

export const Button = styled.button<ButtonProps>`
  ${({ type }) => {
    const { backgroundColor, color, hover, pressed, border } =
      typeVariants[type];
    return css`
      background-color: ${backgroundColor};
      color: ${color};
      border: none;
      &:hover {
        ${hover &&
        css`
          background-color: ${hover.backgroundColor};
          border: ${border};
        `}
      }
      &:active {
        ${pressed &&
        css`
          background-color: ${pressed.backgroundColor};
          border: ${border};
        `}
      }
    `;
  }}
  ${({ size }) => sizeVariants[size]};
  border-radius: 12px;
  border: none;
`;
