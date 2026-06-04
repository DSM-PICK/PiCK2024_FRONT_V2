import { useEffect, useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import { styled } from 'styled-components';
import { theme } from '@/styles/theme';

interface EmailInputProps {
  label: string;
  value?: string;
  name?: string;
  onChange?: (value: string) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onButtonClick?: () => void;
  disabled?: boolean;
  mainText?: string;
  subText?: string;
  domain?: string;
  placeholder?: string;
  showButton?: boolean;
  error?: boolean;
}

const Container = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-sizing: border-box;
`;

const Label = styled.label`
  font-size: ${theme.font.label[1].size};
  font-weight: ${theme.font.label[1].fontweight};
`;

const Wrapper = styled.div<{ disabled: boolean; error?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${theme.color.gray[50]};
  border: 1px solid
    ${({ disabled, error }) =>
      error
        ? theme.color.error[500]
        : disabled
          ? theme.color.main[900]
          : 'none'};
  border-radius: 8px;
  padding: 12px 24px;
  height: 48px;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

  &:hover {
    border-color: ${({ disabled, error }) =>
      error
        ? theme.color.error[500]
        : disabled
          ? 'none'
          : theme.color.main[500]};
  }
`;

const Input = styled.input`
  display: flex;
  border: none;
  width: 100%;
  &::placeholder {
    font-size: ${theme.font.caption[1].size};
    color: ${theme.color.gray[300]};
  }
  background-color: transparent;
  font-size: ${theme.font.caption[1].size};
  font-weight: ${theme.font.caption[1].fontweight};
  &:hover {
    outline: none;
  }
  outline: none;
  caret-color: ${theme.color.main[500]};

  &:disabled {
    color: ${theme.color.gray[500]};
    cursor: not-allowed;
  }
`;

const Domain = styled.span`
  font-size: ${theme.font.caption[1].size};
  font-weight: ${theme.font.caption[1].fontweight};
  color: ${theme.color.gray[300]};
`;

const ResendButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 40px;
  background: ${theme.color.main[50]};
  color: ${theme.color.main[900]};
  border: none;
  border-radius: 5px;
  font-size: ${theme.font.subTitle[2].size};
  font-weight: ${theme.font.subTitle[2].fontweight};
  cursor: pointer;
  margin-left: 32px;

  &:hover {
    background: ${theme.color.main[100]};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const EmailInput = ({
  label = '이메일',
  value,
  name,
  onChange,
  onKeyDown,
  onButtonClick,
  disabled = false,
  mainText = '',
  subText = '',
  domain = '',
  placeholder = '',
  showButton = true,
  error,
}: EmailInputProps) => {
  const [changeText, setChangeText] = useState<boolean>(false);
  const [internalValue, setInternalValue] = useState<string>('');
  const [timer, setTimer] = useState<number>(0);
  const currentValue = value ?? internalValue;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange?.(val);
    setInternalValue(val);
  };

  const handleButtonClick = () => {
    if (onButtonClick && currentValue) {
      onButtonClick();
      if (!!domain) {
        setTimer(60);
        setChangeText(true);
      }
    }
  };

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const isTimerRunning = timer > 0;

  return (
    <Container>
      <Label>{label}</Label>
      <Wrapper disabled={disabled} error={error}>
        <Input
          type="text"
          name={name}
          value={currentValue}
          placeholder={placeholder}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          disabled={disabled}
        />
        <Domain>{domain}</Domain>
        {showButton && (
          <ResendButton
            onClick={handleButtonClick}
            disabled={disabled || (!!domain && isTimerRunning)}
          >
            {isTimerRunning
              ? `${Math.floor(timer / 60)}:${timer % 60 < 10 ? '0' : ''}${timer % 60}`
              : changeText
                ? subText
                : mainText}
          </ResendButton>
        )}
      </Wrapper>
    </Container>
  );
};
