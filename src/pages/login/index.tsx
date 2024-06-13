import Input from "components/input";
import * as S from "./style";
import { Button } from "components/Button/index";
import { useState } from "react";
import pickman from "assets/svg/pickman.svg";
import picksick from "assets/svg/picksick.svg";
import pickme from "assets/svg/pickme.svg";
import pickgod from "assets/svg/pickgod.svg";
import { MyName, useLogin } from "apis/admin";
import { saveToken } from "utils/auth";
import { useNavigate } from "react-router-dom";

interface ChangeProps {
  text: string;
  name: string;
}

interface LoginType {
  admin_id: string;
  password: string;
}

const Login = () => {
  const { mutate: MynameMutate } = MyName();
  const { mutate: Login } = useLogin();
  const [data, setData] = useState<LoginType>({
    admin_id: "",
    password: "",
  });

  const handleChange = ({ text, name }: ChangeProps) => {
    setData({ ...data, [name]: text });
  };

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      onClickBtn();
    }
  };

  const Btn = () => {
    if (data.admin_id === "" || data.password === "") {
      return true;
    } else return false;
  };

  const navigate = useNavigate();

  const onClickBtn = async () => {
    try {
      await Login(data, {
        onSuccess: (res) => {
          const accessToken = res.access_token;
          const refreshToken = res.refresh_token;
          saveToken(accessToken, refreshToken);
          localStorage.clear();
          navigate("/main");
        },
        onError: (error) => {
          console.error("Login error:", error);
          if (error.message === "Request failed with status code 500") {
            alert("아이디 혹은 비밀번호가 일치하지 않습니다");
          } else if (error.message === "Request failed with status code 401") {
            alert("아이디 혹은 비밀번호가 일치하지 않습니다");
          }
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <S.LoginWrap>
      <S.LoginText>
        <S.PiCKText>PiCK</S.PiCKText>에 로그인하기
      </S.LoginText>
      <S.ContentWrap>
        <Input
          onChange={handleChange}
          widthtype="login"
          value={data.admin_id}
          label="아이디"
          name="admin_id"
        />
        <Input
          onChange={handleChange}
          widthtype="login"
          value={data.password}
          label="비밀번호"
          password={true}
          name="password"
          onKeyDown={handleKeyDown}
        />
        <Button
          onClick={onClickBtn}
          type="main"
          size="standard"
          disabled={Btn()}
        >
          로그인
        </Button>
      </S.ContentWrap>
      <S.Pickman>
        <img src={pickgod} width={100} height={100} />
        <img src={picksick} width={180} height={180} />
        <img src={pickme} width={220} height={220} />
        <img src={pickman} />
      </S.Pickman>
    </S.LoginWrap>
  );
};

export default Login;
