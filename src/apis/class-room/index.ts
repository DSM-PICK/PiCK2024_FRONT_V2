import { useMutation } from "@tanstack/react-query";
import { instance } from "@/apis";
import { ClassChangeType } from "./type";

const router = `class-room`;

export const RequestChange = () => {
  return useMutation<
    ClassChangeType[],
    Error,
    { floor: number; status: "OK" | "QUIET" }
  >({
    mutationFn: async (param) => {
      const { data } = await instance.get(
        `${router}/floor?floor=${param.floor}&status=${param.status}`
      );
      return data;
    },
  });
};

export const AccpetListApi = () => {
  return useMutation<void, Error, { status: "OK" | "NO"; ids: string[] }>({
    mutationFn: async (param) => {
      await instance.patch(`${router}/status`, {
        ...param,
      });
    },
  });
};
