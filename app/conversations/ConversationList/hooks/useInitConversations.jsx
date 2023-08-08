import { find } from "lodash";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import usePlaySound from "@/hooks/usePlaySound";
import { pusherClient } from "@/libs/pusher";

export default function useInitConversations(initialConversations, conversationId, currentUser) {
  const [conversations, setConversations] = useState(initialConversations);
  const router = useRouter();
  const sounds = usePlaySound();

  useEffect(() => {
    pusherClient.subscribe(currentUser.email);

    const handleNewConversation = (newConversation) => {
      console.log("Hey");
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

      if(conversationId !== updatedConversation.id && updatedConversation.type === "new") {
        sounds.messageReceivedDifferentChat();
        toast.success("You have a new message");
      }
    };

    const handleRemoveConversation = (removedConversationId) => {
      setConversations((prevValue) => (
        prevValue.filter((conversation) => conversation.id !== removedConversationId)
      ));

      if(conversationId === removedConversationId) {
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

  return conversations;
}