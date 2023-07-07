import React from "react";
import { ItemList, ItemContent } from "./PostCommentItem.style";

function PostCommentItem({item}){

  return (
    <ItemList>
      <img src={item.userImageUrl} alt="작성자 프로필" />
      <ItemContent>
        <div>
          <span className="name">{item.userName}</span>
          <span className="content">{/*item.content*/}가장긴댓ㅇ르 사용했을때는 어떻게 보일까요 가장 긴 탟ㅅ을 사용했을때는 어떻ㄱ세 표시가 될까요</span> 
        </div>
        <div className="createAt">{item.createAt}</div> 
      </ItemContent>
    </ItemList>
  )

}

export default PostCommentItem;