import { useGetClubMemberList } from '@/apis/attendance';
import Dropdown from '@/components/dropdown';
import { Layout } from '@/components/layout';
import ClassList from '@/components/list/class';
import { getWeekDay } from '@/utils/date';
import { clubOptions } from '@/utils/dropdown';
import { setStudentNum } from '@/utils/utils';
import { useState } from 'react';

const ClubPage = () => {
  const [selectedClub, setSelectedClub] = useState<string>('대동여지도');
  const { data: ClubMember } = useGetClubMemberList(selectedClub);

  const handleClubChange = (selectedOption: number | string) => {
    setSelectedClub(String(selectedOption));
  };

  return (
    <Layout
      now="전공동아리"
      title="전공동아리"
      right={
        <Dropdown
          options={clubOptions}
          value={selectedClub}
          changeHandler={handleClubChange}
        />
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
