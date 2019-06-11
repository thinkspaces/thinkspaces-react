import { useState, useCallback } from 'react';

export default () => {
  const [ currentModalId, setModalId ] = useState(null);

  const closeModal = useCallback(() => setModalId(null));
  const openModal = modalId => useCallback(() => setModalId(modalId));
  const isModalOpen = useCallback(modalId => modalId === currentModalId);
  return { closeModal, openModal, isModalOpen };
};
