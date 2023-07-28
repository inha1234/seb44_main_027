import React, { useState, useEffect } from 'react';
import { BoardBox, Title, CardList, Btn } from './ShareBoard.style.js';
import Carditem from './Carditem.jsx';
import Loding from './Loding.jsx';
import useInfiniteScroll from '../utils/hooks/useInfiniteScroll.js';

function ShareBoard({ type }) {
  const MESSAGE = {
    TITLE_WORKOUT: '오늘은 무슨 운동을 하셨나요?',
    TITLE_DIET: '오늘은 무슨 식단을 하셨나요?',
    BTN_WORKOUT: '운동 게시글 만들기',
    BTN_DIET: '식단 게시글 만들기',
  };

  // get 요청 url
  const url = `${import.meta.env.VITE_API_URL}/posts`;

  // 무한스크롤 API
  const [data, setData] = useState([]); // getData 함수를 통해 받아온 데이터의 상태 (Carditem에 전달 될 데이터)
  const [page, setPage] = useState(0); // page 상태에 따라 api 요청에 lastPostId params를 추가 (page가 1일 경우 lastPostId 쿼리 없이 데이터 요청, 1일 아닐 경우 lastPostId 쿼리를 추가하여 데이터 요청)
  const [ref, inView, getData, isLoadEnd] = useInfiniteScroll({
    url,
    category: type,
    data,
    setData,
    page,
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
        <h1>
          {type === 'workout' ? MESSAGE.TITLE_WORKOUT : MESSAGE.TITLE_DIET}
        </h1>
        <Btn to={type === 'workout' ? '/create/workout' : '/create/diet'}>
          {type === 'workout' ? MESSAGE.BTN_WORKOUT : MESSAGE.BTN_DIET}
        </Btn>
      </Title>
      <CardList>
        {data && data.map((item) => <Carditem key={item.postId} item={item} />)}
      </CardList>
      {isLoadEnd ? undefined : (
        <div ref={ref}>
          <Loding />
        </div>
      )}
    </BoardBox>
  );
}

export default ShareBoard;
