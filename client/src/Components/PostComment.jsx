import React from 'react';
import PostCommentItem from './PostCommentItem';
import { CommentContainer, CommentList } from './PostComment.style';

function PostComment({ data, type, scrollRef }) {
  const newistData = [...data.comments].reverse();

  return (
    <CommentContainer>
      <CommentList ref={scrollRef}>
        <ul>
          {data.comments &&
            newistData.map((CommentData) => (
              <PostCommentItem
                key={CommentData.commentId}
                CommentData={CommentData}
                type={type}
                scrollToTop={scrollToTop}
              />
            ))}
        </ul>
      </CommentList>
    </CommentContainer>
  );
}

export default PostComment;
