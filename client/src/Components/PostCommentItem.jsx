import React, { useState } from 'react';
import { Item } from './PostCommentItem.style';
import CommentContent from './CommentContent';
import CommentEdit from './CommentEdit';
import { useSelector } from 'react-redux';
import ProfileLink from '../utils/ProfileLink';

function PostCommentItem({ CommentData, type }) {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <Item.Container>
      <Item.Profile>
        <ProfileLink
          profileUserId={CommentData.memberId}
          element={<Item.Img src={CommentData.imageUrl} alt="작성자 프로필" />}
        />
      </Item.Profile>
      {isEdit ? (
        <CommentEdit
          CommentData={CommentData}
          setIsEdit={setIsEdit}
          type={type}
        />
      ) : (
        <CommentContent
          CommentData={CommentData}
          setIsEdit={setIsEdit}
          type={type}
        />
      )}
    </Item.Container>
  );
}

export default PostCommentItem;
