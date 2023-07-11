import React from 'react';
import PostCommentItem from './PostCommentItem';
import { CommentContainer, CommentList } from './PostComment.style';
import { useSelector } from 'react-redux';

function PostComment({data}) {

    return (
      <CommentContainer>
        <CommentList>
          <ul>
            {data.comments &&
              data.comments.map((CommentData) => (
                <PostCommentItem key={CommentData.memberId} CommentData={CommentData} />
              ))}
          </ul>
        </CommentList>
      </CommentContainer>
    );
}

export default PostComment;
