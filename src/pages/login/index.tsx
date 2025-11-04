import Input from '@/components/input';
import * as S from '@/pages/login/style';
import { Button } from '@/components/Button/index';
import { useState } from 'react';
import { useLogin } from '@/apis/admin';
import { saveToken } from '@/utils/auth';
import { useNavigate } from 'react-router-dom';

interface LoginType {
  admin_id: string;
  password: string;
}

const Login = () => {
  const { mutate: Login } = useLogin();
  const [data, setData] = useState<LoginType>({
    admin_id: '',
    password: '',
  });
  const [error, setError] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      onClickBtn();
    }
  };

  const disabled = data.admin_id === '' || data.password === '';

  const navigate = useNavigate();

  const onClickBtn = async () => {
    try {
      await Login(data, {
        onSuccess: (res) => {
          const accessToken = res.access_token;
          const refreshToken = res.refresh_token;
          saveToken(accessToken, refreshToken);
          localStorage.clear();
          navigate('/main');
        },
        onError: () => {
          setError(true);
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
          error={error}
        />
        <Input
          onChange={handleChange}
          widthtype="login"
          value={data.password}
          label="비밀번호"
          password={true}
          name="password"
          onKeyDown={handleKeyDown}
          error={error}
        />
        {error && <S.Error>아이디와 비밀번호를 다시 확인해주세요</S.Error>}
        <S.BottomBox>
          <p>
            계정이 없으신가요?
            <S.LinkText onClick={() => navigate('/signup')}>
              회원가입
            </S.LinkText>
          </p>
          <Button
            onClick={onClickBtn}
            type="main"
            size="standard"
            disabled={disabled}
          >
            로그인
          </Button>
        </S.BottomBox>
      </S.ContentWrap>
    </S.LoginWrap>
  );
};

export default Login;
