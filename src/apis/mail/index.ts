import { useMutation } from '@tanstack/react-query';
import { Email } from '../type';
import axios from 'axios';

const BASEURL = import.meta.env.VITE_SERVER_BASE_URL;
const router = '/mail';

export const useEmailAuth = () => {
  return useMutation<void, unknown, Email>({
    mutationFn: async (body) => {
      await axios.post(`${BASEURL}${router}/send`, body);
    },
  });
};

export const useEmailCheck = () => {
  return useMutation({
    mutationFn: async ({ email, code }: { email: string; code: string }) => {
      const { data } = await axios.post(`${BASEURL}${router}/check`, {
        email,
        code,
      });
      return data;
    },
  });
};
