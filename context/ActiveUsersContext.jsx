"use client";

import { createContext, useContext, useEffect, useMemo,useState } from "react";

import { pusherClient } from "@/libs/pusher";

const ActiveUsersContext = createContext();

export function ActiveUsersProvider({ children }) {
  const [activeUsers, setActiveUsers] = useState([]);

  function initActiveUsers(activeUsers) {
    setActiveUsers(Object.keys(activeUsers.members) || []);
  }

  function addActiveUser(newUser) {
    if(!activeUsers.includes(newUser.id)) { 
      setActiveUsers((prev) => [...prev, newUser.id]);
    }
  }

  function removeActiveUser(userToRemove) {
    setActiveUsers((prev) => prev.filter((user) => user !== userToRemove.id));
  }

  useEffect(() => {
    const channel = pusherClient.subscribe("presence-bytetalk");

    channel.bind("pusher:subscription_succeeded", initActiveUsers);
    channel.bind("pusher:member_added", addActiveUser);
    channel.bind("pusher:member_removed", removeActiveUser);

    return () => {
      channel.unsubscribe("presence-bytetalk");
      channel.unbind("pusher:subscription_succeeded", initActiveUsers);
      channel.unbind("pusher:member_added", addActiveUser);
      channel.unbind("pusher:member_removed", removeActiveUser);
    };
  }, []);

  return (
    <ActiveUsersContext.Provider value={{ activeUsers }}>
      {children}
    </ActiveUsersContext.Provider>
  );
}

export function useIsActive(userEmail) {
  const { activeUsers } = useContext(ActiveUsersContext);
  const isActive = useMemo(() => {
    return activeUsers.includes(userEmail);
  }, [userEmail, activeUsers]);

  return isActive;
}