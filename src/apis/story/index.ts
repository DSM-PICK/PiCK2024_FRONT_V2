import { useQuery } from "@tanstack/react-query";
import { instance } from "..";
import { ApplicationCount, DetailApplication } from "./type";

const router = "/story";

export const AllList = () => {
  return useQuery<ApplicationCount[]>({
    queryKey: ["AllList"],
    queryFn: async () => {
      const { data } = await instance.get(
        `${router}/grade?grade=3&class_num=4` //추후에 전체 조회 api생기면 바꿀 예정
      );
      return data;
    },
  });
};

export const DetailList = (student_id: string) => {
  return useQuery<DetailApplication>({
    queryKey: ["DetailList"],
    queryFn: async () => {
      const { data } = await instance.get(`${router}/query/${student_id}`);
      return data;
    },
  });
};
