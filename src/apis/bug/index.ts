import { useMutation } from '@tanstack/react-query';
import { instance } from '..';
import { BugProp } from './type';
import { toast } from 'react-toastify';

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
        alert('이미지 용량이 너무 큽니다');
        throw error;
      }
    },
  });
};

export const BugPost = () => {
  return useMutation<void, Error, BugProp>({
    mutationFn: async (param) => {
      try {
        await instance
          .post(`/bug/message`, {
            ...param,
            model: 'WEB',
          })
          .then(() => {
            toast.success('ㅂㅓㄱㅡㅈㅔㅂㅗ ㄷㅗㅣㅇㅓㅆㅅㅡㅂㄴㅣㄷㅏ');
          });
      } catch (error) {
        toast.error('ㅂㅓㄱㅡㅈㅔㅂㅗ ㅅㅣㄹㅍㅐ');
      }
    },
  });
};
