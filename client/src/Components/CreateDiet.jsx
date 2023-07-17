//CreateDiet.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import CreateDietStyle from './CreateDiet.style.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useImageCropAndUpload from '../utils/hooks/useImageCropAndUpload.js';
import ImageCropper from './ImageCropper.jsx';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

export default function CreateDiet() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [kcal, setKcal] = useState('');
  const [showCropper, setShowCropper] = useState(false); // 크로퍼 표시 상태
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

  const handleFormSubmit = async () => {
    const authToken = sessionStorage.getItem('authToken');
    const postData = {
      title: title,
      content: content,
      kcal: kcal,
      category: 'diet',
      imageUrl: uploadedImageUrl,
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/posts`, postData, {
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

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleKcalChange = (e) => {
    setKcal(e.target.value);
  };

  return (
    <>
      <CreateDietStyle.Container>
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
            <CreateDietStyle.ButtonContainer>
              <CreateDietStyle.Save onClick={handleSave}>
                <FontAwesomeIcon icon={faCheck} size="2x" />
              </CreateDietStyle.Save>
              <CreateDietStyle.Cancel
                onClick={() => {
                  setShowCropper(false);
                  setImage(null);
                }}
              >
                <FontAwesomeIcon icon={faXmark} size="2x" />
              </CreateDietStyle.Cancel>
            </CreateDietStyle.ButtonContainer>
          </>
        )}
        <CreateDietStyle.Makepage>
          <CreateDietStyle.Icon
            onClick={() => {
              navigate(-1);
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} size="2x" />
          </CreateDietStyle.Icon>
          <h4>식단 게시글 작성</h4>
          <CreateDietStyle.Main>
            <CreateDietStyle.Img>
              {image ? (
                <img src={croppedImage} alt="Selected" />
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
            </CreateDietStyle.Img>
            <CreateDietStyle.Input>
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
            </CreateDietStyle.Input>
          </CreateDietStyle.Main>
          <button disabled={!title || !croppedImage} onClick={handleFormSubmit}>
            작성 완료
          </button>
        </CreateDietStyle.Makepage>
      </CreateDietStyle.Container>
    </>
  );
}
