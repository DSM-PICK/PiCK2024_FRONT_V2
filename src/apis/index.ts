import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { cookie } from '@/utils/auth';

const BASEURL = import.meta.env.VITE_SERVER_BASE_URL;

export const instance: AxiosInstance = axios.create({
  baseURL: BASEURL,
  timeout: 10000,
});

instance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const accessToken = cookie.get('access_token');
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (axios.isAxiosError(error) && error.response) {
      const { status } = error.response;
      if (status === 401) {
        const originalConfig = error.config as
          | (AxiosRequestConfig & { _retry?: boolean })
          | undefined;
        if (!originalConfig) return Promise.reject(error);
        if (originalConfig._retry) return Promise.reject(error);

        if (originalConfig.url?.includes('/admin/refresh')) {
          return Promise.reject(error);
        }

        originalConfig._retry = true;

        try {
          const refreshToken = cookie.get('refresh_token');

          const response = await axios.put(`${BASEURL}/admin/refresh`, null, {
            headers: {
              'X-Refresh-Token': `${refreshToken}`,
            },
          });
          const data = response.data;
          cookie.set('access_token', data.access_token);
          cookie.set('refresh_token', data.refresh_token);

          originalConfig.headers = {
            ...(originalConfig.headers || {}),
            Authorization: `Bearer ${data.access_token}`,
          };

          return instance(originalConfig);
        } catch (refreshError) {
          window.location.href = '/';
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  },
);
