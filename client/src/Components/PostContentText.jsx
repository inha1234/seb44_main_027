import React from 'react';
import { Text, Kcal } from './PostContentText.style';

function PostContentText({ data, type }) {
  if (type === 'share' && data.category === 'diet') {
    return (
      <Text>
        <div>{data.content}</div>
        <Kcal>
          <span>섭취 칼로리 :</span>
          {`${data.kcal} kcal`}
        </Kcal>
      </Text>
    );
  } else {
    return (
      <Text>
        <div>{data.content}</div>
      </Text>
    );
  }
}

export default PostContentText;
