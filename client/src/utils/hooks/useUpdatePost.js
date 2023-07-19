import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import postDataSlice from '../../redux/reducers/postDataSlice';

// 특정 게시글의 postId를 인자로 전달받아,
// postId에 해당되는 게시글의 데이터받아 전역상태로 저장하는 함수입니다.

function useUpdatePost(postId, type, setIsLodig) {
  const [resCode, setResCode] = useState(0);
  let url = '';

  if (type === 'crewing') {
    url = `${import.meta.env.VITE_API_URL}/crewings/${postId}`;
  } else if (type === 'share') {
    url = `${import.meta.env.VITE_API_URL}/posts/${postId}`;
  }

  const accessToken = sessionStorage.getItem('authToken');
  const dispatch = useDispatch();
  let resonseCode = 200;

  const update = () => {
    axios
      .get(url, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        if (type === 'crewing') {
          dispatch(postDataSlice.actions.update(response.data));
        } else {
          dispatch(postDataSlice.actions.update(response.data.data));
        }

        setIsLodig(false);
        setResCode(response.status);
      })
      .catch((error) => {
        setResCode(error.response.status);
        // throw error;
      });
  };

  return [update, resCode];
}

export default useUpdatePost;
