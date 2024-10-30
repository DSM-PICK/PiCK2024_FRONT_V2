import {
  MutationOptions,
  useMutation,
  useQuery,
  useQueries,
} from '@tanstack/react-query';
import { instance } from '..';
import { ChangeStateParams, GetAllMealsType } from './type';

const router = 'weekend-meal';

export const GetAllMeals = () => {
  return useQuery<GetAllMealsType[]>({
    queryKey: [],
    queryFn: async () => {
      const { data } = await instance.get(`${router}/hey`);
      return data;
    },
  });
};

export const ChangeState = () => {
  return useMutation<void, Error, ChangeStateParams>({
    mutationFn: async (params) => {
      try {
        await instance.patch(
          `weekend-meal/status?id=${params.userId}&status=${params.status}`,
        );
      } catch (error) {
        console.log(error);
      }
    },
  });
};

export const GetClassWeekendMeal = (grade: number, class_num: number) => {
  return useQuery({
    queryKey: ['GetClassWeekendMeal', grade, class_num],
    queryFn: async () => {
      try {
        const { data } = await instance.get<GetAllMealsType[]>(
          `${router}/all?grade=${grade}&class_num=${class_num}`,
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });
};

export const useChangeWeekendMealPeriod = (
  start: string,
  end: string,
  month: number,
  option: MutationOptions,
) => {
  const data = { start, end, month };
  return useMutation({
    ...option,
    mutationFn: async () => {
      await instance.patch(`${router}/period`, data);
    },
  });
};

export const useGetWeekendMealInfo = () => {
  return useQueries({
    queries: [
      {
        queryKey: ['useGetWeekendMealPeriod'],
        queryFn: async () => {
          const { data } = await instance.get<{
            start: string;
            end: string;
            status: boolean;
          }>(`${router}/period`);
          return data;
        },
      },
      {
        queryKey: ['useGetWeekendMealCheck'],
        queryFn: async () => {
          const { data } = await instance.get<{
            status: boolean;
            month: number;
          }>(`${router}/application`);
          return data;
        },
      },
    ],
  });
};
