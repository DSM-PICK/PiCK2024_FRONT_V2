import styled from "styled-components";
import { theme } from "@/styles/theme";

export const Test = styled.div`
  display: flex;
`;

export const NoticeWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 80px 20px 20px;
  cursor: pointer;
  background-color: ${theme.color.gray[50]};
  font-size: ${theme.font.heading[4].size};
  font-weight: ${theme.font.heading[4].fontweight};
`;

export const NoticeTopRight = styled.div`
  display: flex;
  gap: 120px;
`;

export const NoticeDetailRight = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const NoticeDetailRightText = styled.p`
  font-size: ${theme.font.subTitle[1].size};
  font-weight: ${theme.font.subTitle[1].fontweight};
`;

export const NoticeDetailContent = styled.p`
  font-size: ${theme.font.heading[4].size};
  white-space: pre-line;
`;

export const NoticeWrite = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const NoticeBedge = styled.div`
  display: flex;
  padding: 12px;
  background-color: ${theme.color.gray[50]};
  border-radius: 12px;
  font-size: ${theme.font.heading[3].size};
`;

export const NoticeBedgeTitle = styled.p`
  font-size: ${theme.font.heading[3].size};
  font-weight: ${theme.font.heading[3].fontweight};
`;

export const NoticeWriteTop = styled.div`
  display: flex;
  align-items: center;
  gap: 45px;
`;

export const WriteTextarea = styled.textarea`
  max-width: 100%;
  height: 172px;
  resize: none;
  font-size: ${theme.font.caption[1].size};
  background-color: ${theme.color.gray[50]};
  border-radius: 12px;
  padding: 20px 20px;
  &::placeholder {
    font-size: ${theme.font.caption[1].size};
    color: ${theme.color.gray[300]};
  }
  outline: none;
  caret-color: ${theme.color.main[500]};
`;

export const InputLabel = styled.p`
  font-size: ${theme.font.label[1].size};
  font-weight: ${theme.font.label[1].fontweight};
`;

export const TextareaWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
