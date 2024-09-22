import { useTimeTableChange } from '@/apis/timetable';
import { theme } from '@/styles/theme';
import { useState } from 'react';
import { styled } from 'styled-components';
interface TimeTableProps {
  id: string;
  period: number;
  subject_name: string;
  image: string;
}

interface DayTimeTableProps {
  data: TimeTableProps[];
  dayIndex: number;
  selectedGrade: number;
  selectedClass: number;
}

export const DayTimeTable = ({
  data,
  dayIndex,
  selectedGrade,
  selectedClass,
}: DayTimeTableProps) => {
  const { mutate: ChangeSubject } = useTimeTableChange();

  const [subjects, setSubjects] = useState<{ period: number; name: string }[]>(
    data.map((item) => ({ period: item.period, name: item.subject_name })),
  );

  const handleSubjectChange = (index: number, newSubject: string) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index].name = newSubject;
    setSubjects(updatedSubjects);
  };

  const onClickBtn = () => {
    subjects.forEach((subject) => {
      ChangeSubject({
        day_week: dayIndex + 1,
        subject: subject.name,
        period: subject.period,
        grade: selectedGrade,
        class_num: selectedClass,
      });
    });
  };

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      onClickBtn();
    }
  };

  return (
    <tr>
      {subjects.map((item, index) => (
        <Subject key={index}>
          <SubjectInput
            value={item.name}
            onChange={(e) => handleSubjectChange(index, e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </Subject>
      ))}
    </tr>
  );
};

const Subject = styled.td`
  padding: 21px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 240px;
  height: 120px;
  border: 1px solid ${theme.color.gray[100]};
`;

const SubjectInput = styled.input`
  width: 100%;
  height: 100%;
  font-size: ${theme.font.heading[3].size};
  font-weight: ${theme.font.heading[3].fontweight};
  outline: none;
`;
