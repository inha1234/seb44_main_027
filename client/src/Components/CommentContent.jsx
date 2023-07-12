import React from 'react';
import { Item, Content, Info } from './CommentContent.style';
import CommentEditDelete from './CommentEditDelete';
import { useSelector } from 'react-redux';

function CommentContent({ CommentData, setIsEdit }) {
  const loginId = sessionStorage.getItem('memberId') + '';
  const memberId = CommentData.memberId + '';

  return (
    <Item.Content>
      <Content.Info>
        <Info.Name>{CommentData.userName}</Info.Name>
        <Info.Content>{CommentData.content}</Info.Content>
        {loginId === memberId ? (
          <CommentEditDelete
            CommentData={CommentData}
            commentId={CommentData.commentId}
            memberId={CommentData.memberId}
            setIsEdit={setIsEdit}
          />
        ) : undefined}
      </Content.Info>
      <Content.CreateAt>{CommentData.createAt}</Content.CreateAt>
    </Item.Content>
  );
}

export default CommentContent;
