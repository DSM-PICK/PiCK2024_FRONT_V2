import { Layout } from "@/components/layout";
import nextSvg from "@/assets/svg/next.svg";
import { useNavigate, useParams } from "react-router-dom";
import { DetailNotice } from "@/apis/notice";
import { useEffect, useState } from "react";
import { NoticeDetailType } from "@/apis/type";
import * as S from "../style";

const NoticeDetail = () => {
  const { mutate: GetDetailNotice } = DetailNotice();
  const [data, setData] = useState<NoticeDetailType>();
  const params = useParams();
  const userId = params.detail;

  useEffect(() => {
    if (userId) {
      GetDetailNotice(userId, {
        onSuccess: (data) => {
          setData(data);
        },
      });
    }
  }, []);

  const router = useNavigate();
  return (
    <Layout
      now={
        <>
          <span
            onClick={() => {
              router("/notice");
            }}
          >
            공지
          </span>
          <img src={nextSvg} alt="" /> <span>{data?.title}</span>
        </>
      }
      title={data?.title || ""}
      right={
        <S.NoticeDetailRight>
          <S.NoticeDetailRightText>
            {data?.teacher} 선생님
          </S.NoticeDetailRightText>
          <S.NoticeDetailRightText>{data?.create_at}</S.NoticeDetailRightText>
        </S.NoticeDetailRight>
      }
    >
      <S.NoticeDetailContent>{data?.content}</S.NoticeDetailContent>
    </Layout>
  );
};

export default NoticeDetail;
