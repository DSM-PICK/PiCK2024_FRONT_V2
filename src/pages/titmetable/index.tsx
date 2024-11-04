import { useGetTimeTable } from '@/apis/timetable';
import Dropdown from '@/components/dropdown';
import { Layout } from '@/components/layout';
import { DayTimeTable } from '@/components/timetable';
import { theme } from '@/styles/theme';
import { NotAllClassOption, NotAllGradeOption } from '@/utils/dropdown';
import { useState } from 'react';
import { styled } from 'styled-components';

export const TimeTable = () => {
  const days = ['월요일', '화요일', '수요일', '목요일', '금요일'];
  const period = [1, 2, 3, 4, 5, 6, 7];
  const [selectedGrade, setSelectedGrade] = useState<number>(1);
  const [selectedClass, setSelectedClass] = useState<number>(1);
  const { data: GetTimeTableData } = useGetTimeTable(
    selectedGrade,
    selectedClass,
  );

  const handleGradeChange = (selectedOption: number | string) => {
    setSelectedGrade(Number(selectedOption));
  };

  const handleClassChange = (selectedOption: number | string) => {
    setSelectedClass(Number(selectedOption));
  };

  return (
    <Layout
      now="시간표"
      title="시간표"
      right={
        <>
          <Dropdown
            options={NotAllGradeOption}
            value={selectedGrade}
            changeHandler={handleGradeChange}
          />
          <Dropdown
            options={NotAllClassOption}
            value={selectedClass}
            changeHandler={handleClassChange}
          />
        </>
      }
    >
      <TimeTableTable>
        <thead>
          <tr style={{ display: 'flex', height: 80 }}>
            <FirstTable>
              <p>요일</p>
              교시
            </FirstTable>
            {days.map((item) => (
              <Days key={item}>{item}</Days>
            ))}
          </tr>
        </thead>

        <Tr>
          <tr>
            {period.map((periodIndex) => (
              <Period key={periodIndex}>{periodIndex}교시</Period>
            ))}
          </tr>
          {GetTimeTableData?.map((item, index) => (
            <>
              <p>{item.date}</p>
              <DayTimeTable
                key={index}
                data={item.timetables}
                dayIndex={index}
                selectedClass={selectedClass}
                selectedGrade={selectedGrade}
              />
            </>
          ))}
        </Tr>
      </TimeTableTable>
    </Layout>
  );
};

const TimeTableTable = styled.table`
  border: 1px solid ${theme.color.gray[100]};
  border-collapse: collapse;
  font-size: ${theme.font.heading[3].size};
  font-weight: ${theme.font.heading[3].fontweight};
`;

const Days = styled.td`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 240px;
  border: 1px solid ${theme.color.gray[100]};
`;

const Tr = styled.div`
  display: flex;
`;

const Period = styled.td`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 240px;
  height: 120px;
  border: 1px solid ${theme.color.gray[100]};
  color: ${theme.color.main[500]};
`;

const FirstTable = styled.td`
  width: 240px;
  text-align: left;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" /></svg>');
  & > p {
    text-align: right;
  }
  padding: 4px 40px;
`;
