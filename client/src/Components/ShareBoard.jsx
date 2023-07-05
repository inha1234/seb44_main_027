import React from 'react';
import { BoardBox, Title, CardList, Btn } from './ShareBoard.style.js';
import Carditem from './Carditem.jsx';


const dummyData = {
  "posts": [
    { 
     postId:"1",
     title: "제목",
     content: "내용",
     category: "카테고리",
     imageUrl: "../src/assets/mock/1.jpeg",
     createdAt: "생성일", 
     modifiedAt: "수정일"
    },
    { 
     postId:"2",
     title: "제목2",
     content: "내용2",
     category: "카테고리",
     imageUrl: "../src/assets/mock/2.jpeg",
     createdAt: "생성일", 
     modifiedAt: "수정일"
    },
    { 
      postId:"3",
      title: "제목3",
      content: "내용3",
      category: "카테고리",
      imageUrl: "../src/assets/mock/3.jpeg",
      createdAt: "생성일", 
      modifiedAt: "수정일"
     },
     { 
      postId:"4",
      title: "제목4",
      content: "내용4",
      category: "카테고리",
      imageUrl: "../src/assets/mock/4.jpeg",
      createdAt: "생성일", 
      modifiedAt: "수정일"
     },
     { 
     postId:"5",
      title: "제목5",
      content: "내용5",
      category: "카테고리",
      imageUrl: "../src/assets/mock/5.jpeg",
      createdAt: "생성일", 
      modifiedAt: "수정일"
     },
     { 
      postId:"6",
      title: "제목6",
      content: "내용6",
      category: "카테고리",
      imageUrl: "../src/assets/mock/6.jpeg",
      createdAt: "생성일", 
      modifiedAt: "수정일"
     },
     { 
      postId:"7",
      title: "제목7",
      content: "내용7",
      category: "카테고리",
      imageUrl: "../src/assets/mock/7.jpeg",
      createdAt: "생성일", 
      modifiedAt: "수정일"
     }
 ],
  "pageInfo": {
  "page": 1,
  "size": 2,
  "totalElements": 2,
  "totalPages": 1
  }
 }


function ShareBoard (){
  return (
    <BoardBox>
      <Title>
        <h1>
          오늘은 무슨 운동을 하셨나요?
        </h1>
        <Btn>
          운동 게시글 만들기
        </Btn>
      </Title>
      <CardList>
        {dummyData.posts.map(item => <Carditem key={item.postId} item={item}/>)}
      </CardList>
    </BoardBox>
  )
}

export default ShareBoard;