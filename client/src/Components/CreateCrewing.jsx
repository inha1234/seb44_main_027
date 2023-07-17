import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faImage,
  faArrowLeft,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ko } from 'date-fns/esm/locale';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useImageCropAndUpload from '../utils/hooks/useImageCropAndUpload.js';
import ImageCropper from './ImageCropper.jsx';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import CreateCrewingStyle from './CreateCrewing.style.js';

const StyledDatePicker = styled(DatePicker)`
  width: 328px !important;
  cursor: pointer !important;
  padding: 8px !important;
  color: #676767;
`;

export default function CreateCrewing() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [activity, setActivity] = useState(null);
  const [deadline, setDeadline] = useState('');
  const [showCropper, setShowCropper] = useState(false);
  const [isRecruitChecked, setIsRecruitChecked] = useState(false);
  const [number, setNumber] = useState('');
  const [maxPeople, setMaxPeople] = useState(999); // 기본값 999로 설정
  const {
    image,
    setImage,
    crop,
    setCrop,
    zoom,
    setZoom,
    croppedImage,
    uploadedImageUrl,
    onCropComplete,
    onSelectFile,
    onSave,
  } = useImageCropAndUpload();

  const handleSave = async () => {
    await onSave();
    setShowCropper(false); // 크로퍼 종료
  };

  const handleSelectFile = (e) => {
    onSelectFile(e);
    setShowCropper(true); // 크로퍼 표시
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleNumberChange = (e) => {
    const num = e.target.value;
    setNumber(num);
    setMaxPeople(isRecruitChecked && num !== '' ? parseInt(num) : 999);
  };

  const handleFormSubmit = async () => {
    const authToken = sessionStorage.getItem('authToken');
    const formattedDeadline = format(deadline, "yyyy-MM-dd'T'HH:mm:ss");
    const postData = {
      title: title,
      content: content,
      activityDate: activity,
      deadLine: formattedDeadline,
      maxPeople: maxPeople,
      imageUrl: uploadedImageUrl,
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/crewing`, postData, {
        headers: { Authorization: authToken },
      })
      .then((response) => {
        console.log('게시물 작성 완료:', response.data);
        navigate('/');
      })
      .catch((error) => {
        console.error('게시물 작성 실패:', error);
        alert('게시물 작성에 실패했습니다. 다시 시도해주세요.');
        window.location.reload();
      });
  };

  const handleRecruitChange = (e) => {
    const checked = e.target.checked;
    setIsRecruitChecked(checked);

    // 체크 해제 시 인원 입력값 초기화
    if (!checked) {
      setNumber('');
      setMaxPeople(999);
    }
  };

  return (
    <>
      <CreateCrewingStyle.Container>
        {showCropper && image && (
          <>
            <ImageCropper
              image={image}
              crop={crop}
              zoom={zoom}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
            <CreateCrewingStyle.ButtonContainer>
              <CreateCrewingStyle.Save onClick={handleSave}>
                <FontAwesomeIcon icon={faCheck} size="2x" />
              </CreateCrewingStyle.Save>
              <CreateCrewingStyle.Cancel
                onClick={() => {
                  setShowCropper(false);
                  setImage(null);
                }}
              >
                <FontAwesomeIcon icon={faXmark} size="2x" />
              </CreateCrewingStyle.Cancel>
            </CreateCrewingStyle.ButtonContainer>
          </>
        )}
        <CreateCrewingStyle.Makepage>
          <CreateCrewingStyle.Icon
            onClick={() => {
              navigate(-1);
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} size="2x" />
          </CreateCrewingStyle.Icon>
          <h4>크루잉 게시글 작성</h4>
          <CreateCrewingStyle.Main>
            <CreateCrewingStyle.Img>
              {image ? (
                <img src={croppedImage} alt="Selected" /> // 이미지 표시
              ) : (
                <>
                  <input
                    type="file"
                    id="choose"
                    accept="image/*"
                    onChange={handleSelectFile}
                  />
                  <label htmlFor="choose">
                    <FontAwesomeIcon icon={faImage} size="4x" />
                  </label>
                  <p>사진 첨부하기</p>
                </>
              )}
            </CreateCrewingStyle.Img>
            <CreateCrewingStyle.Input>
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
                selected={activity}
                value={activity}
                onChange={(date) => setActivity(date)}
                locale={ko}
                dateFormat="yyyy.MM.dd / aah:mm"
                showPopperArrow={false}
                minDate={new Date(new Date().getTime() + 24 * 60 * 60 * 1000)}
                showTimeSelect
              />
              <p>모집 마감</p>
              <StyledDatePicker
                selected={deadline}
                onChange={(date) => setDeadline(date)}
                locale={ko}
                dateFormat="yyyy.MM.dd / aah:mm"
                showPopperArrow={false}
                minDate={new Date(new Date().getTime() + 24 * 60 * 60 * 1000)}
                maxDate={new Date(activity?.getTime() - 24 * 60 * 60 * 1000)}
                disabled={!activity}
                showTimeSelect
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
            </CreateCrewingStyle.Input>
          </CreateCrewingStyle.Main>
          <button
            disabled={!title || !content || !activity || !deadline}
            onClick={handleFormSubmit}
          >
            작성 완료
          </button>
        </CreateCrewingStyle.Makepage>
      </CreateCrewingStyle.Container>
    </>
  );
}
