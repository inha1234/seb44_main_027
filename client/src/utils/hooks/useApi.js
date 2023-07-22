import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const useApi = () => {
  const navigate = useNavigate();

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const originalRequest = error.config;
      const refreshToken = localStorage.getItem('refreshToken');

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        return axios
          .post(
            `${import.meta.env.VITE_API_URL}/refresh`,
            {},
            {
              headers: {
                Refresh: refreshToken,
              },
            }
          )
          .then((response) => {
            if (response.status === 201) {
              const newAuthToken = response.data.Authorization;
              localStorage.setItem('authToken', newAuthToken);
              const newRefreshToken = response.data.Refresh;
              localStorage.setItem('refreshToken', newRefreshToken);
              originalRequest.headers['Authorization'] = newAuthToken;

              return api.request(originalRequest);
            }
          })
          .catch((error) => {
            if (error.response.status === 401) {
              alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
              localStorage.clear();
              navigate('/login');
            } else {
              alert('오류가 발생했습니다. 다시 로그인해주세요.');
              localStorage.clear();
              navigate('/login');
            }
          });
      }

      return Promise.reject(error);
    }
  );

  return api;
};
