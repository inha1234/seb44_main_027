import React from "react"
import { Nav, Main, Container } from "./PostDetail.style";
import PostDatailBox from "../Components/PostDetailBox.jsx";
import { useParams } from 'react-router-dom';
import { dummyData } from '../assets/mock/dummyData.js';



function PostDetail(){

  let { postId } = useParams();

  console.log(postId);
  // API 특정 게시글 조회 /posts/{post_id}
  const data = dummyData.posts[postId-1];

  return (
    <>
      <Nav>nav</Nav>
      <Main>
        <Container>
          <PostDatailBox item={data} />
        </Container>
      </Main>
    </>
  )
}

export default PostDetail;