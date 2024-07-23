import Calendar from '@/components/calendar';
import { Layout } from '@/components/layout';

const Schedule = () => {
  return (
    <Layout now="학사 일정 변경" title="학사 일정 변경">
      <Calendar type="schedule" />
    </Layout>
  );
};

export default Schedule;
