import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";

export default async function Sidebar({ children }) {
  return (
    <div className="h-full">
      <DesktopSidebar />

      <MobileFooter />
      
      <main className="h-full lg:pl-20">
        {children}
      </main>
    </div>
  );
}