import { AllList } from "@/apis/story";
import SearchInput from "@/components/input/search";
import { Layout } from "@/components/layout";
import StoryList from "@/components/story/story";
import { getStudentString, setStudentNum } from "@/utils/utils";
import { useState } from "react";
import { styled } from "styled-components";

const PreviousList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: GetCount } = AllList();

  const handleSearchChange = ({
    text,
    name,
  }: {
    text: string;
    name: string;
  }) => {
    setSearchTerm(text);
  };

  const filteredStudents = GetCount?.filter((item) => {
    const studentString = getStudentString(item).toLowerCase();
    const searchLower = searchTerm.toLowerCase();
    return (
      studentString.includes(searchLower) ||
      setStudentNum(item).toString().includes(searchLower)
    );
  });

  return (
    <Layout
      title="이전 외출 기록"
      now="이전 외출 기록"
      right={
        <SearchInput
          onChange={handleSearchChange}
          value={searchTerm}
          placeholder="외출 기록을 볼 학생의 이름 또는 학번"
        />
      }
    >
      <ContentWrap>
        {filteredStudents?.map((item) => (
          <StoryList
            id={item.id}
            key={setStudentNum(item)}
            name={getStudentString(item)}
            application={item.application_cnt}
            earlyreturn={item.early_return_cnt}
          />
        ))}
      </ContentWrap>
    </Layout>
  );
};

export default PreviousList;

const ContentWrap = styled.div`
  row-gap: 12px;
  column-gap: 60px;
  display: flex;
  width: fit-content;
  justify-content: center;
  flex-wrap: wrap;
`;
