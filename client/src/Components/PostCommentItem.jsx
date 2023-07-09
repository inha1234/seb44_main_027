import React, { useState } from 'react';
import { Item } from './PostCommentItem.style';
import CommentContent from './CommentContent';
import CommentEdit from './CommentEdit';

function PostCommentItem({ item }) {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <Item.Container>
      <Item.Profile src={item.userImageUrl} alt="작성자 프로필" />
      {isEdit ? (
        <CommentEdit item={item} setIsEdit={setIsEdit} />
      ) : (
        <CommentContent item={item} setIsEdit={setIsEdit} />
      )}
    </Item.Container>
  );
}

export default PostCommentItem;
