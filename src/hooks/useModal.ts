import { useState } from "react";

interface ModalOption {
  message: string;
  onConfirm: () => void;
}

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);

  const openModal = ({ message, onConfirm }: ModalOption) => {
    setModalMessage(message);
    setConfirmAction(() => onConfirm);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return {
    isModalOpen,
    modalMessage,
    confirmAction,
    openModal,
    closeModal,
  };
};

export default useModal;
