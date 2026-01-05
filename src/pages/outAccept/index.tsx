import { useEffect, useState } from 'react';
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
import { getStudentString } from '@/utils/utils';
import { Button } from '@/components/Button';

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

  const { mutate: OutAcceptMutate, isPending } = useOutAccept(
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
    resetSelection();
  };
  const handleClassChange = (selectedOption: number | string) => {
    const newClass = Number(selectedOption);
    setSelectedGrade(
      newClass === 5 ? 5 : selectedGrade === 5 ? 1 : selectedGrade,
    );
    setSelectedClass(newClass);
    resetSelection();
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
                active={selectedStudents.includes(item.id)}
                type={`${currentMenu}accept`}
                key={index}
                name={getStudentString(item)}
                content={item.reason}
                date={
                  item.end
                    ? `${item.start.slice(0, 5)} ~ ${item.end.slice(0, 5)}`
                    : `${item.start.slice(0, 5)}`
                }
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
      <BottomButtonWrap>
        <Button
          disabled={disabled}
          onClick={() => {
            setState('NO');
            setModal(true);
          }}
          size="standard"
          type="error"
        >
          거절하기
        </Button>
        <Button
          disabled={disabled}
          onClick={() => {
            setState('OK');
            setModal(true);
          }}
          size="standard"
          type="main"
        >
          수락하기
        </Button>
      </BottomButtonWrap>
      {modal && (
        <Modal
          refetchStatus={() => { }}
          type="check"
          title={useAcceptModal({
            students: selectedStudentName,
            accept: state,
            option: '외출을',
          })}
          subTitle=""
          onCancel={() => setModal(false)}
          onConfirm={OutAcceptMutate}
          confirmDisabled={isPending}
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
