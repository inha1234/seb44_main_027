import { useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const MESSAGE = {
  EMPTY_EMAIL: '이메일 입력 칸이 비어있습니다.',
  EMPTY_PASSWORD: '패스워드 입력 칸이 비어있습니다.',
  LOGIN: '로그인',
  SUB_HEADING_EMAIL: '이메일',
  SUB_HEADING_PASSWORD: '비밀번호',
  PLACEHOLDER_EMAIL: '이메일을 입력해주세요.',
  PLACEHOLDER_PASSWORD: '비밀번호를 입력해주세요.',
  SIGN_UP_LINK_INFO: '아직 가입하지 않으셨나요?',
  SIGN_UP_LINK_MESSAGE: '가입하기',
  LOGIN_FAILED_01: '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.',
  LOGIN_FAILED_02: '로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  MEMBER_NOT_FOUND: '회원 정보가 없습니다. 다시 시도해주세요.',
  PASSWORD_NOT_MATCH: '비밀번호가 일치하지 않습니다. 다시 시도해주세요.',
};

export function useLogin(navigate) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState({
    emailMessage: '',
    passwordMessage: '',
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
        emailMessage: !form.email ? MESSAGE.EMPTY_EMAIL : '',
        passwordMessage: !form.password ? MESSAGE.EMPTY_PASSWORD : '',
      });
      return;
    }

    setMessage({ emailMessage: '', passwordMessage: '' });

    axios
      .post(`${import.meta.env.VITE_API_URL}/members/login`, form)
      .then((res) => {
        if (res.status === 200) {
          const authToken = res.headers['authorization'];
          const refreshToken = res.headers['refresh'];
          localStorage.setItem('authToken', authToken);
          localStorage.setItem('refreshToken', refreshToken);
          const decoded = jwtDecode(authToken);
          console.log(typeof decoded.memberId);
          localStorage.setItem('memberId', decoded.memberId);
          navigate('/');
        } else {
          setForm({ email: '', password: '' }); // Reset form input values
          setMessage({ emailMessage: '', passwordMessage: '' }); // Reset error messages
          alert(MESSAGE.LOGIN_FAILED_01);
        }
      })
      .catch((error) => {
        console.error(error);
        setForm({ email: '', password: '' }); // Reset form input values
        setMessage({ emailMessage: '', passwordMessage: '' }); // Reset error messages

        if (error.response && error.response.data) {
          if (error.response.data.message === 'member not found') {
            alert(MESSAGE.MEMBER_NOT_FOUND);
          } else if (
            error.response.data.message === 'password does not match'
          ) {
            alert(MESSAGE.PASSWORD_NOT_MATCH);
          } else {
            alert(MESSAGE.LOGIN_FAILED_02);
          }
        } else {
          alert(MESSAGE.LOGIN_FAILED_02);
        }
      });
  };

  const onPasswordKeyPress = (e) => {
    if (e.key === 'Enter') {
      onLoginClick();
    }
  };

  return {
    form,
    message,
    onEmailChange,
    onPasswordChange,
    onLoginClick,
    onPasswordKeyPress,
    MESSAGE,
  };
}
