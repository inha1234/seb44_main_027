import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  InputAreaShort,
  InputHeading,
  InputWithButtonContainer,
  SignUpHeading,
  SignUpInputContainer,
  InvalidInputIndicator,
  InputWithTitle,
  CheckDuplicateButton,
  InputAreaDefault,
  SignUpButton,
  LoginLinkContainer,
  LoginLinkMessage,
  LoginLink,
  ActivityAreaSelect,
} from "./SignUpForm.style";
import defaultProfile from "/images/defaultprofile.png";
import { useNavigate } from "react-router-dom";

const MESSAGES = {
  EMAIL_SUCCESS: "사용할 수 있는 이메일입니다",
  EMAIL_DUPLICATE: "이미 등록된 이메일입니다",
  EMAIL_ERROR: "오류가 발생했습니다. 다시 시도해주세요",
  NICKNAME_SUCCESS: "사용할 수 있는 닉네임입니다",
  NICKNAME_DUPLICATE: "이미 등록된 닉네임입니다",
  SIGNUP_SUCCESS: "성공적으로 회원가입되었습니다! 로그인해주세요.",
  SIGNUP_FAIL: "입력된 정보가 잘못되었습니다. 다시 시도해주세요.",
  SIGNUP_ERROR: "오류가 발생했습니다. 회원가입을 다시 시도해주세요",
  EMAIL_PLACEHOLDER: "이메일을 입력해주세요",
  NICKNAME_PLACEHOLDER: "닉네임을 입력해주세요",
  CHECK_DUPLICATE: "중복 확인",
  EMAIL_INVALID: "이메일 형식이 올바르지 않습니다.",
  NICKNAME_INVALID:
    "닉네임은 1-8자의 영문 대소문자와 숫자로 이루어져야 합니다.",
  PASSWORD_INVALID:
    "비밀번호는 영문, 숫자, 특수문자를 포함하여 8자리 이상이어야 합니다.",
  CONFIRM_PASSWORD_INVALID: "비밀번호가 일치하지 않습니다.",
};

