import React from "react";
import { PostContainer, Author,Title, Text,Profile, AuthorName } from "./PostContent.style";

function PostContent ({ item }){

  return (
    <PostContainer>
      <Author>
        <Profile to={`/members/${item.memberId}`}>
          <img src={item.userImg} alt="" />
        </Profile>
        <AuthorName to={`/members/${item.memberId}`}>{item.userName}</AuthorName>
        <div className="createdAt">{item.createdAt}</div>
      </Author>
      <Title className="title">{item.title}</Title>
      <Text className="text">{item.content}</Text>
    </PostContainer>

  )
}

export default PostContent;