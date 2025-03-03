import { AllList } from '@/apis/story';
import SearchInput from '@/components/input/search';
import { Layout } from '@/components/layout';
import StoryList from '@/components/story/story';
import { getStudentString, setStudentNum } from '@/utils/utils';
import { useState } from 'react';
import { BeatLoader, SyncLoader } from 'react-spinners';
import { styled } from 'styled-components';

const PreviousList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: GetCount, isLoading: Loading } = AllList();

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
          type="Search"
          onChange={handleSearchChange}
          value={searchTerm}
          placeholder="외출 기록을 볼 학생의 이름 또는 학번"
        />
      }
    >
      <ContentWrap>
        {Loading && <BeatLoader style={{ display: 'flex' }} />}
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
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  @media (max-width: 1600px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 1100px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;
