import { theme } from '@/styles/theme';
import { ToastContainer, ToastOptions, toast } from 'react-toastify';
import { styled } from 'styled-components';

interface ToastProps {
  type: 'success' | 'error';
  message?: string;
}

const toastOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 1000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  pauseOnFocusLoss: true,
  closeButton: false,
  icon: false,
};

export function showToast({ type, message }: ToastProps) {
  switch (type) {
    case 'success':
      toast.success(message || '성공적으로 완료되었습니다', {
        ...toastOptions,
      });
      return;
    case 'error':
      toast.error(message || '다시 한번 시도해주세요', {
        ...toastOptions,
      });
  }
}

export default function Toast() {
  return <Container />;
}

const Container = styled(ToastContainer)`
  .Toastify__toast {
    font-size: ${theme.font.button[2]};
    border-radius: 32px 0px 0px 32px;
    color: ${theme.color.normal.white};
    background: rgba(107, 115, 135, 0.8);
  }

  .Toastify__toast--success {
    background: ${theme.color.main[400]};
  }

  .Toastify__toast--error {
    background: rgba(224, 72, 82, 0.8);
  }
  .Toastify__toast {
    height: auto;
    padding: 16px 36px;
    min-height: 0;
    width: fit-content;
  }
  .Toastify__toast-body {
    padding: 0;
    height: auto;
  }
`;
