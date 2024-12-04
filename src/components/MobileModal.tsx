// MobileModal.tsx
import React from "react";
import Email from "../app/Definicoes/Email"; // Importa o componente de email
import Password from "../app/Definicoes/Password"; // Importa o componente de alteração de senha

interface MobileModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalType: 'email' | 'password'; // Tipos possíveis para o modal
}

const MobileModal: React.FC<MobileModalProps> = ({ isOpen, onClose, modalType }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-gray-800 w-full max-w-md p-4 rounded-lg overflow-y-auto max-h-screen">
        <button
          onClick={onClose}
          className="text-white absolute top-2 right-2 text-2xl hover:text-gray-400"
        >
          &times;
        </button>
        {/* Renderiza o componente baseado no tipo do modal */}
        {modalType === 'email' ? <Email /> : <Password />}
      </div>
    </div>
  );
};

export default MobileModal;
