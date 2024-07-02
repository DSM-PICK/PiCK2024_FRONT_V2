import { useQuery, useMutation } from "@tanstack/react-query";
import { instance } from "apis";
import { data } from "apis/type";

const router = "/self-study";

export const SelfstudyGet = () => {
  return useMutation<data[], Error, { month: string; year: string }>({
    mutationFn: async (param) => {
      try {
        const { data } = await instance.get(
          `/self-study/month?month=${param.month}&year=${param.year}`
        );
        return data;
      } catch (error) {
        console.log("");
      }
    },
  });
};
