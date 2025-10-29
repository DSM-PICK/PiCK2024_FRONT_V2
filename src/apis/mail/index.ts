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
