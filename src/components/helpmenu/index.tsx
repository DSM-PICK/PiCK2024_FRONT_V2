import HelpContent from "./content";
import * as S from "./style";
import light from "assets/svg/light.svg";
import bug from "assets/svg/bug.svg";
import change from "assets/svg/change.svg";
import out from "assets/svg/out.svg";

const Testr = () => {
  return (
    <S.AlarmWrap>
      <S.TestTitle>도움말</S.TestTitle>
      <HelpContent
        onClick={() => {}}
        content="픽 사용 설명서"
        icon={<img src={light} alt="" />}
      />
      <HelpContent
        onClick={() => {}}
        content="버그 제보"
        icon={<img src={bug} alt="" />}
      />
      <S.TestTitle>계정</S.TestTitle>
      <HelpContent
        onClick={() => {}}
        content="비밀번호 변경"
        icon={<img src={change} alt="" />}
      />
      <HelpContent
        onClick={() => {}}
        content="로그아웃"
        icon={<img src={out} alt="" />}
      />
    </S.AlarmWrap>
  );
};

export default Testr;
