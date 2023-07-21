import React from "react";
import { CarouselContainer, LoginContainer, LoginMain } from "./Login.style";
import LoginForm from "../Components/LoginForm";
import ImageCarousel from "../Components/ImageCarousel";
function Login() {
  return (
    <LoginMain>
      <LoginContainer>
        <LoginForm />
      </LoginContainer>
      <CarouselContainer>
        <ImageCarousel />
      </CarouselContainer>
    </LoginMain>
  );
}

export default Login;
