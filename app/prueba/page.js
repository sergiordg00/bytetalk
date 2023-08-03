"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import Modal from "@/shared-components/modals/Modal";

export default function Prueba() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  return (
    <>
      <Modal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        className="w-full max-w-[500px] rounded-lg bg-white p-4"
      >
        <h1>Test de modal</h1>

        <button onClick={() => router.push("/users")} className="cursor-pointer bg-sky-500 p-2 transition-all active:translate-y-1">Ir a inicio</button>
      </Modal>

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