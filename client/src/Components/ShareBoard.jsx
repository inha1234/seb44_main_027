import React, {useCallback, useState, useEffect} from 'react';
import { BoardBox, Title, CardList, Btn } from './ShareBoard.style.js';
import Carditem from './Carditem.jsx';
import axios from "axios";


function ShareBoard ({ type }){

  const MESSAGE = {
    TITLE_WORKOUT: "오늘은 무슨 운동을 하셨나요?",
    TITLE_DIET: "오늘은 무슨 식단을 하셨나요?",
    BTN_WORKOUT: "운동 게시글 만들기",
    BTN_DIET: "식단 게시글 만들기" 
  }


  const url = `${import.meta.env.VITE_API_URL}/posts`

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // GET API
  const getData = () => {
    setLoading(true)
    axios.get(url, {params: {category: type}})
        .then((response) => {
          setData(response.data)
          setLoading(false)
        })
        .catch((error) => {throw error;});
  }

  useEffect(() => {
    getData()
  }, []);

  
  return (
    <BoardBox>
      <Title>
        <h1>
          {type === "workout" ? MESSAGE.TITLE_WORKOUT : MESSAGE.TITLE_DIET}
        </h1>
        <Btn>
          {type === "workout" ? MESSAGE.BTN_WORKOUT : MESSAGE.BTN_DIET}
        </Btn>
      </Title>
      <CardList>
        {data && data.posts && data.posts.map(item => <Carditem key={item.postId} item={item}/>)}
      </CardList>
    </BoardBox>
  )
}

export default ShareBoard;