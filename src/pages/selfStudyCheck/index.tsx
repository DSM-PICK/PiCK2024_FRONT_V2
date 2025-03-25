import { useGetAttendanceStatus } from '@/apis/attendance';
import Dropdown from '@/components/dropdown';
import { Layout } from '@/components/layout';
import ClassList from '@/components/list/class';
import useDropdownInformation from '@/stores/useDropdown';
import { theme } from '@/styles/theme';
import { getWeekDay } from '@/utils/date';
import { NotAllClassOption, NotAllGradeOption } from '@/utils/dropdown';
import { setStudentNum } from '@/utils/utils';
import { useState } from 'react';
import { styled } from 'styled-components';

export const SelfStudyCheck = () => {
  const period = ['8교시', '9교시', '10교시'];
  const fullperiod = ['6교시', '7교시', '8교시', '9교시', '10교시'];
  const { dropdownInfo, setDropdownInfo } = useDropdownInformation();
  const [selectedGrade, setSelectedGrade] = useState<number>(dropdownInfo?.grade || 1);
  const [selectedClass, setSelectedClass] = useState<number>(dropdownInfo?.class_num || 1);
  const { data: attendanceData } = useGetAttendanceStatus(
    selectedGrade,
    selectedClass,
  );

  const handleGradeChange = (option: number | string) => {
    const grade = Number(option)
    setSelectedGrade(grade)
    setDropdownInfo({
      grade: grade,
      class_num: selectedClass,
    });
  };

  const handleClassChange = (option: number | string) => {
    const classNum = Number(option)
    setSelectedClass(classNum)
    setDropdownInfo({
      grade: selectedGrade,
      class_num: classNum,
    });
  };
  return (
    <Layout
      now="자습시간 출결"
      title="자습시간 출결"
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
        <TitleContainer>
          <PeriodText>{getWeekDay()}요일</PeriodText>
          <PeriodMap>
            {getWeekDay() === '금'
              ? fullperiod.map((item) => (
                  <PeriodText key={item}>{item}</PeriodText>
                ))
              : period.map((item) => (
                  <PeriodText key={item}>{item}</PeriodText>
                ))}
          </PeriodMap>
        </TitleContainer>

        {attendanceData?.map((item) => (
          <ClassList
            refetchStatus={() => {}}
            key={item.id}
            name={item.user_name}
            number={setStudentNum(item)}
            id={item.id}
            status6={item.status6}
            status7={item.status7}
            status8={item.status8}
            status9={item.status9}
            status10={item.status10}
            self={getWeekDay() === '금' ? 'club' : 'attendance'}
          />
        ))}
      </Content>
    </Layout>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PeriodMap = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: clamp(60px, 10vw, 120px);
  padding: 16px 20px;
`;

const PeriodText = styled.p`
  font-size: ${theme.font.heading[3].size};
  font-weight: ${theme.font.heading[3].fontweight};
`;
