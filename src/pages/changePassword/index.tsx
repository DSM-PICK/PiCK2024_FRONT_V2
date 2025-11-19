import Input from '@/components/input';
import * as S from '@/pages/changePassword/style';
import { Button } from '@/components/Button';
import { useCallback } from 'react';
import { EmailInput } from '@/components/input/email';
import { useEmailAuth, useEmailCheck } from '@/apis/mail';
import { useChangePasswordStore } from '@/stores/useChangePassword';
import { useChangePassword } from '@/apis/admin';
import { useNavigate } from 'react-router-dom';

const PW_REGEX =
  /^(?=\S+$)(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,30}$/;

const ChangePassword = () => {
  const navigate = useNavigate();

  const {
    email,
    code,
    password,
    passwordCheck,
    isSend,
    isEmailLocked,
    errors,
    setChangePasswordEmail,
    setChangePasswordCode,
    setChangePassword,
    setChangePasswordCheck,
    setChangePasswordError,
    clearChangePasswordError,
  } = useChangePasswordStore();

  const { mutate: emailAuth, isPending: isSending } = useEmailAuth();
  const { mutate: checkEmailCode } = useEmailCheck();
  const { mutate: changePassword } = useChangePassword();

  const handleMailBtn = useCallback(() => {
    if (!email || isSending) return;

    emailAuth(
      { mail: email, title: 'PiCK 인증 코드', message: '비밀번호 재설정' },
      {
        onError: () => {
          setChangePasswordError('email', '이메일 발송에 실패했습니다.');
        },
        onSuccess: () => {
          clearChangePasswordError('email');
          useChangePasswordStore.setState({ isSend: true });
        },
      },
    );
  }, [email, isSending]);

  const handleVerifyCode = () => {
    if (!email || !code) {
      setChangePasswordError('code', '이메일과 인증 코드를 모두 입력해주세요.');
      return;
    }

    checkEmailCode(
      { email, code },
      {
        onSuccess: (data: boolean) => {
          if (data) {
            clearChangePasswordError('code');
            useChangePasswordStore.setState({ isEmailLocked: true });
          } else {
            setChangePasswordError('code', '인증 코드가 올바르지 않습니다.');
          }
        },
        onError: () => {
          setChangePasswordError('code', '인증 코드가 올바르지 않습니다.');
        },
      },
    );
  };

  const onChangePasswordInput = (val: string) => {
    setChangePassword(val);

    if (!val || PW_REGEX.test(val)) {
      clearChangePasswordError('password');
    } else {
      setChangePasswordError('password', '비밀번호 형식이 올바르지 않습니다.');
    }

    if (passwordCheck && passwordCheck !== val) {
      setChangePasswordError('passwordCheck', '비밀번호가 일치하지 않습니다.');
    } else {
      clearChangePasswordError('passwordCheck');
    }
  };

  const onChangePasswordCheckInput = (val: string) => {
    setChangePasswordCheck(val);

    if (!val || password === val) {
      clearChangePasswordError('passwordCheck');
    } else {
      setChangePasswordError('passwordCheck', '비밀번호가 일치하지 않습니다.');
    }
  };

  const disabled =
    !email ||
    !code ||
    !password ||
    !passwordCheck ||
    !isSend ||
    !!errors.password ||
    !!errors.passwordCheck;

  const submit = () => {
    changePassword(
      {
        admin_id: email,
        code: code,
        password: password,
      },
      {
        onSuccess: () => {
          alert('비밀번호가 변경되었습니다.');
        },
        onError: (err: any) => {
          const code = err?.response?.data?.message;
          const status = err?.response?.data?.status;
          if (code === '만료된 이메일 인증코드 입니다') {
            setChangePasswordError('code', code);
            return;
          }
          if (status === 404) {
            setChangePasswordError('global', code);
          }
          setChangePasswordError('global', '비밀번호 변경에 실패했습니다.');
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
            onChange={(value) => {
              setChangePasswordEmail(value);
              clearChangePasswordError('email');
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
            onChange={(value) => {
              setChangePasswordCode(value);
              clearChangePasswordError('code');
            }}
            onButtonClick={handleVerifyCode}
            disabled={isEmailLocked}
            mainText="확인"
            subText="확인"
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
          disabled={disabled}
        >
          비밀번호 변경
        </Button>

        {errors.global && <S.Error>{errors.global}</S.Error>}
      </S.ContentWrap>
    </S.Wrap>
  );
};

export default ChangePassword;
