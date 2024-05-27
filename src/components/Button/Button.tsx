import React from "react";
import * as S from "./style";

interface buttonProp {
  onClick: () => void;
  children: React.ReactNode;
  type: "main" | "error" | "black" | "error2";
  size: "standard" | "small";
  disabled?: boolean;
}

export const Button = ({
  children,
  onClick,
  type,
  size,
  disabled,
}: buttonProp) => {
  return (
    <S.Button onClick={onClick} type={type} size={size} disabled={disabled}>
      {children}
    </S.Button>
  );
};
