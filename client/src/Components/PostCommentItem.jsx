import React from 'react';
import { Item, Content, Info } from './PostCommentItem.style';
import CommentEditDelete from './CommentEditDelete';

function PostCommentItem({ item }) {
  // 로그인된 사용자의 멤버아이디를 임시로 지정
  const loginId = 'MEM_1';

  return (
    <Item.Container>
      <Item.Profile src={item.userImageUrl} alt="작성자 프로필" />
      <Item.Content>
        <Content.Info>
          <Info.Name>{item.userName}</Info.Name>
          <Info.Content>
            {/*item.content*/}가장긴댓ㅇ르 사용했을때는 어떻게 보일까요 가장 긴
            탟ㅅ을 사용했을때는 어떻ㄱ세 표시가 될까요
          </Info.Content>
          {loginId === item.memberId ? (
            <CommentEditDelete
              commentId={item.commentId}
              memberId={item.memberId}
            />
          ) : undefined}
        </Content.Info>
        <Content.CreateAt>{item.createAt}</Content.CreateAt>
      </Item.Content>
    </Item.Container>
  );
}

export default PostCommentItem;
