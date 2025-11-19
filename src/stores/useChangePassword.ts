import { create } from 'zustand';

interface ChangePasswordState {
  email: string;
  code: string;
  password: string;
  passwordCheck: string;

  isSend: boolean; // 인증 메일 발송했는지
  isEmailLocked: boolean; // 인증 코드 검증 완료됐는지

  errors: {
    email?: string;
    code?: string;
    password?: string;
    passwordCheck?: string;
    global?: string;
  };

  setChangePasswordEmail: (value: string) => void;
  setChangePasswordCode: (value: string) => void;
  setChangePassword: (value: string) => void;
  setChangePasswordCheck: (value: string) => void;

  setChangePasswordError: (
    key: keyof ChangePasswordState['errors'],
    message: string,
  ) => void;
  clearChangePasswordError: (key: keyof ChangePasswordState['errors']) => void;

  clearAllChangePasswordState: () => void;
}

export const useChangePasswordStore = create<ChangePasswordState>((set) => ({
  email: '',
  code: '',
  password: '',
  passwordCheck: '',

  isSend: false,
  isEmailLocked: false,

  errors: {},

  setChangePasswordEmail: (value) =>
    set((state) => ({
      email: value,
      errors: { ...state.errors, email: undefined },
    })),

  setChangePasswordCode: (value) =>
    set((state) => ({
      code: value,
      errors: { ...state.errors, code: undefined },
    })),

  setChangePassword: (value) =>
    set((state) => ({
      password: value,
      errors: { ...state.errors, password: undefined },
    })),

  setChangePasswordCheck: (value) =>
    set((state) => ({
      passwordCheck: value,
      errors: { ...state.errors, passwordCheck: undefined },
    })),

  setChangePasswordError: (key, message) =>
    set((state) => ({
      errors: { ...state.errors, [key]: message },
    })),

  clearChangePasswordError: (key) =>
    set((state) => ({
      errors: { ...state.errors, [key]: undefined },
    })),

  clearAllChangePasswordState: () =>
    set({
      email: '',
      code: '',
      password: '',
      passwordCheck: '',
      isSend: false,
      isEmailLocked: false,
      errors: {},
    }),
}));
