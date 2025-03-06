import { styled } from 'styled-components';
import { Button } from '.';
import React from 'react';

interface BottomProp {
  children: React.ReactNode;
}

// 하단 버튼 컴포넌트
const BottomButtonWrap = ({ children }: BottomProp) => {
  return <BottomButton>{children}</BottomButton>;
};

export default BottomButtonWrap;

export const BottomButton = styled.div`
  display: flex;
  position: fixed;
  left: 0;
  width: 100%;
  bottom: 0;
  padding: 60px 240px;
  justify-content: end;
  gap: 32px;
  background-image: linear-gradient(
    0deg,
    rgb(255, 255, 255) 20%,
    transparent 400%
  );
`;
