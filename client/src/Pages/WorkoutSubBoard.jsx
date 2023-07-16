import { useEffect, useState } from 'react';
import Carditem from '../Components/Carditem';
import { CardList } from '../Components/ShareBoard.style';
import useInfiniteScroll from '../utils/hooks/useInfiniteScroll.js';
import Loding from '../Components/Loding';

function WorkoutSubBoard({ memberId }) {
  // get 요청 url
  const url = `${import.meta.env.VITE_API_URL}/members/getMyPosts/${memberId}`;

  // 무한스크롤 API
  const [data, setData] = useState([]); // getData 함수를 통해 받아온 데이터의 상태 (Carditem에 전달 될 데이터)
  const [page, setPage] = useState(0); // page 상태에 따라 api 요청에 lastPostId params를 추가 (page가 1일 경우 lastPostId 쿼리 없이 데이터 요청, 1일 아닐 경우 lastPostId 쿼리를 추가하여 데이터 요청)
  const [ref, inView, getData, isLoadEnd] = useInfiniteScroll({
    url,
    category: 'workOut',
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
    <>
      <CardList>
        {data && data.map((item) => <Carditem item={item} key={item.postId} />)}
      </CardList>
      {isLoadEnd ? undefined : (
        <div ref={ref}>
          <Loding />
        </div>
      )}
    </>
  );
}

export default WorkoutSubBoard;
