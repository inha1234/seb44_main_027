import React, { useState } from "react";
import jwtDecode from "jwt-decode";

import {
  InputArea,
  InputHeading,
  InputWithTitle,
  LoginButton,
  LoginHeading,
  LoginInputContainer,
  SignUpLinkContainer,
  SignUpLinkMessage,
  SignUpLink,
  InvalidInputIndicator,
} from "./LoginForm.style";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MESSAGE = {
  EMPTY_EMAIL: "이메일 입력 칸이 비어있습니다.",
  EMPTY_PASSWORD: "패스워드 입력 칸이 비어있습니다.",
  LOGIN: "로그인",
  SUB_HEADING_EMAIL: "이메일",
  SUB_HEADING_PASSWORD: "비밀번호",
  PLACEHOLDER_EMAIL: "이메일을 입력해주세요.",
  PLACEHOLDER_PASSWORD: "비밀번호를 입력해주세요.",
  SIGN_UP_LINK_INFO: "아직 가입하지 않으셨나요?",
  SIGN_UP_LINK_MESSAGE: "가입하기",
  LOGIN_FAILED_01: "로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.",
  LOGIN_FAILED_02: "로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
};

function LoginForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState({
    emailMessage: "",
    passwordMessage: "",
  });

  const onEmailChange = (e) => {
    setForm({ ...form, email: e.currentTarget.value });
  };

  const onPasswordChange = (e) => {
    setForm({ ...form, password: e.currentTarget.value });
  };

  const onLoginClick = () => {
    if (!form.email || !form.password) {
      setMessage({
        emailMessage: !form.email ? MESSAGE.EMPTY_EMAIL : "",
        passwordMessage: !form.password ? MESSAGE.EMPTY_PASSWORD : "",
      });
      return;
    }

    setMessage({ emailMessage: "", passwordMessage: "" });

    axios
      .post("url", form)
      .then((res) => {
        if (res.status === 200) {
          const token = res.data.token;
          sessionStorage.setItem("token", res.data.token);
          const decoded = jwtDecode(token);
          sessionStorage.setItem("memberId", decoded.memberId);
          navigate("/");
        } else {
          setForm({ email: "", password: "" }); // Reset form input values
          setMessage({ emailMessage: "", passwordMessage: "" }); // Reset error messages
          alert(MESSAGE.LOGIN_FAILED_01);
        }
      })
      .catch((error) => {
        console.error(error);
        setForm({ email: "", password: "" }); // Reset form input values
        setMessage({ emailMessage: "", passwordMessage: "" }); // Reset error messages
        alert(MESSAGE.LOGIN_FAILED_02);
      });
  };

  return (
    <LoginInputContainer>
      <LoginHeading>{MESSAGE.LOGIN}</LoginHeading>
      <InputWithTitle>
        <InputHeading>{MESSAGE.SUB_HEADING_EMAIL}</InputHeading>
        <InputArea
          value={form.email}
          placeholder={MESSAGE.PLACEHOLDER_EMAIL}
          onChange={onEmailChange}
        ></InputArea>
        <InvalidInputIndicator>{message.emailMessage}</InvalidInputIndicator>
      </InputWithTitle>
      <InputWithTitle>
        <InputHeading>{MESSAGE.SUB_HEADING_PASSWORD}</InputHeading>
        <InputArea
          value={form.password}
          placeholder={MESSAGE.PLACEHOLDER_PASSWORD}
          type="password"
          onChange={onPasswordChange}
        ></InputArea>
        <InvalidInputIndicator>{message.passwordMessage}</InvalidInputIndicator>
      </InputWithTitle>
      <LoginButton onClick={onLoginClick}>{MESSAGE.LOGIN}</LoginButton>
      <SignUpLinkContainer>
        <SignUpLinkMessage>{MESSAGE.SIGN_UP_LINK_INFO}</SignUpLinkMessage>
        <SignUpLink to="/">{MESSAGE.SIGN_UP_LINK_MESSAGE}</SignUpLink>
      </SignUpLinkContainer>
    </LoginInputContainer>
  );
}

export default LoginForm;
