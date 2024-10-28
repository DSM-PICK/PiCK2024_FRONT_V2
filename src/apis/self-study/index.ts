import { useMutation, useQuery } from '@tanstack/react-query';
import { instance } from '@/apis';
import {
  SelectedDaySelfStudTeacher,
  dataType,
  todaySelfStudTeacher,
} from '@/apis/type';
import { getFullToday } from '@/utils/date';
import { postTeacherProp } from './type';

const router = `/self-study`;

export const TodaySelfStudy = () => {
  return useQuery({
    queryKey: ['todaySelfStudTeacher'],
    queryFn: async () => {
      const { data } = await instance.get<todaySelfStudTeacher[]>(
        `${router}/today?date=${getFullToday()}`,
      );
      return data;
    },
  });
};

export const SelfstudyGet = (month: string, year: string) => {
  return useQuery({
    queryKey: ['SelfstudyGet', month, year],
    queryFn: async () => {
      const { data } = await instance.get<dataType[]>(
        `${router}/month?month=${month}&year=${year}`,
      );
      return data;
    },
  });
};

export const PostTeacher = () => {
  return useMutation<void, Error, postTeacherProp>({
    mutationFn: async (param) => {
      try {
        await instance.post(`/self-study/register`, param);
      } catch (error) {
        console.log('');
      }
    },
  });
};

export const SelectTeacher = (date: string) => {
  return useQuery({
    queryKey: ['SelectTeacher', date],
    queryFn: async () => {
      try {
        const { data } = await instance.get<SelectedDaySelfStudTeacher[]>(
          `self-study/date?date=${date}`,
        );

        return data;
      } catch (error) {
        console.log('');
      }
    },
  });
};
