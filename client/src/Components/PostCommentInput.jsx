import React, { useRef, useState, useEffect } from 'react';
import { InputContainer } from './PostCommentInput.style';
import axios from 'axios';
import useUpdatePost from '../utils/hooks/useUpdatePost';
import { useApi } from '../utils/hooks/useApi';

function PostCommentInput({ data, type, scrollToTop }) {
  const api = useApi();
  const accessToken = localStorage.getItem('authToken');
  const url = `${import.meta.env.VITE_API_URL}/comments`;
  const [commentText, setCommentText] = useState('');
  const [isLoding, setIsLodig] = useState(true);
  const [update] = useUpdatePost(data.postId, type, setIsLodig);
  const [currentUser, setCurrentUser] = useState({
    imageUrl: '/images/defaultprofile.png',
  });

  // 로그인된 사용자의 멤버아이디
  const loginId = localStorage.getItem('memberId');

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/members/${loginId}`)
      .then((res) => {
        setCurrentUser(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  //댓글작성 api
  const postData = () => {
    if (commentText !== '') {
      api
        .post(
          url,
          {
            memberId: loginId,
            postId: type === 'share' ? data.postId : data.crewingId,
            content: commentText,
          },
          {
            headers: {
              Authorization: accessToken,
            },
          }
        )
        .then((response) => {
          update();
          setCommentText('');
          scrollToTop();
        })
        .catch((error) => {
          throw error;
        });
    }
  };

  const handleClick = () => {
    postData();
  };
  const textarea = useRef();

  const handleResizeHeight = (e) => {
    setCommentText(e.target.value);
    textarea.current.style.height = 'auto';
    textarea.current.style.height = textarea.current.scrollHeight + 'px';
  };

  return (
    <InputContainer>
      <img src={currentUser.imageUrl} alt="내 프로필이미지" />
      <div>
        <textarea
          ref={textarea}
          type="text"
          placeholder="댓글달기"
          rows={1}
          onChange={handleResizeHeight}
          value={commentText}
        />
      </div>
      <button
        onClick={handleClick}
        disabled={commentText !== '' ? false : true}
      >
        게시
      </button>
    </InputContainer>
  );
}

export default PostCommentInput;
