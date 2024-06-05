import { useQuery } from "@tanstack/react-query";
import { instance } from "apis";
import { todaySelfStudTeacher } from "apis/type";
import { getFullToday } from "utils/date";

const router = `/self-study`;

export const TodaySelfStudy = () => {
  return useQuery<todaySelfStudTeacher[]>({
    queryKey: ["todaySelfStudTeacher"],
    queryFn: async () => {
      const { data } = await instance.get(
        `${router}/today?date=${getFullToday()}`
      );
      return data;
    },
  });
};
