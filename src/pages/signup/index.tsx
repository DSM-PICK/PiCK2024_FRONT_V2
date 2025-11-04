import Input from '@/components/input';
import * as S from '@/pages/signup/style';
import { Button } from '@/components/Button';
import { useCallback } from 'react';
import { useSignup } from '@/apis/admin';
import { useNavigate } from 'react-router-dom';
import { EmailInput } from '@/components/input/email';
import Dropdown from '@/components/dropdown';
import { saveToken } from '@/utils/auth';
import { useEmailAuth, useEmailCheck } from '@/apis/mail';
import { useSignupStore } from '@/stores/useSignup';

const PW_REGEX =
  /^(?=\S+$)(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,30}$/;

const Signup = () => {
  const navigate = useNavigate();
  const { mutate: signup } = useSignup();
  const { mutate: emailAuth, isPending: isSending } = useEmailAuth();
  const { mutate: checkEmailCode } = useEmailCheck();

  const {
    form,
    errors,
    ui,
    setForm,
    setError,
    clearError,
    setUI,
    resetErrors,
  } = useSignupStore();

  const handleVerifyCode = () => {
    if (!form.email || !form.code) {
      setError('code', '이메일과 인증 코드를 모두 입력해주세요.');
      return;
    }

    checkEmailCode(
      { email: form.email, code: form.code },
      {
        onSuccess: (data: boolean) => {
          if (data) {
            clearError('code');
            setUI('isEmailLocked', true);
          } else {
            setError('code', '인증 코드가 올바르지 않습니다.');
          }
        },
        onError: () => {
          setError('code', '인증 코드가 올바르지 않습니다.');
        },
      },
    );
  };

  const handleMailBtn = useCallback(() => {
    if (!form.email || isSending) return;

    emailAuth(
      { mail: form.email, title: 'PiCK 인증 코드', message: '이메일 인증' },
      {
        onError: (err: any) => {
          if (err?.response?.status === 409) {
            setError('email', '이미 가입된 이메일입니다.');
            return;
          }
          setError('email', '인증 메일 발송에 실패했습니다.');
        },
        onSuccess: () => {
          clearError('email');
          setUI('isSend', true);
        },
      },
    );
  }, [form.email, isSending, emailAuth, setError, clearError, setUI]);

  const onChangePassword = (val: string) => {
    setForm('password', val);

    if (!val || PW_REGEX.test(val)) {
      clearError('password');
    } else {
      setError(
        'password',
        '비밀번호는 8~30자, 영문/숫자/특수문자를 포함해야 합니다.',
      );
    }

    if (form.passwordCheck && form.passwordCheck !== val) {
      setError('passwordCheck', '비밀번호가 일치하지 않습니다.');
    } else {
      clearError('passwordCheck');
    }
  };

  const onChangePasswordCheck = (val: string) => {
    setForm('passwordCheck', val);
    if (!val || form.password === val) {
      clearError('passwordCheck');
    } else {
      setError('passwordCheck', '비밀번호가 일치하지 않습니다.');
    }
  };

  const handleGradeChange = (value: string | number) => {
    setForm('grade', Number(value));
    if (errors.gradeClass) clearError('gradeClass');
  };

  const handleClassChange = (value: string | number) => {
    setForm('classNum', Number(value));
    if (errors.gradeClass) clearError('gradeClass');
  };

  const submit = () => {
    clearError('secretKey');
    clearError('code');
    resetErrors();

    const payload = {
      account_id: form.email,
      password: form.password,
      name: form.name.trim(),
      grade: form.isHomeroom ? Number(form.grade) : 0,
      class_num: form.isHomeroom ? Number(form.classNum) : 0,
      code: form.code.trim(),
      secret_key: form.secretKey.trim(),
      device_token: form.deviceToken,
    };

    signup(payload, {
      onSuccess: (res) => {
        saveToken(res.access_token, res.refresh_token);
        navigate('/main');
      },
      onError: (err: any) => {
        const code = err?.response?.data?.message;
        if (code === 'Secret Key Miss Match') {
          setError('secretKey', '시크릿키가 잘못되었습니다');
          return;
        }
        if (code === 'Email Mismatch') {
          setError('code', '인증코드가 만료되었습니다');
          setUI('isEmailLocked', false);
          return;
        }
        if (code === 'Duplicate User') {
          setError('global', '이미 가입한 계정입니다');
          return;
        }
        setError('global', '회원가입에 실패했습니다.');
      },
    });
  };

  const disabled =
    !form.secretKey ||
    !form.email ||
    !form.code ||
    !form.password ||
    !form.passwordCheck ||
    !form.name ||
    !ui.isSend ||
    !!errors.password ||
    !!errors.passwordCheck ||
    (form.isHomeroom && (form.grade === 0 || form.classNum === 0));

  return (
    <S.SignupWrap>
      <S.SignupText>
        <S.PiCKText>PiCK</S.PiCKText>에 회원가입하기
      </S.SignupText>

      <S.ContentWrap>
        <S.SectionWrap>
          <Input
            label="시크릿 키"
            placeholder="PiCK Admin의 시크릿 키를 입력해주세요."
            value={form.secretKey}
            name="secret_key"
            onChange={(e) => {
              setForm('secretKey', e.target.value);
              if (errors.secretKey) clearError('secretKey');
            }}
            widthtype="login"
          />
          {errors.secretKey && <S.Error>{errors.secretKey}</S.Error>}
        </S.SectionWrap>

        <S.SectionWrap>
          <EmailInput
            label="이메일"
            onChange={(value) => {
              setForm('email', value);
              if (errors.email) clearError('email');
            }}
            onButtonClick={handleMailBtn}
            disabled={ui.isEmailLocked}
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
              setForm('code', value);
              if (errors.code) clearError('code');
            }}
            onButtonClick={handleVerifyCode}
            disabled={ui.isEmailLocked}
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
            placeholder="비밀번호를 입력해주세요"
            value={form.password}
            name="password"
            password
            onChange={(e) => onChangePassword(e.target.value)}
            widthtype="login"
            error={!!errors.password}
          />
          {errors.password && <S.Error>{errors.password}</S.Error>}
        </S.SectionWrap>

        <S.SectionWrap>
          <Input
            label="비밀번호 확인"
            placeholder="비밀번호를 확인해주세요"
            value={form.passwordCheck}
            name="password_check"
            password
            onChange={(e) => onChangePasswordCheck(e.target.value)}
            widthtype="login"
            error={!!errors.passwordCheck}
          />
          {errors.passwordCheck && <S.Error>{errors.passwordCheck}</S.Error>}
        </S.SectionWrap>

        <S.AlignStart>
          <S.Column10>
            <S.CheckboxContainer>
              <S.CheckboxRow>담임 선생님이신가요?</S.CheckboxRow>
              <S.CheckboxInput
                type="checkbox"
                checked={form.isHomeroom}
                onChange={(e) => setForm('isHomeroom', e.target.checked)}
              />
            </S.CheckboxContainer>

            {form.isHomeroom && (
              <>
                <S.DropdownRow>
                  <Dropdown
                    options={[
                      { label: '1학년', value: 1 },
                      { label: '2학년', value: 2 },
                      { label: '3학년', value: 3 },
                    ]}
                    value={form.grade}
                    changeHandler={handleGradeChange}
                  />
                  <Dropdown
                    options={[
                      { label: '1반', value: 1 },
                      { label: '2반', value: 2 },
                      { label: '3반', value: 3 },
                      { label: '4반', value: 4 },
                    ]}
                    value={form.classNum}
                    changeHandler={handleClassChange}
                  />
                </S.DropdownRow>
                {errors.gradeClass && <S.Error>{errors.gradeClass}</S.Error>}
              </>
            )}
          </S.Column10>
        </S.AlignStart>

        <S.SectionWrap>
          <Input
            label="이름"
            placeholder="이름을 입력해주세요"
            value={form.name}
            name="name"
            onChange={(e) => {
              setForm('name', e.target.value);
              if (errors.name) clearError('name');
            }}
            widthtype="login"
          />
          {errors.name && <S.Error>{errors.name}</S.Error>}
        </S.SectionWrap>

        <Button
          onClick={submit}
          type="main"
          size="standard"
          disabled={disabled}
        >
          회원가입
        </Button>
        {errors.global && <S.Error>{errors.global}</S.Error>}
      </S.ContentWrap>
    </S.SignupWrap>
  );
};

export default Signup;
