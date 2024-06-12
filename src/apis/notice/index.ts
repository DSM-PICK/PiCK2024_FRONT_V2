import { useQuery } from "@tanstack/react-query";
import { instance } from "apis";
import {
  NoticeDetailType,
  SimpleNoticeType,
  UploadNoticeType,
} from "apis/type";
import { useMutation } from "@tanstack/react-query";

const router = "/notice";

export const SimpleNotice = () => {
  return useQuery<SimpleNoticeType>({
    queryKey: ["simpleNotice"],
    queryFn: async () => {
      const { data } = await instance.get(`${router}/simple`);
      return data;
    },
  });
};

export const DetailNotice = () => {
  return useMutation<NoticeDetailType, Error, string>({
    mutationFn: async (id: string) => {
      const { data } = await instance.get(`${router}/${id}`);
      return data;
    },
  });
};

export const UploadNotice = () => {
  return useMutation<void, Error, UploadNoticeType>({
    mutationFn: async (param: UploadNoticeType) => {
      await instance.post(`${router}/create`, {
        ...param,
      });
    },
  });
};
