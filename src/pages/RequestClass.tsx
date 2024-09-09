import { AcceptListApi, RequestChange } from '@/apis/class-room';
import { Button } from '@/components/Button';
import BottomButtonWrap from '@/components/Button/bottom';
import Dropdown from '@/components/dropdown';
import { Layout } from '@/components/layout';
import { ClassMoveList } from '@/components/list/classmove';
import Modal from '@/components/modal';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { theme } from '@/styles/theme';
import { getStudentString } from '@/utils/utils';
import { FloorOption } from '@/utils/dropdown';
import useSelectionStore from '@/stores/useSelect';
import { showToast } from '@/components/toast';

const RequestClass = () => {
  const nav = useNavigate();

  const {
    selectedStudents,
    handleAcceptListClick,
    selectedStudentName,
    resetSelection,
  } = useSelectionStore();

  useEffect(() => {
    resetSelection();
  }, []);

  const disabled = selectedStudents.length === 0;

  const [selectedFloor, setSelectFloor] = useState<number>(5);
  const [modal, setModal] = useState<boolean>(false);
  const [state, setState] = useState<'OK' | 'NO'>('OK');

  const { data: GetRequestChange, refetch: ReGetRequestChange } = RequestChange(
    selectedFloor,
    'QUIET',
  );
  const { mutate: AccpetList } = AcceptListApi(state, selectedStudents, {
    onSuccess: () => {
      showToast({
        type: 'success',
        message: `교실이동이 ${state === 'NO' ? '거절' : '수락'}되었습니다`,
      });
      setModal(false);
      ReGetRequestChange();
    },
  });

  const handleFloorChange = (selectedOption: number | string) => {
    setSelectFloor(Number(selectedOption));
  };

  return (
    <>
      <Layout
        now="교실 이동 수락"
        title="교실 이동 수락"
        date={true}
        right={
          <>
            <Button
              onClick={() => {
                nav('accpet');
              }}
              size="small"
              type="main"
            >
              교실 이동 현황 보기
            </Button>
            <Dropdown
              options={FloorOption}
              value={selectedFloor}
              changeHandler={handleFloorChange}
            />
          </>
        }
      >
        <SubTitle>교실 이동 신청한 학생</SubTitle>
        <Wrap>
          {GetRequestChange?.map((item) => (
            <ClassMoveList
              onClick={() => handleAcceptListClick(item.user_id, item.username)}
              name={getStudentString(item)}
              preClass={item.move}
              nextClass={item.classroom_name}
              moveTime={`${item.start_period}교시 ~ ${item.end_period}교시`}
            />
          ))}
        </Wrap>
      </Layout>
      <BottomButtonWrap
        firstContent="거절"
        disabled={disabled}
        firstOnclick={() => {
          setState('NO');
          AccpetList();
        }}
        firstSize="standard"
        firstType="error"
        second={true}
        secondContent="수락"
        secondSize="standard"
        secondOnclick={() => {
          setModal(true);
        }}
        secondType="main"
      />
      {modal && (
        <Modal
          type="check"
          onCancel={() => {
            setModal(false);
          }}
          onConfirm={AccpetList}
          title={`${selectedStudentName[0]}외 ${
            selectedStudents.length - 1
          }학생의 교실이동을 수락하시겠습니까?`}
          subTitle={`확인 시 ${selectedStudentName[0]}외 ${
            selectedStudents.length - 1
          } 학생에게 알림이 보내집니다.`}
        />
      )}
    </>
  );
};

export default RequestClass;

const SubTitle = styled.p`
  font-size: ${theme.font.heading[3].size};
  color: ${theme.color.gray[600]};
`;

const Wrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  row-gap: 36px;
`;
