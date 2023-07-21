import React, { useState } from 'react';
import { Card, AuthorInfo } from './MainCardItem.style';
import PostDetailModal from './PostDetailModal';
import formatTime from '../utils/formatTime';
import ProfileLink from '../utils/ProfileLink';

function MainCardItem({ item }) {
  const [isModal, setIsModal] = useState(false);

  const hendleClick = () => {
    setIsModal(!isModal);
    window.history.pushState({}, '', `/posts/${item.postId}`);
  };

  console.log(item);

  return (
    <>
      <Card.Container>
        <Card.Author>
          <ProfileLink
            profileUserId={item.memberId}
            element={
              <AuthorInfo.LinkContainer>
                <AuthorInfo.Profile to={`/profile/${item.memberId}`}>
                  <img src={item.userImageUrl} alt="게시글 이미지" />
                </AuthorInfo.Profile>
                <AuthorInfo.AuthorName to={`/profile/${item.memberId}`}>
                  {item.userName}
                </AuthorInfo.AuthorName>
              </AuthorInfo.LinkContainer>
            }
          />
          <AuthorInfo.CreateAt>
            {formatTime(item.createdAt)}
          </AuthorInfo.CreateAt>
        </Card.Author>
        <Card.Img>
          <img src={item.imageUrl} alt="카드이미지" />
        </Card.Img>
        <Card.Title>{item.title}</Card.Title>
        <Card.Content>{item.content}</Card.Content>
        <Card.Add>
          <div>{`댓글 ${item.comments.length}개`}</div>
          <button onClick={hendleClick}>자세히보기</button>
        </Card.Add>
      </Card.Container>
      {isModal ? (
        <PostDetailModal
          postId={item.postId}
          type={'share'}
          setIsModal={setIsModal}
        />
      ) : undefined}
    </>
  );
}

export default MainCardItem;

// category: 'diet';
// comments: [];
// content: '123';
// createdAt: '2023-07-17T02:08:27';
// imageUrl: 'https://seb44-main-027.s3.ap-northeast-2.amazonaws.com/compressedImage.jpg';
// kcal: 123;
// memberId: 11;
// modifiedAt: '2023-07-17T02:08:27';
// postId: 46;
// title: 'ㅁㄴ';
// userImageUrl: 'https://seb44-main-027.s3.ap-northeast-2.amazonaws.com/compressedImage_3.jpg';
// userName: '김치피자탕수육';
