import {
  MutateOptions,
  MutationOptions,
  useMutation,
} from '@tanstack/react-query';
import { instance } from '..';
import { BugProp } from './type';
import { toast } from 'react-toastify';
import { showToast } from '@/components/toast';

const router = '/bug';

export const BugImg = () => {
  return useMutation<string[], Error, { file: File[] }>({
    mutationFn: async (param) => {
      try {
        const formData = new FormData();
        param.file.forEach((file) => {
          formData.append('file', file);
        });
        const { data } = await instance.post(`${router}/upload`, formData);
        return data;
      } catch (error) {
        showToast({ type: 'error', message: '이미지 용량이 너무 큽니다.' });
        throw error;
      }
    },
  });
};

export const BugPost = (option: MutateOptions, param: BugProp) => {
  return useMutation({
    ...option,
    mutationFn: async () => {
      try {
        await instance.post(`/bug/message`, {
          ...param,
          model: 'WEB',
        });
      } catch (error) {
        console.log(error);
      }
    },
  });
};
