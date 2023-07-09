import React from 'react';
import { Item, Content, Info } from './CommentContent.style';
import CommentEditDelete from './CommentEditDelete';

function CommentContent({ item, setIsEdit }) {
  // 로그인된 사용자의 멤버아이디
  const loginId = sessionStorage.getItem('memberId');

  return (
    <Item.Content>
      <Content.Info>
        <Info.Name>{item.userName}</Info.Name>
        <Info.Content>{item.content}</Info.Content>
        {loginId === item.memberId ? (
          <CommentEditDelete
            commentId={item.commentId}
            memberId={item.memberId}
            setIsEdit={setIsEdit}
          />
        ) : undefined}
      </Content.Info>
      <Content.CreateAt>{item.createAt}</Content.CreateAt>
    </Item.Content>
  );
}

export default CommentContent;
