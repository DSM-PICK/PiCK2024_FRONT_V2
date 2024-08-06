import { useNavigate } from 'react-router-dom';
import * as S from './style';

interface NoticeProp {
  index?: number;
  title: string;
  teacher: string;
  date: string;
  id: string;
}

const NoticeList = ({ index, title, teacher, date, id }: NoticeProp) => {
  const nav = useNavigate();

  return (
    <S.NoticeWrap
      onClick={() => {
        nav(`${id}`);
      }}
    >
      <S.NoticeLeft>
        <div>{index}</div>
        <div>{title}</div>
      </S.NoticeLeft>
      <S.NoticeRight>
        <div>{teacher} 선생님</div>
        <div>{date}</div>
      </S.NoticeRight>
    </S.NoticeWrap>
  );
};

export default NoticeList;
