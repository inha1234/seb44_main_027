import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useLocation } from 'react-router-dom';

function PortalModal({ children, position, onOutsideClick }) {
  const elRef = useRef(null);
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState(location.pathname);

  if (!elRef.current) {
    elRef.current = document.createElement('div');
  }

  useEffect(() => {
    const modalRoot = document.getElementById('modal-root');
    const modalElement = elRef.current;

    if (modalRoot) {
      modalRoot.appendChild(modalElement);
      modalElement.style.position = 'absolute';
      modalElement.style.top = `${position.y + 5}px`;
      modalElement.style.left = `${position.x}px`;
      modalElement.style.zIndex = 20;

      const handleOutsideClick = (event) => {
        if (!modalElement.contains(event.target)) {
          onOutsideClick && onOutsideClick();
        }
      };

      window.addEventListener('mousedown', handleOutsideClick);

      return () => {
        modalRoot.removeChild(modalElement);
        window.removeEventListener('mousedown', handleOutsideClick);
      };
    }
  }, [position, onOutsideClick]);

  // 페이지 전환을 감지하여 모달을 닫는 로직
  useEffect(() => {
    if (location.pathname !== prevLocation) {
      onOutsideClick && onOutsideClick();
    }
    setPrevLocation(location.pathname);
  }, [location]);

  return ReactDOM.createPortal(children, elRef.current);
}

export default PortalModal;
