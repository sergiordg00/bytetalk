"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { CldUploadButton } from "next-cloudinary";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { HiPhoto } from "react-icons/hi2";
import { HiPaperAirplane } from "react-icons/hi2";
import { v4 as uuidv4 } from "uuid";

import { useReply } from "@/context/ReplyContext";
import useConversation from "@/hooks/useConversation";
import usePlaySound from "@/hooks/usePlaySound";

import { useMessages } from "../context/MessagesContext";

import MessageInput from "./components/MessageInput";
import ReplyPreview from "./components/ReplyPreview";

const INITIAL_FORM_STATE = {
  message: ""
};

export default function MessageForm() {
  const { conversationId } = useConversation();
  const { setMessages } = useMessages();
  const { reply, setReply } = useReply();
  const [formState, setFormState] = useState(INITIAL_FORM_STATE);
  const session = useSession();
  const sounds = usePlaySound();

  function submitMessage(message, image, replyData) {
    setFormState(INITIAL_FORM_STATE);
    setReply(null);

    const TEMPORAL_MESSAGE_ID = uuidv4();

    setMessages((prevValue) => [
      ...prevValue,
      {
        id: TEMPORAL_MESSAGE_ID,
        body: message,
        image: image,
        conversationId,
        createdAt: new Date().toISOString(),
        reply: replyData,
        seen: [],
        sender: session.data.user,
        seenIds: [],
        senderId: session.data.user.id,
        loading: true
      }
    ]);

    axios.post("/api/messages", {
      message,
      image,
      conversationId,
      reply: replyData
    })
      .then(({ data }) => {
        setMessages((prevValue) => (
          prevValue.map((message) => {
            if (message.id === TEMPORAL_MESSAGE_ID) {
              return data;
            }
            return message;
          })
        ));

        sounds.messageSent();
      })
      .catch(() => {
        toast.error("Failed to send message");
      });

  }

  function onSubmit(e) {
    e.preventDefault();
    submitMessage(formState.message, undefined, reply);
  }

  function handleUploadImage(result) {
    submitMessage("", result?.info?.secure_url, reply);
  }

  return (
            
    <div className="w-full border-t border-solid border-borderprimary bg-bgprimary p-3 lg:gap-4">
      <form onSubmit={onSubmit} className="flex w-full items-end gap-2 lg:gap-4">
        <div className="w-full rounded-lg bg-accentsecondary p-2">
          {reply && <ReplyPreview/>}

          <div className="flex w-full items-center gap-1">
            <CldUploadButton
              type="button"
              options={{ maxFiles: 1 }}
              onUpload={handleUploadImage}
              uploadPreset="ccii6bws"
            >
              <div className="cursor-pointer rounded-full p-1 transition hover:bg-accenthover">
                <HiPhoto size={30} className="text-accentprimary"/>
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

        <button type="submit" className="shrink-0 cursor-pointer rounded-full bg-accentprimary p-2 transition hover:opacity-75">
          <HiPaperAirplane size={18} className="text-white"/>
        </button>
      </form>
    </div>
  );
}