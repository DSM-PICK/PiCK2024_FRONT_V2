import { useMutation, useQuery } from "@tanstack/react-query";
import { instance } from "..";
import { ChangeStatusType, StudentStatus } from "./type";

const router = "/status";

export const GetClassStatus = (grade:number, class_num:number) => {
  return useQuery({
    queryKey: ['GetClassStatus', grade, class_num],
    queryFn : async () => {
      const {data} = await instance.get<StudentStatus[]>(`${router}/grade?grade=${grade}&class_num=${class_num}`)
      return data
    }
  })

};

export const ChangeStudentStatus = () => {
  return useMutation<void, Error, ChangeStatusType[]>({
    mutationFn: async (param) => {
      await instance.patch(`${router}/change`, param);
    },
  });
};
