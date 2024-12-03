import React, { useState, useEffect } from 'react';
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
  self?: 'attendance' | 'club';
  status7?: Status;
  status8?: Status;
  status9?: Status;
  status10?: Status;
  refetchStatus: () => void;
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
  refetchStatus,
}: ClassListProp) => {
  const { mutate: ChangeMutate } = ChangeStudentStatus();
  const { mutateAsync: AlltimeChange } = useChangeAttendanceStatus();

  const [statuses, setStatuses] = useState<Status[]>([
    status6,
    status7,
    status8,
    status9,
    status10,
  ]);

  useEffect(() => {
    setStatuses([status6, status7, status8, status9, status10]);
  }, [status6, status7, status8, status9, status10]);

  const updateStatus = async (newStatus: Status, index: number) => {
    const updatedStatuses = statuses.map((status, i) =>
      i >= index ? newStatus : status,
    );
    setStatuses(updatedStatuses);

    if (self) {
      const newModifiedStudents = [
        { user_id: id, status_list: updatedStatuses },
      ];
      await AlltimeChange(newModifiedStudents, {
        onSuccess: () => {
          showToast({ type: 'success', message: '상태가 변경되었습니다.' });
          refetchStatus();
        },
        onError: () => {
          showToast({ type: 'error', message: '상태 변경에 실패했습니다.' });
        },
      });
    } else {
      const newModifiedStudents = [{ user_id: id, status_type: newStatus }];
      ChangeMutate(newModifiedStudents, {
        onSuccess: () => {
          showToast({ type: 'success', message: '상태가 변경되었습니다.' });
          refetchStatus();
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
      <DropdownWrap type={self}>
        {!self && (
          <StatusDrop
            status={useChangeStatusName(statuses[0])}
            onChange={(newStatus) => updateStatus(newStatus as Status, 0)}
            type={self ? 'ATTENDANCE' : 'HOMEROOM'}
          />
        )}
        {self === 'club' && (
          <>
            {[0, 1, 2, 3, 4].map((index) => (
              <StatusDrop
                key={index}
                status={useChangeStatusName(statuses[index])}
                onChange={(newStatus) =>
                  updateStatus(newStatus as Status, index)
                }
                type="ATTENDANCE"
              />
            ))}
          </>
        )}
        {self === 'attendance' && (
          <>
            {[2, 3, 4].map((index) => (
              <StatusDrop
                key={index}
                status={useChangeStatusName(statuses[index])}
                onChange={(newStatus) =>
                  updateStatus(newStatus as Status, index)
                }
                type="ATTENDANCE"
              />
            ))}
          </>
        )}
      </DropdownWrap>
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

const DropdownWrap = styled.div<{ type?: 'attendance' | 'club' }>`
  display: flex;
  justify-content: space-between;
  width: ${(props) =>
    props.type === 'club'
      ? '800px'
      : props.type === 'attendance'
        ? '440px'
        : ''};
`;
