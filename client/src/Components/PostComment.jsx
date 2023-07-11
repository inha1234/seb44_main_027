import React from 'react';
import PostCommentItem from './PostCommentItem';
import { CommentContainer, CommentList } from './PostComment.style';
import { useSelector } from 'react-redux';

function PostComment() {
  const data = useSelector(state => state.postData.data.data);

  return (
    <CommentContainer>
      <CommentList>
        <ul>
          {data.comments &&
            data.comments.map((item) => (
              <PostCommentItem key={item.memberId} CommentItem={item} />
            ))}
        </ul>
      </CommentList>
    </CommentContainer>
  );
}

export default PostComment;
