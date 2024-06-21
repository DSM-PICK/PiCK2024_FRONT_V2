import { Layout } from "components/layout";
import * as S from "./style";
import Dropdown from "components/dropdown";
import { GetOutList } from "apis/application";
import OutAcceptList from "components/outAccept";
import BottomButtonWrap from "components/Button/bottom";

const OutList = () => {
  const { data: nonreturnStuden } = GetOutList();

  return (
    <>
      <Layout now="외출자 목록" title="외출자 목록">
        <S.SemiTitle>오늘 외출한 학생</S.SemiTitle>
        <S.OutListContainer>
          {nonreturnStuden?.map((item, index) => (
            <OutAcceptList
              key={index}
              name={item.username}
              content={item.reason}
              date={`${item.end_time}`}
              onClick={() => {
                // Handle onClick logic here
              }}
            />
          ))}
        </S.OutListContainer>
      </Layout>
      <BottomButtonWrap
        firstContent="복귀 시키기"
        firstOnclick={() => {}}
        firstSize="standard"
        firstType="main"
        firstDisabled={false}
      />
    </>
  );
};

export default OutList;
