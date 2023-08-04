import getUsers from "@/services/getUsers";
import EmptyState from "@/shared-components/ui/EmptyState";
import Sidebar from "@/shared-components/ui/Sidebar";

import UsersList from "./components/UsersList";

export const metadata = {
  title: "Users",
  description: "View all users on ByteTalk.",
};

export default async function Users() {
  const users = await getUsers();

  return (
    <Sidebar>
      <div className="h-full">
        <UsersList users={users}/>
      
        <div className="hidden h-full lg:block lg:pl-80">
          <EmptyState />
        </div>
      </div>
    </Sidebar>
  );
}