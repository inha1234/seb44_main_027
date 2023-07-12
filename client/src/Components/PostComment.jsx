import React from 'react';
import PostCommentItem from './PostCommentItem';
import { CommentContainer, CommentList } from './PostComment.style';

function PostComment({ data }) {
  const newistData = [...data.comments].reverse();

  return (
    <CommentContainer>
      <CommentList>
        <ul>
          {data.comments &&
            newistData.map((CommentData) => (
              <PostCommentItem
                key={CommentData.commentId}
                CommentData={CommentData}
              />
            ))}
        </ul>
      </CommentList>
    </CommentContainer>
  );
}

export default PostComment;
