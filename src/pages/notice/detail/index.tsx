import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/layout';
import nextSvg from '@/assets/svg/next.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { DetailNotice, useDeleteNotice } from '@/apis/notice';
import * as S from '../style';
import BottomButtonWrap from '@/components/Button/bottom';
import Modal from '@/components/modal';
import { showToast } from '@/components/toast';

const NoticeDetail = () => {
  const params = useParams();
  const noticeId = params.detail || '';
  const { data: GetDetailNotice } = DetailNotice(noticeId);
  const { mutate: DeleteNotice } = useDeleteNotice();
  const [deleteNotice, setDeleteNotice] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  useEffect(() => {
    const storedName = localStorage.getItem('name');
    if (storedName) {
      setName(storedName);
    }
  }, []);

  const router = useNavigate();
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
      title={GetDetailNotice?.title}
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
      <S.NoticeDetailContent>{GetDetailNotice?.content}</S.NoticeDetailContent>
      {GetDetailNotice?.teacher === name && (
        <BottomButtonWrap
          second
          firstContent="수정"
          firstOnclick={() => {}}
          firstSize="standard"
          firstType="black"
          secondContent="삭제"
          secondOnclick={() => setDeleteNotice(true)}
          secondSize="standard"
          secondType="error2"
        />
      )}
      {deleteNotice && (
        <Modal
          title="이 공지를 삭제하시겠습니까?"
          subTitle="삭제 시에는 복구 시킬 수 없습니다."
          onCancel={() => setDeleteNotice(false)}
          onConfirm={() =>
            DeleteNotice(
              { id: noticeId },
              {
                onSuccess: () => {
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
