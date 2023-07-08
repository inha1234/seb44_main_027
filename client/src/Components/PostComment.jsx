import React from "react";
import PostCommentItem from "./PostCommentItem";
import { CommentContainer,CommentList } from "./PostComment.style";

function PostComment ({ comments }){

  //댓글리스트 pops로 받아오기
  console.log(comments)
  return (
    <CommentContainer>
      <CommentList>
        <ul>
          {comments&&comments.map( item => <PostCommentItem key={item.memberId} item={item}/>)}
        </ul>
      </CommentList>
    </CommentContainer>
  )
}

export default PostComment;