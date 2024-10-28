import Header from '@/components/header';
import * as S from './style';
import mainLogo from '@/assets/svg/mainLogo.svg';
import MainRouterButton from '@/components/mainRouterButton';
import { showToast } from '@/components/toast';
import { useEffect } from 'react';

const Main = () => {
  return (
    <>
      <Header />
      <S.MainContainer>
        <img src={mainLogo} alt="" />
        <MainRouterButton />
      </S.MainContainer>
    </>
  );
};

export default Main;
