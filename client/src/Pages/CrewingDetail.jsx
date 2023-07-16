import React from 'react';
import { Main, Container } from './CrewingDetail.style';
import PostDatailBox from '../Components/PostDetailBox.jsx';
import { useParams } from 'react-router-dom';
import Nav from '../Components/Nav';

function CrewingDetail() {
  const { postId } = useParams();

  return (
    <>
      <Nav />
      <Main>
        <Container>
          <PostDatailBox postId={postId} type={'crewing'} />
        </Container>
      </Main>
    </>
  );
}

export default CrewingDetail;
