import { MutationOptions, useMutation, useQuery } from '@tanstack/react-query';
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
  status: 'OK' | 'NO',
  id_list: string[],
  option: MutationOptions,
) => {
  return useMutation({
    ...option,
    mutationFn: async () => {
      await instance.patch(`${router}/status`, {
        status,
        id_list,
      });
    },
  });
};
