import { useGetTimeTable } from '@/apis/timetable';
import Dropdown from '@/components/dropdown';
import { Layout } from '@/components/layout';
import { DayTimeTable } from '@/components/timetable';
import { theme } from '@/styles/theme';
import { Class_numOption, GradeOption } from '@/utils/dropdown';
import { useState } from 'react';
import { styled } from 'styled-components';

export const TimeTable = () => {
  const days = ['', '월요일', '화요일', '수요일', '목요일', '금요일'];
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
            options={GradeOption}
            value={selectedGrade}
            changeHandler={handleGradeChange}
          />
          <Dropdown
            options={Class_numOption}
            value={selectedClass}
            changeHandler={handleClassChange}
          />
        </>
      }
    >
      <TimeTableTable>
        <thead>
          <tr style={{ display: 'flex', height: 80 }}>
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
            <DayTimeTable
              key={index}
              data={item.timetables}
              dayIndex={index}
              selectedClass={selectedClass}
              selectedGrade={selectedGrade}
            />
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
