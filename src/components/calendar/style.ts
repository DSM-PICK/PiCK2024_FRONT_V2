import { styled } from "styled-components";
import "@/styles/theme";
import { theme } from "@/styles/theme";

export const Container = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

export const StHeader = styled.div`
  display: flex;
  justify-content: space-between;
  .buttons {
    display: flex;
    align-items: end;
    gap: 10px;
  }
`;

export const StWeek = styled.div`
  display: flex;
  width: 100%;
  font-size: ${theme.font.heading[3].size};
  .weekday {
    border: 1px solid ${theme.color.gray[100]};
    width: calc(100% / 7);
    text-align: center;
    padding: 24px 0px;
  }
  .saturday {
    color: blue;
  }
  .sunday {
    color: red;
  }
`;

export const StDate = styled.div`
  width: 100%;

  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    font-size: ${theme.font.heading[4].size};
  }
  .weekday {
    float: left;
    width: calc(100% / 7);
    height: 160px;
    border: 1px solid ${theme.color.gray[100]};
    display: flex;
    flex-direction: column;
    padding: 8px;
    box-sizing: border-box;
    gap: 12px;
  }
  .saturday {
    color: blue;
  }
  .sunday {
    color: red;
  }
`;

export const SelfStudyList = styled.div`
  display: flex;
  gap: 4px;
  align-items: baseline;
`;

export const ArrowButtons = styled.button`
  border: none;
  background-color: #00000000;
  cursor: pointer;
`;

export const CalendarDate = styled.div`
  font-size: ${theme.font.heading[1].size};
  font-weight: ${theme.font.heading[1].fontWeight};
`;

export const TeacherTitle = styled.p`
  font-size: ${theme.font.subTitle[1].size};
`;

export const FloorTitle = styled.p`
  font-size: ${theme.font.subTitle[1].size};
  border: 1px solid ${theme.color.main[400]};
  background-color: ${theme.color.main[400]};
  color: ${theme.color.normal.white};
  border-radius: 12px;
  padding: 0px 12px;
`;

export const SelfStudyListWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ScheduleLine = styled.div`
  min-width: 2px;
  height: 100%;
  background-color: ${theme.color.main[500]};
  border-radius: 20px;
`;

export const ScheduleContent = styled.div`
  display: flex;
  align-items: center;
`;

export const ScheduleList = styled.p`
  font-size: ${theme.font.heading[4].size};
  color: ${theme.color.normal.black};
  display: flex;
  align-items: center;
  gap: 8px;
`;
