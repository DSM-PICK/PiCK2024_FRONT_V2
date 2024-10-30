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
import Modal from '@/components/modal';
import { useAcceptModal } from '@/hook/useModal';

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
  const {
    selectedStudents,
    handleAcceptListClick,
    resetSelection,
    selectedStudentName,
  } = useSelectionStore();
  const [modal, setModal] = useState<boolean>(false);

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
        setModal(false);
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
    const newGrade = Number(selectedOption);
    setSelectedClass(
      newGrade === 5 ? 5 : selectedClass === 5 ? 1 : selectedClass,
    );
    setSelectedGrade(newGrade);
  };
  const handleClassChange = (selectedOption: number | string) => {
    const newClass = Number(selectedOption);
    setSelectedGrade(
      newClass === 5 ? 5 : selectedGrade === 5 ? 1 : selectedGrade,
    );
    setSelectedClass(newClass);
  };

  const disabled = selectedStudents.length === 0;

  return (
    <>
      <Layout
        now={`${currentMenu === 'application' ? '외출' : '조기귀가'} 수락`}
        title={`${currentMenu === 'application' ? '외출' : '조기귀가'} 수락`}
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
                date={item.end ? `${item.start}~${item.end}` : `${item.start}`}
                onClick={() => handleAcceptListClick(item.id, item.user_name)}
              />
            ))
          ) : (
            <p>
              {currentMenu === 'application' ? '외출' : '조기귀가'} 신청이
              없습니다
            </p>
          )}
        </OutAcceptContainer>
      </Layout>
      <BottomButtonWrap
        firstContent="거절하기"
        secondContent="수락하기"
        disabled={disabled}
        firstOnclick={() => {
          setState('NO');
          setModal(true);
        }}
        firstSize="standard"
        firstType="error"
        second={true}
        secondOnclick={() => {
          setState('OK');
          setModal(true);
        }}
        secondSize="standard"
        secondType="main"
      />
      {modal && (
        <Modal
          type="check"
          title={useAcceptModal({
            students: selectedStudentName,
            accept: state,
            option: '외출을',
          })}
          subTitle=""
          onCancel={() => setModal(false)}
          onConfirm={OutAcceptMutate}
        />
      )}
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
  gap: 12px;
  align-items: center;
`;
