import { useMutation, useQuery } from '@tanstack/react-query';
import { instance } from '@/apis';
import { ClassChangeType } from './type';

const router = `class-room`;

export const RequestChange = (floor: number, status: 'OK' | 'QUIET') => {
  return useQuery({
    queryKey: ['RequestChange', floor, status],
    queryFn: async () => {
      const { data } = await instance.get(
        `${router}/floor?floor=${floor}status=${status}`,
      );
      return data;
    },
  });
};

export const AccpetListApi = () => {
  return useMutation<void, Error, { status: 'OK' | 'NO'; ids: string[] }>({
    mutationFn: async (param) => {
      await instance.patch(`${router}/status`, {
        ...param,
      });
    },
  });
};
