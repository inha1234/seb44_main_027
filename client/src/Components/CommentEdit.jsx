import React, { useState } from 'react';
import { Edit, Btn } from './CommentEdit.style';
import axios from 'axios';
import { useSelector } from 'react-redux';
import useUpdatePost from '../utils/hooks/useUpdatePost';

function CommentEdit({ CommentData, setIsEdit }) {
  const accessToken = sessionStorage.getItem('authToken');
  const url = `${import.meta.env.VITE_API_URL}/comments/${CommentData.commentId}`;
  const [commentText, setCommentText] = useState(CommentData.content);
  const [isLoding, setIsLoding] = useState(true)
  const [update] = useUpdatePost(CommentData.postId, setIsLoding);

  // 댓글 수정 API
  const EditData = () => {
    axios
      .delete(
        url,
        {
          content: commentText,
        },
        {
          headers: {
            Authorization: accessToken,
          },
        }
      )
      .then((response) => {
        console.log("수정이 완료되었습니다.");
        update();
      })
      .catch((error) => {
        throw error;
      });
  };

  const handleChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleClickCancel = () => {
    setIsEdit(false);
  };

  const handleClickEdit = () => {
    const confirmValue = confirm('정말로 수정하시겠습니까?');
    if (confirmValue) {
      EditData();
      setIsEdit(false);

    }
  };
  return (
    <Edit.Container>
      <Edit.Textarea type="text" value={commentText} onChange={handleChange} />
      <Btn.Container>
        <Btn.Edit onClick={handleClickEdit}>수정</Btn.Edit>
        <Btn.Cancel onClick={handleClickCancel}>취소</Btn.Cancel>
      </Btn.Container>
    </Edit.Container>
  );
}

export default CommentEdit;
