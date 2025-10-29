import { useMutation } from '@tanstack/react-query';
import { Email } from '../type';
import { instance } from '..';

export const useEmailAuth = () => {
  return useMutation<void, unknown, Email>({
    mutationFn: async (body) => {
      await instance.post('mail/send', body);
    },
  });
};
