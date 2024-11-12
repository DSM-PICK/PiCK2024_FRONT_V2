import Header from '@/components/header';
import * as S from './style';
import mainLogo from '@/assets/svg/mainLogo.svg';
import MainRouterButton from '@/components/mainRouterButton';
import { useGetAllTeacher } from '@/apis/admin';

const Main = () => {
  useGetAllTeacher();
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
