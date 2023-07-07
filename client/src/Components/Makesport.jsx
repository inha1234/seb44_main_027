// eslint-disable-next-line no-unused-vars
import React, { useState, useRef } from 'react';
import MakeSport from './Makesport.style.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Makesport() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleFormSubmit = () => {
    const postData = {
      title: title,
      content: content,
    };

    console.log(postData);

    axios
      .post('API 주소', postData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <MakeSport.Container>
        <MakeSport.Makepage>
          <MakeSport.Icon
            onClick={() => {
              navigate(-1);
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} size="2x" />
          </MakeSport.Icon>
          <h4>운동 게시글 작성</h4>
          <MakeSport.Main>
            <MakeSport.Img>
              <input type="file" id="choose" accept="image/*" />
              <label htmlFor="choose">
                <FontAwesomeIcon icon={faImage} size="4x" />
              </label>
              <p>사진 첨부하기</p>
            </MakeSport.Img>
            <MakeSport.Input>
              <p>제목</p>
              <input type="text" value={title} onChange={handleTitleChange} />
              <p>내용</p>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                value={content}
                onChange={handleContentChange}
              ></textarea>
            </MakeSport.Input>
          </MakeSport.Main>
          <button disabled={!title} onClick={handleFormSubmit}>
            작성 완료
          </button>
        </MakeSport.Makepage>
      </MakeSport.Container>
    </>
  );
}
