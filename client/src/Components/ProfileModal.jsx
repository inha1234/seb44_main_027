import React, { useState, useRef } from 'react';
import {
  ModalBackdrop,
  ModalButton,
  ModalCloseButton,
  ModalHeading,
  ProfileModalContainer,
  ButtonContainer,
  SaveButton,
  CancelButton,
  UploadArea,
  ProfileModalImageTemplate,
  ProfileModalCroppedImage,
} from './Modal.style';
import { faXmark, faImage, faCheck } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import useImageCropAndUpload from '../utils/hooks/useImageCropAndUpload.js';
import ImageCropper from './ImageCropper.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ProfileModal({ isModalOpen, handleModalToggle, memberId }) {
  const [showCropper, setShowCropper] = useState(false);
  const inputFileRef = useRef();
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
    setShowCropper(false);
  };

  const handleChangeButtonClick = () => {
    const authToken = sessionStorage.getItem('authToken');
    axios
      .put(
        `${import.meta.env.VITE_API_URL}/members/${memberId}`,
        { imageUrl: uploadedImageUrl },
        {
          headers: {
            Authorization: authToken,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          alert('프로필 사진이 성공적으로 변경되었습니다.');
          window.location.reload();
        } else {
          throw new Error();
        }
      })
      .catch((e) => {
        console.log(e);
        alert('오류가 발생하였습니다. 다시 시도해주세요.');
        window.location.reload();
      });
  };

  const handleSelectFile = (e) => {
    onSelectFile(e);
    setShowCropper(true);
  };

  const handleIconClick = () => {
    inputFileRef.current.click();
  };
  return (
    <>
      {isModalOpen ? (
        <ModalBackdrop onClick={() => handleModalToggle()}>
          <ProfileModalContainer onClick={(e) => e.stopPropagation()}>
            <ModalCloseButton icon={faXmark} onClick={handleModalToggle} />
            <ModalHeading style={{ marginBottom: '40px' }}>
              프로필 이미지 변경
            </ModalHeading>
            {showCropper && image && (
              <>
                <ImageCropper
                  image={image}
                  crop={crop}
                  zoom={zoom}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                  cropShape="round"
                />
                <ButtonContainer>
                  <SaveButton onClick={handleSave}>
                    <FontAwesomeIcon icon={faCheck} size="2x" />
                  </SaveButton>
                  <CancelButton
                    onClick={() => {
                      setShowCropper(false);
                      setImage(null);
                    }}
                  >
                    <FontAwesomeIcon icon={faXmark} size="2x" />
                  </CancelButton>
                </ButtonContainer>
              </>
            )}
            {image ? (
              <ProfileModalCroppedImage>
                <img src={croppedImage} alt="Cropped" />
              </ProfileModalCroppedImage>
            ) : (
              <ProfileModalImageTemplate>
                <input
                  type="file"
                  id="choose"
                  accept="image/*"
                  onChange={handleSelectFile}
                  style={{ display: 'none' }}
                  ref={inputFileRef}
                />
                <UploadArea onClick={handleIconClick}>
                  <FontAwesomeIcon icon={faImage} size="4x" />
                  사진 첨부하기
                </UploadArea>
              </ProfileModalImageTemplate>
            )}
            <ModalButton
              style={{ marginTop: '60px' }}
              onClick={handleChangeButtonClick}
            >
              수정 완료
            </ModalButton>
          </ProfileModalContainer>
        </ModalBackdrop>
      ) : null}
    </>
  );
}

export default ProfileModal;
