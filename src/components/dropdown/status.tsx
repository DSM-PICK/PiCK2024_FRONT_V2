import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import arrow from '@/assets/svg/statusArrowDown.svg';
import arrowLeft from '@/assets/svg/statusArrowLeft.svg';

interface StatusDropProps {
  status: string;
  onChange: (newState: string) => Promise<void>;
  type?: 'HOMEROOM' | 'ATTENDANCE';
}

const StatusDrop = ({ status, onChange, type }: StatusDropProps) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>(status);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const homeroomStatus = ['출석', '현체', '귀가', '취업', '자퇴'];
  const attendanceStatus = ['출석', '이동', '외출', '귀가', '현체', '무단'];

  useEffect(() => {
    setSelectedOption(status);
  }, [status]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  const ChangeEn = (option: string) => {
    switch (option) {
      case '출석':
        return 'ATTENDANCE';
      case '현체':
        return 'PICNIC';
      case '귀가':
        return 'GO_HOME';
      case '취업':
        return 'EMPLOYMENT';
      case '자퇴':
        return 'DROPOUT';
      case '외출':
        return 'GO_OUT';
      case '이동':
        return 'MOVEMENT';
      case '무단':
        return 'DISALLOWED';
      default:
        return '';
    }
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onChange(ChangeEn(option));
    setIsDropdownVisible(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '출석':
        return theme.color.normal.black;
      case '현체':
        return theme.color.gray[200];
      case '귀가':
        return theme.color.gray[300];
      case '취업':
        return theme.color.main[500];
      case '자퇴':
      case '무단':
        return theme.color.error[500];
      case '외출':
      case '이동':
        return theme.color.gray[300];
      default:
        return theme.color.gray[500];
    }
  };

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownButton
        onClick={() => setIsDropdownVisible(!isDropdownVisible)}
        color={getStatusColor(selectedOption)}
      >
        {selectedOption}
        {isDropdownVisible ? (
          <img src={arrow} alt="arrow down" />
        ) : (
          <img src={arrowLeft} alt="arrow left" />
        )}
      </DropdownButton>
      {isDropdownVisible && (
        <DropdownMenu>
          {type === 'ATTENDANCE'
            ? attendanceStatus.map((item, index) => (
                <DropdownItem
                  key={`attendance-${item}-${index}`}
                  onClick={() => handleOptionClick(item)}
                >
                  {item}
                </DropdownItem>
              ))
            : homeroomStatus.map((item, index) => (
                <DropdownItem
                  key={`homeroom-${item}-${index}`}
                  onClick={() => handleOptionClick(item)}
                >
                  {item}
                </DropdownItem>
              ))}
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

export default StatusDrop;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.div<{ color: string }>`
  color: ${(props) => props.color};
  background-color: white;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 8px;
  font-size: ${theme.font.button[2].size};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

const DropdownMenu = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: white;
  box-shadow: ${theme['box-shadow']};
  border-radius: 4px;
  margin-top: 5px;
  z-index: 1;
  width: 100%;
`;

const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  font-size: ${theme.font.button[2].size};
  &:hover {
    background-color: ${theme.color.main[50]};
    border-radius: 4px;
  }
`;
