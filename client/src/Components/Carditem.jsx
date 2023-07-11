import React, { useState, useEffect } from 'react';
import { Card } from './Carditem.style';
import PostDetailModal from './PostDetailModal';

function Carditem({ item }) {
  const [isModal, setIsModal] = useState(false);

  const hendleClick = () => {
    setIsModal(!isModal);
    window.history.pushState({}, '', `/posts/${item.postId}`);
  };


  return (
    <>
      <Card onClick={hendleClick}>
        <img src={item.imageUrl} alt="카드이미지" />
      </Card>
      {isModal ? (
        <PostDetailModal postId={item.postId} setIsModal={setIsModal} />
      ) : undefined}
    </>
  );
}

export default Carditem;
