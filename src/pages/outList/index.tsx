import { Layout } from '@/components/layout';
import * as S from './style';
import { OutListFloor, ReturnSchool } from '@/apis/application';
import OutAcceptList from '@/components/list';
import BottomButtonWrap from '@/components/Button/bottom';
import { useState, useEffect } from 'react';
import Modal from '@/components/modal';
import Dropdown from '@/components/dropdown';
import { FloorOption } from '@/utils/dropdown';
import useSelectionStore from '@/stores/useSelect';
import { showToast } from '@/components/toast';
import { Toggle } from '@/components/toggle';
import { useGetEarlyReturnList } from '@/apis/early-return';
import { getStudentString } from '@/utils/utils';
import { Button } from '@/components/Button';

const OutList = () => {
  const {
    selectedStudentName,
    selectedStudents,
    handleAcceptListClick,
    resetSelection,
  } = useSelectionStore();
  const [selectedFloor, setSelectedFloor] = useState<number>(5);
  const [currentMenu, setCurrentMenu] = useState<
    'application' | 'early-return'
  >('application');
  const { data: OutListFloorData, refetch: refetchOutList } = OutListFloor(
    selectedFloor,
    'OK',
    'application',
  );
  const { data: earlyreturnListData } = useGetEarlyReturnList();
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

  const handleFloorChange = (option: number | string) => {
    setSelectedFloor(Number(option));
  };

  const disabled = selectedStudents.length === 0;

  useEffect(() => {
    resetSelection();
  }, []);

  useEffect(() => {
    resetSelection();
  }, [currentMenu]);

  useEffect(() => {
    refetchOutList();
    resetSelection();
  }, [selectedFloor]);

  return (
    <>
      <Layout
        now="외출자 목록"
        title="외출자 목록"
        right={
          <>
            <Toggle onChange={setCurrentMenu} />
            {currentMenu === 'application' && (
              <Dropdown
                options={FloorOption}
                value={selectedFloor}
                changeHandler={handleFloorChange}
              />
            )}
          </>
        }
      >
        <S.SemiTitle>
          오늘 {currentMenu === 'application' ? '외출' : '조기귀가'}한 학생
        </S.SemiTitle>
        <S.OutListContainer>
          {currentMenu === 'application' ? (
            OutListFloorData?.length ? (
              OutListFloorData?.map((item, index) => (
                <OutAcceptList
                  type={`${currentMenu}List`}
                  key={index}
                  name={getStudentString(item)}
                  content={item.reason}
                  date={`${item.start.slice(0, 5)} ~ ${item.end.slice(0, 5)}`}
                  onClick={() => handleAcceptListClick(item.id, item.user_name)}
                  active={selectedStudents.includes(item.id)}
                />
              ))
            ) : (
              <p>외출자 목록이 없습니다</p>
            )
          ) : earlyreturnListData?.length ? (
            earlyreturnListData?.map((item) => (
              <OutAcceptList
                type={`${currentMenu}List`}
                key={item.class_num}
                name={getStudentString(item)}
                content={item.reason}
                date={item.start.slice(0, 5)}
                active={selectedStudents.includes(item.id)}
                onClick={() => { }}
              />
            ))
          ) : (
            <p>조기귀가 목록이 없습니다</p>
          )}
        </S.OutListContainer>
      </Layout>
      {currentMenu === 'application' && (
        <BottomButtonWrap>
          <Button
            onClick={() => setModal(true)}
            size="standard"
            type="main"
            disabled={disabled}
          >
            복귀 시키기
          </Button>
        </BottomButtonWrap>
      )}
      {modal && (
        <Modal
          refetchStatus={() => { }}
          type="red"
          title={`${selectedStudentName.length > 1
            ? `${selectedStudentName[0]} 학생 외 ${selectedStudentName.length - 1
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
