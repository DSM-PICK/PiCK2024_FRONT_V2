import { Layout } from '@/components/layout';
import nextSvg from '@/assets/svg/next.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { DetailNotice } from '@/apis/notice';
import { useEffect, useState } from 'react';
import { NoticeDetailType } from '@/apis/type';
import * as S from '../style';

const NoticeDetail = () => {
  const params = useParams();
  const userId = params.detail || "";
  const { data: GetDetailNotice } = DetailNotice(userId);

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
      title={GetDetailNotice?.title || ""}
      right={
        <S.NoticeDetailRight>
          <S.NoticeDetailRightText>
            {GetDetailNotice?.teacher} 선생님
          </S.NoticeDetailRightText>
          <S.NoticeDetailRightText>{GetDetailNotice?.create_at}</S.NoticeDetailRightText>
        </S.NoticeDetailRight>
      }
    >
      <S.NoticeDetailContent>{GetDetailNotice?.content}</S.NoticeDetailContent>
    </Layout>
  );
};

export default NoticeDetail;
