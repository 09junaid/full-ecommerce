import React from "react";
import { FiX, FiAlertTriangle } from "react-icons/fi";

export default function DeleteConfirmationModal({
  isOpen,
  onCancel,
  onConfirm,
  title = "Confirm Deletion",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
        onClick={onCancel}
      ></div>

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-xl transition-transform transform animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onCancel}
          className="absolute cursor-pointer top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Close"
        >
          <FiX className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="p-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
            <FiAlertTriangle className="text-red-500 w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="mt-2 text-sm text-gray-600">{message}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50 rounded-b-xl">
          <button
            onClick={onCancel}
            className="px-4 py-2 cursor-pointer text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 cursor-pointer text-sm rounded-md bg-red-500 text-white hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>

    </div>
  );
}
