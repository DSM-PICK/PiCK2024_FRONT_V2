import { useMutation, useQuery } from '@tanstack/react-query';
import { instance } from '..';
import { AttendanceType, ChangeAttendance, attendanceType } from '../type';

const router = '/attendance';

export const useGetAttendanceStatus = (grade: number, class_num: number) => {
  return useQuery({
    queryKey: ['useGetAttendanceStatus', grade, class_num],
    queryFn: async () => {
      const { data } = await instance.get<attendanceType[]>(
        `${router}/total-time/grade?grade=${grade}&class_num=${class_num}`,
      );
      return data;
    },
    staleTime: 100 * 1,
  });
};

export const useChangeAttendanceStatus = () => {
  return useMutation<void, Error, ChangeAttendance[]>({
    mutationFn: async (param: ChangeAttendance[]) => {
      await instance.patch(`${router}/total-time/modify`, param);
    },
  });
};

export const useGetClubMemberList = (club: string) => {
  return useQuery({
    queryKey: ['useGetClubMemberList', club],
    queryFn: async () => {
      const { data } = await instance.get<attendanceType[]>(
        `${router}/total-time/club?club=${club}`,
      );
      return data;
    },
  });
};
