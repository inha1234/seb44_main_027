import React, { useEffect, useState } from 'react';
import { Card } from './CrewingCardItem.style';
import PostDetailModal from './PostDetailModal';
import formatTime from '../utils/formatTime';
import koTime from '../utils/koTime';
import { getDDay } from '../utils/getDday';
function CrewingCardItem({ item }) {
  const [isModal, setIsModal] = useState(false);
  const isUnlimited = item.maxPeople === 999;
  const applyStatus = item.completed
    ? { className: 'end', text: '모집마감' }
    : { className: 'apply', text: `모집중 D-${getDDay(item.deadLine)}` };

  const inputActivityDate = koTime(item.activityDate);
  const inputDeadLine = koTime(item.deadLine);
  const regex = /^(\d{4}-\d{2}-\d{2}) (오전|오후) (\d{2}:\d{2})$/;
  const activityDate = inputActivityDate.match(regex);
  const deadLine = inputDeadLine.match(regex);

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
            <Card.AuthorCreateAt>
              {formatTime(item.createdAt)}
            </Card.AuthorCreateAt>
          </Card.Author>
          <Card.Title>{item.title}</Card.Title>
          <Card.Content>{item.content}</Card.Content>
          <Card.Status className={applyStatus.className}>
            {applyStatus.text}
          </Card.Status>
        </Card.Info>
        <Card.RecruitmentInfo className="recruitmentInfo">
          <Card.ActivityDate>
            <Card.Label>활동날짜</Card.Label>
            <Card.Text>{activityDate[1]}</Card.Text>
            <Card.Text>{`${activityDate[2]} ${activityDate[3]}`}</Card.Text>
          </Card.ActivityDate>
          <Card.DeadLine>
            <Card.Label>모집마감</Card.Label>
            <Card.Text>{deadLine[1]}</Card.Text>
            <Card.Text>{`${deadLine[2]} ${deadLine[3]}`}</Card.Text>
          </Card.DeadLine>
          <Card.Personnel>
            <Card.Label>참여인원</Card.Label>
            <Card.Text>{`${item.currentPeople} / ${
              isUnlimited ? '무제한' : item.maxPeople
            }`}</Card.Text>
          </Card.Personnel>
        </Card.RecruitmentInfo>
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
