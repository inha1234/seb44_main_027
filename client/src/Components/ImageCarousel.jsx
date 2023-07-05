import React from 'react';
import { StyledDots,SliderWrapper, StyledSlider } from './ImageCarousel.style';


export default function ImageCarousel() {
    const settings = {
        dots: true,
        dotsClass: "slick-dots",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        appendDots: dots => (
          <StyledDots>{dots}</StyledDots> //
        ),
    }

  return (
    <SliderWrapper>
      <StyledSlider {...settings}>
        <div>
          <img src="images/image1.jpg" alt="First slide"/>
        </div>
        <div>
          <img src="images/image2.jpg" alt="Second slide"/>
        </div>
        <div>
          <img src="images/image3.jpg" alt="Third slide"/>
        </div>
      </StyledSlider>
    </SliderWrapper>
  );
}