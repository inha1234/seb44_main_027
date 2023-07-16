import React, { useState } from 'react';
import { Card } from './CrewingCardItem.style';
import PostDetailModal from './PostDetailModal';

function CrewingCardItem({ item }) {
  const [isModal, setIsModal] = useState(false);

  const hendleClick = () => {
    setIsModal(!isModal);
    window.history.pushState({}, '', `/crewing/${item.crewingId}`);
  };

  return (
    <>
      <Card.Container onClick={hendleClick}>
        <Card.Img>
          <img src={item.imageUrl} alt="카드이미지" />
        </Card.Img>
        <Card.Info>
          <Card.Author>
            <Card.AuthorProfile src={item.userImageUrl} alt="작성자 프로필" />
            <Card.AuthorName>{item.userName}</Card.AuthorName>
            <Card.AuthorCreateAt>{item.createdAt}</Card.AuthorCreateAt>
          </Card.Author>
          <Card.Title>{item.title}</Card.Title>
        </Card.Info>
      </Card.Container>
      {isModal ? (
        <PostDetailModal
          type={'crewing'}
          postId={item.crewingId}
          setIsModal={setIsModal}
        />
      ) : undefined}
    </>
  );
}

export default CrewingCardItem;
