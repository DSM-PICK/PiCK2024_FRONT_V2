import { useMutation, useQuery } from '@tanstack/react-query';
import { instance } from '..';
import { TimeTableChangeProps, TimetableProp } from './type';

const router = '/timetable';

export const useGetTimeTable = (grade: number, class_num: number) => {
  return useQuery({
    queryKey: ['useGetTimeTable', grade, class_num],
    queryFn: async () => {
      const { data } = await instance.get<TimetableProp[]>(
        `${router}/all?grade=${grade}&class_num=${class_num}`,
      );
      return data;
    },
  });
};

export const useTimeTableChange = () => {
  return useMutation({
    mutationFn: async (param: TimeTableChangeProps) => {
      console.log(param);
      const { data } = await instance.patch(`${router}/change`, param);
      return data;
    },
  });
};
