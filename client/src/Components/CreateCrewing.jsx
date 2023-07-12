// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import styled from 'styled-components';
import MakeCrew from './CreateCrewing.style.js';
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
import Copper from 'react-easy-crop';
import imageCompression from 'browser-image-compression';

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
  const [image, setImage] = useState(null);
  const [cropperArea, setCropperArea] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [showCropper, setShowCropper] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);

  const onCropComplete = (cropAreaPercentage, cropperAreaPixels) => {
    console.log(cropAreaPercentage, cropperAreaPixels);
    setCropperArea(cropperAreaPixels);
  };
  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener('load', () => {
        setImage(reader.result);
        setShowCropper(true);
      });
    }
  };
  const onSave = () => {
    if (cropperArea) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const imageObj = new Image();

      imageObj.src = image;
      canvas.width = cropperArea.width;
      canvas.height = cropperArea.height;

      ctx.drawImage(
        imageObj,
        cropperArea.x,
        cropperArea.y,
        cropperArea.width,
        cropperArea.height,
        0,
        0,
        cropperArea.width,
        cropperArea.height
      );

      canvas.toBlob((blob) => {
        const croppedImageUrl = URL.createObjectURL(blob); // Blob URL로 변환
        setCroppedImage(croppedImageUrl);
        setShowCropper(false);
      }, 'image/jpeg');
    }
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };
  const handleFormSubmit = async () => {
    // 사진 크기 조정 및 압축
    const options = {
      maxSizeMB: 1, // 최대 파일 크기 (메가바이트 단위)
      maxWidthOrHeight: 800, // 사진의 최대 가로 또는 세로 크기
      useWebWorker: true, // 웹 워커를 사용하여 더 빠른 압축 활성화
    };

    try {
      let compressedImage = null;

      if (croppedImage instanceof Blob) {
        compressedImage = await imageCompression(croppedImage, options);
      } else {
        // 이미지를 Blob으로 변환
        const convertedImage = await fetch(croppedImage).then((res) =>
          res.blob()
        );
        compressedImage = await imageCompression(convertedImage, options);
      }

      // FormData 생성 및 압축된 사진 추가
      const postData = new FormData();
      postData.append('title', title);
      postData.append('content', content);
      postData.append('activity', activity);
      postData.append('deadline', deadline);
      postData.append('number', number);
      postData.append('image', compressedImage, 'compressedImage.jpg');
      postData.append('category', 'diet'); // 카테고리 추가

      axios
        .post('API 주소', postData)
        .then((response) => {
          console.log(response.data);
          navigate('/');
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
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
        {showCropper && image ? (
          <>
            <MakeCrew.Cropperstyle>
              <Copper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </MakeCrew.Cropperstyle>
            <MakeCrew.Save onClick={onSave}>
              <FontAwesomeIcon
                icon={faCheck}
                size="2x"
                style={{ color: 'white' }}
              />
            </MakeCrew.Save>
          </>
        ) : null}
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
              {image ? (
                <img src={croppedImage} alt="Selected" /> // 이미지 표시
              ) : (
                <>
                  <input
                    type="file"
                    id="choose"
                    accept="image/*"
                    onChange={onSelectFile}
                  />
                  <label htmlFor="choose">
                    <FontAwesomeIcon icon={faImage} size="4x" />
                  </label>
                  <p>사진 첨부하기</p>
                </>
              )}
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
