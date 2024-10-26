import { useQuery } from '@tanstack/react-query';
import { instance } from '..';
import { EarlyReturnType } from '../type';

const router = '/early-return';

export const useGetEarlyReturnList = () => {
  return useQuery({
    queryKey: ['EarlyReturnList'],
    queryFn: async () => {
      const { data } = await instance.get<EarlyReturnType[]>(`${router}/ok`);
      return data;
    },
  });
};
