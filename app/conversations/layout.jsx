import getConversations from "@/services/getConversations";
import Sidebar from "@/shared-components/ui/sidebar";

import ConversationsList from "./components/ConversationsList";

export default async function Layout({ children }) {
  const initialConversations = await getConversations();

  return (
    <Sidebar>
      <div className="h-full">
        <ConversationsList initialConversations={initialConversations}/>
        {children}
      </div>
    </Sidebar>
  );
}