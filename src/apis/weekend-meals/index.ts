import { useMutation, useQuery } from "@tanstack/react-query";
import { instance } from "..";
import { GetAllMealsType } from "./type";

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
