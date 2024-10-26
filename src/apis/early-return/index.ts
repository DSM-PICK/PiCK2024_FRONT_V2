import { useQuery } from '@tanstack/react-query';
import { instance } from '..';
import { EalryRetirnType } from '../type';

const router = '/early-return';

export const useGetEalryReturnList = () => {
  return useQuery({
    queryKey: ['EalryReturnList'],
    queryFn: async () => {
      const { data } = await instance.get<EalryRetirnType[]>(`${router}/ok`);
      return data;
    },
  });
};
