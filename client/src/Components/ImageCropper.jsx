import React from 'react';
import Cropper from 'react-easy-crop';
import ImageCropperStyle from './ImageCropper.style.js';

const ImageCropper = ({
  image,
  crop,
  zoom,
  onCropChange,
  onZoomChange,
  onCropComplete,
}) => {
  return (
    <ImageCropperStyle.Cropperstyle>
      <Cropper
        image={image}
        crop={crop}
        zoom={zoom}
        aspect={1}
        onCropChange={onCropChange}
        onZoomChange={onZoomChange}
        onCropComplete={onCropComplete}
      />
    </ImageCropperStyle.Cropperstyle>
  );
};

export default ImageCropper;
