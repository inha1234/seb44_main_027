import React, { useState, useEffect, useRef } from 'react';
import { Container, PostImg, PostBody } from './PostDetailBox.style';
import PostContent from './PostContent';
import PostComment from './PostComment';
import PostCommentInput from './PostCommentInput';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import postDataSlice from '../redux/reducers/postDataSlice';
import useNotFoundPage from '../utils/hooks/useNotFoundPage';
import { useApi } from '../utils/hooks/useApi';

function PostDetailPageBox({ postId, type }) {
  const api = useApi();
  const [isLoading, setIsLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const { notFound, NotFoundPage, handleNotFoundErrors } = useNotFoundPage();
  const scrollRef = useRef(null);

  // 댓글 작성 시 댓글창 스크롤업
  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  };

  let url = '';

  if (type === 'crewing') {
    url = `${import.meta.env.VITE_API_URL}/crewings/${postId}`;
  } else if (type === 'share') {
    url = `${import.meta.env.VITE_API_URL}/posts/${postId}`;
  }

  const accessToken = localStorage.getItem('authToken');
  const dispatch = useDispatch();

  const update = () => {
    api
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
        setIsLoading(false);
      })
      .catch((error) => {
        handleNotFoundErrors(error);
        throw error;
      });
  };

  useEffect(() => {
    update();
  }, []);

  const data = useSelector((state) => state.postData.data);

  console.log(data);

  if (notFound) {
    return <NotFoundPage />;
  }

  if (!isLoading) {
    return (
      <Container>
        <PostImg>
          <img src={data && data.imageUrl} alt="게시글 이미지" />
        </PostImg>
        <PostBody>
          <PostContent
            data={data}
            type={type}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
          />
          {isEdit ? undefined : (
            <PostComment data={data} type={type} scrollRef={scrollRef} />
          )}
          {isEdit ? undefined : (
            <PostCommentInput
              data={data}
              type={type}
              scrollToTop={scrollToTop}
            />
          )}
        </PostBody>
      </Container>
    );
  }
}

export default PostDetailPageBox;
