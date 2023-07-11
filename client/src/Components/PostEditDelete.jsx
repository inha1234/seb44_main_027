import React from 'react';
import { AuthorityBtn } from './PostEditDelete.style';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function PostEditDelete( {data}) {
  const loginId = sessionStorage.getItem('memberId') + "";
  const memberId = data.memberId + "";
  const accessToken = sessionStorage.getItem('token');
  const url = `${import.meta.env.VITE_API_URL}/posts/${data.postId}`;

  // 게시글 삭제 API
  const DeletData = () => {
    axios
      .delete(url, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        console.log("삭제가 완료되었습니다.");
        window.location.replace(`/${data.category}`);
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
    <AuthorityBtn.Container>
      <AuthorityBtn.Edit>수정</AuthorityBtn.Edit>
      <AuthorityBtn.Delete onClick={handleClickDelete}>
        삭제
      </AuthorityBtn.Delete>
    </AuthorityBtn.Container>
  );
}

export default PostEditDelete;
