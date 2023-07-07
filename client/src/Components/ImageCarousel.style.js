import Slider from "react-slick";
import styled from 'styled-components';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export const SliderWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;


export const StyledSlider = styled(Slider)`
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


export const StyledDots = styled.ul`
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