import React, { useEffect, useState, useRef } from 'react';
import arrow from '@/assets/svg/dropdownImg.svg';
import downarrow from '@/assets/svg/dropdownArrowImg2.svg';
import * as S from './style';

interface Option {
  label: string;
  value: string | number;
}

interface DropdownProp {
  options: Option[];
  value: number | string;
  changeHandler: (value: string | number) => void;
}

export const Dropdown = ({ options, value, changeHandler }: DropdownProp) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: Option, event: React.MouseEvent) => {
    event.stopPropagation();
    changeHandler(option.value);
    setIsDropdownVisible(false);
  };

  const selectedLabel =
    options.find((option) => option.value === value)?.label || 'Select';

  return (
    <S.DropdownTitle ref={dropdownRef} onClick={toggleDropdown}>
      {selectedLabel}
      <img
        src={isDropdownVisible ? downarrow : arrow}
        alt="arrow"
        width={16}
        height={16}
      />
      {isDropdownVisible && (
        <S.DropdownClickContainer isActive={true}>
          {options.map((option) => (
            <S.DropdownClick
              key={option.value}
              onClick={(event) => handleOptionClick(option, event)}
              isActive={false}
            >
              {option.label}
            </S.DropdownClick>
          ))}
        </S.DropdownClickContainer>
      )}
    </S.DropdownTitle>
  );
};
