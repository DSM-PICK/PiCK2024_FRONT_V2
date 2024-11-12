import { useQuery } from '@tanstack/react-query';
import { instance } from '..';
import { ApplicationCount, DetailApplication } from './type';

const router = '/story';

export const AllList = () => {
  return useQuery<ApplicationCount[]>({
    queryKey: ['AllList'],
    queryFn: async () => {
      const { data } = await instance.get<ApplicationCount[]>(`${router}/all`);
      return data;
    },
  });
};

export const DetailList = (student_id: string) => {
  return useQuery({
    queryKey: ['DetailList', student_id],
    queryFn: async () => {
      const { data } = await instance.get<DetailApplication>(
        `${router}/query/${student_id}`,
      );
      return data;
    },
  });
};
