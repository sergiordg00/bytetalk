import getUsers from "@/services/getUsers";
import Sidebar from "@/shared-components/ui/sidebar";

import UsersList from "./components/UsersList";

export default async function Layout({ children }) {
  const users = await getUsers();

  return (
    <Sidebar>
      <div className="h-full">
        <UsersList users={users}/>
        
        {children}
      </div>
    </Sidebar>
  );
}