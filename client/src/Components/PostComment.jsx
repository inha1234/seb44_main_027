import React from 'react';
import PostCommentItem from './PostCommentItem';
import { CommentContainer, CommentList } from './PostComment.style';

function PostComment({ data, type, scrollRef }) {
  const newistData = [...data.comments].reverse();

  return (
    <CommentContainer>
      <CommentList>
        <ul ref={scrollRef}>
          {data.comments &&
            newistData.map((CommentData) => (
              <PostCommentItem
                key={CommentData.commentId}
                CommentData={CommentData}
                type={type}
              />
            ))}
        </ul>
      </CommentList>
    </CommentContainer>
  );
}

export default PostComment;
