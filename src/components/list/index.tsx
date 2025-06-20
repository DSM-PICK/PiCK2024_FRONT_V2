import React, { useState } from 'react';
import * as S from './style';

interface OutAcceptProp {
  name: string;
  date: string;
  content: string;
  onClick: () => void;
  type:
    | 'applicationaccept'
    | 'early-returnaccept'
    | 'applicationList'
    | 'early-returnList';
  active?: boolean;
}

/**
 * 외출자 목록 컴포넌트
 * @param {string} name - 학생 이름
 * @param {string} date - 외출 날짜
 * @param {string} content - 외출 사유
 * @param {function} onClick - 클릭 이벤트 핸들러
 * @param {string} type - 외출자 목록 타입
 * @param {boolean} active - 선택 여부
 * @returns {JSX.Element} 외출자 목록 컴포넌트
 * @example
 * <OutAcceptList
 *   name="홍길동"
 *   date="2023-10-01"
 *   content="병원"
 *   onClick={() => console.log('clicked')}
 *   type="applicationaccept"
 *   active={true}
 * />
 */
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
      <p>
        {type === 'early-returnList' || type === 'early-returnaccept'
          ? '조기귀가'
          : '외출'}
      </p>
      <S.OutAcceptDate>{date}</S.OutAcceptDate>
      <S.OutAcceptContent>{content}</S.OutAcceptContent>
    </S.OutAcceptWrap>
  );
};

export default OutAcceptList;
