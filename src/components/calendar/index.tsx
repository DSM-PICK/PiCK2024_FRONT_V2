import { useCallback, useState, useEffect } from 'react';
import * as S from './style';
import lArrow from '@/assets/svg/leftArrow.svg';
import rArrow from '@/assets/svg/rightArrow.svg';
import { SelfstudyGet } from '@/apis/self-study';
import { format } from 'date-fns';
import { enUS, ko } from 'date-fns/locale';
import { styled } from 'styled-components';
import Modal from '../modal';
import { MonthSchedule } from '@/apis/schedule';

interface CalendarProp {
  type: 'selfStudy' | 'schedule';
}

const Calendar = ({ type }: CalendarProp) => {
  const today = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
  };

  const [selectedYear, setSelectedYear] = useState(today.year);
  const [selectedMonth, setSelectedMonth] = useState(today.month);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [modal, setModal] = useState<boolean>(false);

  const formattedMonth = format(
    new Date(selectedYear, selectedMonth - 1),
    'MMMM',
    { locale: enUS },
  ).toUpperCase();

  const { data: selfstudyData, refetch: ReSelfStudyData } = SelfstudyGet(
    formattedMonth,
    selectedYear.toString(),
  );

  const { data: ScheduleData, refetch: ReScheduleData } = MonthSchedule(
    formattedMonth,
    selectedYear.toString(),
  );

  const formattedDate = format(
    new Date(selectedYear, selectedMonth - 1),
    'yyyy년 MMMM',
    { locale: ko },
  );

  useEffect(() => {
    if (type === 'schedule') {
      ReScheduleData();
    } else {
      ReSelfStudyData();
    }
  }, [selectedYear, selectedMonth]);

  const week = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ];

  const lastDay = new Date(selectedYear, selectedMonth, 0).getDate();

  const prevMonth = useCallback(() => {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  }, [selectedMonth, selectedYear]);

  const nextMonth = useCallback(() => {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  }, [selectedMonth, selectedYear]);

  const returnWeek = useCallback(() => {
    return week.map((v, i) => (
      <div
        key={i}
        className={
          v === '일요일'
            ? 'weekday sunday'
            : v === '토요일'
              ? 'weekday saturday'
              : 'weekday'
        }
      >
        {v}
      </div>
    ));
  }, []);

  const returnDay = useCallback(() => {
    let dayArr = [];
    const firstDay = new Date(selectedYear, selectedMonth - 1, 1).getDay();

    for (let i = 0; i < firstDay; i++) {
      dayArr.push(<div key={`empty-${i}`} className="weekday"></div>);
    }

    for (let i = 1; i <= lastDay; i++) {
      const currentDate = new Date(selectedYear, selectedMonth - 1, i);
      const day = currentDate.getDay();
      const dateStr = format(currentDate, 'yyyy-MM-dd');

      const currentData = selfstudyData?.filter(
        (item) => format(new Date(item.date), 'yyyy-MM-dd') === dateStr,
      );

      const currentSchedule = ScheduleData?.filter(
        (item) => item.day === i && item.month === selectedMonth,
      );

      dayArr.push(
        <button
          key={`day-${i}`}
          className={
            day === 0
              ? 'weekday sunday'
              : day === 6
                ? 'weekday saturday'
                : 'weekday'
          }
          onClick={() => {
            setSelectedDay(i);
            setModal(true);
          }}
        >
          {i}
          {type === 'selfStudy' && currentData && currentData.length > 0 && (
            <S.SelfStudyListWrap>
              {currentData
                ?.slice()
                .sort((i, j) => j.floor - i.floor)
                .map((item, idx) => (
                  <S.SelfStudyList key={`selfstudy-${idx}`}>
                    <S.FloorTitle>{item.floor}층</S.FloorTitle>
                    <S.TeacherTitle className="teacher">
                      {item.teacher}
                    </S.TeacherTitle>
                  </S.SelfStudyList>
                ))}
            </S.SelfStudyListWrap>
          )}
          {type === 'schedule' &&
            currentSchedule &&
            currentSchedule.length > 0 && (
              <>
                {currentSchedule?.map((item, index) => (
                  <S.SelfStudyListWrap key={index}>
                    <S.ScheduleList key={item.id}>
                      <S.ScheduleLine />
                      {item.event_name}
                    </S.ScheduleList>
                  </S.SelfStudyListWrap>
                ))}
              </>
            )}
        </button>,
      );
    }

    return dayArr;
  }, [selectedYear, selectedMonth, lastDay, selfstudyData, ScheduleData, type]);

  const selectedDate = selectedDay
    ? new Date(selectedYear, selectedMonth - 1, selectedDay)
    : null;
  const selectedWeekday = selectedDate ? week[selectedDate.getDay()] : '';

  return (
    <S.Container>
      <S.StHeader>
        <div className="buttons">
          <S.ArrowButtons onClick={prevMonth}>
            <img src={lArrow} alt="Previous month" />
          </S.ArrowButtons>
          <S.CalendarDate>{formattedDate}</S.CalendarDate>
          <S.ArrowButtons onClick={nextMonth}>
            <img src={rArrow} alt="Next month" />
          </S.ArrowButtons>
        </div>
      </S.StHeader>
      <Width>
        <S.StWeek>{returnWeek()}</S.StWeek>
        <S.StDate>{returnDay()}</S.StDate>
      </Width>
      {modal && selectedDate && (
        <Modal
          refetchStatus={type === 'schedule' ? ReScheduleData : ReSelfStudyData}
          type={type}
          title={`${selectedMonth}월 ${selectedDay}일 ${selectedWeekday}`}
          subTitle="오늘의 자습감독 선생님"
          onCancel={() => setModal(false)}
          onConfirm={() => {}}
          setState={setModal}
          initialDate={`${selectedYear}-${selectedMonth}-${selectedDay}`}
        />
      )}
    </S.Container>
  );
};

export default Calendar;

const Width = styled.div`
  width: 100%;
`;
