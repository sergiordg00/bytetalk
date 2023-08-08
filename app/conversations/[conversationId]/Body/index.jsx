"use client";

import axios from "axios";
import clsx from "clsx";
import { find } from "lodash";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

import useConversation from "@/hooks/useConversation";
import usePlaySound from "@/hooks/usePlaySound";
import { pusherClient } from "@/libs/pusher";

import { useMessages } from "../context/MessagesContext";

import MessageBox from "./components/MessageBox";

export default function Body() {
  const { conversationId } = useConversation();
  const { messages, setMessages } = useMessages();
  const [isListScrolledToBottom, setIsListScrolledToBottom] = useState(false);
  const listRef = useRef();
  const sounds = usePlaySound();
  const session = useSession();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    // channel subscription! You subscribe to a channel. In that channel, many events can happen, you use bind for that.
    pusherClient.subscribe(conversationId);

    const newMessageHandler = (newMessage) => {
      if(newMessage.sender.email !== session.data.user.email) {
        setMessages((prevValue) => {
          if(find(prevValue, { id: newMessage.id })) {
            return prevValue;
          } else {
            sounds.messageReceivedSameChat();
  
            return [...prevValue, newMessage];
          }
        });
      }

      axios.post(`/api/conversations/${conversationId}/seen`);
    };

    const updateMessageHandler = (updatedMessage) => {
      setMessages((prevValue) => {
        return prevValue.map((message) => {
          if(message.id === updatedMessage.id) {
            return updatedMessage;
          } else {
            return message;
          }
        });
      });
    };

    pusherClient.bind("messages:new", newMessageHandler);
    pusherClient.bind("message:update", updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", newMessageHandler);
      pusherClient.unbind("message:update", updateMessageHandler);
    };
  }, [conversationId]);

  useEffect(() => {
    listRef.current.scrollTop = listRef.current.scrollHeight;
    setIsListScrolledToBottom(true); /** Prevents visible flickering */
  }, [messages?.length]);

  return (
    <div 
      className={clsx(
        "flex-1 overflow-y-auto overflow-x-hidden pb-2",
        isListScrolledToBottom ? "opacity-100" : "opacity-0"
      )} 
      ref={listRef}
    >
      {messages.map((message, index) => (
        <MessageBox
          key={message.id}
          isLast={index === messages.length - 1}
          data={message}
        />
      ))}
    </div>
  );
}