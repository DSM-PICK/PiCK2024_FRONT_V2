import { Layout } from "components/layout";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { theme } from "styles/theme";
import nextSvg from "assets/svg/next.svg";
import { ClassMoveList } from "components/list/classmove";
import { RequestChange } from "apis/class-room";
import { getStudentString } from "utils/utils";
import Dropdown from "components/dropdown";
import { useEffect, useState } from "react";
import useAcceptListSelection from "hook/selectHook";
import { ClassChangeType } from "apis/class-room/type";

const MoveClass = () => {
  const router = useNavigate();
  const { mutate: ChangingClass } = RequestChange();
  const [selectFloor, setSelectFloor] = useState<number>(5);
  const [data, setData] = useState<ClassChangeType[]>([]);
  const { selectedStudentName, selectedStudents, handleAcceptListClick } =
    useAcceptListSelection();

  const Get = async (option: number) => {
    await ChangingClass(
      { floor: option, status: "OK" },
      {
        onSuccess: (data) => {
          setData(data);
        },
      }
    );
  };
  const handleFloorChange = (selectedOption: number) => {
    setSelectFloor(selectedOption);
    Get(selectedOption);
  };

  useEffect(() => {
    Get(selectFloor);
  }, []);

  return (
    <Layout
      title="교실 이동 중인 학생"
      now={
        <>
          <p
            onClick={() => {
              router("/classChange");
            }}
          >
            교실 이동 수락
          </p>
          <img src={nextSvg} alt="" /> <p>교실 이동 중인 학생</p>
        </>
      }
      right={<Dropdown type="floor" onChange={handleFloorChange} />}
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
  );
};

export default MoveClass;

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
