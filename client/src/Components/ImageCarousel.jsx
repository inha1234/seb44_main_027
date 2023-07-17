import React from 'react';
import { StyledDots, SliderWrapper, StyledSlider } from './ImageCarousel.style';
import image01 from '/images/image1.jpg';
import image02 from '/images/image2.jpg';
import image03 from '/images/image3.jpg';

export default function ImageCarousel() {
  const settings = {
    dots: true,
    dotsClass: 'slick-dots',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    appendDots: (dots) => (
      <StyledDots>{dots}</StyledDots> //
    ),
  };

  return (
    <SliderWrapper>
      <StyledSlider {...settings}>
        <div>
          <img src={image01} alt="First slide" />
        </div>
        <div>
          <img src={image02} alt="Second slide" />
        </div>
        <div>
          <img src={image03} alt="Third slide" />
        </div>
      </StyledSlider>
    </SliderWrapper>
  );
}
