import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import arrow from '@/assets/svg/dropdownImg.svg';
import downarrow from '@/assets/svg/dropdownArrowImg2.svg';
import { ChangeState } from '@/apis/weekend-meals';

interface Option {
  value: 'OK' | 'NO';
  label: string;
}

interface Prop {
  id: string;
}

const MealDrop = ({ id }: Prop) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { mutate: Change } = ChangeState();

  const options: Option[] = [
    { value: 'OK', label: '신청' },
    { value: 'NO', label: '미신청' },
  ];

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleOptionClick = (value: 'OK' | 'NO') => {
    const option = options.find((option) => option.value === value);
    setSelectedOption(option || null);
    setDropdownVisible(false);

    Change(
      { userId: id, status: value },
      {
        onSuccess: () => {
          console.log('성공');
        },
        onError: (error) => {
          console.log(error.name);
        },
      },
    );
  };

  const title = () => (selectedOption ? selectedOption.label : '미응답');

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <DropdownTitle ref={dropdownRef} onClick={toggleDropdown}>
      {title()}
      <img
        src={isDropdownVisible ? `${downarrow}` : `${arrow}`}
        alt="arrow"
        width={16}
        height={16}
      />
      {isDropdownVisible && (
        <DropdownClickContainer>
          {options.map((option) => (
            <DropdownClick
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </DropdownClick>
          ))}
        </DropdownClickContainer>
      )}
    </DropdownTitle>
  );
};

export default MealDrop;

const DropdownClickContainer = styled.div`
  position: absolute;
  flex-direction: column;
  top: 120%;
  width: 105px;
  border-radius: 12px;
  background-color: ${theme.color.normal.white};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  z-index: 1;
`;

const DropdownClick = styled.div`
  font-weight: ${theme.font.button[2].fontweight};
  font-size: ${theme.font.button[2].size};
  color: ${theme.color.normal.black};
  padding: 14px 20px;
  box-sizing: border-box;
  border-radius: 12px;
  background-color: ${theme.color.normal.white};
  border: 1px solid ${theme.color.normal.white};

  &:hover {
    background-color: ${theme.color.main[50]};
  }
`;

const DropdownTitle = styled.div`
  position: relative;
  width: 105px;
  height: 49px;
  border: 2px solid ${theme.color.gray[300]};
  border-radius: 12px;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: space-around;

  color: ${theme.color.normal.black};
  font-weight: ${theme.font.button[2].fontweight};
  font-size: ${theme.font.button[2].size};

  &:hover {
    border: 2px solid ${theme.color.main[300]};
  }

  &:active {
    border: 2px solid ${theme.color.main[500]};
  }
`;
