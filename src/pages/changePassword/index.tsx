import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Input from '@/components/input';
import * as S from '@/pages/changePassword/style';
import { Button } from '@/components/Button';
import { EmailInput } from '@/components/input/email';

import { useEmailAuth, useEmailCheck } from '@/apis/mail';
import { useChangePassword } from '@/apis/admin';

const PW_REGEX =
  /^(?=\S+$)(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,30}$/;

const ChangePassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [isEmailLocked, setIsEmailLocked] = useState(false);

  const [errors, setErrors] = useState({
    email: '',
    code: '',
    password: '',
    passwordCheck: '',
    global: '',
  });

  const setError = (field: string, message: string) =>
    setErrors((prev) => ({ ...prev, [field]: message }));

  const clearError = (field: string) =>
    setErrors((prev) => ({ ...prev, [field]: '' }));

  const { mutate: emailAuth, isPending: isSending } = useEmailAuth();
  const { mutate: checkEmailCode, isPending: isVerifying } = useEmailCheck();
  const { mutate: changePassword, isPending: isSubmitting } =
    useChangePassword();

  const handleMailBtn = () => {
    if (!email || isSending) return;

    emailAuth(
      { mail: email, title: 'PiCK 인증 코드', message: '비밀번호 재설정' },
      {
        onError: () => setError('email', '이메일 발송에 실패했습니다.'),
        onSuccess: () => {
          clearError('email');
        },
      },
    );
  };

  const handleVerifyCode = () => {
    if (!email || !code) {
      setError('code', '이메일과 인증 코드를 모두 입력해주세요.');
      return;
    }

    checkEmailCode(
      { email, code },
      {
        onSuccess: (data: boolean) => {
          if (data) {
            clearError('code');
            setIsEmailLocked(true);
          } else {
            setError('code', '인증 코드가 올바르지 않습니다.');
          }
        },
        onError: () => setError('code', '인증 코드가 올바르지 않습니다.'),
      },
    );
  };

  const onChangePasswordInput = (val: string) => {
    setPassword(val);

    if (!val || PW_REGEX.test(val)) clearError('password');
    else setError('password', '비밀번호 형식이 올바르지 않습니다.');

    if (passwordCheck && passwordCheck !== val)
      setError('passwordCheck', '비밀번호가 일치하지 않습니다.');
    else clearError('passwordCheck');
  };

  const onChangePasswordCheckInput = (val: string) => {
    setPasswordCheck(val);

    if (!val || password === val) clearError('passwordCheck');
    else setError('passwordCheck', '비밀번호가 일치하지 않습니다.');
  };

  const disabled =
    !email ||
    !code ||
    !password ||
    !passwordCheck ||
    !isEmailLocked ||
    !!errors.password ||
    !!errors.passwordCheck;

  const submit = () => {
    changePassword(
      { admin_id: email, code, password },
      {
        onSuccess: () => {
          alert('비밀번호가 변경되었습니다.');
          navigate('/');
        },
        onError: (err: any) => {
          const code = err?.response?.data?.message;
          const status = err?.response?.data?.status;
          if (status === 401) {
            setError('code', code + '인증을 다시 진행해주세요');
            setIsEmailLocked(false);
            return;
          }
          if (status === 404) {
            setError('global', code);
            return;
          }
          setError('global', '비밀번호 변경에 실패했습니다.');
        },
      },
    );
  };

  return (
    <S.Wrap>
      <S.Heading>
        <S.PiCKText>PiCK</S.PiCKText> 비밀번호 재설정
      </S.Heading>

      <S.ContentWrap>
        <S.SectionWrap>
          <EmailInput
            label="이메일"
            onChange={(v) => {
              setEmail(v);
              clearError('email');
            }}
            onButtonClick={handleMailBtn}
            disabled={isEmailLocked}
            mainText="발송"
            subText="재발송"
            domain="dsm.hs.kr"
            placeholder="학교 이메일을 입력해주세요"
          />
          {errors.email && <S.Error>{errors.email}</S.Error>}
        </S.SectionWrap>

        <S.SectionWrap>
          <EmailInput
            label="인증 코드"
            onChange={(v) => {
              setCode(v);
              clearError('code');
            }}
            onButtonClick={handleVerifyCode}
            disabled={isEmailLocked || isVerifying}
            mainText={isVerifying ? '확인 중...' : '확인'}
            subText={isVerifying ? '확인 중...' : '확인'}
            domain=""
            placeholder="인증 코드를 입력해주세요"
          />
          {errors.code && <S.Error>{errors.code}</S.Error>}
        </S.SectionWrap>

        <S.SectionWrap>
          <Input
            label="비밀번호"
            placeholder="새 비밀번호를 입력해주세요"
            value={password}
            name="password"
            password
            onChange={(e) => onChangePasswordInput(e.target.value)}
            widthtype="login"
            error={!!errors.password}
          />
          {errors.password && <S.Error>{errors.password}</S.Error>}
        </S.SectionWrap>

        <S.SectionWrap>
          <Input
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 입력해주세요"
            value={passwordCheck}
            name="password_check"
            password
            onChange={(e) => onChangePasswordCheckInput(e.target.value)}
            widthtype="login"
            error={!!errors.passwordCheck}
          />
          {errors.passwordCheck && <S.Error>{errors.passwordCheck}</S.Error>}
        </S.SectionWrap>

        <Button
          onClick={submit}
          type="main"
          size="standard"
          disabled={disabled || isSubmitting}
        >
          비밀번호 변경
        </Button>

        {errors.global && <S.Error>{errors.global}</S.Error>}
      </S.ContentWrap>
    </S.Wrap>
  );
};

export default ChangePassword;
