import { useState } from 'react';
import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { cookie } from '@/utils/auth';
import { Login } from './request';
import { instance } from '@/apis';
import { MynameType } from '@/apis/type';
import useTeacherListInformation from '@/stores/teacherlist';

const router = 'admin';

export const useLogin = () => {
  const BASEURL = import.meta.env.VITE_SERVER_BASE_URL;

  console.log(BASEURL, router)

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  const loginMutation = useMutation({
    mutationFn: (param: Login) => {
      return axios
        .post(`${BASEURL}/${router}/login`, {
          ...param,
        })
        .then((response) => {
          const data = response.data;
          setAccessToken(data.access_token);
          setRefreshToken(data.refresh_token);
          cookie.set('access_token', data.access_token);
          cookie.set('refresh_token', data.refresh_token);
          return data;
        })
        .catch((error) => {
          throw error;
        });
    },
  });

  if (loginMutation.isError) {
    cookie.remove('access_token');
    cookie.remove('refresh_token');
    cookie.remove('part');
    console.error(loginMutation.error);
  }

  return {
    mutate: loginMutation.mutate,
    accessToken,
    refreshToken,
  };
};

export const MyName = () => {
  return useMutation<MynameType, Error, null>({
    mutationFn: async () => {
      const { data } = await instance.get(`${router}/my-name`);
      return data;
    },
  });
};

export const useGetAllTeacher = () => {
  const { teacher, setTeacher } = useTeacherListInformation();

  return useQuery({
    queryKey: ['GetAllTeacher'],
    queryFn: async () => {
      const { data } = await instance.get(`${router}/all`);
      setTeacher(data);
      return data;
    },
    enabled: teacher.length === 0,
  });
};
