import { useQuery, useMutation } from "@tanstack/react-query";
import { instance } from "@/apis";
import { OutListProp, StateCountType, applicationDataProp } from "@/apis/type";

const router = `/application`;

export const StudentStateCount = () => {
  return useQuery<StateCountType>({
    queryKey: ["studentStateCount"],
    queryFn: async () => {
      const { data } = await instance.get(`${router}/status`);
      return data;
    },
  });
};

export const OutRequest = (grade: number, class_num: number) => {
  return useQuery({
    queryKey: ["OutRequest", grade ,class_num],
    queryFn: async () => {
      const { data } = await instance.get<applicationDataProp[]>(
        `${router}/grade?grade=${grade}&class_num=${class_num}`
      );
      return data;
    },
  });
};

export const useOutAccept = () => {
  return useMutation<void, Error, { status: "OK" | "NO"; ids: string[] }>({
    mutationFn: async (param) => {
      try {
        await instance.patch(`${router}/status`, {
          ids: param.ids,
          status: param.status,
        });
      } catch (error) {
        console.log(error);
      }
    },
  });
};

export const OutListFloor = (floor: number, status: string) => {
  return useQuery({
    queryKey: ["OutListFloor", floor, status],
    queryFn: async () => {
      const { data } = await instance.get<OutListProp[]>(
        `${router}/floor?floor=${floor}&status=${status}`
      );
      return data;
    },
  });
};

export const ReturnSchool = () => {
  return useMutation<void, Error, string[]>({
    mutationFn: async (...param) => {
      try {
        await instance.patch(`${router}/return`, ...param);
      } catch (error) {
        console.log(error);
      }
    },
  });
};
