import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { InputAreaShort, InputHeading, InputWithButtonContainer, SignUpHeading, SignUpInputContainer,InvalidInputIndicator, InputWithTitle, CheckDuplicateButton, InputAreaDefault, SignUpButton, LoginLinkContainer, LoginLinkMessage, LoginLink } from './SignUpForm.style';

function SignUpForm() {
  const [email, setEmail] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [nickname, setNickname] = useState('');
  const [nicknameTouched, setNicknameTouched] = useState(false);
  const [nicknameError, setNicknameError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [emailDuplicate, setEmailDuplicate] = useState(false);
  const [nicknameDuplicate, setNicknameDuplicate] = useState(false);
  const [formStep, setFormStep] = useState(0);

  useEffect(() => {
    if (emailTouched) {
      const emailRegex = /\S+@\S+\.\S+/;
      setEmailError(!emailRegex.test(email));
    }
    
    if (nicknameTouched) {
      const nicknameRegex = /^[a-zA-Z0-9]{1,8}$/;
      setNicknameError(!nicknameRegex.test(nickname));
    }
    
    if (passwordTouched) {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@!%*#?&])[A-Za-z\d$@!%*#?&]{8,}$/;
      setPasswordError(!passwordRegex.test(password));
    }

    if (confirmPasswordTouched) {
      setConfirmPasswordError(password !== confirmPassword);
    }
  }, [email, emailTouched, nickname, nicknameTouched, password, passwordTouched, confirmPassword, confirmPasswordTouched]);

  const errorMessage = {
    email: emailError && emailTouched ? '이메일 형식이 올바르지 않습니다.' : '',
    nickname: nicknameError && nicknameTouched ? '닉네임은 1-8자의 영문 대소문자와 숫자로 이루어져야 합니다.' : '',
    password: passwordError && passwordTouched ? '비밀번호는 영문, 숫자, 특수문자를 포함하여 8자리 이상이어야 합니다.' : '',
    confirmPassword: confirmPasswordError && confirmPasswordTouched ? '비밀번호가 일치하지 않습니다.' : ''
  };

  const checkDuplicate = (type) => {
  };

  const handleSubmit = () => {
  };

  return (
    <SignUpInputContainer>
        <SignUpHeading>회원가입</SignUpHeading>
        <InputWithTitle>
        <InputHeading>이메일</InputHeading>
        <InputWithButtonContainer>
        <InputAreaShort value={email} onChange={(e) => { setEmail(e.target.value); setEmailTouched(true); }} disabled={formStep !== 0} placeholder='이메일을 입력해주세요'></InputAreaShort>
        <CheckDuplicateButton 
  onClick={() => {
    if (email && !emailError) {
      checkDuplicate('email'); 
      setFormStep(1);
    }
  }} 
  disabled={formStep !== 0 || emailError}>
  중복 확인
</CheckDuplicateButton>

        </InputWithButtonContainer>
        <InvalidInputIndicator>{errorMessage.email}</InvalidInputIndicator>
        </InputWithTitle>

        <InputWithTitle>
        <InputHeading>닉네임</InputHeading>
        <InputWithButtonContainer>
        <InputAreaShort value={nickname} onChange={(e) => { setNickname(e.target.value); setNicknameTouched(true); }} disabled={formStep !== 1} placeholder='닉네임을 입력해주세요'></InputAreaShort>
        <CheckDuplicateButton 
  onClick={() => {
    if (nickname && !nicknameError) {
      checkDuplicate('nickname');
      setFormStep(2);
    }
  }}
  disabled={formStep !== 1 || nicknameError}>
  중복 확인
</CheckDuplicateButton>
        </InputWithButtonContainer>
        <InvalidInputIndicator>{errorMessage.nickname}</InvalidInputIndicator>
        </InputWithTitle>

        <InputWithTitle>
        <InputHeading>비밀번호</InputHeading>
        <InputAreaDefault type='password' value={password} onChange={(e) => { setPassword(e.target.value); setPasswordTouched(true); }} disabled={formStep !== 2}></InputAreaDefault>
        <InvalidInputIndicator>{errorMessage.password}</InvalidInputIndicator>
        </InputWithTitle>

        <InputWithTitle>
        <InputHeading>비밀번호 확인</InputHeading>
        <InputAreaDefault type='password' value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value); setConfirmPasswordTouched(true); }} disabled={formStep !== 2}></InputAreaDefault>
        <InvalidInputIndicator>{errorMessage.confirmPassword}</InvalidInputIndicator>
        </InputWithTitle>
        <SignUpButton onClick={handleSubmit} disabled={formStep !== 2 || emailError || nicknameError || passwordError || confirmPasswordError || emailDuplicate || nicknameDuplicate}>회원가입</SignUpButton>
        <LoginLinkContainer>
            <LoginLinkMessage>이미 계정이 있나요?</LoginLinkMessage>
            <LoginLink to='/login'>로그인</LoginLink>
        </LoginLinkContainer>
    </SignUpInputContainer>
  );
}

export default SignUpForm;
