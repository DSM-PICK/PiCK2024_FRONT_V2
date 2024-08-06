import { Layout } from '@/components/layout';
import * as S from './style';
import { OutListFloor, ReturnSchool } from '@/apis/application';
import OutAcceptList from '@/components/list';
import BottomButtonWrap from '@/components/Button/bottom';
import useAcceptListSelection from '@/hook/selectHook';
import { useState, useEffect } from 'react';
import Modal from '@/components/modal';
import { Dropdown } from '@/components/dropdown';
import { FloorOption } from '@/utils/dropdown';
import { toast } from 'react-toastify';

const OutList = () => {
  const { selectedStudentName, selectedStudents, handleAcceptListClick } =
    useAcceptListSelection();
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
      toast.success(`${selectedStudentName}의 외출 복귀에 성공하셨습니다`);
    },
  });

  const handleFloorChange = (option: number | string) => {
    setSelectedFloor(Number(option));
  };

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
              date={`${item.end_time}`}
              onClick={() => handleAcceptListClick(item.id, item.username)}
            />
          ))}
        </S.OutListContainer>
      </Layout>
      <BottomButtonWrap
        firstContent="복귀 시키기"
        firstOnclick={() => {
          setModal(true);
        }}
        firstSize="standard"
        firstType="main"
        firstDisabled={false}
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
