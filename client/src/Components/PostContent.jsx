import React from 'react';
import { PostContainer, Author, Title, AuthorInfo } from './PostContent.style';
import PostEditDelete from './PostEditDelete';
import PostContentText from './PostContentText';

function PostContent({ data, type }) {
  const loginId = sessionStorage.getItem('memberId') + '';
  const memberId = data.memberId + '';

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
            <PostEditDelete data={data} type={type} />
          ) : undefined
        }
      </Author>
      <Title className="title">{data.title}</Title>
      <PostContentText data={data} type={type} />
    </PostContainer>
  );
}

export default PostContent;
