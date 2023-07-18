import { useState } from 'react';

function usePortalModal() {
  const [showModal, setShowModal] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

  const openModal = (event) => {
    console.log('Open modal is called');
    const rect = event.target.getBoundingClientRect();
    setModalPosition({ x: rect.left, y: rect.bottom });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return {
    showModal,
    modalPosition,
    openModal,
    closeModal,
  };
}

export default usePortalModal;
