import { useEffect, useState } from 'react';
import CrewingCardItem from '../Components/CrewingCardItem';
import { CardList } from '../Components/CrewingBoard.style';
import useInfiniteScroll from '../utils/hooks/useInfiniteScroll.js';
import Loding from '../Components/Loding';
import PostEmptyListIndicator from './PostEmptyListIndicator';

function CrewingTabContent({ memberId }) {
  // get 요청 url
  const url = `${import.meta.env.VITE_API_URL}/members/getMyPosts/${memberId}`;

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

  // 카테고리가 바뀔 때마다 데이터를 재요청
  useEffect(() => {
    setData([]); // 데이터 초기화
    setPage(0); // 페이지 초기화
    getData(); // 데이터 재요청
  }, []);

  useEffect(() => {
    if (inView && !isLoadEnd) {
      setPage(page + 1);
    }
  }, [inView]);

  return (
    <>
      {isLoadEnd && data.length === 0 ? (
        <PostEmptyListIndicator />
      ) : (
        <CardList>
          {data.map((item) => (
            <CrewingCardItem item={item} key={item.postId} />
          ))}
        </CardList>
      )}
      {isLoadEnd ? undefined : (
        <div ref={ref}>
          <Loding />
        </div>
      )}
    </>
  );
}

export default CrewingTabContent;
