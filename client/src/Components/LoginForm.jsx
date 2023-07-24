import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../utils/hooks/useLogin';

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
} from './LoginForm.style';

function LoginForm() {
  const navigate = useNavigate();
  const {
    form,
    message,
    onEmailChange,
    onPasswordChange,
    onLoginClick,
    onPasswordKeyPress,
    MESSAGE,
  } = useLogin(navigate);

  return (
    <LoginInputContainer>
      <img
        style={{ width: '8rem', marginLeft: '-5px', marginBottom: '20px' }}
        src="/images/logo-long.png"
        alt="logo-long"
      />
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
          onKeyPress={onPasswordKeyPress}
        ></InputArea>
        <InvalidInputIndicator>{message.passwordMessage}</InvalidInputIndicator>
      </InputWithTitle>
      <LoginButton onClick={onLoginClick}>{MESSAGE.LOGIN}</LoginButton>
      <SignUpLinkContainer>
        <SignUpLinkMessage>{MESSAGE.SIGN_UP_LINK_INFO}</SignUpLinkMessage>
        <SignUpLink to="/signup">{MESSAGE.SIGN_UP_LINK_MESSAGE}</SignUpLink>
      </SignUpLinkContainer>
    </LoginInputContainer>
  );
}

export default LoginForm;
