import { useState, useEffect } from 'react';
import {
  checkEmailDuplicate,
  checkNicknameDuplicate,
  signUpNewUser,
} from '../signUpService';
import defaultProfile from '/images/defaultprofile.png';
import { useNavigate } from 'react-router-dom';

const useSignUpForm = (messages) => {
  const navigate = useNavigate();
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
  const [formStep, setFormStep] = useState(0);
  const [activityArea, setActivityArea] = useState('');

  useEffect(() => {
    if (emailTouched) {
      const emailRegex = /\S+@\S+\.\S+/;
      setEmailError(!emailRegex.test(email));
    }

    if (nicknameTouched) {
      const nicknameRegex = /^[가-힣a-zA-Z0-9]{1,8}$/;
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

  const handleCheckEmailDuplicate = () => {
    checkEmailDuplicate(email)
      .then(() => {
        alert(messages.EMAIL_SUCCESS);
        setFormStep(1);
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          alert(messages.EMAIL_DUPLICATE);
        } else {
          alert(messages.EMAIL_ERROR);
        }
      });
  };

  const handleCheckNicknameDuplicate = () => {
    checkNicknameDuplicate(nickname)
      .then(() => {
        alert(messages.NICKNAME_SUCCESS);
        setFormStep(2);
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          alert(messages.NICKNAME_DUPLICATE);
        } else {
          alert(messages.EMAIL_ERROR);
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

    signUpNewUser(newUser)
      .then((response) => {
        if (response.status === 201) {
          alert(messages.SIGNUP_SUCCESS);
          navigate('/login');
        } else {
          alert(messages.SIGNUP_FAIL);
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error(error);
        alert(messages.SIGNUP_ERROR);
        window.location.reload();
      });
  };

  return {
    email,
    setEmail,
    emailTouched,
    setEmailTouched,
    emailError,
    nickname,
    setNickname,
    nicknameTouched,
    setNicknameTouched,
    nicknameError,
    password,
    setPassword,
    passwordTouched,
    setPasswordTouched,
    passwordError,
    confirmPassword,
    setConfirmPassword,
    confirmPasswordTouched,
    setConfirmPasswordTouched,
    confirmPasswordError,
    formStep,
    setFormStep,
    activityArea,
    setActivityArea,
    handleCheckEmailDuplicate,
    handleCheckNicknameDuplicate,
    handleSubmit,
  };
};

export default useSignUpForm;
