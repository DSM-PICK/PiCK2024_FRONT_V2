import { useEffect, useState } from "react";
import Input from "../input";
import SearchInput from "../input/search";
import * as S from "./style";
import { format } from "date-fns";
import { SelectTeacher, PostTeacher } from "@/apis/self-study";
import closeIcon from "@/assets/svg/close.svg";
import plusIcon from "@/assets/svg/plus.svg";
import { AddSchedule, DaySchedule, DeleteSchedule } from "@/apis/schedule";

interface ModalProp {
  type?: "check" | "red" | "selfStudy" | "schedule";
  title: string;
  subTitle: string;
  onCancel: () => void;
  onConfirm: () => void;
  initialDate?: string;
}

interface ChangeProps {
  text: string;
  name: string;
}

interface DataItem {
  floor: number;
  teacher: string;
  date: string;
}

interface ScheduleData {
  event_name: string;
  date: string;
}

export const Modal = ({
  title,
  subTitle,
  onCancel,
  onConfirm,
  type,
  initialDate,
}: ModalProp) => {
  const [secondData, setSecondData] = useState({ floor: 2, teacher: "" });
  const [thirdData, setThirdData] = useState({ floor: 3, teacher: "" });
  const [fourthData, setFourthData] = useState({ floor: 4, teacher: "" });
  const [addSchedule, setAddSchedule] = useState<ScheduleData>({
    event_name: "",
    date: initialDate
      ? format(new Date(initialDate), "yyyy-MM-dd")
      : format(new Date(), "yyyy-MM-dd"),
  });

  const date = initialDate
    ? format(new Date(initialDate), "yyyy-MM-dd")
    : format(new Date(), "yyyy-MM-dd");

  const { data: SelectSelfList } = SelectTeacher(date);
  const { mutate: postTeacherMutate } = PostTeacher();
  const { mutate: addScheduleMutate } = AddSchedule();
  const { mutate: Delete } = DeleteSchedule();
  const { data: Schedule } = DaySchedule(date);

  useEffect(() => {
    if (SelectSelfList) {
      SelectSelfList.forEach((val) => {
        switch (val.floor) {
          case 2:
            setSecondData({ floor: 2, teacher: val.teacher });
            break;
          case 3:
            setThirdData({ floor: 3, teacher: val.teacher });
            break;
          case 4:
            setFourthData({ floor: 4, teacher: val.teacher });
            break;
        }
      });
    }
  }, [SelectSelfList]);

  const onClickDelete = async (id: string) => {
    await Delete(
      { id: id },
      {
        onSuccess: () => {
          alert("삭제에 성공하셨습니다");
          window.location.reload();
        },
      }
    );
  };

  const submitTeachers = async () => {
    try {
      const postData = {
        date: date,
        teacher: [
          { floor: secondData.floor, teacher: secondData.teacher },
          { floor: thirdData.floor, teacher: thirdData.teacher },
          { floor: fourthData.floor, teacher: fourthData.teacher },
        ],
      };

      await postTeacherMutate(postData, {
        onSuccess: () => {
          location.reload();
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleModalConfirm = async () => {
    await addScheduleMutate(addSchedule, {
      onSuccess: () => {
        location.reload();
        alert("일정이 추가되었습니다");
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const SecondhandleChange = ({ text, name }: ChangeProps) => {
    setSecondData({ ...secondData, [name]: text });
  };

  const thirdhandleChange = ({ text, name }: ChangeProps) => {
    setThirdData({ ...thirdData, [name]: text });
  };

  const fourthhandleChange = ({ text, name }: ChangeProps) => {
    setFourthData({ ...fourthData, [name]: text });
  };

  const SchedulehandleChange = ({ text, name }: ChangeProps) => {
    setAddSchedule({ ...addSchedule, [name]: text });
  };

  return (
    <S.ModalWrap>
      <S.ModalStyle>
        {type !== "schedule" && (
          <S.TextWrap>
            <S.ModalTitle>{title}</S.ModalTitle>
            <S.ModalSubTitle>{subTitle}</S.ModalSubTitle>
          </S.TextWrap>
        )}
        {type === "red" || type === "check" ? (
          <S.ButtonWrap>
            <S.CancelButton onClick={onCancel}>취소</S.CancelButton>
            <S.ConfirmButton onClick={onConfirm}>확인</S.ConfirmButton>
          </S.ButtonWrap>
        ) : type === "selfStudy" ? (
          <>
            <S.SelfInputWrap>
              <S.InputWrap>
                <S.FloorBedge>4층</S.FloorBedge>
                <SearchInput
                  type="self"
                  onChange={fourthhandleChange}
                  value={fourthData.teacher}
                  placeholder="자습감독 선생님을 추가해주세요"
                  name="teacher"
                />
              </S.InputWrap>
              <S.InputWrap>
                <S.FloorBedge>3층</S.FloorBedge>
                <SearchInput
                  type="self"
                  onChange={thirdhandleChange}
                  value={thirdData.teacher}
                  placeholder="자습감독 선생님을 추가해주세요"
                  name="teacher"
                />
              </S.InputWrap>
              <S.InputWrap>
                <S.FloorBedge>2층</S.FloorBedge>
                <SearchInput
                  type="self"
                  onChange={SecondhandleChange}
                  value={secondData.teacher}
                  placeholder="자습감독 선생님을 추가해주세요"
                  name="teacher"
                />
              </S.InputWrap>
            </S.SelfInputWrap>
            <S.ButtonWrap>
              <S.CancelButton onClick={onCancel}>취소</S.CancelButton>
              <S.ConfirmButton onClick={submitTeachers}>확인</S.ConfirmButton>
            </S.ButtonWrap>
          </>
        ) : null}
        {type === "schedule" && (
          <S.ScheduleWrap>
            <S.ScheduleTitle>
              <S.ModalTitle>{title}의 일정</S.ModalTitle>
              <img src={closeIcon} width={40} height={40} onClick={onCancel} />
            </S.ScheduleTitle>
            <S.FixContent>
              {Schedule?.map((item) => (
                <S.ScheduleItem>
                  <S.ScheduleItemText>{item.event_name}</S.ScheduleItemText>
                  <img
                    src={closeIcon}
                    alt=""
                    width={20}
                    height={20}
                    onClick={() => onClickDelete(item.id)}
                  />
                </S.ScheduleItem>
              ))}
            </S.FixContent>
            <S.ScheduleItem>
              <S.ScheduleItemText>
                <SearchInput
                  onChange={SchedulehandleChange}
                  value={addSchedule.event_name}
                  type="schedule"
                  name="event_name"
                  placeholder="새로운 일정을 입력해주세요"
                />
              </S.ScheduleItemText>
              <img
                src={plusIcon}
                alt=""
                width={20}
                height={20}
                onClick={handleModalConfirm}
              />
            </S.ScheduleItem>
          </S.ScheduleWrap>
        )}
      </S.ModalStyle>
    </S.ModalWrap>
  );
};

export default Modal;
