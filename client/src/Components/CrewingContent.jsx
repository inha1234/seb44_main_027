import React, { useState } from 'react';
import {
  CrewingInfo,
  Label,
  Content,
  Container,
  CrewingParticipation,
  CrewingParticipationBtn,
} from './CrewingContent.style';
import useUpdatePost from '../utils/hooks/useUpdatePost';
import axios from 'axios';
import koTime from '../utils/koTime';
import { useApi } from '../utils/hooks/useApi';

function CrewingContent({ data, type }) {
  const api = useApi();
  const loginId = sessionStorage.getItem('memberId');
  const accessToken = sessionStorage.getItem('authToken');
  const url = `${import.meta.env.VITE_API_URL}/crewing/apply/${data.crewingId}`;
  const [isLoding, setIsLoding] = useState(true);
  const [update] = useUpdatePost(data.crewingId, type, setIsLoding);
  const isUnlimited = data.maxPeople === 999;

  const participation = () => {
    api
      .post(
        url,
        {
          crewing_id: data.crewingId,
          member_id: loginId,
        },
        {
          headers: {
            Authorization: accessToken,
          },
        }
      )
      .then((response) => {
        console.log('참가신청이 완료되었습니다.');
        update();
      })
      .catch((error) => {
        alert('모집이 마감되었어요.');
        update();
        throw error;
      });
  };

  const handleClick = () => {
    if (!data.completed) {
      participation();
    }
  };

  return (
    <Container>
      <CrewingInfo.Container>
        <CrewingInfo.ActivityDate>
          <Label>활동날짜</Label>
          <Content>{koTime(data.activityDate)}</Content>
        </CrewingInfo.ActivityDate>
        <CrewingInfo.DeadLine>
          <Label>모집마감</Label>
          <Content>{koTime(data.deadLine)}</Content>
        </CrewingInfo.DeadLine>
        <CrewingInfo.PersonnelStatus>
          <Label>모집인원</Label>
          <Content>{`${data.currentPeople} / ${
            isUnlimited ? '무제한' : data.maxPeople
          }`}</Content>
        </CrewingInfo.PersonnelStatus>
      </CrewingInfo.Container>
      <CrewingParticipation>
        <CrewingParticipationBtn
          className={!!data.completed ? 'closed' : undefined}
          onClick={handleClick}
        >
          {!!data.completed ? '모집 마감' : '참가 신청'}
        </CrewingParticipationBtn>
      </CrewingParticipation>
    </Container>
  );
}

export default CrewingContent;
