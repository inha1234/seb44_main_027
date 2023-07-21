import React, { useEffect, useRef, useState } from 'react';
import { Modal, CloseBtn, NotFound } from './PostDetailModal.style';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import PostDatailBox from './PostDetailBox.jsx';

function PostDetailModal({ postId, type, setIsModal }) {
  const closeIcon = faXmark;
  const [isNotFound, setIsNotFound] = useState(false);

  // 모달 닫기
  const closeModal = () => {
    setIsModal(false);
    window.history.back();
  };

  return (
    <Modal onClick={closeModal}>
      <div onClick={(e) => e.stopPropagation()}>
        {isNotFound ? (
          <NotFound onClick={(e) => e.stopPropagation()}>
            <h3>이런!</h3>
            <p>작성된 게시물이 없어요...</p>
          </NotFound>
        ) : (
          <PostDatailBox
            postId={postId}
            type={type}
            setIsNotFound={setIsNotFound}
          />
        )}
      </div>
      {/* 함수형 컴포넌트에서는 useRef를 사용할 수 없기때문에 useRef를 사용하기 위해 생성한 div 태그 */}
      <CloseBtn icon={closeIcon} />
    </Modal>
  );
}

export default PostDetailModal;
