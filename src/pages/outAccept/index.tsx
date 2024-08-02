import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout';
import OutAcceptList from '@/components/list';
import * as S from './style';
import BottomButtonWrap from '@/components/Button/bottom';
import { OutRequest, useOutAccept } from '@/apis/application';
import useAcceptListSelection from '@/hook/selectHook';
import { Dropdown } from '@/components/dropdown';
import { Class_numOption, GradeOption } from '@/utils/dropdown';

const OutAccept = () => {
  const [selectedGrade, setSelectedGrade] = useState<number>(5);
  const [selectedClass, setSelectedClass] = useState<number>(5);

  const { data: GetOutRequest, refetch: ReGetOutRequest } = OutRequest(
    selectedGrade,
    selectedClass,
  );
  const { mutate: OutAcceptMutate } = useOutAccept();
  const { selectedStudents, handleAcceptListClick } = useAcceptListSelection();

  const handleGradeChange = (selectedOption: number | string) => {
    setSelectedGrade(Number(selectedOption));
  };

  const handleClassChange = (selectedOption: number | string) => {
    setSelectedClass(Number(selectedOption));
  };

  useEffect(() => {
    ReGetOutRequest();
  }, [selectedGrade, selectedClass]);

  const OutAccept = () => {
    OutAcceptMutate({ status: 'OK', ids: selectedStudents });
  };

  const RefuseOut = () => {
    OutAcceptMutate(
      { status: 'NO', ids: selectedStudents },
      {
        onSuccess: () => {
          window.location.reload();
        },
      },
    );
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
        <S.OutAcceptContainer>
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
        </S.OutAcceptContainer>
      </Layout>
      <BottomButtonWrap
        firstContent="거절하기"
        secondContent="수락하기"
        firstDisabled={false}
        firstOnclick={() => {
          RefuseOut();
        }}
        firstSize="standard"
        firstType="error"
        second={true}
        secondOnclick={() => {
          OutAccept();
        }}
        secondSize="standard"
        secondType="main"
      />
    </>
  );
};

export default OutAccept;
