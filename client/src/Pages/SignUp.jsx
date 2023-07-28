import React from "react";
import { CarouselContainer, SignUpContainer, SignUpMain } from "./SignUp.style";
import SignUpForm from "../Components/SignUpForm";
import ImageCarousel from "../Components/ImageCarousel";

function SignUp() {
  return (
    <SignUpMain>
      <SignUpContainer>
        <SignUpForm />
      </SignUpContainer>
      <CarouselContainer>
        <ImageCarousel />
      </CarouselContainer>
    </SignUpMain>
  );
}

export default SignUp;