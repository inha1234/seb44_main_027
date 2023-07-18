import { useState } from 'react';
import NotFoundPage from '../../Components/NotFoundPage';

function useNotFoundPage() {
  const [notFound, setNotFound] = useState(false);

  const handleNotFoundErrors = (error) => {
    if (error.response && error.response.status === 404) {
      setNotFound(true);
    } else {
      console.error(error);
    }
  };

  return { notFound, NotFoundPage, handleNotFoundErrors };
}

export default useNotFoundPage;
