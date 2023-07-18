import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

function PortalModal({ children, position, onOutsideClick }) {
  const elRef = useRef(null);
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

  return ReactDOM.createPortal(children, elRef.current);
}

export default PortalModal;
