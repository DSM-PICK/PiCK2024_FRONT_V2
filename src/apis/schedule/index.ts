import { useMutation, useQuery } from '@tanstack/react-query';
import { instance } from '..';
import { CreateScheduleType, MonthScheduleData, addSchedule } from './type';

const router = '/schedule';

export const MonthSchedule = (month: string, year: string) => {
  return useQuery({
    queryKey: ['MonthSchedule', month, year],
    queryFn: async () => {
      const { data } = await instance.get(
        `${router}//month?year=${year}&month=${month}`,
      );
      return data;
    },
  });
};

export const AddSchedule = () => {
  return useMutation<void, Error, addSchedule>({
    mutationFn: async (param: addSchedule) => {
      try {
        const response = await instance.post('/schedule/create', {
          event_name: param.event_name,
          date: param.date,
        });
        return response.data;
      } catch (error) {
        console.log('');
      }
    },
  });
};

export const DaySchedule = (date: string) => {
  return useQuery<MonthScheduleData[]>({
    queryKey: ['DaySchedule', date],
    queryFn: async () => {
      const { data } = await instance.get(`${router}/date?date=${date}`);
      return data;
    },
  });
};

export const DeleteSchedule = () => {
  return useMutation<void, Error, { id: string }>({
    mutationFn: async (param) => {
      await instance.delete(`${router}/delete/${param.id}`);
    },
  });
};

export const CreateSchedule = () => {
  return useMutation<void, Error, CreateScheduleType>({
    mutationFn: async () => {
      await instance.post(`${router}/create`);
    },
  });
};
