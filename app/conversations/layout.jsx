import getConversations from "@/services/getConversations";
import getUsers from "@/services/getUsers";
import Sidebar from "@/shared-components/ui/sidebar";

import ConversationsList from "./components/ConversationsList";

export default async function Layout({ children }) {
  /** Both requests at the same time */
  const [initialConversations, users] = await Promise.all([
    getConversations(),
    getUsers(),
  ]);

  return (
    <Sidebar>
      <div className="h-full">
        <ConversationsList initialConversations={initialConversations} users={users}/>
        {children}
      </div>
    </Sidebar>
  );
}