import React, { useState } from 'react';
import * as S from './style';

interface OutAcceptProp {
  name: string;
  date: string;
  content: string;
  onClick: () => void;
  type: 'application' | 'early-return';
  active?: boolean;
}

const OutAcceptList = ({
  name,
  date,
  content,
  onClick,
  type,
  active,
}: OutAcceptProp) => {
  return (
    <S.OutAcceptWrap type={type} draggable isActive={active!} onClick={onClick}>
      <S.OutAcceptTitle>{name}</S.OutAcceptTitle>
      <div>외출</div>
      <S.OutAcceptDate>{date}</S.OutAcceptDate>
      <S.OutAcceptContent>{content}</S.OutAcceptContent>
    </S.OutAcceptWrap>
  );
};

export default OutAcceptList;
