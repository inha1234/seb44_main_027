import { useLocation, Navigate } from 'react-router-dom';
import AuthRedirect from '../Components/AuthRedirect';

function PrivateRoute({ children, path }) {
  const location = useLocation();
  const isLoggedIn = Boolean(sessionStorage.getItem('authToken'));

  if (!isLoggedIn) {
    if (path !== '/') {
      return <AuthRedirect />;
    }
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

export default PrivateRoute;
