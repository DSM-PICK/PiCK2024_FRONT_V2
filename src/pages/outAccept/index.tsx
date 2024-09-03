import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout';
import OutAcceptList from '@/components/list';
import BottomButtonWrap from '@/components/Button/bottom';
import { OutRequest, useOutAccept } from '@/apis/application';
import Dropdown from '@/components/dropdown';
import { Class_numOption, GradeOption } from '@/utils/dropdown';
import { toast } from 'react-toastify';
import { styled } from 'styled-components';
import useSelectionStore from '@/stores/useSelect';
import { showToast } from '@/components/toast';

const OutAccept = () => {
  const [selectedGrade, setSelectedGrade] = useState<number>(5);
  const [selectedClass, setSelectedClass] = useState<number>(5);
  const {
    data: GetOutRequest,
    refetch: ReGetOutRequest,
    isLoading,
  } = OutRequest(selectedGrade, selectedClass);
  const { selectedStudents, handleAcceptListClick } = useSelectionStore();
  const { mutate: OutAcceptMutate } = useOutAccept('OK', selectedStudents, {
    onSuccess: () => {
      ReGetOutRequest();
      showToast({ type: 'success', message: '외출수락이 됨' });
    },
  });

  const handleGradeChange = (selectedOption: number | string) => {
    setSelectedGrade(Number(selectedOption));
  };

  const handleClassChange = (selectedOption: number | string) => {
    setSelectedClass(Number(selectedOption));
  };

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
          {GetOutRequest?.map((item, index) => (
            <OutAcceptList
              key={index}
              name={item.username}
              content={item.reason}
              date={`${item.start_time}~${item.end_time}`}
              onClick={() => {
                handleAcceptListClick(item.id, item.username);
              }}
            />
          ))}
        </OutAcceptContainer>
      </Layout>
      <BottomButtonWrap
        firstContent="거절하기"
        secondContent="수락하기"
        firstDisabled={false}
        firstOnclick={() => {
          OutAcceptMutate();
        }}
        firstSize="standard"
        firstType="error"
        second={true}
        secondOnclick={() => {
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
