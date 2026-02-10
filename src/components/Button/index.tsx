import React, { useRef } from 'react';
import * as S from './style';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  type: 'main' | 'error' | 'black' | 'error2';
  size: 'standard' | 'small';
  disabled?: boolean;
}

export const Button = ({
  children,
  onClick,
  type,
  size,
  disabled,
}: ButtonProps) => {
  const lockRef = useRef(false);

  const handleClick = () => {
    if (disabled) return;
    if (lockRef.current) return;

    lockRef.current = true;
    onClick();

    setTimeout(() => {
      lockRef.current = false;
    }, 700);
  };

  return (
    <S.Button onClick={handleClick} type={type} size={size} disabled={disabled}>
      {children}
    </S.Button>
  );
};
