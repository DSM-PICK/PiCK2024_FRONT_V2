import { useMutation } from "@tanstack/react-query";
import { instance } from "..";
import { ChangeStatusType, StudentStatus } from "./type";

const router = "/status";

export const GetClassStatus = () => {
  return useMutation<
    StudentStatus,
    Error,
    { grade: number; class_num: number }
  >({
    mutationFn: async (param) => {
      const { data } = await instance.get(
        `${router}/grade?grade=${param.grade}&class_num=${param.class_num}`
      );
      return data;
    },
  });
};

export const ChangeStudentStatus = () => {
  return useMutation<void, Error, ChangeStatusType[]>({
    mutationFn: async (param) => {
      await instance.patch(`${router}/change`, param);
    },
  });
};
