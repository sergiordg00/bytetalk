"use client";

import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { HiPhoto } from "react-icons/hi2";
import { HiPaperAirplane } from "react-icons/hi2";

import { useReply } from "@/context/ReplyContext";
import useConversation from "@/hooks/useConversation";

import MessageInput from "./components/MessageInput";
import ReplyPreview from "./components/ReplyPreview";

const INITIAL_FORM_STATE = {
  message: ""
};

export default function MessageForm() {
  const { conversationId } = useConversation();
  const { reply, setReply } = useReply();
  const [formState, setFormState] = useState(INITIAL_FORM_STATE);

  function onSubmit(e) {
    e.preventDefault();
    setFormState(INITIAL_FORM_STATE);
    setReply(null);

    axios.post("/api/messages", {
      ...formState, /** The current value of the state will still be available, the changed value will only appear on next render */
      conversationId
    })
      .then((data) => {})
      .catch(() => {
        toast.error("Failed to send message");
      });
  }

  function handleUploadImage(result) {
    axios.post("/api/messages", {
      conversationId,
      image: result?.info?.secure_url
    });
  }

  return (
            
    <div className="w-full border-t border-solid border-gray-200 bg-white p-3 lg:gap-4">
      <form onSubmit={onSubmit} className="flex w-full items-end gap-2 lg:gap-4">
        <div className="w-full rounded-lg bg-neutral-200 p-2">
          {reply && <ReplyPreview/>}

          <div className="flex w-full items-center gap-1">
            <CldUploadButton
              type="button"
              options={{ maxFiles: 1 }}
              onUpload={handleUploadImage}
              uploadPreset="ccii6bws"
            >
              <div className="cursor-pointer rounded-full p-1 transition hover:bg-neutral-300">
                <HiPhoto size={30} className="text-sky-500"/>
              </div>
            </CldUploadButton>

            <MessageInput
              id="message"
              value={formState.message}
              onChange={(e) => setFormState({ ...formState, message: e.target.value })}
              required
              placeholder="Write a message..."
            />

          </div>
        </div>

        <button type="submit" className="shrink-0 cursor-pointer rounded-full bg-sky-500 p-2 transition hover:bg-sky-600">
          <HiPaperAirplane size={18} className="text-white"/>
        </button>
      </form>
    </div>
  );
}