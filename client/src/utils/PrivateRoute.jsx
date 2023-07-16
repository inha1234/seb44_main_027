import { useLocation, Navigate } from 'react-router-dom';
import AuthRedirect from '../Components/AuthRedirect';

function PrivateRoute({ children, path }) {
  let location = useLocation();

  if (!sessionStorage.getItem('authToken')) {
    if (path !== '/') {
      return <AuthRedirect />;
    }
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

export default PrivateRoute;
