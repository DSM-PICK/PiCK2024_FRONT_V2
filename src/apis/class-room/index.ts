import {
  UseMutationOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { instance } from '@/apis';
import { ClassChangeType } from './type';

const router = `class-room`;

export const RequestChange = (floor: number, status: 'OK' | 'QUIET') => {
  return useQuery({
    queryKey: ['RequestChange', floor, status],
    queryFn: async () => {
      const { data } = await instance.get<ClassChangeType[]>(
        `${router}/floor?floor=${floor}&status=${status}`,
      );
      return data;
    },
  });
};

export const AcceptListApi = (
  id_list: string[],
  option: UseMutationOptions<void, Error, 'OK' | 'NO', unknown>,
) => {
  return useMutation<void, Error, 'OK' | 'NO'>({
    ...option,
    mutationFn: async (status) => {
      await instance.patch(`${router}/status`, {
        status,
        id_list,
      });
    },
  });
};
