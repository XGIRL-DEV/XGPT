import React from "react";

interface ConfirmModalProps {
  show: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ show, title, message, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 transition-opacity duration-300 ease-in-out">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out scale-105">
        <h3 className="text-2xl font-semibold text-white mb-4">{title}</h3>
        <p className="text-gray-400 mb-6">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-5 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
