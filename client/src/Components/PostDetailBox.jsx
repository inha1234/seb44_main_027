import React, { useState, useEffect } from 'react';
import { Container, PostImg, PostBody } from './PostDetailBox.style';
import PostContent from './PostContent';
import PostComment from './PostComment';
import PostCommentInput from './PostCommentInput';
import { useSelector } from 'react-redux';
import useUpdatePost from '../utils/hooks/useUpdatePost';

function PostDatailBox({ postId, type }) {
  console.log('리렌더링 확인');
  const [isLoding, setIsLodig] = useState(true);
  const [update] = useUpdatePost(postId, type, setIsLodig);

  useEffect(() => {
    update();
  }, []);

  const data = useSelector((state) => state.postData.data);

  if (!isLoding) {
    return (
      <Container>
        <PostImg>
          <img src={data && data.imageUrl} alt="게시글 이미지" />
        </PostImg>
        <PostBody>
          <PostContent data={data} type={type} />
          <PostComment data={data} type={type} />
          <PostCommentInput data={data} type={type} />
        </PostBody>
      </Container>
    );
  }
}

export default PostDatailBox;
