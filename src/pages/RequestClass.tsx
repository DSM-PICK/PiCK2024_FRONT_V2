import { AccpetListApi, RequestChange } from "apis/class-room";
import { ClassChangeType } from "apis/class-room/type";
import { Button } from "components/Button";
import BottomButtonWrap from "components/Button/bottom";
import Dropdown from "components/dropdown";
import { Layout } from "components/layout";
import { ClassMoveList } from "components/list/classmove";
import Modal from "components/modal";
import useAcceptListSelection from "hook/selectHook";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { theme } from "styles/theme";
import { getStudentString } from "utils/utils";

const RequestClass = () => {
  const nav = useNavigate();

  const { selectedStudents, handleAcceptListClick } = useAcceptListSelection();

  const [selectedFloor, setSelectFloor] = useState<number>(5);
  const [data, setData] = useState<ClassChangeType[]>([]);
  const [modal, setModal] = useState<boolean>(false);

  const { mutate: GetRequestChange } = RequestChange();
  const { mutate: AccpetList } = AccpetListApi();

  const handleFloorChange = (selectedOption: number) => {
    setSelectFloor(selectedOption);
    GetRequestChange(
      { floor: selectedFloor, status: "QUIET" },
      {
        onSuccess: (data) => {
          setData(data);
        },
      }
    );
  };

  const confirm = async (state: "OK" | "NO") => {
    try {
      await AccpetList(
        { status: state, ids: selectedStudents },
        {
          onSuccess: () => {
            window.location.reload();
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout
        now="교실 이동 수락"
        title="교실 이동 수락"
        date={true}
        right={
          <>
            <Button
              onClick={() => {
                nav("ok");
              }}
              size="small"
              type="main"
            >
              교실 이동 현황 보기
            </Button>
            <Dropdown type="floor" onChange={handleFloorChange} />
          </>
        }
      >
        <SubTitle>교실 이동 신청한 학생</SubTitle>
        <Wrap>
          {data.map((item) => (
            <ClassMoveList
              onClick={() => handleAcceptListClick(item.id, item.username)}
              name={getStudentString(item)}
              preClass={item.move}
              nextClass={item.classroom_name}
              moveTime={`${item.start_period}교시 ~ ${item.end_period}교시`}
            />
          ))}
        </Wrap>
      </Layout>
      <BottomButtonWrap
        firstContent="거절"
        firstDisabled={false}
        firstOnclick={() => confirm("NO")}
        firstSize="standard"
        firstType="error"
        second={true}
        secondContent="수락"
        secondSize="standard"
        secondOnclick={() => confirm("OK")}
        secondType="main"
      />
      {modal && (
        <Modal
          onCancel={() => {
            setModal(false);
          }}
          onConfirm={() => {}}
          title={`${selectedStudents[0]}외 ${
            selectedStudents.length - 1
          }학생의 교실이동을 수락하시겠습니까?`}
          subTitle={`확인 시 ${selectedStudents[0]}외 ${
            selectedStudents.length - 1
          } 학생에게 알림이 보내집니다.`}
        />
      )}
    </>
  );
};

export default RequestClass;

const SubTitle = styled.p`
  font-size: ${theme.font.heading[3].size};
  color: ${theme.color.gray[600]};
`;

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  row-gap: 36px;
`;
