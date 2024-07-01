import React, { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import Dropdown from "@/components/dropdown";
import { Layout } from "@/components/layout";
import { GetAllMeals } from "@/apis/weekend-meals";
import { styled } from "styled-components";
import { theme } from "@/styles/theme";
import WeekEndList from "@/components/list/weekendMeal";
import { DownLoad } from "@/apis/meal";
import { setStudentNum } from "@/utils/utils";

interface Option {
  value: number;
  label: string;
}

const WeekedMeal = () => {
  const { data: GetAllList } = GetAllMeals();
  const { downloadExcel } = DownLoad();
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
          {selectedGrade === 5 && selectedClass === 5 ? (
            <Button onClick={downloadExcel} type="main" size="small">
              엑셀 출력하기
            </Button>
          ) : (
            <Button onClick={downloadExcel} type="main" size="small">
              담임 확인하기
            </Button>
          )}

          <Dropdown type="grade" onChange={handleGradeChange} />
          <Dropdown type="class" onChange={handleClassChange} />
        </>
      }
    >
      {selectedGrade === 5 && selectedClass == 5 ? (
        <>
          <NoticeWrap>
            <p>번호</p> <p>이름</p>
            <p>상태</p>
          </NoticeWrap>
          <div>
            {GetAllList?.map((item) => (
              <>
                <WeekEndList
                  id={item.id}
                  number={setStudentNum(item)}
                  name={item.name}
                  status={item.status}
                />
              </>
            ))}
          </div>
        </>
      ) : (
        <ClassProp>
          <Wrap>
            <div>
              <ResTitle>
                응답자({selectedGrade}-{selectedClass})
              </ResTitle>
              <SubTitle>응답자의 상태는 수정할 수 없습니다.</SubTitle>
            </div>
            {GetAllList?.map((item) => (
              <WeekEndList
                id={item.id}
                number={setStudentNum(item)}
                name={item.name}
                status={item.status}
              />
            ))}
          </Wrap>
          <Wrap>
            <div>
              <ResTitle>
                미응답자({selectedGrade}-{selectedClass})
              </ResTitle>
              <SubTitle>매달 5일 전까지 수정할 수 있습니다.</SubTitle>
            </div>
            {GetAllList?.map((item) => (
              <WeekEndList
                id={item.id}
                number={setStudentNum(item)}
                name={item.name}
                status={item.status}
              />
            ))}
          </Wrap>
        </ClassProp>
      )}
    </Layout>
  );
};

export default WeekedMeal;

const NoticeWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20% 20px 20%;
  cursor: pointer;
  background-color: ${theme.color.gray[50]};
  font-size: ${theme.font.heading[4].size};
  font-weight: ${theme.font.heading[4].fontweight};
`;

const ResTitle = styled.p`
  font-size: ${theme.font.heading[2].size};
  font-weight: ${theme.font.heading[2].fontweight};
`;

const SubTitle = styled.p`
  font-size: ${theme.font.heading[4].size};
  color: ${theme.color.gray[500]};
`;

const ClassProp = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 100px;
`;

const Wrap = styled.div`
  width: 100%;
`;
