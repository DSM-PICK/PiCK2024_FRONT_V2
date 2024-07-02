import React, { useState, useEffect } from "react";
import Dropdown from "@/components/dropdown";
import { Layout } from "@/components/layout";
import ClassList from "@/components/list/class";
import { theme } from "@/styles/theme";
import styled from "styled-components";
import { GetClassStatus } from "@/apis/status";
import { StudentStatus } from "@/apis/status/type";
import { setStudentNum } from "@/utils/utils";

const ClassManage = () => {
  const [selectedGrade, setSelectedGrade] = useState<number>(1);
  const [selectedClass, setSelectedClass] = useState<number>(1);
  const [data, setData] = useState<StudentStatus>();

  const { mutate: GetStudentStatus } = GetClassStatus();

  const Get = async () => {
    await GetStudentStatus(
      { grade: selectedGrade, class_num: selectedClass },
      {
        onSuccess: (data) => {
          setData(data);
        },
        onError: (error) => {
          console.log(error.name);
        },
      }
    );
  };

  useEffect(() => {
    Get();
  }, [selectedClass, selectedGrade]);

  const handleGrade = (option: number) => {
    setSelectedGrade(option);
  };

  const handleClass = (option: number) => {
    setSelectedClass(option);
  };

  return (
    <Layout
      now="학급 관리"
      title="학급 관리"
      right={
        <>
          <Dropdown type="grade" onChange={handleGrade} />
          <Dropdown type="class" onChange={handleClass} />
        </>
      }
    >
      <SemiTitle>
        {selectedGrade}학년 {selectedClass}반 {data?.teacher}선생님
      </SemiTitle>
      <ContentWrap>
        {data?.students.map((item) => (
          <ClassList
            id={item.user_id}
            name={item.name}
            number={setStudentNum(item)}
            status={item.status}
          />
        ))}
      </ContentWrap>
    </Layout>
  );
};

export default ClassManage;

const SemiTitle = styled.p`
  font-size: ${theme.font.heading[2].size};
`;

const ContentWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 40px;
`;
