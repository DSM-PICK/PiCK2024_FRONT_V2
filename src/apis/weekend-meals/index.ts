import { useMutation, useQuery } from '@tanstack/react-query';
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
