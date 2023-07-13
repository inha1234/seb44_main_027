import React, { useState, useEffect } from 'react';
import { BoardBox, Title, CardList, Btn } from './CrewingBoard.style.js';
import CrewingCardItem from './CrewingCardItem.jsx';
import axios from 'axios';

function CrewingBoard() {
  const MESSAGE = {
    TITLE_CREWING: '함께 운동할 크루원들을 모아보세요.',
    BTN_CREWING: '크루원 모집하기',
  };

  const accessToken = sessionStorage.getItem('authToken');
  const url = `${import.meta.env.VITE_API_URL}/crewing`;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // GET API
  const getData = () => {
    setLoading(true);
    axios
      .get(url, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        setData(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        throw error;
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <BoardBox>
      <Title>
        <h1>{MESSAGE.TITLE_CREWING}</h1>
        <Btn to={'/create/crewing'}>{MESSAGE.BTN_CREWING}</Btn>
      </Title>
      <CardList>
        {data &&
          data.map((item) => (
            <CrewingCardItem key={item.crewingId} item={item} />
          ))}
      </CardList>
    </BoardBox>
  );
}

export default CrewingBoard;
