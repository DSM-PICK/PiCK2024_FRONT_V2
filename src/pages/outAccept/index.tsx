import React, { useState, useEffect } from "react";
import Dropdown from "components/dropdown";
import { Layout } from "components/layout";
import OutAcceptList from "components/outAccept";
import * as S from "./style";
import BottomButtonWrap from "components/Button/bottom";
import { applicationDataProp } from "apis/type";
import { OutRequest, useOutAccept } from "apis/application";
import useAcceptListSelection from "hook/selectHook";

interface Option {
  value: number;
  label: string;
}

const OutAccept = () => {
  const [selectedGrade, setSelectedGrade] = useState<number>(5);
  const [selectedClass, setSelectedClass] = useState<number>(5);
  const [data, setData] = useState<applicationDataProp[]>([]);
  const { mutate: GetOutRequest } = OutRequest();
  const { mutate: OutAcceptMutate } = useOutAccept();
  const { selectedStudents, selectedStudentName, handleAcceptListClick } =
    useAcceptListSelection();

  const handleGradeChange = (selectedOption: Option) => {
    setSelectedGrade(selectedOption.value);
    if (selectedOption.value === 5) {
      setSelectedClass(5);
    }
  };
  const handleClassChange = (selectedOption: Option) => {
    setSelectedClass(selectedOption.value);
  };
  const GetData = () => {
    if (selectedGrade !== null && selectedClass !== null) {
      GetOutRequest(
        { grade: selectedGrade, class: selectedClass },
        {
          onSuccess: (data) => {
            setData(data);
          },
          onError: (error) => {
            console.error("Out accept error", error);
          },
        }
      );
    }
  };

  useEffect(() => {
    if (selectedGrade !== null && selectedClass !== null) {
      GetData();
    }
  }, [selectedGrade, selectedClass]);

  const OutAccept = () => {
    OutAcceptMutate(
      { status: "OK", ids: selectedStudents },
      {
        onSuccess: () => {
          window.location.reload();
        },
      }
    );
  };

  const RefuseOut = () => {
    OutAcceptMutate(
      { status: "NO", ids: selectedStudents },
      {
        onSuccess: () => {
          window.location.reload();
        },
      }
    );
  };

  console.log(selectedStudents);

  return (
    <>
      <Layout
        now="외출 수락"
        title="외출 수락"
        right={
          <>
            <Dropdown type="all" onChange={handleGradeChange} />
            <Dropdown type="class" onChange={handleClassChange} />
          </>
        }
      >
        <S.OutAcceptContainer>
          {data.map((item, index) => (
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
