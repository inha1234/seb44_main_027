import React, { useState, useEffect } from 'react';
import { BoardBox, Title, CardList, Btn } from './CrewingBoard.style.js';
import CrewingCardItem from './CrewingCardItem.jsx';
import useInfiniteScroll from '../utils/hooks/useInfiniteScroll.js';
import Loding from './Loding.jsx';

function CrewingBoard() {
  const MESSAGE = {
    TITLE_CREWING: '함께 운동할 크루원들을 모아보세요.',
    BTN_CREWING: '크루원 모집하기',
  };

  // get 요청 url
  const url = `${import.meta.env.VITE_API_URL}/crewings`;

  // 무한스크롤 API
  const [data, setData] = useState([]); // getData 함수를 통해 받아온 데이터의 상태 (Carditem에 전달 될 데이터)
  const [page, setPage] = useState(0); // page 상태에 따라 api 요청에 lastPostId params를 추가 (page가 1일 경우 lastPostId 쿼리 없이 데이터 요청, 1일 아닐 경우 lastPostId 쿼리를 추가하여 데이터 요청)
  const [ref, inView, getData, isLoadEnd] = useInfiniteScroll({
    url,
    category: 'crewing',
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
        <h1>{MESSAGE.TITLE_CREWING}</h1>
        <Btn to={'/create/crewing'}>{MESSAGE.BTN_CREWING}</Btn>
      </Title>
      <CardList>
        {data &&
          data.map((item) => (
            <CrewingCardItem key={item.crewingId} item={item} />
          ))}
      </CardList>
      {isLoadEnd ? undefined : (
        <div ref={ref}>
          <Loding />
        </div>
      )}
    </BoardBox>
  );
}

export default CrewingBoard;
