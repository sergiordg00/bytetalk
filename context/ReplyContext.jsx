"use client";

import { createContext, useContext, useState } from "react";

const ReplyContext = createContext();

export function useReply() {
  return useContext(ReplyContext);
}

export default function ReplyProvider({ children }) {
  const [reply, setReply] = useState(null);

  return (
    <ReplyContext.Provider value={{ reply, setReply }}>
      {children}
    </ReplyContext.Provider>
  );
}