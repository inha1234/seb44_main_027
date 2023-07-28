import React, { useState } from 'react';
import { Btn } from './CommentEditDelete.style';
import axios from 'axios';
import useUpdatePost from '../utils/hooks/useUpdatePost';
import { useApi } from '../utils/hooks/useApi';

function CommentEditDelete({ CommentData, commentId, setIsEdit, type }) {
  const api = useApi();
  const loginId = localStorage.getItem('memberId') + '';
  const memberId = CommentData.memberId + '';
  const accessToken = localStorage.getItem('authToken');
  const url = `${import.meta.env.VITE_API_URL}/comments/${commentId}`;
  const [isLoding, setIsLoding] = useState(true);
  const isCrewing = type === 'crewing';
  const [update] = useUpdatePost(
    isCrewing ? CommentData.crewingId : CommentData.postId,
    type,
    setIsLoding
  );

  // 게시글 댓글 삭제 API
  const DeleteData = () => {
    api
      .delete(url, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        console.log('댓글 삭제 요청이 완료되었습니다.');
        update();
      })
      .catch((error) => {
        throw error;
      });
  };

  const handleClickDelete = () => {
    const confirmValue = confirm('정말로 삭제하시겠습니까?');

    // 로그인된 사용자와 게시글의 작성자가 같으면 삭제요청가능
    if (memberId === loginId && confirmValue) {
      DeleteData();
    }
  };

  const handleClickEdit = () => {
    setIsEdit(true);
  };

  return (
    <Btn.Container>
      <Btn.Edit onClick={handleClickEdit}>수정</Btn.Edit>
      <Btn.Delete onClick={handleClickDelete}>삭제</Btn.Delete>
    </Btn.Container>
  );
}

export default CommentEditDelete;
