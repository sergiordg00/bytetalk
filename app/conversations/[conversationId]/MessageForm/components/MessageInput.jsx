"use client";

import { useEffect, useRef } from "react";

import { useReply } from "@/context/ReplyContext";

export default function MessageInput(inputProps) {
  const { reply } = useReply();
  const inputRef = useRef(null);

  useEffect(() => {
    if(reply) {
      inputRef.current.focus();
    }
  }, [reply]);

  return (
    <div className="relative w-full">
      <input 
        type="text" 
        {...inputProps}
        className="w-full bg-transparent pr-4 text-black transition focus:outline-none"
        autoComplete="off"
        ref={inputRef}
      />
    </div>
  );
}