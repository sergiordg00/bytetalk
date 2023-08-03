"use client";

import Image from "next/image";

import AppModal from "@/shared-components/modals/AppModal";

export default function ImageModal({ isOpen, onClose, src }) {
  return (
    <AppModal
      isOpen={isOpen}
      onClose={onClose}
    >
      <Image
        width="288"
        height="288"
        alt="Message image"
        className="mt-8 h-auto w-full object-cover"
        src={src}
      />
    </AppModal>
  );
}