function SignUpForm() {
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [nickname, setNickname] = useState("");
  const [nicknameTouched, setNicknameTouched] = useState(false);
  const [nicknameError, setNicknameError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [formStep, setFormStep] = useState(0);
  const [activityArea, setActivityArea] = useState("");
  const navigate = useNavigate();

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
      const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@!%*#?&])[A-Za-z\d$@!%*#?&]{8,}$/;
      setPasswordError(!passwordRegex.test(password));
    }

    if (confirmPasswordTouched) {
      setConfirmPasswordError(password !== confirmPassword);
    }
  }, [
    email,
    emailTouched,
    nickname,
    nicknameTouched,
    password,
    passwordTouched,
    confirmPassword,
    confirmPasswordTouched,
  ]);

  const errorMessage = {
    email: emailError && emailTouched ? MESSAGES.EMAIL_INVALID : "",
    nickname: nicknameError && nicknameTouched ? MESSAGES.NICKNAME_INVALID : "",
    password: passwordError && passwordTouched ? MESSAGES.PASSWORD_INVALID : "",
    confirmPassword:
      confirmPasswordError && confirmPasswordTouched
        ? MESSAGES.CONFIRM_PASSWORD_INVALID
        : "",
  };

  const checkEmailDuplicate = () => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/members/findExist`, {
        email: email,
      })
      .then(() => {
        alert(MESSAGES.EMAIL_SUCCESS);
        setFormStep(1);
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          alert(MESSAGES.EMAIL_DUPLICATE);
        } else {
          alert(MESSAGES.EMAIL_ERROR);
        }
      });
  };

  const checkNicknameDuplicate = () => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/members/findExist`, {
        userName: nickname,
      })
      .then(() => {
        alert(MESSAGES.NICKNAME_SUCCESS);
        setFormStep(2);
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          alert(MESSAGES.NICKNAME_DUPLICATE);
        } else {
          alert(MESSAGES.EMAIL_ERROR);
        }
      });
  };

  const handleSubmit = () => {
    const newUser = {
      email: email,
      userName: nickname,
      password: password,
      activityArea: activityArea,
      imageUrl: defaultProfile,
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/members/signUp`, newUser)
      .then((response) => {
        if (response.status === 201) {
          alert(MESSAGES.SIGNUP_SUCCESS);
          navigate("/login");
        } else {
          alert(MESSAGES.SIGNUP_FAIL);
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error(error);
        alert(MESSAGES.SIGNUP_ERROR);
        window.location.reload();
      });
  };

  return (
    <SignUpInputContainer>
      <SignUpHeading>회원가입</SignUpHeading>
      <InputWithTitle>
        <InputHeading>이메일</InputHeading>
        <InputWithButtonContainer>
          <InputAreaShort
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailTouched(true);
            }}
            disabled={formStep !== 0}
            placeholder={MESSAGES.EMAIL_PLACEHOLDER}
          ></InputAreaShort>
          <CheckDuplicateButton
            onClick={() => {
              if (email && !emailError) {
                checkEmailDuplicate();
              }
            }}
            disabled={formStep !== 0 || emailError}
          >
            중복 확인
          </CheckDuplicateButton>
        </InputWithButtonContainer>
        <InvalidInputIndicator>{errorMessage.email}</InvalidInputIndicator>
      </InputWithTitle>

      <InputWithTitle>
        <InputHeading>닉네임</InputHeading>
        <InputWithButtonContainer>
          <InputAreaShort
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
              setNicknameTouched(true);
            }}
            disabled={formStep !== 1}
            placeholder={MESSAGES.NICKNAME_PLACEHOLDER}
          ></InputAreaShort>
          <CheckDuplicateButton
            onClick={() => {
              if (nickname && !nicknameError) {
                checkNicknameDuplicate();
              }
            }}
            disabled={formStep !== 1 || nicknameError}
          >
            중복 확인
          </CheckDuplicateButton>
        </InputWithButtonContainer>
        <InvalidInputIndicator>{errorMessage.nickname}</InvalidInputIndicator>
      </InputWithTitle>
      <InputWithTitle>
        <InputHeading>비밀번호</InputHeading>
        <InputAreaDefault
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordTouched(true);
          }}
          disabled={formStep !== 2}
        ></InputAreaDefault>
        <InvalidInputIndicator>{errorMessage.password}</InvalidInputIndicator>
      </InputWithTitle>

      <InputWithTitle>
        <InputHeading>비밀번호 확인</InputHeading>
        <InputAreaDefault
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setConfirmPasswordTouched(true);
          }}
          disabled={formStep !== 2}
        ></InputAreaDefault>
        <InvalidInputIndicator>
          {errorMessage.confirmPassword}
        </InvalidInputIndicator>
      </InputWithTitle>
      <InputWithTitle>
        <InputHeading>활동 지역 (선택)</InputHeading>
        <ActivityAreaSelect
          onChange={(e) => setActivityArea(e.target.value)}
          disabled={formStep !== 2}
        >
          <option value="">선택 안함</option>
          <option value="서울">서울</option>
          <option value="세종">세종</option>
          <option value="부산">부산</option>
          <option value="대구">대구</option>
          <option value="인천">인천</option>
          <option value="광주">광주</option>
          <option value="대전">대전</option>
          <option value="울산">울산</option>
          <option value="경기">경기</option>
          <option value="강원">강원</option>
          <option value="충북">충북</option>
          <option value="충남">충남</option>
          <option value="전북">전북</option>
          <option value="전남">전남</option>
          <option value="경북">경북</option>
          <option value="경남">경남</option>
          <option value="제주">제주</option>
        </ActivityAreaSelect>
      </InputWithTitle>
      <SignUpButton
        onClick={handleSubmit}
        disabled={
          formStep !== 2 ||
          emailError ||
          nicknameError ||
          passwordError ||
          confirmPasswordError
        }
      >
        회원가입
      </SignUpButton>
      <LoginLinkContainer>
        <LoginLinkMessage>이미 계정이 있나요?</LoginLinkMessage>
        <LoginLink to="/login">로그인</LoginLink>
      </LoginLinkContainer>
    </SignUpInputContainer>
  );
}

export default SignUpForm;
