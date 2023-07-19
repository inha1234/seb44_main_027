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
    async function (error) {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const refreshToken = sessionStorage.getItem('refreshToken');

        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/refresh`,
            {
              headers: {
                Refresh: refreshToken,
              },
            }
          );

          if (response.status === 201) {
            const newAccessToken = response.headers['authorization'];
            sessionStorage.setItem('authToken', newAccessToken);

            originalRequest.headers['Authorization'] = newAccessToken;

            return api(originalRequest);
          }
        } catch (error) {
          console.log(error);
          alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
          sessionStorage.clear();
          navigate('/login');
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
};
