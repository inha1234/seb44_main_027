import React ,{useRef} from "react";
import { InputContainer } from "./PostCommentInput.style";

function PostCommentInput (){

  //댓글작성 api

  const textarea = useRef();

  const handleResizeHeight = () => {
    console.log(Number.parseInt(textarea.current.style.height));
    textarea.current.style.height = 'auto';
    textarea.current.style.height = textarea.current.scrollHeight + 'px';
  }

  return (
    <InputContainer>
      <img src="../src/assets/mock/2.jpeg" alt="내 프로필이미지" />
      <div>
        <textarea ref={textarea}type="text" placeholder="댓글달기" rows={1} onChange={handleResizeHeight}/>
      </div>
      <button>게시</button>
    </InputContainer>
  )

}

export default PostCommentInput;