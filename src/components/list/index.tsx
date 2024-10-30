import React, { useState } from 'react';
import * as S from './style';

interface OutAcceptProp {
  name: string;
  date: string;
  content: string;
  onClick: () => void;
}

const OutAcceptList = ({ name, date, content, onClick }: OutAcceptProp) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleClick = () => {
    setIsActive(!isActive);
    onClick();
  };
  return (
    <S.OutAcceptWrap draggable isActive={isActive} onClick={handleClick}>
      <S.OutAcceptTitle>{name}</S.OutAcceptTitle>
      <div>외출</div>
      <S.OutAcceptDate>{date}</S.OutAcceptDate>
      <S.OutAcceptContent>{content}</S.OutAcceptContent>
    </S.OutAcceptWrap>
  );
};

export default OutAcceptList;
