import { Layout } from "@/components/layout";
import * as S from "./style";
import { GetOutList, ReturnSchool } from "@/apis/application";
import OutAcceptList from "@/components/list";
import BottomButtonWrap from "@/components/Button/bottom";
import useAcceptListSelection from "@/hook/selectHook";
import { useState } from "react";
import Modal from "@/components/modal";

const OutList = () => {
  const { data: nonreturnStuden } = GetOutList();
  const { mutate: Return } = ReturnSchool();
  const { selectedStudentName, selectedStudents, handleAcceptListClick } =
    useAcceptListSelection();

  const [modal, setModal] = useState<boolean>(false);

  const returnList = async () => {
    await Return(selectedStudents, {
      onSuccess: () => {
        window.location.reload();
      },
    });
  };

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
              onClick={() => handleAcceptListClick(item.id, item.username)}
            />
          ))}
        </S.OutListContainer>
      </Layout>
      <BottomButtonWrap
        firstContent="복귀 시키기"
        firstOnclick={() => {
          setModal(true);
        }}
        firstSize="standard"
        firstType="main"
        firstDisabled={false}
      />
      {modal && (
        <Modal
          type="red"
          title={`${
            selectedStudentName.length > 1
              ? `${selectedStudentName[0]} 학생 외 ${
                  selectedStudentName.length - 1
                }명을 복귀시키겠습니까?`
              : selectedStudentName.length === 1
              ? `${selectedStudentName[0]}을 복귀시키겠습니까?`
              : ""
          }`}
          subTitle="복귀 시에는 외출이 끝나게 됩니다."
          onCancel={() => {
            setModal(false);
          }}
          onConfirm={returnList}
        />
      )}
    </>
  );
};

export default OutList;
