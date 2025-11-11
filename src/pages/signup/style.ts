import { styled } from 'styled-components';
import { theme } from '@/styles/theme';

export const SignupWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100dvh;
`;

export const SignupText = styled.p`
  font-size: ${theme.font.heading[1].size};
  font-weight: ${theme.font.heading[1].fontWeight};
  user-select: none;
`;

export const PiCKText = styled.span`
  color: ${theme.color.main[500]};
`;

export const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  padding-bottom: 20px;
`;

export const Pickman = styled.image`
  position: absolute;
  left: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  bottom: 0%;
`;

export const Error = styled.div`
  color: ${theme.color.error[500]};
  font-size: ${theme.font.label[1].size};
  font-weight: ${theme.font.label[1].fontweight};
`;

export const Column10 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const EmailRow = styled.div`
  width: 100%;
  display: flex;
  align-items: end;
  gap: 8px;
`;

export const EmailDomain = styled.div`
  padding-bottom: 10px;
  color: ${theme.color.gray[600]};
`;

export const CheckboxRow = styled.label`
  font-size: ${theme.font.label[1].size};
  font-weight: ${theme.font.label[1].fontweight};
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CheckboxInput = styled.input`
  width: 18px;
  height: 18px;
  accent-color: ${theme.color.main[500]};
  cursor: pointer;
`;

export const DropdownRow = styled.div`
  display: flex;
  gap: 12px;
`;

export const AlignStart = styled.div`
  align-self: flex-start;
  width: 100%;
  margin-bottom: 40px;
`;

export const SectionWrap = styled.div`
  height: 130px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
