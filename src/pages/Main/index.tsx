import Header from "@/components/header";
import * as S from "./style";
import mainLogo from "@/assets/svg/mainLogo.svg";
import MainRouterButton from "@/components/mainRouterButton";

const Main = () => {
  return (
    <>
      <Header />
      <S.MainContainer>
        <img src={mainLogo} alt="" />
        <S.ButtonBox>
          <MainRouterButton />
        </S.ButtonBox>
      </S.MainContainer>
    </>
  );
};

export default Main;
