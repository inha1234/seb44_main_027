// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import styled from 'styled-components';
import MakeCrew from './CreateCrewing.style.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ko } from 'date-fns/esm/locale';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const StyledDatePicker = styled(DatePicker)`
  width: 255px !important;
  cursor: pointer !important;
  padding: 8px !important;
  color: #676767;
`;

export default function CreateCrewing() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [activity, setActivity] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const handleFormSubmit = () => {
    const postData = {
      title: title,
      content: content,
      activity: activity,
      deadline: deadline,
      number: number,
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

  const [isRecruitChecked, setIsRecruitChecked] = useState(false);
  const [number, setNumber] = useState('');

  const handleRecruitChange = (e) => {
    setIsRecruitChecked(e.target.checked);

    // 체크 해제 시 인원 입력값 초기화
    if (!e.target.checked) {
      setNumber('');
    }
  };

  return (
    <>
      <MakeCrew.Container>
        <MakeCrew.Makepage>
          <MakeCrew.Icon
            onClick={() => {
              navigate(-1);
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} size="2x" />
          </MakeCrew.Icon>
          <h4>크루잉 게시글 작성</h4>
          <MakeCrew.Main>
            <MakeCrew.Img>
              <input type="file" id="choose" accept="image/*" />
              <label htmlFor="choose">
                <FontAwesomeIcon icon={faImage} size="4x" />
              </label>
              <p>사진 첨부하기</p>
            </MakeCrew.Img>
            <MakeCrew.Input>
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
              <p>활동 날짜</p>
              <StyledDatePicker
                className="aperiod"
                selected={activity}
                value={activity}
                onChange={(date) => setActivity(date)}
                locale={ko}
                dateFormat="yyyy.MM.dd"
                showPopperArrow={false}
              />
              <p>모집 마감일</p>
              <StyledDatePicker
                className="aperiod"
                selected={deadline}
                value={deadline}
                onChange={(date) => setDeadline(date)}
                locale={ko}
                dateFormat="yyyy.MM.dd"
                showPopperArrow={false}
              />
              <p>모집 인원</p>
              <input
                className="check"
                type="checkbox"
                checked={isRecruitChecked}
                onChange={handleRecruitChange}
              />
              <input
                className="num"
                type="number"
                min="0"
                value={number}
                onChange={handleNumberChange}
                disabled={!isRecruitChecked}
              />
            </MakeCrew.Input>
          </MakeCrew.Main>
          <button
            disabled={!title || !content || !activity || !deadline}
            onClick={handleFormSubmit}
          >
            작성 완료
          </button>
        </MakeCrew.Makepage>
      </MakeCrew.Container>
    </>
  );
}
