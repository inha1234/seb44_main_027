import React, {useEffect, useState} from 'react';
import {
  PostContainer,
  Author,
  Title,
  Text,
  AuthorInfo,
} from './PostContent.style';
import PostEditDelete from './PostEditDelete';

function PostContent({data}) {

  console.log(data);

    const loginId = sessionStorage.getItem('memberId') + ""; 
    const memberId = data.memberId + "" ;




    return (
      <PostContainer>
        <Author>
          <AuthorInfo.Container>
            <AuthorInfo.Profile to={`/members/${data.memberId}`}>
              <img src={data.userImageUrl} alt="" />
            </AuthorInfo.Profile>
            <AuthorInfo.AuthorName to={`/members/${data.memberId}`}>
              {data.userName}
            </AuthorInfo.AuthorName>
            <AuthorInfo.CreateAt>{data.createdAt}</AuthorInfo.CreateAt>
          </AuthorInfo.Container>

          {
            /* 본인이 작성한 게시물에 대해서만 수정/삭제 버튼을 표시 */
            loginId === memberId ? (
              <PostEditDelete data={data} />
            ) : undefined
          }
        </Author>
        <Title className="title">{data.title}</Title>
        <Text className="text">{data.content}</Text>
      </PostContainer>
    );
  
}

export default PostContent;
