import React from "react";
import { PostContainer, Author,Title, Text,Profile, AuthorName } from "./PostContent.style";
import { dummyText } from '../assets/mock/dummyData.js';



function PostContent ({ data }){

  return (
    <PostContainer>
      <Author>
        <Profile to={`/members/${data.memberId}`}>
          <img src={data.userImageUrl} alt="" />
        </Profile>
        <AuthorName to={`/members/${data.memberId}`}>{data.userName}</AuthorName>
        <div className="createdAt">{data.createdAt}</div>
      </Author>
      <Title className="title">{data.title}</Title>
      <Text className="text">{/*data.content*/}{dummyText}</Text>
    </PostContainer>

  )
}

export default PostContent;