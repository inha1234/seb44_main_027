import React, { useState, useEffect } from 'react';
import { BoardBox, Title, CardList, Btn } from './MainBoard.style.js';
import MainCardItem from './MainCardItem.jsx';
import Loding from './Loding.jsx';
import useInfiniteScroll from '../utils/hooks/useInfiniteScroll.js';
import NotFollowingIndicator from './NotFollowingIndicator.jsx';

function MainBoard() {
  const MESSAGE = {
    TITLE_MAIN: '오늘은 무슨 활동을 하셨나요?',
    BTN_MAIN: '게시글 만들기',
  };
  const loginId = localStorage.getItem('memberId');
  // get 요청 url
  const url = `${import.meta.env.VITE_API_URL}/posts/followingPosts`;

  // 무한스크롤 API
  const [data, setData] = useState([]); // getData 함수를 통해 받아온 데이터의 상태 (Carditem에 전달 될 데이터)
  const [page, setPage] = useState(0); // page 상태에 따라 api 요청에 lastPostId params를 추가 (page가 1일 경우 lastPostId 쿼리 없이 데이터 요청, 1일 아닐 경우 lastPostId 쿼리를 추가하여 데이터 요청)
  const [ref, inView, getData, isLoadEnd] = useInfiniteScroll({
    url,
    category: 'main',
    data,
    setData,
    page,
    memberId: loginId,
  });

  useEffect(() => {
    if (inView) {
      getData();
      setPage(page + 1);
    }
  }, [inView]);

  return (
    <BoardBox>
      <Title>
        <h1>{MESSAGE.TITLE_MAIN}</h1>
        <Btn to="/create">{MESSAGE.BTN_MAIN}</Btn>
      </Title>
      <CardList>
        {data && data.length !== 0 ? (
          data.map((item) => <MainCardItem key={item.postId} item={item} />)
        ) : (
          <NotFollowingIndicator />
        )}
      </CardList>
      {isLoadEnd ? undefined : (
        <div ref={ref}>
          <Loding />
        </div>
      )}
    </BoardBox>
  );
}

export default MainBoard;
