import { useEffect, useState } from 'react';
import SearchInput from '../input/search';
import * as S from './style';
import { format } from 'date-fns';
import { SelectTeacher, PostTeacher } from '@/apis/self-study';
import closeIcon from '@/assets/svg/close.svg';
import plusIcon from '@/assets/svg/plus.svg';
import { AddSchedule, DaySchedule, DeleteSchedule } from '@/apis/schedule';
import { showToast } from '../toast';
import { useGetAllTeacher } from '@/apis/admin';

interface ModalProp {
  type?: 'check' | 'red' | 'selfStudy' | 'schedule';
  title: string;
  subTitle: string;
  onCancel: () => void;
  onConfirm: () => void;
  confirmDisabled?: boolean;
  initialDate?: string;
  setState?: React.Dispatch<React.SetStateAction<boolean>>;
  refetchStatus: () => void;
}

interface ChangeProps {
  text: string;
  name: string;
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
  confirmDisabled = false,
  initialDate,
  setState,
  refetchStatus,
}: ModalProp) => {
  const [secondData, setSecondData] = useState({ floor: 2, teacher: '' });
  const [thirdData, setThirdData] = useState({ floor: 3, teacher: '' });
  const [fourthData, setFourthData] = useState({ floor: 4, teacher: '' });
  const [addSchedule, setAddSchedule] = useState<ScheduleData>({
    event_name: '',
    date: initialDate
      ? format(new Date(initialDate), 'yyyy-MM-dd')
      : format(new Date(), 'yyyy-MM-dd'),
  });
  const { data } = useGetAllTeacher();

  const date = initialDate
    ? format(new Date(initialDate), 'yyyy-MM-dd')
    : format(new Date(), 'yyyy-MM-dd');

  const { data: SelectSelfList } = SelectTeacher(date);
  const { mutate: postTeacherMutate, isPending: isPostingTeacher } =
    PostTeacher({
      onSuccess: () => {
        showToast({
          type: 'success',
          message: '자습감독 등록에 성공하였습니다.',
        });
        if (setState) {
          setState(false);
          refetchStatus();
        }
      },
      onError: (error) => {
        if (error.message === 'Request failed with status code 404') {
          showToast({
            type: 'error',
            message: '해당 선생님을 찾을 수 없습니다.',
          });
        } else {
          showToast({
            type: 'error',
            message: '에러가 발생하였습니다. 잠시후 시도해주세요',
          });
        }
      },
    });
  const { mutate: addScheduleMutate, isPending: isAddingSchedule } =
    AddSchedule();
  const { mutate: Delete, isPending: isDeletingSchedule } = DeleteSchedule();
  const { data: Schedule, refetch: reSchedule } = DaySchedule(date);

  useEffect(() => {
    if (!SelectSelfList?.length) return;

    const setters = {
      2: setSecondData,
      3: setThirdData,
      4: setFourthData,
    } as const;

    SelectSelfList.forEach((val) => {
      const setter = setters[val.floor as 2 | 3 | 4];
      if (setter) {
        setter({ floor: val.floor, teacher: val.teacher });
      }
    });
  }, [SelectSelfList]);

  const onClickDelete = async (id: string) => {
    if (isDeletingSchedule) return;
    await Delete(
      { id: id },
      {
        onSuccess: () => {
          showToast({
            type: 'success',
            message: '삭제되었습니다',
          });
          reSchedule();
          refetchStatus();
        },
      },
    );
  };

  const submitTeachers = async () => {
    if (!setState || isPostingTeacher) return;

    try {
      const postData = {
        date,
        teacher: [
          { floor: secondData.floor, teacher: secondData.teacher },
          { floor: thirdData.floor, teacher: thirdData.teacher },
          { floor: fourthData.floor, teacher: fourthData.teacher },
        ],
      };

      await postTeacherMutate(postData);
    } catch (error) {
      setState(false);
      showToast({
        type: 'error',
        message: '자습감독 등록에 실패했습니다',
      });
      console.error(error);
    }
  };

  const handleModalConfirm = async () => {
    if (!setState || isAddingSchedule) return;

    await addScheduleMutate(addSchedule, {
      onSuccess: () => {
        showToast({
          type: 'success',
          message: '학사일정이 추가되었습니다',
        });
        setState(false);
        refetchStatus();
      },
      onError: (error) => {
        showToast({
          type: 'error',
          message: '학사일정 추가에 실패했습니다',
        });
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
        {type !== 'schedule' && (
          <S.TextWrap>
            <S.ModalTitle>{title}</S.ModalTitle>
            <S.ModalSubTitle>{subTitle}</S.ModalSubTitle>
          </S.TextWrap>
        )}

        {type === 'red' || type === 'check' ? (
          <S.ButtonWrap>
            <S.CancelButton onClick={onCancel}>취소</S.CancelButton>
            <S.ConfirmButton onClick={onConfirm} disabled={confirmDisabled}>
              확인
            </S.ConfirmButton>
          </S.ButtonWrap>
        ) : type === 'selfStudy' ? (
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
              <S.ConfirmButton
                onClick={submitTeachers}
                disabled={isPostingTeacher}
              >
                확인
              </S.ConfirmButton>
            </S.ButtonWrap>
          </>
        ) : null}

        {type === 'schedule' && (
          <S.ScheduleWrap>
            <S.ScheduleTitle>
              <S.ModalTitle>{title}의 일정</S.ModalTitle>
              <img src={closeIcon} width={40} height={40} onClick={onCancel} />
            </S.ScheduleTitle>

            <S.FixContent>
              {Schedule?.map((item) => (
                <S.ScheduleItem key={item.id}>
                  <S.ScheduleItemText>{item.event_name}</S.ScheduleItemText>
                  <img
                    src={closeIcon}
                    alt="일정 삭제"
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
