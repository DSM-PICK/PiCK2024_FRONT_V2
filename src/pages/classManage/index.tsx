import { useState, useEffect } from 'react';
import Dropdown from '@/components/dropdown';
import { Layout } from '@/components/layout';
import ClassList from '@/components/list/class';
import { theme } from '@/styles/theme';
import styled from 'styled-components';
import { GetClassStatus } from '@/apis/status';
import { setStudentNum } from '@/utils/utils';
import { Class_numOption, GradeOption } from '@/utils/dropdown';

const ClassManage = () => {
  const [selectedGrade, setSelectedGrade] = useState<number>(1);
  const [selectedClass, setSelectedClass] = useState<number>(1);

  const { data: GetStudentStatus, refetch: ReGetClassStatus } = GetClassStatus(
    selectedGrade,
    selectedClass,
  );

  const handleGrade = (option: string | number) => {
    setSelectedGrade(Number(option));
  };

  const handleClass = (option: string | number) => {
    setSelectedClass(Number(option));
  };

  return (
    <Layout
      now="학급 관리"
      title="학급 관리"
      right={
        <>
          <Dropdown
            options={GradeOption}
            value={selectedGrade}
            changeHandler={handleGrade}
          />
          <Dropdown
            options={Class_numOption}
            value={selectedClass}
            changeHandler={handleClass}
          />
        </>
      }
    >
      <SemiTitle>
        {selectedGrade}학년 {selectedClass}반 {GetStudentStatus?.teacher}선생님
      </SemiTitle>
      <ContentWrap>
        {GetStudentStatus?.students?.map((item) => (
          <ClassList
            key={item.user_id}
            id={item.user_id}
            name={item.name}
            number={setStudentNum(item)}
            status6={item.status}
            refetchStatus={ReGetClassStatus}
          />
        ))}
      </ContentWrap>
    </Layout>
  );
};

export default ClassManage;

const SemiTitle = styled.p`
  font-size: ${theme.font.heading[2].size};
`;

const ContentWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  row-gap: 40px;
  column-gap: 24px;
`;
