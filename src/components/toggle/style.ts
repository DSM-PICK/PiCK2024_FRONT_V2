import { theme } from '@/styles/theme';
import { styled } from 'styled-components';

export const CheckBox = styled.input`
  display: none;
`;

export const BtnWrap = styled.div`
  display: flex;
  z-index: 0;
`;

export const ButtonLabel = styled.label<{ isActive: boolean }>`
  z-index: 10;
  width: 12rem;
  height: 3rem;
  border-radius: 32px;
  cursor: pointer;
  background-color: ${theme.color.gray[300]};
  position: relative;

  ::before {
    display: flex;
    position: absolute;
    content: '외출';
    padding-left: 1rem;
    justify-content: flex-start;
    align-items: center;
    width: 10rem;
    height: 3rem;
    font-size: 12px;
    font-weight: 400;
    line-height: 32px;
    color: ${theme.color.normal.black};
    transition: all 0.2s ease-in-out;
  }

  ::after {
    display: flex;
    position: absolute;
    content: '조기귀가';
    width: 6rem;
    height: 3rem;
    justify-content: center;
    align-items: center;
    left: 6rem;
    font-weight: 600;
    font-size: 12px;
    line-height: 32px;
    border-radius: 50%;
    background: ${theme.color.normal.white};
    color: ${theme.color.normal.white};
    box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.16);
    transition: all 0.2s ease-in-out;
  }

  ${(props) =>
    props.isActive &&
    `
      &::before {
        padding-left: 1rem;
        justify-content: flex-end;
        content:'dwe'
      }
      &::after {
        width: 6rem;
        height: 3rem;
        left: 0rem;
        content:'we'
      }
    `}
`;
