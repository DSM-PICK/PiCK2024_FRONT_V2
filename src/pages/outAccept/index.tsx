import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/layout';
import OutAcceptList from '@/components/list';
import BottomButtonWrap from '@/components/Button/bottom';
import { OutRequest, useOutAccept } from '@/apis/application';
import Dropdown from '@/components/dropdown';
import { Class_numOption, GradeOption } from '@/utils/dropdown';
import { styled } from 'styled-components';
import useSelectionStore from '@/stores/useSelect';
import { showToast } from '@/components/toast';
import { Toggle } from '@/components/toggle';

const OutAccept = () => {
  const [selectedGrade, setSelectedGrade] = useState<number>(5);
  const [selectedClass, setSelectedClass] = useState<number>(5);
  const [currentMenu, setCurrentMenu] = useState<
    'application' | 'early-return'
  >('application');
  const [state, setState] = useState<'OK' | 'NO'>('OK');
  const { data: GetOutRequest, refetch: ReGetOutRequest } = OutRequest(
    selectedGrade,
    selectedClass,
    currentMenu,
  );
  const { selectedStudents, handleAcceptListClick, resetSelection } =
    useSelectionStore();

  useEffect(() => {
    ReGetOutRequest();
    resetSelection();
  }, [currentMenu]);

  const { mutate: OutAcceptMutate } = useOutAccept(
    currentMenu,
    state,
    selectedStudents,
    {
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
    },
  );

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
          <RightWrap>
            <Toggle onChange={setCurrentMenu} />
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
          </RightWrap>
        }
      >
        <OutAcceptContainer>
          {GetOutRequest?.length ? (
            GetOutRequest.map((item, index) => (
              <OutAcceptList
                key={index}
                name={item.user_name}
                content={item.reason}
                date={`${item.start}~${item.end}`}
                onClick={() => handleAcceptListClick(item.id, item.user_name)}
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
  row-gap: 40px;
  column-gap: 60px;
`;

const RightWrap = styled.div`
  width: 100%;
  display: flex;
`;
