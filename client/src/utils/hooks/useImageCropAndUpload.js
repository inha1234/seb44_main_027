import { useState } from 'react';
import axios from 'axios';
import imageCompression from 'browser-image-compression';

function useImageCropAndUpload() {
  const [image, setImage] = useState(null);
  const [cropperArea, setCropperArea] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  const onCropComplete = (cropAreaPercentage, cropperAreaPixels) => {
    setCropperArea(cropperAreaPixels);
  };

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener('load', () => {
        setImage(reader.result);
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

          const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1652,
            useWebWorker: true,
          };

          fetch(croppedImageUrl)
            .then((res) => res.blob())
            .then((convertedImage) => imageCompression(convertedImage, options))
            .then((compressedImage) => {
              const uploadData = new FormData();
              uploadData.append(
                'image',
                compressedImage,
                'compressedImage.jpg'
              );

              axios
                .post(`${import.meta.env.VITE_API_URL}/s3/upload`, uploadData)
                .then((response) => {
                  console.log(response);
                  setUploadedImageUrl(response.data[0]);
                  console.log(uploadedImageUrl);
                  resolve();
                })
                .catch((error) => {
                  console.error('Image upload failed:', error);
                  alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
                  // window.location.reload();
                });
            })
            .catch((error) => {
              console.error('Image compression or fetch failed:', error);
              resolve();
            });
        });
      };

      canvas.toBlob(processCroppedImage, 'image/jpeg');
    }
  };

  return {
    image,
    setImage,
    cropperArea,
    setCropperArea,
    crop,
    setCrop,
    zoom,
    setZoom,
    croppedImage,
    setCroppedImage,
    uploadedImageUrl,
    setUploadedImageUrl,
    onCropComplete,
    onSelectFile,
    onSave,
  };
}

export default useImageCropAndUpload;
