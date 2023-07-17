import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useLogout = () => {
  const navigate = useNavigate();

  return () => {
    const authToken = sessionStorage.getItem('authToken');
    // const refreshToken = sessionStorage.getItem('refreshToken');

    axios
      .post(
        `${import.meta.env.VITE_API_URL}/members/logOut`,
        {},
        {
          headers: {
            Authorization: authToken,
          },
        }
      )
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('Logout request failed');
        }

        alert('성공적으로 로그아웃되었습니다');
        sessionStorage.clear();
        navigate('/login');
      })
      .catch((error) => {
        console.error(error);
        alert('오류가 발생했습니다. 다시 시도해주세요.');
        sessionStorage.clear();
        navigate('/login');
      });
  };
};

export default useLogout;
