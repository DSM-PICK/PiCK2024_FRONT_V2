import { useQuery, useMutation } from '@tanstack/react-query';
import { instance } from '@/apis';
import { TodayMealsType } from '@/apis/type';
import { getFullToday } from '@/utils/date';
import { showToast } from '@/components/toast';

const router = '/meal';
const mealrouter = '/weekend-meal';

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
      const response = await instance.get(`${mealrouter}/excel`, {
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

export const ClassDownLoadExcel = (grade: number, class_num: number) => {
  const ClassDownloadExcel = async () => {
    try {
      const { data } = await instance.get(
        `${mealrouter}/excel/grade?grade=${grade}&class_num=${class_num}`,
        {
          responseType: 'blob',
        },
      );

      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `${grade}학년 ${class_num}반 주말급식 리스트.xlsx`,
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      showToast({ type: 'error', message: '엑셀 다운로드에 실패하였습니다' });
    }
  };

  return { ClassDownloadExcel };
};

export const WeekendMealStartEnd = () => {
  return useMutation({
    mutationFn: async (param) => {
      const { data } = await instance.patch(`${mealrouter}/period`, param);
      return data;
    },
  });
};
