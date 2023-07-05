import React from 'react';
import Slider from "react-slick";
import styled from 'styled-components';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const SliderWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const StyledSlider = styled(Slider)`
  width: 100%;
  height: 100%;

  .slick-slide div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; 
    width: 50vw; 
  }

  .slick-slide img {
    width: auto;
    height: auto;
    max-height: 100vh; 
    max-width: 50vw; 
    object-fit: contain; 
  }
`;

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