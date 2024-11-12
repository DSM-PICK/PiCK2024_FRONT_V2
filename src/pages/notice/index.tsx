import React, { useState } from 'react';
import NoticeList from '@/components/noticeList';
import * as S from './style';
import { Layout } from '@/components/layout';
import { Button } from '@/components/Button';
import { useNavigate } from 'react-router-dom';
import { SimpleNotice } from '@/apis/notice';
import { SimpleNoticeType } from '@/apis/type';
import SearchInput from '@/components/input/search';

const NoticePage = () => {
  const { data } = SimpleNotice();
  const nav = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = ({ text }: { text: string; name: string }) => {
    setSearchTerm(text);
  };

  const notices: SimpleNoticeType[] = Array.isArray(data) ? data : [];

  const filteredNotices = notices.filter((notice: SimpleNoticeType) =>
    notice.title.includes(searchTerm),
  );

  return (
    <>
      <Layout
        title="공지"
        now="공지"
        right={
          <>
            <Button
              onClick={() => {
                nav('write');
              }}
              type="main"
              size="small"
            >
              공지 작성하기
            </Button>
            <SearchInput
              type="Search"
              value={searchTerm}
              placeholder="검색할 공지의 제목을 입력해주세요"
              onChange={handleSearchChange}
            />
          </>
        }
      >
        <S.NoticeWrap>
          <p>번호</p> <p>제목</p>
          <S.NoticeTopRight>
            <p>작성자</p> <p>작성일</p>
          </S.NoticeTopRight>
        </S.NoticeWrap>
        <div>
          {filteredNotices.map((notice: SimpleNoticeType, index) => (
            <NoticeList
              index={index + 1}
              key={notice.id}
              id={notice.id}
              teacher={notice.teacher}
              title={notice.title}
              date={notice.create_at}
            />
          ))}
        </div>
      </Layout>
    </>
  );
};

export default NoticePage;
