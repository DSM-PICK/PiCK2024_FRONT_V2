import Header from '@/components/header';
import * as S from './style';
import mainLogo from '@/assets/svg/mainLogo.svg';
import MainRouterButton from '@/components/mainRouterButton';
import { useGetAllTeacher } from '@/apis/admin';

const Main = () => {
  if (navigator !== undefined) {
    const userAgent = navigator.userAgent;
    if (/iPad|iPhone|iPod/.test(userAgent) || /android/i.test(userAgent)) {
      alert('알맞지 않은 기기입니다. pick-teacher 로 이동합니다');
      location.href = 'https://pick-teacher.dsmhs.kr';
      return null;
    }
  }
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
