import React, { useState } from 'react';
import { Item } from './PostCommentItem.style';
import CommentContent from './CommentContent';
import CommentEdit from './CommentEdit';
import { useSelector } from 'react-redux';


function PostCommentItem({ CommentItem }) {
  const [isEdit, setIsEdit] = useState(false);


  return (
    <Item.Container>
      <Item.Profile src={CommentItem.userImageUrl} alt="작성자 프로필" />
      {isEdit ? (
        <CommentEdit CommentItem={CommentItem} setIsEdit={setIsEdit} />
      ) : (
        <CommentContent CommentItem={CommentItem} setIsEdit={setIsEdit} />
      )}
    </Item.Container>
  );
}

export default PostCommentItem;
