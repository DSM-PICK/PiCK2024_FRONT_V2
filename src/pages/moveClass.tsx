import { Layout } from '@/components/layout';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { theme } from '@/styles/theme';
import nextSvg from '@/assets/svg/next.svg';
import { ClassMoveList } from '@/components/list/classmove';
import { RequestChange } from '@/apis/class-room';
import { getStudentString } from '@/utils/utils';
import Dropdown from '@/components/dropdown';
import { useEffect, useState } from 'react';
import { FloorOption } from '@/utils/dropdown';
import useSelectionStore from '@/stores/useSelect';

const MoveClass = () => {
  const router = useNavigate();
  const [selectFloor, setSelectFloor] = useState<number>(5);
  const { data: ChangingClass, refetch: ReChangeingClass } = RequestChange(
    selectFloor,
    'OK',
  );

  const handleFloorChange = (selectedOption: number | string) => {
    setSelectFloor(Number(selectedOption));
  };

  useEffect(() => {
    ReChangeingClass();
  }, [selectFloor]);

  return (
    <Layout
      title="교실 이동 현황"
      now={
        <>
          <p
            onClick={() => {
              router('/classMove');
            }}
          >
            교실 이동 수락
          </p>
          <img src={nextSvg} alt="" /> <p>교실 이동 현황</p>
        </>
      }
      right={
        <Dropdown
          options={FloorOption}
          value={selectFloor}
          changeHandler={handleFloorChange}
        />
      }
    >
      <SubTitle>교실 이동 현황</SubTitle>
      <Wrap>
        {ChangingClass?.length ? (
          ChangingClass?.map((item) => (
            <ClassMoveList
              notSelect
              onClick={() => {}}
              name={getStudentString(item)}
              preClass={item.move}
              nextClass={item.classroom_name}
              moveTime={`${item.start}교시 ~ ${item.end}교시`}
            />
          ))
        ) : (
          <p>교실 이동중인 학생이 없습니다</p>
        )}
      </Wrap>
    </Layout>
  );
};

export default MoveClass;

const SubTitle = styled.p`
  font-size: ${theme.font.heading[3].size};
  color: ${theme.color.gray[600]};
`;

const Wrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  row-gap: 36px;
`;
