import { useLocation, Navigate } from 'react-router-dom';
import AuthRedirect from '../Components/AuthRedirect';

function PrivateRoute({ children, path }) {
  let location = useLocation();
  const isLoggedIn = Boolean(sessionStorage.getItem('authToken'));

  // 로그인이 안 된 상태에서 로그인이 필요한 페이지에 접근하는 경우
  if (!isLoggedIn) {
    if (path !== '/') {
      return <AuthRedirect />;
    } else {
      return <Navigate to="/login" state={{ from: location }} />;
    }
  }

  // 로그인이 된 상태에서 로그인 또는 회원가입 페이지에 접근하는 경우
  if (isLoggedIn && (path === '/login' || path === '/signup')) {
    return <Navigate to="/" />;
  }

  return children;
}

export default PrivateRoute;
