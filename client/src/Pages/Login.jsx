import React from "react";
import { CarouselContainer, LoginContainer, LoginMain } from "./Login.style";
import LoginForm from "../Components/LoginForm";
function Login() {
  return (
    <LoginMain>
      <LoginContainer>
        <LoginForm />
      </LoginContainer>
      <CarouselContainer></CarouselContainer>
    </LoginMain>
  );
}

export default Login;
