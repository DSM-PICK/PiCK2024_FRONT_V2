import { useQuery } from "@tanstack/react-query";
import { instance } from "apis";
import { StateCountType } from "apis/type";

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
