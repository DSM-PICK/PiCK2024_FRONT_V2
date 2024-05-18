import { cookie } from "utils/auth";
import React, { useEffect, useState } from "react";
import * as S from "./style";
import Alarm from "assets/svg/alarm.svg";
import Face from "assets/svg/face.svg";
import Menu from "assets/svg/menu.svg";

const Header = () => {
  const [name, setName] = useState<string>("");
  useEffect(() => {
    setName(cookie.get("name"));
  }, [100]);

  return (
    <S.HeaderWrap>
      <S.nameText>{name} 선생님</S.nameText>
      <S.HeaderIconWrap>
        <img src={Face} alt="아이콘" />
        <img src={Alarm} alt="아이콘" />
        <img src={Menu} alt="아이콘" />
      </S.HeaderIconWrap>
    </S.HeaderWrap>
  );
};

export default Header;
