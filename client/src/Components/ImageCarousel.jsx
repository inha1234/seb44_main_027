import React from 'react';
import Slider from "react-slick";
import styled from 'styled-components';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const SliderWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative; // Relative position을 추가합니다.
`;

const StyledSlider = styled(Slider)`
  width: 100%;
  height: 100%;

  .slick-slide div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; // 변경되었습니다.
    width: 50vw; // 변경되었습니다.
  }

  .slick-slide img {
    width: auto;
    height: auto;
    max-height: 100vh; // 변경되었습니다.
    max-width: 50vw; // 변경되었습니다.
    object-fit: contain; 
  }
`;

// Dots를 스타일링합니다.
const StyledDots = styled.ul`
  position: absolute;
  bottom: 40px;
  list-style: none;
  display: flex;
  justify-content: center;
  padding: 0;
  
  li {
    margin: 0 3px;
    
    button:before {
      font-size: 15px;
      color: #fff;
      opacity: 0.75;
    }
    
    &.slick-active button:before {
      color: #fff;
      opacity: 1;
    }
  }
`;

export default function ImageCarousel() {
    const settings = {
        dots: true,
        dotsClass: "slick-dots", // dotsClass를 추가합니다.
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        appendDots: dots => (
          <StyledDots>{dots}</StyledDots> // dots를 StyledDots로 감쌉니다.
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