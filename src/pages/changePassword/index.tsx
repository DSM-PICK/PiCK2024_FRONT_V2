import { useState } from 'react';
import { Button } from '@/components/Button';
import Input from '@/components/input';
import { Layout } from '@/components/layout';
import { theme } from '@/styles/theme';
import { styled } from 'styled-components';

const ChangePassword = () => {
  const [newPassword, setNewpassword] = useState<string>('');
  const [checkPassword, setCheckPassword] = useState<string>('');
  const [data, setData] = useState({
    newPassword: '',
    checkPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const BtnCheck = () => {
    if (
      newPassword === checkPassword &&
      newPassword !== '' &&
      checkPassword !== ''
    ) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <Layout now="비밀번호 변경">
      <PasswordWrap>
        <PasswordTitle>비밀번호 변경</PasswordTitle>
        <ContentWrap>
          <Input
            onChange={handleChange}
            widthtype="login"
            password={true}
            value={data.newPassword}
            name="newPassword"
            label="새로운 비밀번호 입력"
          />
          <Input
            onChange={handleChange}
            widthtype="login"
            password={true}
            name="checkPassword"
            value={data.checkPassword}
            label="비밀번호 확인"
          />
          <Button
            type="main"
            size="standard"
            onClick={() => {}}
            disabled={BtnCheck()}
          >
            변경하기
          </Button>
        </ContentWrap>
      </PasswordWrap>
    </Layout>
  );
};

export default ChangePassword;

const PasswordWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 60px;
`;

const PasswordTitle = styled.p`
  font-size: ${theme.font.heading[1].size};
  font-weight: ${theme.font.heading[1].fontWeight};
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 68px;
`;
