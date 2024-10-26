import { useMutation, useQuery } from '@tanstack/react-query';
import { instance } from '..';
import { ChangeAttendance, attendanceType } from '../type';

const router = '/attendance';

export const useGetAttendaceStatus = (grade: number, class_num: number) => {
  return useQuery({
    queryKey: ['useGetAttendaceStatus', grade, class_num],
    queryFn: async () => {
      const { data } = await instance.get<attendanceType[]>(
        `${router}/total-time/grade?grade=${grade}&class_num=${class_num}`,
      );
      return data;
    },
  });
};

export const useChangeAttendanceStatus = () => {
  return useMutation<void, Error, ChangeAttendance[]>({
    mutationFn: async (param: ChangeAttendance[]) => {
      await instance.patch(`${router}/total-time/modify`, param);
    },
  });
};
