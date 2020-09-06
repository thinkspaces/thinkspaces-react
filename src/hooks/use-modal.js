// Libraries
import { useState, useCallback } from "react";

export default () => {
  const [currentModalId, setModalId] = useState(null);

  const closeModal = useCallback(() => setModalId(null), []);
  const openModal = useCallback((modalId) => () => setModalId(modalId), []);
  const isModalOpen = useCallback((modalId) => modalId === currentModalId, [
    currentModalId,
  ]);
  return { closeModal, openModal, isModalOpen };
};
