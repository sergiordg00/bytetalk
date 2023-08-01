"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";

import useConversation from "@/hooks/useConversation";

import ConversationBox from "./ConversationBox";

/** We get the initialConversations from the server, but pusher updates the list in real time in the client */
export default function ConversationsList({ initialConversations }) {
  const { conversationId, isOpen } = useConversation();
  const [conversations, setConversations] = useState(initialConversations);
  const router = useRouter();

  return (
    <aside className={clsx(
      "fixed inset-y-0 overflow-y-auto border-r border-gray-200 pb-20",
      "lg:left-20 lg:block lg:w-80 lg:pb-0",
      isOpen ? "hidden" : "left-0 block w-full"
    )}>
      <div className="px-5">
        <div className="mb-4 flex items-center justify-between pt-4">
          <h2 className="text-xl font-bold text-neutral-800">
            Messages
          </h2>

          <div className="cursor-pointer rounded-full bg-gray-100 p-2 text-gray-600 hover:opacity-75">
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
  );
}