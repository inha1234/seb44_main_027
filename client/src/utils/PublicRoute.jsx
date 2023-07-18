import { Navigate } from 'react-router-dom';

function PublicRoute({ children }) {
  const isLoggedIn = Boolean(sessionStorage.getItem('authToken'));
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return children;
}

export default PublicRoute;
