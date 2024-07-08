import { DetailList } from "@/apis/story";
import { Layout } from "@/components/layout";
import ApplicationDetail from "@/components/list/applicationDetail";
import { theme } from "@/styles/theme";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import nextSvg from "@/assets/svg/next.svg";

const PreviousDetail = () => {
  const { detail } = useParams<{ detail: string }>();
  const id = detail || "";
  const { data } = DetailList(id);
  const router = useNavigate();
  return (
    <Layout
      now={
        <>
          <span
            onClick={() => {
              router("/previousList");
            }}
          >
            이전 외출 기록
          </span>
          <img src={nextSvg} alt="" /> <span>{data?.username}</span>
        </>
      }
      title={`${data?.username}의 이전 외출 기록`}
    >
      <SemiTitle>
        <Highlight>{data?.username}</Highlight>의 이전 외출
      </SemiTitle>
      <ContentWrap>
        {data?.application_story.map((item) => (
          <ApplicationDetail
            start_time={item.start_time}
            end_time={item.end_time}
            date={item.date}
            reason={item.reason}
            type={item.type}
          />
        ))}
      </ContentWrap>
    </Layout>
  );
};

export default PreviousDetail;

const Highlight = styled.span`
  color: ${theme.color.normal.black};
`;

const SemiTitle = styled.p`
  font-size: ${theme.font.heading[2].size};
  font-weight: ${theme.font.heading[2].fontweight};
  color: ${theme.color.gray[900]};
`;

const ContentWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 40px;
  row-gap: 20px;
`;