import { styled } from 'styled-components';
import { theme } from '@/styles/theme';

export const ModalWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #0000008c;
  backdrop-filter: blur(1px);
  height: 100%;
  z-index: 1;
`;

export const ModalStyle = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 30px;
  background-color: ${theme.color.normal.white};
  max-width: 640px;
  border-radius: 12px;
  opacity: 1;
`;

export const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100px;
`;

export const ModalTitle = styled.p`
  text-align: center;
  font-size: ${theme.font.heading[2].size};
  font-weight: ${theme.font.heading[2].fontweight};
  white-space: nowrap;
`;

export const ModalSubTitle = styled.p`
  text-align: center;
  font-size: ${theme.font.subTitle[1].size};
  font-weight: ${theme.font.subTitle[1].fontweight};
  color: ${theme.color.gray[900]};
`;

export const RedButton = styled.button`
  width: 100%;
  height: 100%;
  color: ${theme.color.error[500]};
  background-color: ${theme.color.normal.white};
  border-radius: 0px 0px 12px 0px;
  font-size: ${theme.font.button[1].size};
  font-weight: ${theme.font.button[1].fontweight};
`;

export const ConfirmButton = styled.button`
  width: 100%;
  height: 100%;
  color: ${theme.color.main[500]};
  background-color: ${theme.color.normal.white};
  border-radius: 0px 0px 12px 0px;
  font-size: ${theme.font.button[1].size};
  font-weight: ${theme.font.button[1].fontweight};
`;

export const CancelButton = styled.button`
  width: 100%;
  height: 100%;
  background-color: ${theme.color.normal.white};
  border-radius: 0px 0px 0px 12px;
  font-size: ${theme.font.button[1].size};
  font-weight: ${theme.font.button[1].fontweight};
`;

export const TextWrap = styled.div`
  align-items: center;
  display: flex;
  gap: 20px;
  flex-direction: column;
  width: 100%;
  padding: 48px 51px 0px 51px;
`;

export const SelfInputWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0px 72px 38px 72px;
`;

export const SelfContentWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputWrap = styled.div`
  display: flex;
  gap: 16px;
`;

export const FloorBedge = styled.p`
  padding: 10px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${theme.color.main[50]};
  border-radius: 12px;
  font-size: ${theme.font.heading[4].size};
`;

export const ScheduleWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 44px 36px;
  gap: 60px;
  width: 600px;
  background-color: ${theme.color.normal.white};
  border-radius: 12px;
`;

export const ScheduleTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ScheduleItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 24px 20px;
  background-color: ${theme.color.main[50]};
  border-radius: 12px;
`;

export const ScheduleItemText = styled.p`
  font-size: ${theme.font.heading[3].size};
`;

export const FixContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const DateInput = styled.div``;
