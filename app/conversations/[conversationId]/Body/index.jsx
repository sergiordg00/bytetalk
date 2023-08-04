"use client";

import axios from "axios";
import { find } from "lodash";
import { useRef, useState } from "react";
import { useEffect } from "react";

import useConversation from "@/hooks/useConversation";
import { pusherClient } from "@/libs/pusher";

import MessageBox from "./components/MessageBox";

export default function Body({ initialMessages }) {
  const { conversationId } = useConversation();
  const [messages, setMessages] = useState(initialMessages);
  const listRef = useRef();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    // channel subscription! You subscribe to a channel. In that channel, many events can happen, you use bind for that.
    pusherClient.subscribe(conversationId);

    const newMessageHandler = (newMessage) => {
      setMessages((prevValue) => {
        if(find(prevValue, { id: newMessage.id })) {
          return prevValue;
        } else {
          return [...prevValue, newMessage];
        }
      });

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
  }, [messages?.length]);

  return (
    <div className="flex-1 overflow-y-auto pb-2" ref={listRef}>
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