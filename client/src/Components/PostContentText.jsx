import React from 'react';

function PostContentText({ data, type }) {
  if (type === 'share' && data.category === 'workout') {
    return <div>해당 운동게시물의 텍스트 내용입니다.</div>;
  } else if (type === 'share' && data.category === 'diet') {
    return <div>해당 식단게시물의 텍스트 내용입니다.</div>;
  } else if (type === 'crewing') {
    return <div>해당 크루잉 게시물의 텍스트 내용입니다.</div>;
  }
}

export default PostContentText;
