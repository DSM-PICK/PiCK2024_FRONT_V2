import { useGetAttendanceStatus } from '@/apis/attendance';
import Dropdown from '@/components/dropdown';
import { Layout } from '@/components/layout';
import ClassList from '@/components/list/class';
import { theme } from '@/styles/theme';
import { NotAllClassOption, NotAllGradeOption } from '@/utils/dropdown';
import { setStudentNum } from '@/utils/utils';
import { useState } from 'react';
import { styled } from 'styled-components';

export const SelfStudyCheck = () => {
  const [selectedGrade, setSelectedGrade] = useState<number>(1);
  const [selectedClass, setSelectedClass] = useState<number>(1);
  const { data: attendanceData } = useGetAttendanceStatus(
    selectedGrade,
    selectedClass,
  );

  const handleGradeChange = (option: number | string) => {
    setSelectedGrade(Number(option));
  };

  const handleClassChange = (option: number | string) => {
    setSelectedClass(Number(option));
  };
  return (
    <Layout
      now="출석체크"
      title="출석체크"
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
      <Content>
        {attendanceData?.map((item) => (
          <ClassList
            key={item.id}
            name={item.user_name}
            number={setStudentNum(item)}
            id={item.id}
            status6={item.status6}
            status7={item.status7}
            status8={item.status8}
            status9={item.status9}
            status10={item.status10}
            self
          />
        ))}
      </Content>
    </Layout>
  );
};

const Content = styled.div`
  background-color: ${theme.color.main[50]};
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
