import React from 'react';
import { Main, Container } from './CrewingDetail.style';
import PostDetailPageBox from '../Components/PostDetailPageBox';
import { useParams } from 'react-router-dom';
import Nav from '../Components/Nav';

function CrewingDetail() {
  const { postId } = useParams();

  return (
    <>
      <Nav />
      <Main>
        <Container>
          <PostDetailPageBox postId={postId} type={'crewing'} />
        </Container>
      </Main>
    </>
  );
}

export default CrewingDetail;
