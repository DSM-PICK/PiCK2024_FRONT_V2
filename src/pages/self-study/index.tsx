import { TodaySelfStudy } from "@/apis/self-study";
import Calendar from "@/components/calendar";
import { Layout } from "@/components/layout";
import { theme } from "@/styles/theme";
import { styled } from "styled-components";

const SelfStudy = () => {
  const { data: Today } = TodaySelfStudy();
  return (
    <Layout
      now="자습감독 변경"
      title="자습감독 변경"
      right={
        Today?.length !== 0 ? (
          Today?.map((item) => (
            <TodayWrap>
              <FloorBedge>{item.floor}층</FloorBedge>
              <TeacherName> {item.teacher_name}선생님</TeacherName>
            </TodayWrap>
          ))
        ) : (
          <TeacherName>자습감독이 없습니다</TeacherName>
        )
      }
    >
      <Calendar type="selfStudy" />
    </Layout>
  );
};

export default SelfStudy;

const FloorBedge = styled.div`
  background-color: ${theme.color.main[400]};
  border-radius: 20px;
  padding: 8px 20px;
  color: ${theme.color.normal.white};
`;

const TeacherName = styled.p`
  font-size: ${theme.font.heading[4].size};
`;

const TodayWrap = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;
