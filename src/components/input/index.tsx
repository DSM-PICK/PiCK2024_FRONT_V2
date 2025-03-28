import * as S from './style';
import React, { useState } from 'react';
import eyeOff from '@/assets/svg/eye.svg';
import eye from '@/assets/svg/eyesOpen.svg';

interface InputProp {
  label?: string;
  placeholder?: string;
  widthtype: 'long' | 'login';
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  value: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  password?: boolean;
  error?: boolean;
}

const Input = ({
  label,
  placeholder,
  widthtype,
  name = '',
  onChange,
  value,
  onKeyDown,
  password,
  error,
}: InputProp) => {
  const [showOpen, setShowOpen] = useState<boolean>(false);
  const [inputType, setInputType] = useState<string>('password');

  const togglePasswordVisibility = () => {
    setShowOpen(!showOpen);
    setInputType(showOpen ? 'password' : 'text');
  };

  return (
    <S.InputWrap>
      <S.inputLabel>{label}</S.inputLabel>
      <S.InputContainer type={widthtype} error={error}>
        <S.inputContent
          type={password ? inputType : 'text'}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        {password && (
          <S.Icon onClick={togglePasswordVisibility}>
            {showOpen ? (
              <img src={eye} alt="Eyes Open" />
            ) : (
              <img src={eyeOff} alt="Eyes Close" />
            )}
          </S.Icon>
        )}
      </S.InputContainer>
    </S.InputWrap>
  );
};

export default Input;
