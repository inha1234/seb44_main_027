import React from 'react';
import { Btn } from './CommentEditDelete.style';
import axios from 'axios';

function CommentEditDelete({ commentId, memberId }) {
  // 로그인된 사용자의 멤버아이디를 임시로 지정
  const loginId = 'MEM_1';

  const url = `${import.meta.env.VITE_API_URL}/comments/${commentId}`;

  // 댓글 삭제 API
  const DeletData = () => {
    axios
      .delete(url)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        throw error;
      });
  };

  const handleClickDelete = () => {
    const confirmValue = confirm('정말로 삭제하시겠습니까?');

    // 로그인된 사용자와 게시글의 작성자가 같으면 삭제요청가능
    if (memberId === loginId && confirmValue) {
      DeletData();
    }
  };

  return (
    <Btn.Container>
      <Btn.Edit>수정</Btn.Edit>
      <Btn.Delete onClick={handleClickDelete}>삭제</Btn.Delete>
    </Btn.Container>
  );
}

export default CommentEditDelete;
