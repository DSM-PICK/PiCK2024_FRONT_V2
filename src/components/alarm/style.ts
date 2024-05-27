import styled from "styled-components";
import { theme } from "styles/theme";

export const AlarmWrap = styled.div`
  position: absolute;
  width: 400px;
  height: 412px;
  overflow-y: scroll;
  border-radius: 12px;
  background-color: ${theme.color.normal.white};
  border: 1px solid ${theme.color.gray[50]};
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${theme.color.gray[400]};
    border-radius: 8px;
  }
  &::-webkit-scrollbar-track {
    background-color: none;
  }
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

export const AlarmTitle = styled.div`
  width: auto;
  display: flex;
  justify-content: space-between;
  padding: 18px 24px;
`;

export const scrollbar = styled.div``;

export const AllRead = styled.button`
  border: none;
  background-color: #fff;
  color: ${theme.color.main[500]};
  font-size: ${theme.font.body[3].size};
  font-weight: ${theme.font.body[3].fontweight};
`;

export const AlarmCount = styled.span`
  font-size: ${theme.font.body[3].size};
  font-weight: ${theme.font.body[3].fontweight};
`;

export const AlarmContent = styled.div`
  padding: 12px 24px;
  width: auto;
  display: flex;
  flex-direction: column;
  gap: 4px;
  &:hover {
    background-color: ${theme.color.main[50]};
  }
`;

export const AlarmContentTitle = styled.p`
  margin: 0;
  font-size: ${theme.font.body[3].size};
  font-weight: ${theme.font.body[3].fontweight};
  color: ${theme.color.normal.black};
`;

export const AlarmContentDate = styled.p`
  margin: 0;
  font-size: ${theme.font.body[3].size};
  font-weight: ${theme.font.body[3].fontweight};
  color: ${theme.color.gray[500]};
`;

export const Test = styled.div`
  width: auto;
  padding: 18px 24px;
  display: flex;
  gap: 34px;
  font-size: ${theme.font.body[2].size};
  font-weight: ${theme.font.body[2].fontweight};
  color: ${theme.color.normal.black};
`;

export const TestTitle = styled.div`
  width: auto;
  padding: 18px 24px;
  display: flex;
  gap: 34px;
  font-size: ${theme.font.body[2].size};
  font-weight: ${theme.font.body[2].fontweight};
  color: ${theme.color.gray[400]};
`;
