import React, { useState } from 'react';
import { Edit, Btn } from './CommentEdit.style';
import axios from 'axios';

function CommentEdit({ item, setIsEdit }) {
  const url = `${import.meta.env.VITE_API_URL}/comments/${item.commentId}`;
  const [commentText, setCommentText] = useState(item.content);

  // 댓글 수정 API
  const EditData = () => {
    axios
      .delete(url, {
        content: commentText,
      })
      .then((response) => {
        console.log(response.data);
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
