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
