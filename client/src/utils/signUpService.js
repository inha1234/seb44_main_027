import axios from "axios";

export const checkEmailDuplicate = (email) => {
  return axios.post(`${import.meta.env.VITE_API_URL}/members/findExist`, {
    email: email,
  });
};

export const checkNicknameDuplicate = (nickname) => {
  return axios.post(`${import.meta.env.VITE_API_URL}/members/findExist`, {
    userName: nickname,
  });
};

export const signUpNewUser = (newUser) => {
  return axios.post(`${import.meta.env.VITE_API_URL}/members/signUp`, newUser);
};
