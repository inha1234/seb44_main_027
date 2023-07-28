// import { useState, useEffect } from 'react';
// import { useLocation, Navigate } from 'react-router-dom';
// import AuthRedirect from '../Components/AuthRedirect';
// import { useApi } from './hooks/useApi';
// import spinner from '../assets/loading-spinner.gif';

// function PrivateRoute({ children }) {
//   const api = useApi();
//   const location = useLocation();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isAuthenticating, setIsAuthenticating] = useState(true);
//   const authToken = localStorage.getItem('authToken');

//   useEffect(() => {
//     if (authToken) {
//       api
//         .post('/authentication', {}, { headers: { Authorization: authToken } })
//         .then((response) => {
//           if (response.status === 200) {
//             setIsLoggedIn(true);
//           }
//           setIsAuthenticating(false);
//         })
//         .catch((error) => {
//           console.error(error);
//           setIsLoggedIn(false);
//           setIsAuthenticating(false);
//         });
//     } else {
//       setIsAuthenticating(false);
//     }
//   }, [authToken, api]);

//   if (isAuthenticating) {
//     return <img style={{ width: '150px' }} src={spinner} alt="loading..." />;
//   }

//   if (!isLoggedIn) {
//     if (location.pathname !== '/') {
//       return <AuthRedirect />;
//     }
//     return <Navigate to="/login" state={{ from: location }} />;
//   }

//   return children;
// }

// export default PrivateRoute;

import { useState, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import AuthRedirect from '../Components/AuthRedirect';
import spinner from '../assets/loading-spinner.gif';

function PrivateRoute({ children }) {
  const location = useLocation();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    if (authToken) {
      setIsAuthenticating(false);
    } else {
      setIsAuthenticating(false);
    }
  }, [authToken]);

  if (isAuthenticating) {
    return <img style={{ width: '150px' }} src={spinner} alt="loading..." />;
  }

  if (!authToken) {
    if (location.pathname !== '/') {
      return <AuthRedirect />;
    }
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

export default PrivateRoute;
