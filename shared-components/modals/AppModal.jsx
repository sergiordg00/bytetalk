"use client";

import { IoClose } from "react-icons/io5";

import Modal from "./Modal";

export default function AppModal({ isOpen, onClose, children }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="w-full rounded-lg bg-white p-4 text-left sm:max-w-lg sm:p-6"
    >
      <button 
        type="button" 
        className="absolute right-2 top-2 rounded-md bg-white text-gray-400 hover:text-gray-500 sm:right-4 sm:top-4" 
        onClick={onClose}
      >
        <span className="sr-only">
          Close
        </span>

        <IoClose className="h-auto w-6"/>
      </button>

      {children}
    </Modal>
  );
}