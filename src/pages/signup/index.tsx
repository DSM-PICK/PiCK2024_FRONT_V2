// src/pages/signup/index.tsx
import Input from '@/components/input';
import * as S from '@/pages/signup/style';
import { Button } from '@/components/Button';
import { useReducer, useCallback } from 'react';
import { useSignup } from '@/apis/admin';
import { useNavigate } from 'react-router-dom';
import { EmailInput } from '@/components/input/email';
import Dropdown from '@/components/dropdown';
import { saveToken } from '@/utils/auth';
import { useEmailAuth } from '@/apis/mail';

const PW_REGEX =
  /^(?=\S+$)(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,30}$/;

type Form = {
  secretKey: string;
  email: string; // account_id
  code: string;
  password: string;
  passwordCheck: string;
  isHomeroom: boolean;
  grade: number;
  classNum: number;
  name: string;
};

type Errors = Partial<
  Record<
    | 'secretKey'
    | 'email'
    | 'code'
    | 'password'
    | 'passwordCheck'
    | 'name'
    | 'gradeClass'
    | 'global',
    string
  >
>;

type UIState = {
  isSend: boolean;
};

type State = {
  form: Form;
  errors: Errors;
  ui: UIState;
};

type Action =
  | { type: 'SET_FORM'; field: keyof Form; value: string | number | boolean }
  | { type: 'SET_ERROR'; field: keyof Errors; message: string }
  | { type: 'CLEAR_ERROR'; field: keyof Errors }
  | { type: 'RESET_ERRORS' }
  | { type: 'SET_UI'; field: keyof UIState; value: boolean };

const initialState: State = {
  form: {
    secretKey: '',
    email: '',
    code: '',
    password: '',
    passwordCheck: '',
    isHomeroom: false,
    grade: 0,
    classNum: 0,
    name: '',
  },
  errors: {},
  ui: {
    isSend: false,
  },
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_FORM':
      return {
        ...state,
        form: { ...state.form, [action.field]: action.value },
      };
    case 'SET_ERROR':
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.message },
      };
    case 'CLEAR_ERROR': {
      const next = { ...state.errors };
      delete next[action.field];
      return { ...state, errors: next };
    }
    case 'RESET_ERRORS':
      return { ...state, errors: {} };
    case 'SET_UI':
      return { ...state, ui: { ...state.ui, [action.field]: action.value } };
    default:
      return state;
  }
}

