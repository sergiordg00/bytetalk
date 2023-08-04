"use client";

import clsx from "clsx";
import { find } from "lodash";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";

import useConversation from "@/hooks/useConversation";
import { pusherClient } from "@/libs/pusher";

import ConversationBox from "./ConversationBox";
import GroupChatModal from "./GroupChatModal";

/** We get the initialConversations from the server, but pusher updates the list in real time in the client */
export default function ConversationsList({ initialConversations, users, currentUser }) {
  const { conversationId, isOpen } = useConversation();
  const [conversations, setConversations] = useState(initialConversations);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    pusherClient.subscribe(currentUser.email);

    const handleNewConversation = (newConversation) => {
      setConversations((prevValue) => {
        if(find(prevValue, { id: newConversation.id })) {
          return prevValue;
        }

        return [newConversation, ...prevValue];
      });
    };

    const handleUpdateConversation = (updatedConversation) => {
      setConversations((prevValue) => (
        prevValue.map((conversation) => {
          if(conversation.id === updatedConversation.id) {
            return {
              ...conversation,
              messages: updatedConversation.messages,
            };
          }

          return conversation;
        })
      ));
    };

    const handleRemoveConversation = (removedConversation) => {
      setConversations((prevValue) => (
        prevValue.filter((conversation) => conversation.id !== removedConversation.id)
      ));

      if(conversationId === removedConversation.id) {
        router.push("/conversations");
      }
    };

    pusherClient.bind("conversation:new", handleNewConversation);
    pusherClient.bind("conversation:update", handleUpdateConversation);
    pusherClient.bind("conversation:remove", handleRemoveConversation);

    return () => {
      pusherClient.unsubscribe(currentUser.email);
      pusherClient.unbind("conversation:new", handleNewConversation);
      pusherClient.unbind("conversation:update", handleUpdateConversation);
      pusherClient.unbind("conversation:remove", handleRemoveConversation);
    };
  }, [conversationId]);

  return (
    <>
      <GroupChatModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        users={users}
      />

      <aside className={clsx(
        "fixed inset-y-0 overflow-y-auto border-r border-solid border-gray-200 pb-20",
        "lg:left-20 lg:block lg:w-80 lg:pb-0",
        isOpen ? "hidden" : "left-0 block w-full"
      )}>
        <div className="px-5">
          <div className="mb-4 flex items-center justify-between pt-4">
            <h2 className="text-xl font-bold text-neutral-800">
            Messages
            </h2>

            <div className="cursor-pointer rounded-full bg-gray-100 p-2 text-gray-600 hover:opacity-75" onClick={() => setIsModalOpen(true)}>
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