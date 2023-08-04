import getConversations from "@/services/getConversations";
import getCurrentUser from "@/services/getCurrentUser";
import getUsers from "@/services/getUsers";
import Sidebar from "@/shared-components/ui/Sidebar";

import ConversationsList from "./ConversationList";

export const metadata = {
  title: "Conversations",
  description: "View your conversations and chat with your friends.",
};

export default async function Layout({ children }) {
  /** Both requests at the same time */
  const [initialConversations, users, currentUser] = await Promise.all([
    getConversations(),
    getUsers(),
    getCurrentUser(),
  ]);

  return (
    <Sidebar>
      <div className="h-full">
        <ConversationsList 
          initialConversations={initialConversations} 
          users={users}
          currentUser={currentUser}
        />
        
        {children}
      </div>
    </Sidebar>
  );
}