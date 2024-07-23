import { useQuery, useMutation } from '@tanstack/react-query';
import { instance } from '@/apis';
import { TodayMealsType } from '@/apis/type';
import { getFullToday } from '@/utils/date';

const router = '/meal';

export const TodayMeals = () => {
  return useQuery<TodayMealsType>({
    queryKey: ['todayMeals'],
    queryFn: async () => {
      const { data } = await instance.get(
        `${router}/date?date=${getFullToday()}`,
      );
      return data;
    },
  });
};

export const DownLoad = () => {
  const downloadExcel = async () => {
    try {
      const response = await instance.get('/weekend-meal/excel', {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', '주말급식리스트.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error while downloading Excel file:', error);
      alert('엑셀 다운로드에 실패하였습니다');
    }
  };

  return { downloadExcel };
};
