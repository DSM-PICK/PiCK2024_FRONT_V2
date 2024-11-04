import { useState } from 'react';
import { useGetClubMemberList } from '@/apis/attendance';
import Dropdown from '@/components/dropdown';
import { Layout } from '@/components/layout';
import ClassList from '@/components/list/class';
import { getWeekDay } from '@/utils/date';
import { setStudentNum } from '@/utils/utils';
import {
  NotAllFloorOption,
  SecondClub,
  ThirdClub,
  fourthClub,
} from '@/utils/dropdown';
import { styled } from 'styled-components';
import { theme } from '@/styles/theme';

const getClubsByFloor = (floor: number) => {
  switch (floor) {
    case 2:
      return SecondClub;
    case 3:
      return ThirdClub;
    case 4:
      return fourthClub;
    default:
      return [];
  }
};

const ClubPage = () => {
  const [selectedClub, setSelectedClub] = useState<string>('대동여지도');
  const [selectedFloor, setSelectedFloor] = useState<number>(2);
  const { data: ClubMember } = useGetClubMemberList(selectedClub);
  const period = ['8교시', '9교시', '10교시'];
  const allperiod = ['6교시', '7교시', '8교시', '9교시', '10교시'];

  const handleClubChange = (selectedOption: number | string) => {
    setSelectedClub(String(selectedOption));
  };

  const handleFloorChange = (selectedOption: number | string) => {
    setSelectedFloor(Number(selectedOption));
    const clubs = getClubsByFloor(Number(selectedOption));
    if (clubs.length > 0) {
      setSelectedClub(clubs[0].value);
    }
  };

  return (
    <Layout
      now="전공동아리"
      title="전공동아리"
      right={
        <>
          <Dropdown
            options={NotAllFloorOption}
            value={selectedFloor}
            changeHandler={handleFloorChange}
          />
          <Dropdown
            options={getClubsByFloor(selectedFloor)}
            value={selectedClub}
            changeHandler={handleClubChange}
          />
        </>
      }
    >
      <TitleContainer>
        <PeriodText>{getWeekDay()}요일</PeriodText>
        <PeriodMap>
          {getWeekDay() === '금'
            ? allperiod.map((item) => (
                <PeriodText key={item}>{item}</PeriodText>
              ))
            : period.map((item) => <PeriodText key={item}>{item}</PeriodText>)}
        </PeriodMap>
      </TitleContainer>
      {ClubMember?.map((item) => (
        <ClassList
          refetchStatus={() => {}}
          key={item.id}
          name={item.user_name}
          number={setStudentNum(item)}
          id={item.id}
          status6={item.status6}
          status7={item.status7}
          status8={item.status8}
          status9={item.status9}
          status10={item.status10}
          self={getWeekDay() === '금' ? 'club' : 'attendance'}
        />
      ))}
    </Layout>
  );
};

export default ClubPage;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PeriodMap = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: clamp(60px, 10vw, 120px);
  padding: 16px 20px;
`;

const PeriodText = styled.p`
  font-size: ${theme.font.heading[3].size};
  font-weight: ${theme.font.heading[3].fontweight};
`;
