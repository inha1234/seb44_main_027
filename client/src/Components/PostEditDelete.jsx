import React from 'react';
import { AuthorityBtn } from './PostEditDelete.style';
import axios from 'axios';
import { useApi } from '../utils/hooks/useApi';

function PostEditDelete({ data, type, setIsEdit }) {
  const api = useApi();
  const loginId = localStorage.getItem('memberId') + '';
  const memberId = data.memberId + '';
  const accessToken = localStorage.getItem('authToken');
  const deletePostUrl = `${import.meta.env.VITE_API_URL}/posts/${data.postId}`;
  const deleteCrewingUrl = `${import.meta.env.VITE_API_URL}/crewings/${
    data.crewingId
  }`;

  // 운동/식단 게시글 삭제 API
  const DeletePostData = () => {
    api
      .delete(deletePostUrl, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        console.log('삭제가 완료되었습니다.');
        window.location.replace(`/${data.category}`);
      })
      .catch((error) => {
        throw error;
      });
  };

  // 크루잉 게시글 삭제 API
  const DeleteCrewingData = () => {
    api
      .delete(deleteCrewingUrl, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        console.log('삭제가 완료되었습니다.');
        window.location.replace(`/crewing`);
      })
      .catch((error) => {
        throw error;
      });
  };

  const handleClickDelete = () => {
    const confirmValue = confirm('정말로 삭제하시겠습니까?');
    // 로그인된 사용자와 게시글의 작성자가 같으면 삭제요청가능
    if (memberId === loginId && confirmValue) {
      if (type === 'share') {
        DeletePostData();
      } else if (type === 'crewing') {
        DeleteCrewingData();
      }
    }
  };

  const handleClickEdit = () => {
    setIsEdit(true);
  };

  return (
    <AuthorityBtn.Container>
      <AuthorityBtn.Edit onClick={handleClickEdit}>수정</AuthorityBtn.Edit>
      <AuthorityBtn.Delete onClick={handleClickDelete}>
        삭제
      </AuthorityBtn.Delete>
    </AuthorityBtn.Container>
  );
}

export default PostEditDelete;
