import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/layout';
import nextSvg from '@/assets/svg/next.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { DetailNotice, useDeleteNotice, useEditNotice } from '@/apis/notice';
import * as S from '../style';
import BottomButtonWrap from '@/components/Button/bottom';
import Modal from '@/components/modal';
import { showToast } from '@/components/toast';
import Input from '@/components/input';
import { Textarea } from '@/components/input/textarea';
import { Button } from '@/components/Button';

const NoticeDetail = () => {
  const params = useParams();
  const router = useNavigate();
  const noticeId = params.detail || '';
  const { data: GetDetailNotice, refetch: ReGetDetailNotice } =
    DetailNotice(noticeId);
  const { mutate: DeleteNotice } = useDeleteNotice();
  const [deleteNotice, setDeleteNotice] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [edit, setEdit] = useState<boolean>(false);
  const { mutate: ModifyNotice } = useEditNotice();
  useEffect(() => {
    const storedName = localStorage.getItem('name');
    if (storedName) {
      setName(storedName);
    }
  }, []);
  const [data, setData] = useState({
    id: noticeId,
    title: GetDetailNotice?.title,
    content: GetDetailNotice?.content,
  });

  useEffect(() => {
    setData({
      id: noticeId,
      title: GetDetailNotice?.title,
      content: GetDetailNotice?.content,
    });
  }, [GetDetailNotice]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const Modify = () => {
    ModifyNotice(data, {
      onSuccess: () => {
        setEdit(false);
        showToast({
          type: 'error',
          message: '공지 수정에 성공하였습니다',
        });
        ReGetDetailNotice();
      },
      onError: () => {
        setEdit(false);
        showToast({
          type: 'error',
          message: '공지 수정에 실패하였습니다',
        });
      },
    });
  };
  return (
    <Layout
      now={
        <>
          <span
            onClick={() => {
              router('/notice');
            }}
          >
            공지
          </span>
          <img src={nextSvg} alt="" /> <span>{GetDetailNotice?.title}</span>
        </>
      }
      title={
        edit ? (
          <Input
            widthtype="login"
            onChange={handleChange}
            name="title"
            value={data.title}
          />
        ) : (
          GetDetailNotice?.title
        )
      }
      right={
        <S.NoticeDetailRight>
          <S.NoticeDetailRightText>
            {GetDetailNotice?.teacher} 선생님
          </S.NoticeDetailRightText>
          <S.NoticeDetailRightText>
            {GetDetailNotice?.create_at}
          </S.NoticeDetailRightText>
        </S.NoticeDetailRight>
      }
    >
      <S.NoticeDetailContent>
        {edit ? (
          <Textarea
            onChange={handleChange}
            name="content"
            value={data.content}
            placeholder=""
          />
        ) : (
          GetDetailNotice?.content
        )}
      </S.NoticeDetailContent>
      {GetDetailNotice?.teacher === name && (
        <BottomButtonWrap>
          <Button
            size="standard"
            type="black"
            onClick={() => (edit ? Modify() : setEdit(true))}
          >
            {edit ? '완료' : '수정'}
          </Button>
          <Button
            onClick={() => setDeleteNotice(true)}
            type="error2"
            size="standard"
          >
            삭제
          </Button>
        </BottomButtonWrap>
      )}
      {deleteNotice && (
        <Modal
          refetchStatus={() => {}}
          title="이 공지를 삭제하시겠습니까?"
          subTitle="삭제 시에는 복구 시킬 수 없습니다."
          onCancel={() => setDeleteNotice(false)}
          onConfirm={() =>
            DeleteNotice(
              { id: noticeId },
              {
                onSuccess: () => {
                  router('/notice');
                  showToast({
                    type: 'success',
                    message: '공지가 삭제되었습니다.',
                  });
                },
              },
            )
          }
          type="red"
        />
      )}
    </Layout>
  );
};

export default NoticeDetail;
