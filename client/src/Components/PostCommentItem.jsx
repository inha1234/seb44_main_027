import React, { useState } from 'react';
import { Item } from './PostCommentItem.style';
import CommentContent from './CommentContent';
import CommentEdit from './CommentEdit';
import { useSelector } from 'react-redux';


function PostCommentItem({ CommentData }) {
  const [isEdit, setIsEdit] = useState(false);


  return (
    <Item.Container>
      <Item.Profile src={CommentData.imageUrl} alt="작성자 프로필" />
      {isEdit ? (
        <CommentEdit CommentData={CommentData} setIsEdit={setIsEdit} />
      ) : (
        <CommentContent CommentData={CommentData} setIsEdit={setIsEdit} />
      )}
    </Item.Container>
  );
}

export default PostCommentItem; 
