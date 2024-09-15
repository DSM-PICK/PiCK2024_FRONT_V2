import { Layout } from '@/components/layout';
import * as S from './style';
import { OutListFloor, ReturnSchool } from '@/apis/application';
import OutAcceptList from '@/components/list';
import BottomButtonWrap from '@/components/Button/bottom';
import { useState, useEffect } from 'react';
import Modal from '@/components/modal';
import Dropdown from '@/components/dropdown';
import { FloorOption } from '@/utils/dropdown';
import { toast } from 'react-toastify';
import useSelectionStore from '@/stores/useSelect';
import { showToast } from '@/components/toast';

const OutList = () => {
  const {
    selectedStudentName,
    selectedStudents,
    handleAcceptListClick,
    resetSelection,
  } = useSelectionStore();
  const [selectedFloor, setSelectedFloor] = useState<number>(5);
  const { data: OutListFloorData, refetch: refetchOutList } = OutListFloor(
    selectedFloor,
    'OK',
  );
  const [modal, setModal] = useState<boolean>(false);
  const { mutate: Return } = ReturnSchool(selectedStudents, {
    onSuccess: () => {
      refetchOutList();
      setModal(false);
      resetSelection();
      showToast({
        type: 'success',
        message: `${selectedStudentName} 외출 복귀되었습니다.`,
      });
    },
  });

  console.log(selectedStudents);

  const handleFloorChange = (option: number | string) => {
    setSelectedFloor(Number(option));
  };

  const disabled = selectedStudents.length === 0;

  useEffect(() => {
    resetSelection();
  }, []);

  useEffect(() => {
    refetchOutList();
  }, [selectedFloor]);

  return (
    <>
      <Layout
        now="외출자 목록"
        title="외출자 목록"
        right={
          <Dropdown
            options={FloorOption}
            value={selectedFloor}
            changeHandler={handleFloorChange}
          />
        }
      >
        <S.SemiTitle>오늘 외출한 학생</S.SemiTitle>
        <S.OutListContainer>
          {OutListFloorData?.map((item, index) => (
            <OutAcceptList
              key={index}
              name={item.username}
              content={item.reason}
              date={`${item.start} ~ ${item.end}`}
              onClick={() => handleAcceptListClick(item.id, item.username)}
            />
          ))}
        </S.OutListContainer>
      </Layout>
      <BottomButtonWrap
        firstContent="복귀 시키기"
        firstOnclick={() => setModal(true)}
        firstSize="standard"
        firstType="main"
        disabled={disabled}
      />
      {modal && (
        <Modal
          type="red"
          title={`${
            selectedStudentName.length > 1
              ? `${selectedStudentName[0]} 학생 외 ${
                  selectedStudentName.length - 1
                }명을 복귀시키겠습니까?`
              : selectedStudentName.length === 1
                ? `${selectedStudentName[0]}을 복귀시키겠습니까?`
                : ''
          }`}
          subTitle="복귀 시에는 외출이 끝나게 됩니다."
          onCancel={() => {
            setModal(false);
          }}
          onConfirm={Return}
        />
      )}
    </>
  );
};

export default OutList;
