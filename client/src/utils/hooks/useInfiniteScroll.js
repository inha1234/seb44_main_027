import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import { useState } from 'react';

const useInfiniteScroll = ({
  url,
  category,
  data,
  setData,
  page,
  memberId,
}) => {
  const accessToken = sessionStorage.getItem('authToken');
  const [ref, inView] = useInView();
  const [loading, setLoading] = useState(false);
  const [lastPostId, setLastPostId] = useState(null);
  const [isLoadEnd, setIsLoadEnd] = useState(false);

  // GET API
  const getData = () => {
    setLoading(true);

    if (page < 1) {
      axios
        .get(
          url,
          { params: { category: category } },
          {
            headers: {
              Authorization: accessToken,
            },
          }
        )
        .then((response) => {
          const newData = response.data.data;
          const concatData = [...data, ...newData];
          setIsLoadEnd(!response.data.pageInfo.hasNextPage);
          setData(concatData);
          setLastPostId(concatData.slice(-1)[0].postId);
          setLoading(false);
        })
        .catch((error) => {
          throw error;
        });
    } else if (page >= 1) {
      axios
        .get(
          url,
          { params: { category: category, lastPostId: lastPostId } },
          {
            headers: {
              Authorization: accessToken,
            },
          }
        )
        .then((response) => {
          const newData = response.data.data;
          if (isLoadEnd) {
            setLoading(false);
          } else {
            const concatData = [...data, ...newData];
            setIsLoadEnd(!response.data.pageInfo.hasNextPage);
            setData(concatData);
            setLastPostId(concatData.slice(-1)[0].postId);
            setLoading(false);
          }
        })
        .catch((error) => {
          throw error;
        });
    }
  };

  // GET Main API
  const getMainData = () => {
    setLoading(true);

    if (page < 1) {
      axios
        .get(
          url,
          { params: { memberId: memberId } },
          {
            headers: {
              Authorization: accessToken,
            },
          }
        )
        .then((response) => {
          const newData = response.data.data;
          const concatData = [...data, ...newData];
          setIsLoadEnd(!response.data.pageInfo.hasNextPage);
          setData(concatData);
          setLastPostId(concatData.slice(-1)[0].postId);
          setLoading(false);
        })
        .catch((error) => {
          throw error;
        });
    } else if (page >= 1) {
      axios
        .get(
          url,
          { params: { memberId: memberId, lastPostId: lastPostId } },
          {
            headers: {
              Authorization: accessToken,
            },
          }
        )
        .then((response) => {
          const newData = response.data.data;
          if (isLoadEnd) {
            setLoading(false);
          } else {
            const concatData = [...data, ...newData];
            setIsLoadEnd(!response.data.pageInfo.hasNextPage);
            setData(concatData);
            setLastPostId(concatData.slice(-1)[0].postId);
            setLoading(false);
          }
        })
        .catch((error) => {
          throw error;
        });
    }
  };

  if (category === 'main') {
    return [ref, inView, getMainData, isLoadEnd];
  } else {
    return [ref, inView, getData, isLoadEnd];
  }
};

export default useInfiniteScroll;
