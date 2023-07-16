// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import MakeEat from './CreateDiet.style.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Copper from 'react-easy-crop';
import imageCompression from 'browser-image-compression';

export default function CreateDiet() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [kcal, setKcal] = useState('');
  const [image, setImage] = useState(null);
  const [cropperArea, setCropperArea] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [showCropper, setShowCropper] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null); // 추가: 이미지 URL 상태 변수

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

  const onSave = async () => {
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

      const processCroppedImage = (blob) => {
        return new Promise((resolve, reject) => {
          const croppedImageUrl = URL.createObjectURL(blob);
          setCroppedImage(croppedImageUrl);
          setShowCropper(false);

          // 사진 크기 조정 및 압축
          const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1652,
            useWebWorker: true,
          };

          // 이미지를 Blob으로 변환
          fetch(croppedImageUrl)
            .then((res) => res.blob())
            .then((convertedImage) => imageCompression(convertedImage, options))
            .then((compressedImage) => {
              // FormData 생성 및 압축된 사진 추가
              const uploadData = new FormData();
              uploadData.append(
                'image',
                compressedImage,
                'compressedImage.jpg'
              );
              console.log(uploadData);

              // S3로 이미지 업로드
              axios
                .post(`${import.meta.env.VITE_API_URL}/s3/upload`, uploadData)
                .then((response) => {
                  console.log('이미지 업로드 완료:', response.data);
                  setUploadedImageUrl(response.data.imageUrl); // 이미지 URL 저장
                  resolve();
                })
                .catch((error) => {
                  console.error('이미지 업로드 실패:', error);
                  reject(error);
                });
            })
            .catch((error) => {
              console.error('이미지 처리 실패:', error);
              reject(error);
            });
        });
      };

      canvas.toBlob(processCroppedImage, 'image/jpeg');
    }
  };

  const handleFormSubmit = async () => {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('kcal', kcal);
    postData.append('category', 'diet');
    postData.append('imageUrl', uploadedImageUrl);
    console.log('imageUrl', uploadedImageUrl);

    axios
      .post(`${import.meta.env.VITE_SERVER_URL}/posts`, postData)
      .then((response) => {
        console.log('게시물 작성 완료:', response.data);
        navigate('/');
      })
      .catch((error) => {
        console.error('게시물 작성 실패:', error);
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
      <MakeEat.Container>
        {showCropper && image ? (
          <>
            <MakeEat.Cropperstyle>
              <Copper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </MakeEat.Cropperstyle>
            <MakeEat.Save onClick={onSave}>업로드</MakeEat.Save>
          </>
        ) : null}
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
          <button disabled={!title || !croppedImage} onClick={handleFormSubmit}>
            작성 완료
          </button>
        </MakeEat.Makepage>
      </MakeEat.Container>
    </>
  );
}
