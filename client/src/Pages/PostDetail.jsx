import React from "react"
import { Main, Container } from "./PostDetail.style";
import PostDatailBox from "../Components/PostDetailBox.jsx";
import { useParams } from 'react-router-dom';
import Nav from "../Components/nav";


function PostDetail(){

  const { postId } = useParams();

  return (
    <>
      <Nav>nav</Nav>
      <Main>
        <Container>
          <PostDatailBox postId={postId} />
        </Container>
      </Main>
    </>
  )
}

export default PostDetail;