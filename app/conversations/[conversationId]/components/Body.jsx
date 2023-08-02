"use client";

import axios from "axios";
import { useRef, useState } from "react";
import { useEffect } from "react";

import useConversation from "@/hooks/useConversation";

import MessageBox from "./MessageBox";

export default function Body({ initialMessages }) {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef();
  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, index) => (
        <MessageBox
          key={message.id}
          isLast={index === messages.length - 1}
          data={message}
        />
      ))}

      <div className="pt-12" ref={bottomRef}/>
    </div>
  );
}