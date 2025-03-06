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
import { useAcceptModal } from '@/hook/useModal';

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
    onError: () => {
      showToast({
        type: 'error',
        message: `교실이동 ${state === 'NO' ? '거절' : '수락'}에 실패하였습니다`,
      });
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
        right={
          <>
            <Button
              onClick={() => {
                nav('/classMoveList');
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
          {GetRequestChange?.length ? (
            GetRequestChange?.map((item) => (
              <ClassMoveList
                onClick={() =>
                  handleAcceptListClick(item.user_id, item.user_name)
                }
                name={getStudentString(item)}
                preClass={item.move}
                nextClass={item.classroom_name}
                moveTime={`${item.start}교시 ~ ${item.end}교시`}
              />
            ))
          ) : (
            <p>교실이동 신청학생이 없습니다</p>
          )}
        </Wrap>
      </Layout>
      <BottomButtonWrap>
        <Button type="error" size='standard' disabled={disabled} onClick={() => {
          setState('NO');
          AccpetList()
        }}>거절</Button>
        <Button type='main' size='standard' disabled={disabled} onClick={() => {
          setState('OK');
          setModal(true)
        }}>수락</Button>
      </BottomButtonWrap>
      {modal && (
        <Modal
          refetchStatus={() => { }}
          type="check"
          onCancel={() => {
            setModal(false);
          }}
          onConfirm={AccpetList}
          title={useAcceptModal({
            students: selectedStudentName,
            accept: state,
            option: '교실이동을',
          })}
          subTitle={''}
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
