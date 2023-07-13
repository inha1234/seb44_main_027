import React from 'react';
import {
  Text,
  Kcal,
  CrewingInfo,
  Label,
  Content,
} from './PostContentText.style';

function PostContentText({ data, type }) {
  if (type === 'share' && data.category === 'workout') {
    return <Text>{data.content}</Text>;
  } else if (type === 'share' && data.category === 'diet') {
    return (
      <Text>
        <div>{data.content}</div>
        <Kcal>
          <span>섭취 칼로리 :</span>
          {`${data.kcal} kcal`}
        </Kcal>
      </Text>
    );
  } else if (type === 'crewing') {
    return (
      <Text>
        <div>{data.content}</div>
        <CrewingInfo.Container>
          <CrewingInfo.ActivityDate>
            <Label>활동 날짜</Label>
            <Content>{data.activityDate}</Content>
          </CrewingInfo.ActivityDate>
          <CrewingInfo.DeadLine>
            <Label>모집마감일</Label>
            <Content>{data.deadLine}</Content>
          </CrewingInfo.DeadLine>
          <CrewingInfo.PersonnelStatus>
            <Label>모집인원</Label>
            <Content>{`${data.currentPeople} / ${data.maxPeople}`}</Content>
          </CrewingInfo.PersonnelStatus>
        </CrewingInfo.Container>
      </Text>
    );
  }
}

export default PostContentText;
