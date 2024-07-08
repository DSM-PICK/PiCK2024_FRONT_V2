import { useEffect, useState } from "react";
import Input from "../input";
import SearchInput from "../input/search";
import * as S from "./style";
import { format } from "date-fns";
import { SelectTeacher, PostTeacher } from "@/apis/self-study";

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

  const date = initialDate
    ? format(new Date(initialDate), "yyyy-MM-dd")
    : format(new Date(), "yyyy-MM-dd");

  const { data: SelectSelfList } = SelectTeacher(date);
  const { mutate: postTeacherMutate } = PostTeacher();

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

  const SecondhandleChange = ({ text, name }: ChangeProps) => {
    setSecondData({ ...secondData, [name]: text });
  };

  const thirdhandleChange = ({ text, name }: ChangeProps) => {
    setThirdData({ ...thirdData, [name]: text });
  };

  const fourthhandleChange = ({ text, name }: ChangeProps) => {
    setFourthData({ ...fourthData, [name]: text });
  };

  return (
    <S.ModalWrap>
      <S.ModalStyle>
        <S.TextWrap>
          <S.ModalTitle>{title}</S.ModalTitle>
          <S.ModalSubTitle>{subTitle}</S.ModalSubTitle>
        </S.TextWrap>
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
      </S.ModalStyle>
    </S.ModalWrap>
  );
};

export default Modal;
