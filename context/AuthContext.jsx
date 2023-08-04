"use client";

import { SessionProvider } from "next-auth/react";

// TODO: CREATE A CUSTOM PROVIDER TO HANDLE AUTHENTICATION (AND THE HOOK TO HANDLE SESSOIN CHANGES IN REAL TIME)

export default function AuthContext({ children }) { 
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}