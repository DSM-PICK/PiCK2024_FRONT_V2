import * as S from "./style";

interface ModalProp {
  title: string;
  subTitle: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export const Modal = ({ title, subTitle, onCancel, onConfirm }: ModalProp) => {
  return (
    <S.ModalWrap>
      <S.ModalStyle>
        <S.TextWrap>
          <S.ModalTitle>{title}</S.ModalTitle>
          <S.ModalSubTitle>{subTitle}</S.ModalSubTitle>
        </S.TextWrap>
        <S.ButtonWrap>
          <S.CancelButton onClick={onCancel}>취소</S.CancelButton>
          <S.ConfirmButton onClick={onConfirm}>확인</S.ConfirmButton>
        </S.ButtonWrap>
      </S.ModalStyle>
    </S.ModalWrap>
  );
};

export default Modal;
