import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import StatusDrop from '../dropdown/status';
import { ChangeStudentStatus } from '@/apis/status';

type Status = 'ATTENDANCE' | 'PICNIC' | 'GO_HOME' | 'EMPLOYMENT' | 'DROPOUT';

interface ClassListProp {
  number: string;
  name: string;
  status: Status;
  id: string;
}

const ClassList = ({ number, name, status, id }: ClassListProp) => {
  const { mutate: ChangeMutate } = ChangeStudentStatus();
  const [, setModifiedStudents] = useState<
    { user_id: string; status_type: string }[]
  >([]);

  const statusChange = async (newStatus: string) => {
    const newModifiedStudents = [{ user_id: id, status_type: newStatus }];
    setModifiedStudents(newModifiedStudents);

    ChangeMutate(newModifiedStudents, {
      onSuccess: () => {
        alert('변경되었습니다');
        //나중에 토스트로 대체 할 예정
      },
    });
  };

  const changeStatusName = () => {
    switch (status) {
      case 'ATTENDANCE':
        return '출석';
      case 'PICNIC':
        return '현체';
      case 'EMPLOYMENT':
        return '취업';
      case 'GO_HOME':
        return '귀가';
      case 'DROPOUT':
        return '자퇴';
      default:
        return '';
    }
  };

  return (
    <ListWrap>
      <Title>
        <div>{number}</div>
        <div>{name}</div>
      </Title>
      <StatusDrop status={changeStatusName()} onChange={statusChange} />
    </ListWrap>
  );
};

export default ClassList;

const Title = styled.p`
  display: flex;
  font-size: ${theme.font.heading[4].size};
  gap: 4px;
`;

const ListWrap = styled.div`
  gap: 76px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  width: fit-content;
  background-color: ${theme.color.main[50]};
  border-radius: 12px;
  min-width: 330px;
`;
