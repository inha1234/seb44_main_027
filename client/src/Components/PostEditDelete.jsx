import React from 'react';
import { AuthorityBtn } from './PostEditDelete.style';
import axios from 'axios';

function PostEditDelete({ postId, memberId }) {
  // 로그인된 사용자의 멤버아이디를 임시로 지정
  const loginId = 'MEM_1';

  const url = `${import.meta.env.VITE_API_URL}/posts/${postId}`;

  // 게시글 삭제 API
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
    // 로그인된 사용자와 게시글의 작성자가 같으면 삭제요청가능
    if (memberId === loginId) {
      DeletData();
    }
  };

  return (
    <AuthorityBtn.Container>
      <AuthorityBtn.Edit>수정</AuthorityBtn.Edit>
      <AuthorityBtn.Delete onClick={handleClickDelete}>
        삭제
      </AuthorityBtn.Delete>
    </AuthorityBtn.Container>
  );
}

export default PostEditDelete;