const Signup = () => {
  const navigate = useNavigate();
  const { mutate: signup } = useSignup();
  const { mutate: emailAuth, isPending: isSending } = useEmailAuth();

  const [state, dispatch] = useReducer(reducer, initialState);
  const { form, errors, ui } = state;

  const handleMailBtn = useCallback(() => {
    if (!form.email || isSending) return;

    emailAuth(
      { mail: form.email, title: 'PiCK 인증 코드', message: '이메일 인증' },
      {
        onError: (err: any) => {
          if (err?.response?.status === 409) {
            dispatch({
              type: 'SET_ERROR',
              field: 'email',
              message: '이미 가입된 이메일입니다.',
            });
            return;
          }
          dispatch({
            type: 'SET_ERROR',
            field: 'email',
            message: '인증 메일 발송에 실패했습니다.',
          });
        },
        onSuccess: () => {
          dispatch({ type: 'CLEAR_ERROR', field: 'email' });
          dispatch({ type: 'SET_UI', field: 'isSend', value: true });
        },
      },
    );
  }, [form.email, isSending, emailAuth]);

  const onChangePassword = (val: string) => {
    dispatch({ type: 'SET_FORM', field: 'password', value: val });

    if (!val || PW_REGEX.test(val)) {
      dispatch({ type: 'CLEAR_ERROR', field: 'password' });
    } else {
      dispatch({
        type: 'SET_ERROR',
        field: 'password',
        message: '비밀번호는 8~30자, 영문/숫자/특수문자를 포함해야 합니다.',
      });
    }

    if (form.passwordCheck && form.passwordCheck !== val) {
      dispatch({
        type: 'SET_ERROR',
        field: 'passwordCheck',
        message: '비밀번호가 일치하지 않습니다.',
      });
    } else {
      dispatch({ type: 'CLEAR_ERROR', field: 'passwordCheck' });
    }
  };

  const onChangePasswordCheck = (val: string) => {
    dispatch({ type: 'SET_FORM', field: 'passwordCheck', value: val });
    if (!val || form.password === val) {
      dispatch({ type: 'CLEAR_ERROR', field: 'passwordCheck' });
    } else {
      dispatch({
        type: 'SET_ERROR',
        field: 'passwordCheck',
        message: '비밀번호가 일치하지 않습니다.',
      });
    }
  };

  const handleGradeChange = (value: string | number) => {
    dispatch({ type: 'SET_FORM', field: 'grade', value: Number(value) });
    if (errors.gradeClass)
      dispatch({ type: 'CLEAR_ERROR', field: 'gradeClass' });
  };

  const handleClassChange = (value: string | number) => {
    dispatch({ type: 'SET_FORM', field: 'classNum', value: Number(value) });
    if (errors.gradeClass)
      dispatch({ type: 'CLEAR_ERROR', field: 'gradeClass' });
  };

  const submit = () => {
    dispatch({ type: 'CLEAR_ERROR', field: 'secretKey' });
    dispatch({ type: 'CLEAR_ERROR', field: 'code' });

    const payload = {
      account_id: form.email,
      password: form.password,
      name: form.name.trim(),
      grade: form.isHomeroom ? Number(form.grade) : 0,
      class_num: form.isHomeroom ? Number(form.classNum) : 0,
      code: form.code.trim(),
      secret_key: form.secretKey.trim(),
    };

    signup(payload, {
      onSuccess: (res) => {
        saveToken(res.access_token, res.refresh_token);
        navigate('/main');
      },
      onError: (err: any) => {
        const code = err?.response?.data?.code;
        if (code === 'SECRET_KEY_MISS_MATCH') {
          dispatch({
            type: 'SET_ERROR',
            field: 'secretKey',
            message: '시크릿키가 잘못되었습니다',
          });
          return;
        }
        if (code === 'EMAIL_CODE_MISSMATCH') {
          dispatch({
            type: 'SET_ERROR',
            field: 'code',
            message: '인증코드가 잘못되었습니다',
          });
          return;
        }
        dispatch({
          type: 'SET_ERROR',
          field: 'global',
          message: err?.response?.data?.message || '회원가입에 실패했습니다.',
        });
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
    ui.isSend ||
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
              dispatch({
                type: 'SET_FORM',
                field: 'secretKey',
                value: e.target.value,
              });
              if (errors.secretKey)
                dispatch({ type: 'CLEAR_ERROR', field: 'secretKey' });
            }}
            widthtype="login"
          />
          {errors.secretKey && <S.Error>{errors.secretKey}</S.Error>}
        </S.SectionWrap>

        <S.SectionWrap>
          <EmailInput
            label="이메일"
            onChange={(value) => {
              dispatch({ type: 'SET_FORM', field: 'email', value });
              if (errors.email)
                dispatch({ type: 'CLEAR_ERROR', field: 'email' });
            }}
            onResend={handleMailBtn}
          />
          {errors.email && <S.Error>{errors.email}</S.Error>}
        </S.SectionWrap>
        <S.SectionWrap>
          <Input
            label="인증 코드"
            placeholder="인증 코드를 입력해주세요"
            value={form.code}
            name="code"
            onChange={(e) => {
              dispatch({
                type: 'SET_FORM',
                field: 'code',
                value: e.target.value,
              });
              if (errors.code) dispatch({ type: 'CLEAR_ERROR', field: 'code' });
            }}
            widthtype="login"
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
                onChange={(e) =>
                  dispatch({
                    type: 'SET_FORM',
                    field: 'isHomeroom',
                    value: e.target.checked,
                  })
                }
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
              dispatch({
                type: 'SET_FORM',
                field: 'name',
                value: e.target.value,
              });
              if (errors.name) dispatch({ type: 'CLEAR_ERROR', field: 'name' });
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
          {'회원가입'}
        </Button>
        {errors.global && <S.Error>{errors.global}</S.Error>}
      </S.ContentWrap>
    </S.SignupWrap>
  );
};

export default Signup;
