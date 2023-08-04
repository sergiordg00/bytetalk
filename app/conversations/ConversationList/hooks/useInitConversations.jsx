import { find } from "lodash";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { pusherClient } from "@/libs/pusher";

export default function useInitConversations(initialConversations, conversationId, currentUser) {
  const [conversations, setConversations] = useState(initialConversations);
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

  return conversations;
}