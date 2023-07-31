import getCurrentUser from "@/services/getCurrentUser";

import DesktopSidebar from "./components/DesktopSidebar";
import MobileFooter from "./components/MobileFooter";

export default async function Sidebar({ children }) {
  const user = await getCurrentUser();

  return (
    <div className="h-full">
      <DesktopSidebar user={user}/>

      <MobileFooter />
      
      <main className="h-full lg:pl-20">
        {children}
      </main>
    </div>
  );
}