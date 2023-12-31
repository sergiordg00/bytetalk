"use client";

import clsx from "clsx";
import { useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";

import useConversation from "@/hooks/useConversation";

import ConversationBox from "./components/ConversationBox";
import GroupChatModal from "./components/GroupChatModal";
import useInitConversations from "./hooks/useInitConversations";

/** We get the initialConversations from the server, but pusher updates the list in real time in the client */
export default function ConversationsList({ initialConversations, users, currentUser }) {
  const { conversationId, isOpen } = useConversation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const conversations = useInitConversations(initialConversations, conversationId, currentUser);

  return (
    <>
      <GroupChatModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        users={users}
      />

      <aside className={clsx(
        "absolute inset-y-0 overflow-y-auto border-r border-solid border-borderprimary bg-bgsecondary pb-20",
        "lg:left-20 lg:block lg:w-80 lg:pb-0",
        isOpen ? "hidden" : "left-0 block w-full"
      )}>
        <div className="px-5">
          <div className="mb-4 flex items-center justify-between pt-4">
            <h2 className="text-xl font-bold text-textprimary">
            Messages
            </h2>

            <div 
              className="cursor-pointer rounded-full bg-hoverprimary p-2 text-textsecondary hover:opacity-75" 
              onClick={() => setIsModalOpen(true)}
            >
              <MdOutlineGroupAdd size={20}/>
            </div>
          </div>

          {conversations.map((conversation) => (
            <ConversationBox
              key={conversation.id}
              data={conversation}
              selected={conversation.id === conversationId}
            />
          ))}
        </div>
      </aside>
    </>
  );
}