import { useState } from 'react';
import { styled } from 'styled-components';
import { theme } from '@/styles/theme';

interface EmailInputProps {
  label: string;
  resendLabel?: string;
  onChange?: (value: string) => void;
  onResend: () => void;
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

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${theme.color.gray[50]};
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 12px 24px;
  height: 48px;

  &:hover {
    border-color: ${theme.color.main[500]};
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
`;

export const EmailInput = ({
  label = '이메일',
  onChange,
  onResend,
}: EmailInputProps) => {
  const [changeText, setChangeText] = useState<boolean>(false);
  const domain = 'dsm.hs.kr';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange?.(val);
  };

  const handleResend = () => {
    if (onResend) onResend();
    if (!changeText) setChangeText(!changeText);
  };

  return (
    <Container>
      <Label>{label}</Label>
      <Wrapper>
        <Input
          type="text"
          placeholder="학교 이메일을 입력해주세요"
          onChange={handleChange}
        />
        <Domain>{domain}</Domain>
        <ResendButton onClick={handleResend}>
          {changeText ? '재발송' : '발송'}
        </ResendButton>
      </Wrapper>
    </Container>
  );
};
