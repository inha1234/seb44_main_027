import React, { useState, useEffect, useRef } from 'react';
import { Container, PostImg, PostBody } from './PostDetailBox.style';
import PostContent from './PostContent';
import PostComment from './PostComment';
import PostCommentInput from './PostCommentInput';
import { useSelector } from 'react-redux';
import useUpdatePost from '../utils/hooks/useUpdatePost';

function PostDatailBox({ postId, type }) {
  console.log('리렌더링 확인');
  const [isLoding, setIsLodig] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [update] = useUpdatePost(postId, type, setIsLodig);
  const scrollRef = useRef(null);

  // 댓글 작성 시 댓글창 스크롤업
  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  };

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

export default PostDatailBox;
