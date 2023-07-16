import React from 'react';
import { Main, Container } from './PostDetail.style';
import PostDatailBox from '../Components/PostDetailBox.jsx';
import { useParams } from 'react-router-dom';
import Nav from '../Components/Nav';

function PostDetail() {
  const { postId } = useParams();

  return (
    <>
      <Nav />
      <Main>
        <Container>
          <PostDatailBox postId={postId} type={'share'} />
        </Container>
      </Main>
    </>
  );
}

export default PostDetail;
