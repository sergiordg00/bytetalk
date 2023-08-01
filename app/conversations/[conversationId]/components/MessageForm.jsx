"use client";

import axios from "axios";
import { useState } from "react";
import { HiPhoto } from "react-icons/hi2";
import { HiPaperAirplane } from "react-icons/hi2";

import useConversation from "@/hooks/useConversation";

import MessageInput from "./MessageInput";

const INITIAL_FORM_STATE = {
  message: ""
};

export default function MessageForm() {
  const { conversationId } = useConversation();
  const [formState, setFormState] = useState(INITIAL_FORM_STATE);

  function onSubmit(e) {
    e.preventDefault();
    setFormState(INITIAL_FORM_STATE);

    axios.post("/api/messages", {
      ...formState, /** The current value of the state will still be available, the changed value will only appear on next render */
      conversationId
    });
  }

  return (
    <div className="flex w-full items-center gap-2 border-t border-solid border-gray-200 bg-white p-3 lg:gap-4">
      <div className="cursor-pointer rounded-full p-1 transition hover:bg-neutral-200">
        <HiPhoto size={30} className="text-sky-500"/>
      </div>

      <form onSubmit={onSubmit} className="flex w-full items-center gap-2 lg:gap-4">
        <MessageInput
          id="message"
          value={formState.message}
          onChange={(e) => setFormState({ ...formState, message: e.target.value })}
          required
          placeholder="Write a message..."
        />

        <button type="submit" className="cursor-pointer rounded-full bg-sky-500 p-2 transition hover:bg-sky-600">
          <HiPaperAirplane size={18} className="text-white"/>
        </button>
      </form>
    </div>
  );
}