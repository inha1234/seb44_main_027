import React from 'react';
import { Item, Content, Info } from './CommentContent.style';
import CommentEditDelete from './CommentEditDelete';
import { useSelector } from 'react-redux';


function CommentContent({ CommentItem, setIsEdit }) {
  const loginId = sessionStorage.getItem('memberId');
  const memberId = CommentItem.memberId + "";


  return (
    <Item.Content>
      <Content.Info>
        <Info.Name>{CommentItem.userName}</Info.Name>
        <Info.Content>{CommentItem.content}</Info.Content>
        {loginId === memberId ? (
          <CommentEditDelete
            commentId={CommentItem.commentId}
            memberId={CommentItem.memberId}
            setIsEdit={setIsEdit}
          />
        ) : undefined}
      </Content.Info>
      <Content.CreateAt>{CommentItem.createAt}</Content.CreateAt>
    </Item.Content>
  );
}

export default CommentContent;
