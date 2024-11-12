import Calendar from '@/components/calendar';
import { Layout } from '@/components/layout';

const Schedule = () => {
  return (
    <Layout now="학사일정" title="학사일정">
      <Calendar type="schedule" />
    </Layout>
  );
};

export default Schedule;
