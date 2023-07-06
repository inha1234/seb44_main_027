import React from "react";
import {  Container, PostImg, PostBody } from "./PostDetailBox.style";
import PostContent from "./PostContent";


function PostDatailBox ({ item }){

  return (
      <Container>
        <PostImg>
          <img src={item.imageUrl} alt="게시글 이미지" />
        </PostImg>
        <PostBody>
          <PostContent item={item}/>
          <div></div>
        </PostBody>
      </Container>
  )

}

export default PostDatailBox;