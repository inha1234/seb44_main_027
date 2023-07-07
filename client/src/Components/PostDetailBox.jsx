import React from "react";
import {  Container, PostImg, PostBody } from "./PostDetailBox.style";
import PostContent from "./PostContent";
import PostComment from "./PostComment";
import PostCommentInput from "./PostCommentInput";



function PostDatailBox ({ item }){

  return (
      <Container>
        <PostImg>
          <img src={item.imageUrl} alt="게시글 이미지" />
        </PostImg>
        <PostBody>
          <PostContent item={item}/>
          <PostComment comments={item.comments}/>
          <PostCommentInput/>
        </PostBody>
      </Container>
  )

}

export default PostDatailBox;