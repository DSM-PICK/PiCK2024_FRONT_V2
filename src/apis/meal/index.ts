import { useQuery } from "@tanstack/react-query";
import { instance } from "@/apis";
import { TodayMealsType } from "@/apis/type";
import { getFullToday } from "@/utils/date";

const router = "/meal";

export const TodayMeals = () => {
  return useQuery<TodayMealsType>({
    queryKey: ["todayMeals"],
    queryFn: async () => {
      const { data } = await instance.get(
        `${router}/date?date=${getFullToday()}`
      );
      return data;
    },
  });
};
