import React, { useState } from "react";
import HelpContent from "./content";
import * as S from "./style";
import light from "@/assets/svg/light.svg";
import bug from "@/assets/svg/bug.svg";
import change from "@/assets/svg/change.svg";
import out from "@/assets/svg/out.svg";
import { useNavigate } from "react-router-dom";
import Modal from "@/components/modal";
import { cookie } from "@/utils/auth";

const HelfMenu = () => {
  const navigate = useNavigate();
  const [logoutModal, setLogoutModal] = useState<boolean>(false);

  const Logout = () => {
    cookie.remove("access_token");
    cookie.remove("refresh_token");
    navigate("/login");
  };

  return (
    <>
      <S.AlarmWrap>
        <S.TestTitle>도움말</S.TestTitle>
        <HelpContent
          onClick={() => {
            window.location.href =
              "https://onyx-badge-bf9.notion.site/PiCK-6078a88d316c479daf209c18185abfa0?pvs=74";
          }}
          content="픽 사용 설명서"
          icon={<img src={light} alt="" />}
        />

        <HelpContent
          onClick={() => {
            navigate("/bugReport");
          }}
          content="버그 제보"
          icon={<img src={bug} alt="" />}
        />
        <S.TestTitle>계정</S.TestTitle>
        <HelpContent
          onClick={() => {
            navigate("/passwordChange");
          }}
          content="비밀번호 변경"
          icon={<img src={change} alt="" />}
        />
        <HelpContent
          onClick={() => {
            setLogoutModal(true);
          }}
          content="로그아웃"
          icon={<img src={out} alt="" />}
        />
      </S.AlarmWrap>
      {logoutModal && (
        <Modal
          onCancel={() => {
            setLogoutModal(false);
          }}
          onConfirm={() => {
            Logout();
          }}
          title="로그아웃 하시겠습니까?"
          subTitle="다음 접속 시 다시 로그인 해야합니다."
        />
      )}
    </>
  );
};

export default HelfMenu;
