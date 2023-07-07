// eslint-disable-next-line no-unused-vars
import React, { useState, useRef } from 'react';
import MakeEat from './CreateDiet.style.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateDiet() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [kcal, setKacl] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleKcalChange = (e) => {
    setKacl(e.target.value);
  };

  const handleFormSubmit = () => {
    const postData = {
      title: title,
      content: content,
      kcal: kcal,
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

  const [previewImg, setPreviewImg] = useState(null);
  const insert = (e) => {
    // console.log(e.target.files[0]);
    let render = new FileReader();

    if (e.target.files[0]) {
      render.readAsDataURL(e.target.files[0]);
    }
    render.onloadend = () => {
      const previewImgUrl = render.result;

      if (previewImgUrl) {
        setPreviewImg(previewImgUrl);
      }
    };
  };

  return (
    <>
      <MakeEat.Container>
        <MakeEat.Makepage>
          <MakeEat.Icon
            onClick={() => {
              navigate(-1);
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} size="2x" />
          </MakeEat.Icon>
          <h4>식단 게시글 작성</h4>
          <MakeEat.Main>
            <MakeEat.Img>
              <input
                type="file"
                id="choose"
                accept="image/*"
                onChange={(e) => insert(e)}
              />
              <label htmlFor="choose">
                <MakeEat.Insert
                  style={{ width: '250px', height: 'auto', objectFit: 'cover' }}
                  src={previewImg || ''}
                />
                {!previewImg && (
                  <>
                    <FontAwesomeIcon icon={faImage} size="4x" />
                    <p>사진 첨부하기</p>
                  </>
                )}
              </label>
            </MakeEat.Img>
            <MakeEat.Input>
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
              <p>칼로리</p>
              <input
                className="kcal"
                min="0"
                type="number"
                value={kcal}
                onChange={handleKcalChange}
                placeholder="kcal"
              />
            </MakeEat.Input>
          </MakeEat.Main>
          <button disabled={!title} onClick={handleFormSubmit}>
            작성 완료
          </button>
        </MakeEat.Makepage>
      </MakeEat.Container>
    </>
  );
}
