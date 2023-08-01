import getConversationById from "@/services/getConversationById";
import getMessages from "@/services/getMessages";
import EmptyState from "@/shared-components/ui/EmptyState";

import Body from "./components/Body";
import Header from "./components/Header";
import MessageForm from "./components/MessageForm";

export default async function ConversationPage({ params }) {
  /* better to have both request parallel */
  const [conversation, messages] = await Promise.all([
    getConversationById(params.conversationId),
    getMessages(params.conversationId),
  ]);

  if(!conversation) {
    return (
      <div className="h-full w-full lg:pl-80">
        <div className="flex h-full flex-col">
          <EmptyState/>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full lg:pl-80">
      <div className="flex h-full flex-col">
        <Header conversation={conversation}/>

        <Body/>

        <MessageForm/>
      </div>
    </div>
  );
}