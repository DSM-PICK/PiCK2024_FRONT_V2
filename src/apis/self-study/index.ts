import { useMutation, useQuery } from "@tanstack/react-query";
import { instance } from "@/apis";
import { data, todaySelfStudTeacher } from "@/apis/type";
import { getFullToday } from "@/utils/date";
import { postTeacherProp } from "./type";

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

export const PostTeacher = () => {
  return useMutation<void, Error, postTeacherProp>({
    mutationFn: async (param) => {
      try {
        await instance.post(`/self-study/register`, param);
      } catch (error) {
        console.log("");
      }
    },
  });
};

export const SelectTeacher = (date: string) => {
  return useQuery<data[]>({
    queryKey: ["SelectTeacher", date],
    queryFn: async () => {
      try {
        const response = await instance.get(`self-study/date?date=${date}`);
        return response.data;
      } catch (error) {
        console.log("");
      }
    },
  });
};
