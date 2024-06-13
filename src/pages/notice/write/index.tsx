import { Layout } from "components/layout";
import { useNavigate } from "react-router-dom";
import nextSvg from "assets/svg/next.svg";
import Input from "components/input";
import * as S from "../style";
import { getFullToday } from "utils/date";
import BottomButtonWrap from "components/Button/bottom";
import { useState } from "react";
import { ChangeProps } from "apis/type";
import { UploadNotice } from "apis/notice";

const NoticeWrite = () => {
  const router = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { mutate: UploadNoticeMutate } = UploadNotice();

  const handleTitleChange = ({ text, name }: ChangeProps) => {
    setTitle(text);
  };

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(event.target.value);
  };

  const name = localStorage.getItem("name");

  const Upload = () => {
    UploadNoticeMutate(
      {
        title: title,
        content: content,
        grade: [4],
      },
      {
        onSuccess: () => {
          //성공시 토스트
          router(-1);
        },
        onError: () => {
          //에러시 토스트
        },
      }
    );
  };

  return (
    <>
      <Layout
        now={
          <>
            <p
              onClick={() => {
                router("/notice");
              }}
            >
              공지
            </p>
            <img src={nextSvg} alt="" /> <p>공지 작성하기</p>
          </>
        }
        title="공지 작성하기"
      >
        <S.NoticeWriteTop>
          <S.NoticeWrite>
            <S.NoticeBedgeTitle>작성자</S.NoticeBedgeTitle>
            <S.NoticeBedge>{name} 선생님</S.NoticeBedge>
          </S.NoticeWrite>
          <S.NoticeWrite>
            <S.NoticeBedgeTitle>작성일</S.NoticeBedgeTitle>
            <S.NoticeBedge>{getFullToday()}</S.NoticeBedge>
          </S.NoticeWrite>
        </S.NoticeWriteTop>
        <Input
          widthtype="long"
          name="title"
          onChange={handleTitleChange}
          value={title}
          label="*제목"
          placeholder="공지 제목을 입력하세요"
        />
        <S.TextareaWrap>
          <S.InputLabel>*내용</S.InputLabel>
          <S.WriteTextarea
            name="content"
            onChange={handleContentChange}
            placeholder="공지 내용을 입력하세요"
            value={content}
          />
        </S.TextareaWrap>
      </Layout>
      <BottomButtonWrap
        firstDisabled={false}
        firstOnclick={Upload}
        firstSize="standard"
        firstType="main"
      />
    </>
  );
};

export default NoticeWrite;
