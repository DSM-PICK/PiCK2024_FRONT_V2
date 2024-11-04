import { useQuery } from '@tanstack/react-query';
import { instance } from '@/apis';
import {
  EditNotice,
  NoticeDetailType,
  SimpleNoticeType,
  UploadNoticeType,
} from '@/apis/type';
import { useMutation } from '@tanstack/react-query';

const router = '/notice';

export const SimpleNotice = () => {
  return useQuery<SimpleNoticeType>({
    queryKey: ['simpleNotice'],
    queryFn: async () => {
      const { data } = await instance.get(`${router}/simple`);
      return data;
    },
  });
};

export const DetailNotice = (id: string) => {
  return useQuery({
    queryKey: ['DetailNotice', id],
    queryFn: async () => {
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

export const useDeleteNotice = () => {
  return useMutation<void, Error, { id: string }>({
    mutationFn: async (param) => {
      await instance.delete(`${router}/delete/${param.id}`);
    },
  });
};

export const useEditNotice = () => {
  return useMutation<void, Error, EditNotice>({
    mutationFn: async (param) => {
      await instance.patch(`${router}/modify`, param);
    },
  });
};
