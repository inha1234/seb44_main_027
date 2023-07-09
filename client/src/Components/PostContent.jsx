import React from 'react';
import {
  PostContainer,
  Author,
  Title,
  Text,
  AuthorInfo,
} from './PostContent.style';
import { dummyText } from '../assets/mock/dummyData.js';
import PostEditDelete from './PostEditDelete';

function PostContent({ data }) {
  // 로그인된 사용자의 멤버아이디를 임시로 지정
  const loginId = 'MEM_1';

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
          loginId === data.memberId ? (
            <PostEditDelete postId={data.postId} memberId={data.memberId} />
          ) : undefined
        }
      </Author>
      <Title className="title">{data.title}</Title>
      <Text className="text">
        {/*data.content*/}
        {dummyText}
      </Text>
    </PostContainer>
  );
}

export default PostContent;
