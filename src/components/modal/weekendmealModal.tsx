import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import WrappedCalendarComponents from './components/calendar';
import { theme } from '@/styles/theme';
import useCalendar from '@/hook/useCalendar';
import * as S from './style';
import {
  useChangeWeekendMealPeriod,
  useGetWeekendMealInfo,
} from '@/apis/weekend-meals';
import { showToast } from '../toast';

interface ModalProp {
  title: string;
  subTitle: string;
  onCancel: () => void;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

export const WeekendMealModal = ({
  title,
  subTitle,
  onCancel,
  setState,
}: ModalProp) => {
  const CalendarRef = useRef<HTMLDivElement>(null);
  const [isEndOpen, setIsEndOpen] = useState<boolean>(false);
  const [isStartOpen, setIsStartOpen] = useState<boolean>(false);
  const { selectedDate } = useCalendar();
  const weekendMealInfo = useGetWeekendMealInfo();
  const [startData, setStartData] = useState<string | undefined>(
    weekendMealInfo[0].data?.start,
  );
  const [endData, setEndData] = useState<string | undefined>(
    weekendMealInfo[0].data?.end,
  );
  const [month, setMonth] = useState<number | undefined>(
    weekendMealInfo[1].data?.month,
  );
  const { mutate: ChangePeriod, isPending } = useChangeWeekendMealPeriod(
    startData!,
    endData!,
    month! - 1,
    {
      onSuccess: () => {
        showToast({
          type: 'success',
          message: '주말급식신청 기간 변경에 성공하였습니다',
        });
        setState(false);
      },

      onError: () => {
        showToast({
          type: 'error',
          message: '주말급식신청 기간 변경에 실패하였습니다.',
        });
        setState(false);
      },
    },
  );

  const handleChange = (selected: any) => {
    const data = selected.target.value;
    setMonth(data);
  };

  useEffect(() => {
    if (!weekendMealInfo?.[0]?.data || !weekendMealInfo?.[1]?.data) return;
    const { start, end } = weekendMealInfo[0].data;
    const { month } = weekendMealInfo[1].data;
    if (start && end) {
      setEndData(end);
      setStartData(start);
      setMonth(month);
    }
  }, [weekendMealInfo?.[0]?.data, weekendMealInfo?.[1]?.data]);

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
    <S.ModalWrap>
      <S.ModalStyle>
        <S.TextWrap>
          <S.ModalTitle>{title}</S.ModalTitle>
          <S.ModalSubTitle>{subTitle}</S.ModalSubTitle>
        </S.TextWrap>
        <Content ref={CalendarRef}>
          <Test>
            <DateInput
              placeholder="ex) 4"
              onChange={handleChange}
              name="month"
              value={month}
              min={1}
              max={12}
            />
            월 주말급식
          </Test>
          <Wrap>
            <Test>
              <DateInput
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
              <DateInput
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
        <S.ButtonWrap>
          <S.CancelButton onClick={onCancel}>취소</S.CancelButton>
          <S.ConfirmButton onClick={() => ChangePeriod()} disabled={isPending}>
            확인
          </S.ConfirmButton>
        </S.ButtonWrap>
      </S.ModalStyle>
    </S.ModalWrap>
  );
};

const Test = styled.div`
  position: relative;
`;

const DateInput = styled.input`
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
