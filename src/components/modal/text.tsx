import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import WrappedCalendarComponents from './components/calendar';
import { theme } from '@/styles/theme';
import useCalendar from '@/hook/useCalendar';

export default function CustomDateInput() {
  const CalendarRef = useRef<HTMLDivElement>(null);
  const [isEndOpen, setIsEndOpen] = useState<boolean>(false);
  const [isStartOpen, setIsStartOpen] = useState<boolean>(false);
  const { selectedDate } = useCalendar();
  const [startData, setStartData] = useState<string>('');
  const [endData, setEndData] = useState<string>('');

  const handleDateChange = (date: any) => {
    selectedDate.selectDate(date);
    if (isStartOpen) {
      setStartData(date);
    } else {
      setEndData(date);
    }
    setIsStartOpen(false);
    setIsEndOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        CalendarRef.current &&
        !CalendarRef.current.contains(event.target as Node)
      ) {
        setIsStartOpen(false);
        setIsEndOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Content ref={CalendarRef}>
      <Test>
        <Input placeholder="ex) 4" /> 월 주말급식
      </Test>
      <Wrap>
        <Test>
          <Input
            type="text"
            value={startData}
            onClick={() => {
              setIsStartOpen(!isStartOpen);
              setIsEndOpen(false);
            }}
            placeholder="날짜 선택"
            readOnly
            onChange={handleDateChange}
          />
          {isStartOpen && (
            <WrappedCalendarComponents onClickDate={handleDateChange} />
          )}
        </Test>
        <Font>부터</Font>
        <Test>
          <Input
            type="text"
            value={endData}
            onClick={() => {
              setIsEndOpen(!isEndOpen);
              setIsStartOpen(false);
            }}
            placeholder="날짜 선택"
            readOnly
          />

          {isEndOpen && (
            <WrappedCalendarComponents onClickDate={handleDateChange} />
          )}
        </Test>
        <Font>까지</Font>
      </Wrap>
    </Content>
  );
}

const Test = styled.div`
  position: relative;
`;

const Input = styled.input`
  padding: 0px 10px;
  border: 1px solid ${theme.color.gray[50]};
  border-radius: 5px;
  width: 200px;
  height: 56px;
  cursor: pointer;
  position: relative;
  background-color: ${theme.color.gray[50]};
  font-size: ${theme.font.caption[1].size};
  font-weight: ${theme.font.caption[1].fontweight};

  &:focus {
    outline: none;
    border-color: ${theme.color.main[500]};
  }
`;

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 40px;
  padding: 0px 53px;
`;

const Font = styled.p`
  font-size: ${theme.font.label[1].size};
  font-weight: ${theme.font.label[1].fontweight};
`;
