import * as S from "./style";
import React from "react";
import search from "assets/svg/search.svg";

interface ChangeProps {
  text: string;
  name: string;
}

interface InputProp {
  label?: string;
  placeholder?: string;
  onChange: ({ text, name }: ChangeProps) => void;
  name?: string;
  value: string;
  password?: boolean;
}

const SearchInput = ({
  label,
  placeholder,
  name = "",
  onChange,
  value,
}: InputProp) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ text: e.target.value, name: e.target.name });
  };

  return (
    <S.InputWrap>
      {label && <S.inputLabel>{label}</S.inputLabel>}
      <S.SearchWidth>
        <img src={search} alt="Icon" />
        <S.SearchInput
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={handleChange}
        />
      </S.SearchWidth>
    </S.InputWrap>
  );
};

export default SearchInput;
