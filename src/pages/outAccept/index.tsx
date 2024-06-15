import { useState } from "react";
import Dropdown from "components/dropdown";
import { Layout } from "components/layout";
import OutAcceptList from "components/outAccept";
import * as S from "./style";
import BottomButtonWrap from "components/Button/bottom";

const OutAccept = () => {
  const [selectedGrade, setSelectedGrade] = useState<string>("전체");
  const [selectedClass, setSelectedClass] = useState<string>("전체");

  const handleGradeChange = (selectedOption: string) => {
    setSelectedGrade(selectedOption);
  };

  const handleClassChange = (selectedOption: string) => {
    setSelectedClass(selectedOption);
  };

  return (
    <>
      <Layout
        now="외출 수락"
        title="외출 수락"
        right={
          <>
            <Dropdown type="grade" onChange={handleGradeChange} />
            <Dropdown type="class" onChange={handleClassChange} />
          </>
        }
      >
        <S.OutAcceptContainer>
          <OutAcceptList title="dd" content="ddd" date="ddd" />
          <OutAcceptList title="dd" content="ddd" date="ddd" />
          <OutAcceptList title="dd" content="ddd" date="ddd" />
          <OutAcceptList title="dd" content="ddd" date="ddd" />
          <OutAcceptList title="dd" content="ddd" date="ddd" />
          <OutAcceptList title="dd" content="ddd" date="ddd" />
          <OutAcceptList title="dd" content="ddd" date="ddd" />
          <OutAcceptList title="dd" content="ddd" date="ddd" />
          <OutAcceptList title="dd" content="ddd" date="ddd" />
          <OutAcceptList title="dd" content="ddd" date="ddd" />
        </S.OutAcceptContainer>
      </Layout>
      <BottomButtonWrap
        firstContent="거절하기"
        secondContent="수락하기"
        firstDisabled={false}
        firstOnclick={() => {}}
        firstSize="standard"
        firstType="error"
        second={true}
        secondOnclick={() => {}}
        secondSize="standard"
        secondType="main"
      />
    </>
  );
};

export default OutAccept;
