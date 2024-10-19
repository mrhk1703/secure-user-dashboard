import React from "react";

interface LogoutConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
}: LogoutConfirmationProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
        <h2 className="text-lg font-semibold mb-4">
          Are you sure you want to logout?
        </h2>
        <div className="flex justify-end">
          <button
            className="bg-gray-300 text-gray-700 hover:bg-gray-400 rounded px-4 py-2 mr-2"
            onClick={onClose}
          >
            No
          </button>
          <button
            className="bg-red-600 text-white hover:bg-red-700 rounded px-4 py-2"
            onClick={onConfirm}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
