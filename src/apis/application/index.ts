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

export const OutRequest = (
  grade: number,
  class_num: number,
  type: 'application' | 'early-return',
) => {
  return useQuery({
    queryKey: ['OutRequest', grade, class_num, type],
    queryFn: async () => {
      const { data } = await instance.get<applicationDataProp[]>(
        `${type}/grade?grade=${grade}&class_num=${class_num}`,
      );
      return data;
    },
  });
};

export const useOutAccept = (
  type: 'application' | 'early-return',
  status: 'OK' | 'NO',
  id_list: string[],
  option: MutateOptions,
) => {
  return useMutation({
    ...option,
    mutationFn: async () => {
      try {
        await instance.patch(`${type}/status`, {
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

export const OutListFloor = (
  floor: number,
  status: string,
  type: 'application' | 'early-return',
) => {
  return useQuery({
    queryKey: ['OutListFloor', floor, status, type],
    queryFn: async () => {
      const { data } = await instance.get<OutListProp[]>(
        `${type}/floor?floor=${floor}&status=${status}`,
      );
      return data;
    },
  });
};

export const ReturnSchool = (id_list: string[], option: MutateOptions) => {
  return useMutation({
    ...option,
    mutationFn: async () => {
      try {
        await instance.patch(`${router}/return`, id_list, {
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
