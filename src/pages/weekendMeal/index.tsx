import React, { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import Dropdown from "@/components/dropdown";
import { Layout } from "@/components/layout";
import { GetAllMeals } from "@/apis/weekend-meals";
import { styled } from "styled-components";
import { theme } from "@/styles/theme";

interface Option {
  value: number;
  label: string;
}

const WeekedMeal = () => {
  const { data: GetAllList } = GetAllMeals();
  const [selectedGrade, setSelectedGrade] = useState<number>(5);
  const [selectedClass, setSelectedClass] = useState<number>(5);

  const handleGradeChange = (selectedOption: number) => {
    setSelectedGrade(selectedOption);
  };

  const handleClassChange = (selectedOption: number) => {
    setSelectedClass(selectedOption);
  };

  return (
    <Layout
      title="주말 급식 신청"
      now="주말 급식 신청"
      right={
        <>
          <Button onClick={() => {}} type="main" size="small">
            엑셀 출력하기
          </Button>
          <Dropdown type="grade" onChange={handleGradeChange} />
          <Dropdown type="class" onChange={handleClassChange} />
        </>
      }
    >
      <NoticeWrap>
        <p>번호</p> <p>이름</p>
        <p>상태</p>
      </NoticeWrap>
      {selectedGrade === 5 && selectedClass == 5 ? (
        <div>
          {GetAllList?.map((item) => (
            <>
              <div>{}</div>
              <div>{item.name}</div>
              <div></div>
            </>
          ))}
        </div>
      ) : (
        <div>
          <div>ws</div>
        </div>
      )}
    </Layout>
  );
};

export default WeekedMeal;

export const NoticeWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 200px 20px 200px;
  cursor: pointer;
  background-color: ${theme.color.gray[50]};
  font-size: ${theme.font.heading[4].size};
  font-weight: ${theme.font.heading[4].fontweight};
`;
