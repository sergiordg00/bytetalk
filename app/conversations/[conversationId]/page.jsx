import ReplyProvider from "@/context/ReplyContext";
import getConversationById from "@/services/getConversationById";
import getMessages from "@/services/getMessages";
import EmptyState from "@/shared-components/ui/EmptyState";

import Body from "./Body";
import Header from "./Header";
import MessageForm from "./MessageForm";

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
    <ReplyProvider>
      <div className="h-full lg:pl-80">
        <div className="flex h-full flex-col">
          <Header conversation={conversation}/>

          <Body initialMessages={messages}/>

          <MessageForm/>
        </div>
      </div>
    </ReplyProvider>
  );
}