import { useQuery, useMutation, MutateOptions } from '@tanstack/react-query';
import { instance } from '@/apis';
import { OutListProp, StateCountType, applicationDataProp } from '@/apis/type';

const router = `/application`;

export const StudentStateCount = () => {
  return useQuery<StateCountType>({
    queryKey: ['studentStateCount'],
    queryFn: async () => {
      const { data } = await instance.get(`${router}/status`);
      return data;
    },
  });
};

export const OutRequest = (grade: number, class_num: number) => {
  return useQuery({
    queryKey: ['OutRequest', grade, class_num],
    queryFn: async () => {
      const { data } = await instance.get<applicationDataProp[]>(
        `${router}/grade?grade=${grade}&class_num=${class_num}`,
      );
      return data;
    },
  });
};

export const useOutAccept = (
  status: 'OK' | 'NO',
  id_list: string[],
  option: MutateOptions,
) => {
  return useMutation({
    ...option,
    mutationFn: async () => {
      try {
        await instance.patch(`${router}/status`, {
          id_list: id_list,
          status: status,
        });
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  });
};

export const OutListFloor = (floor: number, status: string) => {
  return useQuery({
    queryKey: ['OutListFloor', floor, status],
    queryFn: async () => {
      const { data } = await instance.get<OutListProp[]>(
        `${router}/floor?floor=${floor}&status=${status}`,
      );
      return data;
    },
  });
};

export const ReturnSchool = (ids: string[], option: MutateOptions) => {
  return useMutation({
    ...option,
    mutationFn: async () => {
      try {
        await instance.patch(`${router}/return`, ids, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  });
};
