"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import AppModal from "@/shared-components/modals/AppModal";

export default function Prueba() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  return (
    <>
      <AppModal
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
      >
        <h1>Test de modal</h1>

        <button onClick={() => router.push("/users")} className="cursor-pointer bg-sky-500 p-2 transition-all active:translate-y-1">Ir a inicio</button>
      </AppModal>

      <button onClick={() => setShowModal(true)} className="cursor-pointer bg-sky-500 p-2 transition-all active:translate-y-1">Abrir modal</button>

      <p className="w-[20px]"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam. </p>
      <p className="w-[20px]"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam. </p>
      <p className="w-[20px]"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam. </p>
      <p className="w-[20px]"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam. </p>
      <p className="w-[20px]"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam. </p>
      <p className="w-[20px]"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam. </p>
      <p className="w-[20px]"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam. </p>
      <p className="w-[20px]"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam. </p>
      <p className="w-[20px]"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam. </p>

    </>
  );
}