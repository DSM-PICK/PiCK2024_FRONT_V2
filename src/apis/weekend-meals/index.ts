import { useMutation, useQuery } from "@tanstack/react-query";
import { instance } from "..";
import { ChangeStateParams, GetAllMealsType } from "./type";

const router = "weekend-meal";

export const GetAllMeals = () => {
  return useQuery<GetAllMealsType[]>({
    queryKey: [],
    queryFn: async () => {
      const { data } = await instance.get(`${router}/hey`);
      return data;
    },
  });
};

export const ChangeState = () => {
  return useMutation<void, Error, ChangeStateParams>({
    mutationFn: async (params) => {
      try {
        await instance.patch(
          `weekend-meal/status?id=${params.userId}&status=${params.status}`
        );
      } catch (error) {
        console.log(error);
      }
    },
  });
};
