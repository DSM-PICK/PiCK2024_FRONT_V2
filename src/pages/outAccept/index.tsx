import React, { useState } from 'react';
import { Layout } from '@/components/layout';
import OutAcceptList from '@/components/list';
import BottomButtonWrap from '@/components/Button/bottom';
import { OutRequest, useOutAccept } from '@/apis/application';
import Dropdown from '@/components/dropdown';
import { Class_numOption, GradeOption } from '@/utils/dropdown';
import { styled } from 'styled-components';
import useSelectionStore from '@/stores/useSelect';
import { showToast } from '@/components/toast';

const OutAccept = () => {
  const [selectedGrade, setSelectedGrade] = useState<number>(5);
  const [selectedClass, setSelectedClass] = useState<number>(5);
  const [state, setState] = useState<'OK' | 'NO'>('OK');
  const { data: GetOutRequest, refetch: ReGetOutRequest } = OutRequest(
    selectedGrade,
    selectedClass,
  );
  const { selectedStudents, handleAcceptListClick, resetSelection } =
    useSelectionStore();

  console.log(selectedStudents);
  const { mutate: OutAcceptMutate } = useOutAccept(state, selectedStudents, {
    onSuccess: () => {
      ReGetOutRequest();
      resetSelection();
      showToast({
        type: 'success',
        message: `외출신청이 ${state === 'OK' ? '수락' : '거절'}되었습니다`,
      });
    },
    onError: () => {
      showToast({
        type: 'error',
        message: '수락 처리 중 오류가 발생했습니다',
      });
    },
  });

  const handleGradeChange = (selectedOption: number | string) => {
    setSelectedGrade(Number(selectedOption));
  };

  const handleClassChange = (selectedOption: number | string) => {
    setSelectedClass(Number(selectedOption));
  };

  const disabled = selectedStudents.length === 0;

  return (
    <>
      <Layout
        now="외출 수락"
        title="외출 수락"
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
        <OutAcceptContainer>
          {GetOutRequest?.length ? (
            GetOutRequest.map((item, index) => (
              <OutAcceptList
                key={index}
                name={item.username}
                content={item.reason}
                date={`${item.start}~${item.end}`}
                onClick={() => handleAcceptListClick(item.id, item.username)}
              />
            ))
          ) : (
            <p>외출 신청이 없습니다</p>
          )}
        </OutAcceptContainer>
      </Layout>
      <BottomButtonWrap
        firstContent="거절하기"
        secondContent="수락하기"
        disabled={disabled}
        firstOnclick={() => {
          setState('NO');
          OutAcceptMutate();
        }}
        firstSize="standard"
        firstType="error"
        second={true}
        secondOnclick={() => {
          setState('OK');
          OutAcceptMutate();
        }}
        secondSize="standard"
        secondType="main"
      />
    </>
  );
};

export default OutAccept;

const OutAcceptContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  flex-wrap: wrap;
  row-gap: 40px;
  column-gap: 60px;
`;
