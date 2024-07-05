import SearchInput from "@/components/input/search";
import { Layout } from "@/components/layout";
import { useState } from "react";

const PreviousList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = ({ text }: { text: string; name: string }) => {
    setSearchTerm(text);
  };
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
      <div></div>
    </Layout>
  );
};

export default PreviousList;
