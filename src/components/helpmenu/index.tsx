import React, { useState } from 'react';
import HelpContent from './content';
import * as S from './style';
import light from '@/assets/svg/light.svg';
import bug from '@/assets/svg/bug.svg';
import change from '@/assets/svg/change.svg';
import out from '@/assets/svg/out.svg';
import { useNavigate } from 'react-router-dom';
import Modal from '@/components/modal';
import { cookie } from '@/utils/auth';

const HelfMenu = () => {
  const navigate = useNavigate();
  const [logoutModal, setLogoutModal] = useState<boolean>(false);

  const Logout = () => {
    cookie.remove('access_token');
    cookie.remove('refresh_token');
    localStorage.clear();
    navigate('/');
  };

  return (
    <>
      <S.AlarmWrap>
        <S.TestTitle>도움말</S.TestTitle>
        <HelpContent
          onClick={() => {
            window.location.href =
              'https://glaze-pumpkin-22e.notion.site/1a6a632f482c81a791c8f6ccf1a65453';
          }}
          content="픽 사용 설명서"
          icon={<img src={light} alt="" />}
        />

        <HelpContent
          onClick={() => {
            navigate('/bugReport');
          }}
          content="버그 제보"
          icon={<img src={bug} alt="" />}
        />
        <S.TestTitle>계정</S.TestTitle>

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
          refetchStatus={() => { }}
          onCancel={() => {
            setLogoutModal(false);
          }}
          onConfirm={() => {
            Logout();
          }}
          type="red"
          title="로그아웃 하시겠습니까?"
          subTitle="다음 접속 시 다시 로그인 해야합니다."
        />
      )}
    </>
  );
};

export default HelfMenu;
