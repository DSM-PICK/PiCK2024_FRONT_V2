import { useQuery, useMutation } from "@tanstack/react-query";
import { instance } from "apis";
import { StateCountType, applicationDataProp } from "apis/type";

const router = `/application`;

interface ClassProp {
  grade: number;
  class: number;
}

export const StudentStateCount = () => {
  return useQuery<StateCountType>({
    queryKey: ["studentStateCount"],
    queryFn: async () => {
      const { data } = await instance.get(`${router}/status`);
      return data;
    },
  });
};

export const OutRequest = () => {
  return useMutation<applicationDataProp[], Error, ClassProp>({
    mutationFn: async (param: ClassProp) => {
      try {
        const response = await instance.get(
          `${router}/grade?grade=${param.grade}&class_num=${param.class}`
        );
        return response.data;
      } catch (error) {
        console.log(error);
      }
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
