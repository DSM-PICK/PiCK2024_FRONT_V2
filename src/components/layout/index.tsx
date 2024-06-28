import React from "react";
import Home from "@/assets/svg/home.svg";
import nextSvg from "@/assets/svg/next.svg";
import { useNavigate } from "react-router-dom";
import * as S from "./style";
import Header from "@/components/header";
import { getFullToday } from "utils/date";

interface LayoutProp {
  children: React.ReactNode;
  now: React.ReactNode;
  title: string;
  right?: React.ReactNode;
  date?: boolean;
}

export const Layout = ({ children, now, right, title, date }: LayoutProp) => {
  const nav = useNavigate();
  return (
    <>
      <Header />
      <S.LayoutStyle>
        <S.Nav>
          <img
            src={Home}
            alt="홈으로 가기"
            width={24}
            height={24}
            onClick={() => {
              nav("/main");
            }}
          />
          <img src={nextSvg} alt="" />
          <S.NowText>{now}</S.NowText>
        </S.Nav>
        <S.Top>
          <S.Left>
            <S.TitleText>{title}</S.TitleText>
            {date ? <S.Date>{getFullToday()}</S.Date> : <></>}
          </S.Left>
          <S.Right>{right}</S.Right>
        </S.Top>
        <S.Line />
        {children}
      </S.LayoutStyle>
    </>
  );
};
