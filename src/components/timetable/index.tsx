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

  const [subjects, setSubjects] = useState<
    { period: number; name: string; id: string }[]
  >(
    data.map((item) => ({
      period: item.period,
      name: item.subject_name,
      id: item.id,
    })),
  );

  const handleSubjectChange = (index: number, newSubject: string) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index].name = newSubject;
    setSubjects(updatedSubjects);
  };

  const onClickBtn = () => {
    subjects.forEach((subject) => {
      ChangeSubject({
        id: subject.id,
        day_week: dayIndex + 1,
        subject: subject.name,
        period: subject.period,
        grade: selectedGrade,
        class_num: selectedClass,
      });
    });
  };

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
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

const SubjectInput = styled.textarea`
  display: table-cell;
  font-size: ${theme.font.heading[3].size};
  font-weight: ${theme.font.heading[3].fontweight};
  outline: none;
  resize: none;
  text-align: center;
  padding-left: 5;
  padding-right: 50;
  padding-bottom: 50;
  padding-top: 50;
  word-break: break-all;
  width: 100%;
`;
