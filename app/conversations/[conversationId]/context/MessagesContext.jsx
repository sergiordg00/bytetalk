"use client";

import { createContext, useContext, useState } from "react";

const MessagesContext = createContext();

export function useMessages() {
  return useContext(MessagesContext);
}

export default function MessagesProvider({ initialMessages, children }) {
  const [messages, setMessages] = useState(initialMessages);

  return (
    <MessagesContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessagesContext.Provider>
  );
}