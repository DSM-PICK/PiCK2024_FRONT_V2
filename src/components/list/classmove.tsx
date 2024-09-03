import { styled } from 'styled-components';
import { theme } from '@/styles/theme';
import NextArrow from '@/assets/svg/nextarrow.svg';
import { useState } from 'react';

interface ClassMoveListProp {
  name: string;
  preClass: string;
  nextClass: string;
  moveTime: string;
  onClick: () => void;
}

export const ClassMoveList = ({
  name,
  preClass,
  nextClass,
  moveTime,
  onClick,
}: ClassMoveListProp) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleClick = () => {
    setIsActive(!isActive);
    onClick();
  };

  return (
    <MoveContentWrap onClick={handleClick} isActive={isActive}>
      <Name>{name}</Name>
      <ClassRoomWrap>
        <PreClass>{preClass}</PreClass>
        <img src={NextArrow} alt="" />
        <NextClass>{nextClass}</NextClass>
      </ClassRoomWrap>
      <MoveTime>{moveTime}</MoveTime>
    </MoveContentWrap>
  );
};

const MoveContentWrap = styled.div<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px 20px;

  background-color: ${theme.color.main[50]};
  border-radius: 16px;
  &:hover {
    border: 2px solid ${theme.color.main[500]};
  }
  border: 2px solid
    ${({ isActive }) =>
      isActive ? theme.color.main[500] : theme.color.main[50]};
`;

const ClassRoomWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Name = styled.p`
  font-size: ${theme.font.heading[4].size};
  font-weight: ${theme.font.heading[4].fontweight};
`;

const PreClass = styled.p`
  font-size: ${theme.font.subTitle[1].size};
`;

const NextClass = styled.p`
  font-size: ${theme.font.subTitle[1].size};
  font-weight: ${theme.font.subTitle[1].fontweight};
  background-color: ${theme.color.main[200]};
  border-radius: 20px;
  padding: 8px;
`;

const MoveTime = styled.p`
  font-size: ${theme.font.subTitle[3].size};
  color: ${theme.color.gray[900]};
`;
