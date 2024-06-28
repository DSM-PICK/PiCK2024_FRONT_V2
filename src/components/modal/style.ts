import { styled } from "styled-components";
import { theme } from "@/styles/theme";

export const ModalWrap = styled.div`
  position: absolute;
  top: 0;
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
  background-color: ${theme.color.normal.white};
  max-width: 565px;
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
`;

export const ModalSubTitle = styled.p`
  text-align: center;
  font-size: ${theme.font.subTitle[1].size};
  font-weight: ${theme.font.subTitle[1].fontweight};
  color: ${theme.color.gray[900]};
`;

export const ConfirmButton = styled.button`
  width: 100%;
  height: 100%;
  color: ${theme.color.error[500]};
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
  padding: 48px 62px;
`;
