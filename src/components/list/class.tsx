import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import StatusDrop from '../dropdown/status';
import { ChangeStudentStatus } from '@/apis/status';
import { showToast } from '../toast';
import { useChangeStatusName } from '@/utils/utils';
import { useChangeAttendanceStatus } from '@/apis/attendance';

type Status = 'ATTENDANCE' | 'PICNIC' | 'GO_HOME' | 'EMPLOYMENT' | 'DROPOUT';

interface ClassListProp {
  number: string;
  name: string;
  status6: Status;
  id: string;
  self?: boolean;
  status7?: Status;
  status8?: Status;
  status9?: Status;
  status10?: Status;
}

const ClassList = ({
  number,
  name,
  status6,
  id,
  status10 = 'ATTENDANCE',
  status7 = 'ATTENDANCE',
  status8 = 'ATTENDANCE',
  status9 = 'ATTENDANCE',
  self,
}: ClassListProp) => {
  const { mutate: ChangeMutate } = ChangeStudentStatus();
  const { mutate: AlltimeChange } = useChangeAttendanceStatus();
  const [statuses, setStatuses] = useState<Status[]>([
    status6,
    status7,
    status8,
    status9,
    status10,
  ]);

  const updateStatus = async (newStatus: Status, index: number) => {
    const updatedStatuses = [...statuses];
    updatedStatuses[index] = newStatus;

    setStatuses(updatedStatuses);

    if (self) {
      const newModifiedStudents = [
        { user_id: id, status_list: updatedStatuses },
      ];
      try {
        await AlltimeChange(newModifiedStudents);
        showToast({ type: 'success', message: '상태가 변경되었습니다.' });
      } catch (error) {
        showToast({ type: 'error', message: '상태 변경에 실패했습니다.' });
      }
    } else {
      const newModifiedStudents = [{ user_id: id, status_type: newStatus }];
      ChangeMutate(newModifiedStudents, {
        onSuccess: () => {
          showToast({ type: 'success', message: '상태가 변경되었습니다.' });
        },
        onError: () => {
          showToast({ type: 'error', message: '상태 변경에 실패했습니다.' });
        },
      });
    }
  };

  return (
    <ListWrap>
      <Title>
        <div>{number}</div>
        <div>{name}</div>
      </Title>
      <StatusDrop
        status={useChangeStatusName(statuses[0])}
        onChange={(newStatus) => updateStatus(newStatus as Status, 0)}
      />
      {self && (
        <>
          {[1, 2, 3, 4].map((index) => (
            <StatusDrop
              key={index}
              status={useChangeStatusName(statuses[index])}
              onChange={(newStatus) => updateStatus(newStatus as Status, index)}
            />
          ))}
        </>
      )}
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background-color: ${theme.color.main[50]};
  border-radius: 12px;
  min-width: fit-content;
`;
